// create Agora client
var client = null;

var localTracks = {
    videoTrack: null,
    audioTrack: null
};

var mics = []; // all microphones devices you can use
var cams = []; // all cameras devices you can use
var currentMic; // the microphone you are using
var currentCam; // the camera you are using
let volumeAnimation;

var videoProfiles = [
    { label: "480p_1", detail: "640×480, 15fps, 500Kbps", value: "480p_1" },
    { label: "480p_2", detail: "640×480, 30fps, 1000Kbps", value: "480p_2" },
    { label: "720p_1", detail: "1280×720, 15fps, 1130Kbps", value: "720p_1" },
    { label: "720p_2", detail: "1280×720, 30fps, 2000Kbps", value: "720p_2" },
    { label: "1080p_1", detail: "1920×1080, 15fps, 2080Kbps", value: "1080p_1" },
    { label: "1080p_2", detail: "1920×1080, 30fps, 3000Kbps", value: "1080p_2" },
    { label: "200×640", detail: "200×640, 30fps", value: { width: 200, height: 640, frameRate: 30 } } // custom video profile
]

var curVideoProfile;

// Agora client options
var options = {
    appid: "",
    channel: "", //webId
    uid: 0,
    lhid: 0,
    token: "",
    role: "host"
};

function initOptions(channel, uid, lhid, token) {
    options.channel = channel;
    options.uid = uid;
    options.lhid = lhid;
    options.token = token;
}

$(async() => {
    var browerSupport = AgoraRTC.checkSystemRequirements();
    if (browerSupport) {
        client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
        //screenShareClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    } else {
        alert("The Brower is not support live!");
        return;
    }
    initVideoProfiles();
})

function updateLiveStatus(webId, lhid, status) {
    var url = "/live/host/" + webId;
    var data = {
        a: "UPDATE_STATUS",
        lhid: lhid,
        status: status
    };
    $.post(url, data, async function(json) {
        if (json.success) {
            console.info("update live status success!");
        } else {
            console.error("update live status fail!");
        }
    });
}

function createLiveHistory(webId) {
    var url = "/live/host/" + webId;
    var data = {
        a: "CREATE_HISTORY"
    };
    $.post(url, data, async function(json) {
        if (json.success) {
            var token = json.token;
            var uid = json.uid;
            var lhid = json.lhid;
            initOptions(webId, uid, lhid, token);
            $("#btn-start-live").attr("disabled", true);
            try {
                await startLive();
                updateLiveStatus(webId, lhid, "LIVING");
                //volumeAnimation = requestAnimationFrame(setVolumeWave);
            } catch (error) {
                console.error('start live failed!');
                console.error(error);
                leaveLive();
                var errorCode = error.code;
                var errMsg = "开启直播失败,";
                if (errorCode === 'DEVICE_NOT_FOUND') {
                    errMsg += "未找到摄像头或麦克风设备!";
                }
                errMsg += "\n详细错误信息\n" + error;
                alert(errMsg);
            } finally {
                $("#btn-stop-live").attr("disabled", false);
                //$("#enable-beauty").attr("disabled", false);
                //$("#disable-beauty").attr("disabled", true);
            }
        } else {
            var errorId = json.errorId;
            if (errorId != null && errorId != undefined) {
                $("#verification-dialog-" + errorId).modal("show");
            } else {
                $("#notice_content").html("创建直播记录失败，请刷新页面再次尝试！");
                $("#notice_dialog").modal('show');
            }
        }
    });
}

$(window).bind('unload', function() {
    console.info("close page!");
    confirm("离开此页面将关闭直播！")
    leaveLive();
    //return '确定离开此页面吗？';
});

$("#btn-start-live").click(async function(e) {
    var webId = $("#webId").val();
    createLiveHistory(webId);
})

$("#btn-stop-live").click(function(e) {
    leaveLive();
    updateLiveStatus(options.channel, options.lhid, "NO_LIVE");
})


async function startLive() {
    // create Agora client
    client.setClientRole(options.role);

    // join the channel
    options.uid = await client.join(options.appid, options.channel, options.token || null, options.uid);

    // create local audio and video tracks
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack({ encoderConfig: curVideoProfile.value });
    localTracks.audioTrack.setVolume(200);
    const level = localTracks.audioTrack.getVolumeLevel();
    console.log("local stream audio level", level);
    // play local video track
    localTracks.videoTrack.play("local-player");
    $("#cover-div").hide();
    $(".player").show();
    //$("#local-player-name").text(`localTrack(${options.uid})`);
    // publish local tracks to channel
    await client.publish([localTracks.audioTrack, localTracks.videoTrack]);
    console.log("publish success");
    client.on("user-left", handleUserLeft);
    client.on("connection-state-change", handleStateChange);
    client.on("token-privilege-will-expire", function() {
        console.log("onTokenPrivilegeWillExpire");
        //进行重新申请 Token 操作后
        //client.renewToken(token);
    });
    client.on("token-privilege-did-expire", function() {
        console.log("onTokenPrivilegeDidExpire");
        $("#verification-dialog-3").modal("show");
        leaveLive();
        //进行重新申请 Token 操作后
        //client.renewToken(token);
    });
    //initStats();
}


async function leaveLive() {
    if (localTracks.audioTrack) {
        localTracks.audioTrack.stop();
        localTracks.audioTrack.close();
        localTracks.audioTrack = undefined;
    }

    if (localTracks.videoTrack) {
        localTracks.videoTrack.stop();
        localTracks.videoTrack.close();
        localTracks.videoTrack = undefined;
    }

    await client.unpublish();
    // leave the channel
    await client.leave();

    //$("#local-player-name").text("");
    $("#btn-start-live").attr("disabled", false);
    $("#btn-stop-live").attr("disabled", true);
    $("#cover-div").show();
    $(".player").hide();
    //destructStats();
    console.log("client leaves channel success");
}

$("#enable-beauty").click(async function(e) {
    // enable beauty effect
    await localTracks.videoTrack.setBeautyEffect(true, { lighteningLevel: 0.5, rednessLevel: 0.5, smoothnessLevel: 0.5 });
    console.log("enable beauty success");
    $("#enable-beauty").attr("disabled", true);
    $("#disable-beauty").attr("disabled", false);
})

$("#disable-beauty").click(async function(e) {
    // disable beauty effect
    await localTracks.videoTrack.setBeautyEffect(false);
    console.log("disable beauty success");
    $("#enable-beauty").attr("disabled", false);
    $("#disable-beauty").attr("disabled", true);
})

function initVideoProfiles() {
    // videoProfiles.forEach(profile => {
    //   $(".profile-list").append(`<a class="dropdown-item" label="${profile.label}" href="#">${profile.label}: ${profile.detail}</a>`)
    // });
    curVideoProfile = videoProfiles[3];
    //$(".profile-input").val(`${curVideoProfile.detail}`);
}

async function changeVideoProfile(label) {
    curVideoProfile = videoProfiles.find(profile => profile.label === label);
    $(".profile-input").val(`${curVideoProfile.detail}`);
    // change the local video track`s encoder configuration
    localTracks.videoTrack && await localTracks.videoTrack.setEncoderConfiguration(curVideoProfile.value);
}

async function switchCamera(label) {
    currentCam = cams.find(cam => cam.label === label);
    $(".cam-input").val(currentCam.label);
    // switch device of local video track.
    await localTracks.videoTrack.setDevice(currentCam.deviceId);
}

async function switchMicrophone(label) {
    currentMic = mics.find(mic => mic.label === label);
    $(".mic-input").val(currentMic.label);
    // switch device of local audio track.
    await localTracks.audioTrack.setDevice(currentMic.deviceId);
}

// show real-time volume while adjusting device. 
function setVolumeWave() {
    if (localTracks.audioTrack !== null && localTracks.audioTrack !== undefined) {
        volumeAnimation = requestAnimationFrame(setVolumeWave);
        $(".progress-bar").css("width", localTracks.audioTrack.getVolumeLevel() * 100 + "%")
        $(".progress-bar").attr("aria-valuenow", localTracks.audioTrack.getVolumeLevel() * 100)
    }
}

async function listMediaDevice() {
    // get mics
    mics = await AgoraRTC.getMicrophones();
    if (mics.length === 0) {
        console.error("No Microphones!");
        return;
    }
    currentMic = mics[0];
    $(".mic-input").val(currentMic.label);
    mics.forEach(mic => {
        $(".mic-list").append(`<a class="dropdown-item" href="#">${mic.label}</a>`);
    });

    // get cameras
    cams = await AgoraRTC.getCameras();
    if (cams.length === 0) {
        console.error("No Cameras!");
        return;
    }
    currentCam = cams[0];
    $(".cam-input").val(currentCam.label);
    cams.forEach(cam => {
        $(".cam-list").append(`<a class="dropdown-item" href="#">${cam.label}</a>`);
    });
}


function handleStateChange(curState, revState, reason) {
    console.log("handleStateChange");
    console.log("curState:" + curState + ";revState:" + revState);
    console.log("reason:" + reason);
}

function handleUserLeft(user, reason) {
    console.log("handleUserLeft");
    const id = user.uid;
    console.log(`Left uid:${id} The reason is ${reason}`);
}


function checkNetworkQuality() {
    client.on("network-quality", (stats) => {
        /*基于下行发送码率、下行丢包率、平均往返时延和网络抖动计算。
        • 0：质量未知。
        • 1：质量极好。
        • 2：用户主观感觉和极好差不多，但码率可能略低于极好。
        • 3：用户主观感受有瑕疵但不影响沟通。
        • 4：勉强能沟通但不顺畅。
        • 5：网络质量非常差，基本不能沟通。
        • 6: 网络连接断开，完全无法沟通。*/

        console.log("downlinkNetworkQuality:" + stats.downlinkNetworkQuality);
        console.log("uplinkNetworkQuality:" + stats.uplinkNetworkQuality);
    });
}