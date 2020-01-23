(function ($, root) {
    function Setaduio(index, data) {
        this.index = index;
        this.data = data;
        this.tag = "play";
        this.aduio = new Audio();
        var thisDta = this.data[this.index]
        this.aduio.src = thisDta.audio;
        this.rot = 0;
    }
    Setaduio.prototype.turn = function () {
        var that = this;
        var rot = that.rot;
        var cur;
        clearInterval(this.timer);
        var dur = that.aduio.duration;
        this.timer = setInterval(function () {
            rot += 2;
            $(".image").addClass("playing");
            $(".image").css("transform", "rotateZ(" + rot + "deg");
            cur = that.aduio.currentTime;
            that.rot = rot;
            if (cur == dur) {
                clearInterval(that.timer);
            }
        }, 500)
    }
    Setaduio.prototype.play = function () {
        this.tag = "pause";
        this.aduio.play();
        this.turn();

    }
    Setaduio.prototype.pause = function () {
        this.aduio.pause();
        this.tag = "play";
        clearInterval(this.timer);
    }
    Setaduio.prototype.load = function (index, data) {
        var src = data[index].audio
        this.aduio.src = src;
        this.aduio.load();
        this.rot = 0;
        $(".image").removeClass("playing");
        $(".image").css("transform", "rotateZ(" + 0 + "deg");
    }
    Setaduio.prototype.cont = function (nowTime) {
        this.aduio.currentTime = nowTime;
        this.aduio.play();
    }
    root.Setaduio = Setaduio;
})(window.Zepto, window.player || (window.player = {}))