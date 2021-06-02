// create Agora client
var client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

var remoteUsers = {};
// Agora client options
var options = {
  appid: "801622c1066b4b37a385d42aa8f11032",
  channel: "",
  uid: null,
  token: "",
  role: "audience"
};

function initOptions(channel, token) {
  options.channel = channel;
  options.token = token;
}

$("#btn-leave").click(function (e) {
  leave();
})

async function join() {
  // create Agora client
  client.setClientRole(options.role);

  // join the channel
  options.uid = await client.join(options.appid, options.channel, options.token || null);
  console.log("audience uid:" + options.uid);
  // add event listener to play remote tracks when remote user publishs.
  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);
  //直播场景下，该回调提示有主播加入了频道，并返回该主播的 ID。如果在加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调
  client.on("user-joined", handleUserJoined);
  //Left无法触发，只有主播角色才可以？
  client.on("user-left", handleUserLeft);
  //对于观众端无效
  client.on("connection-state-change", handleStateChange);

  client.on("token-privilege-did-expire", function(){
    console.log("onTokenPrivilegeWillExpire");
    //进行重新申请 Token 操作后
    //client.renewToken(token);
  });
  client.on("token-privilege-did-expire", function(){
    console.log("onTokenPrivilegeDidExpire");
    //进行重新申请 Token 操作后
    //client.renewToken(token);
  });
  //initStats();
}

function handleStateChange(curState, revState, reason) {
  console.log("handleStateChange");
  console.log("curState:" + curState + ";revState:" + revState);
  console.log("reason:" + reason);
}

function handleUserJoined(user) {
  const id = user.uid;
  console.log("handleUserJoined:" + id);
}

function handleUserLeft(user, reason) {
  console.log("handleUserLeft");
  const id = user.uid;
  console.log(`Left uid:${id} The reason is ${reason}`);
}

function handleUserPublished(user, mediaType) {
  console.log("handleUserPublished");
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
  $("#cover-div").hide();
  //controls="controls"

  //$("#live-status").html("Living...");
}

function handleUserUnpublished(user) {
  console.log("handleUserUnpublished");
  const id = user.uid;
  delete remoteUsers[id];
  $(`#player-wrapper-${id}`).remove();
  $("#cover-div").show();
  //$("#live-status").html("No Live");
}

async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await client.subscribe(user, mediaType);
  console.log("subscribe success");
  if (mediaType === 'video') {
    const player = $(`
      <div id="player-wrapper-${uid}">
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
    $("#remote-playerlist").append(player);
    user.videoTrack.play(`player-${uid}`);
    $(".agora_video_player").attr("controls", true);
    $(".player").show();
  }
  if (mediaType === 'audio') {
    user.audioTrack.play();
  }
}


async function leave() {
  // remove remote users and player views
  remoteUsers = {};
  $("#remote-playerlist").html("");

  // leave the channel
  await client.leave();

  //$("#local-player-name").text("");
  //$("#btn-look").attr("disabled", false);
  //$("#btn-leave").attr("disabled", true);

  //destructStats();
  console.log("client leaves channel success");
}


// start collect and show stats information
function initStats() {
  statsInterval = setInterval(flushStats, 1000);
}

// stop collect and show stats information
function destructStats() {
  clearInterval(statsInterval);
  $("#client-stats").html("");
  $("#remote-stats").html("");
}

//获取状态统计信息：
function flushStats() {
  // get the client stats message
  const clientStats = client.getRTCStats();
  const clientStatsList = [
    { description: "Number of users in channel", value: clientStats.UserCount, unit: "" },
    { description: "Duration in channel", value: clientStats.Duration, unit: "s" },
    { description: "Bit rate receiving", value:clientStats.RecvBitrate, unit: "bps" },
    { description: "Bit rate being sent", value:clientStats.SendBitrate, unit: "bps" },
    { description: "Total bytes received", value:clientStats.RecvBytes, unit: "bytes" },
    { description: "Total bytes sent", value:clientStats.SendBytes, unit: "bytes" },
    { description: "Outgoing available bandwidth", value: clientStats.OutgoingAvailableBandwidth.toFixed(3), unit: "kbps" },
    { description: "RTT from SDK to SD-RTN access node", value: clientStats.RTT, unit: "ms" },
  ]
  $("#client-stats").html(`
    ${clientStatsList.map(stat => `<p class="stats-row">${stat.description}: ${stat.value} ${stat.unit}</p>`).join("")}
  `)

  Object.keys(remoteUsers).forEach(uid => {
    // get the remote track stats message
    console.log(`Get Remote States:${uid}`);
    const remoteTracksStats = { video: client.getRemoteVideoStats()[uid], audio: client.getRemoteAudioStats()[uid] };
    const remoteTracksStatsList = [
      { description: "Delay of audio from sending to receiving", value: Number(remoteTracksStats.audio.receiveDelay).toFixed(2), unit: "ms" },
      { description: "Delay of video from sending to receiving", value: Number(remoteTracksStats.video.receiveDelay).toFixed(2), unit: "ms" },
      { description: "Total audio bytes received", value: remoteTracksStats.audio.receiveBytes, unit: "bytes" },
      { description: "Total audio packets received", value: remoteTracksStats.audio.receivePackets, unit: "" },
      { description: "Total audio packets loss", value: remoteTracksStats.audio.receivePacketsLost, unit: "" },
      { description: "Total audio packets loss rate", value: Number(remoteTracksStats.audio.packetLossRate).toFixed(3), unit: "%" },
      { description: "Video received resolution height", value: remoteTracksStats.video.receiveResolutionHeight, unit: "" },
      { description: "Video received resolution width", value: remoteTracksStats.video.receiveResolutionWidth, unit: "" },
      { description: "Receiving video bit rate", value: remoteTracksStats.video.receiveBitrate, unit: "bps" },
      { description: "Total video bytes received", value: remoteTracksStats.video.receiveBytes, unit: "bytes" },
      { description: "Total video packets received", value: remoteTracksStats.video.receivePackets, unit: "" },
      { description: "Total video packets loss", value: remoteTracksStats.video.receivePacketsLost, unit: "" },
      { description: "Total video packets loss rate", value: Number(remoteTracksStats.video.receivePacketsLost).toFixed(3), unit: "%" },
      { description: "Video duration", value: remoteTracksStats.video.totalDuration, unit: "s" },
      { description: "Total video freeze time", value: remoteTracksStats.video.totalFreezeTime, unit: "s" },
      { description: "video freeze rate", value: Number(remoteTracksStats.video.freezeRate).toFixed(3), unit: "%" },
    ];
    $('#remote-stats').html(`
      ${remoteTracksStatsList.map(stat => `<p class="stats-row">${stat.description}: ${stat.value} ${stat.unit}</p>`).join("")}
    `);
  });
}


