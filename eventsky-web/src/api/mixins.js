export const MixIns = {
    data() {
        return {
            //屏幕高度
            clientHeight: '',
        }
    },
    methods: {

    },
    mounted() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
        let that = this
        window.onresize = function() {
            that.clientHeight = `${document.documentElement.clientHeight}`;
            if (that.$refs.page) {
                that.$refs.page.style.minHeight = that.clientHeight + 'px';
            }
        }
    },
    created() {

    },
    watch: {
        clientHeight(clientHeight) {
            this.$refs.page.style.minHeight = clientHeight + 'px';
        }
    }
}