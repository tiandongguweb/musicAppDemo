var $ = window.Zepto;
var index = 0;
var root = window.player;
var len;
var Setaduio;
var percent;
function init() {
    getDate();
}
init();
function getDate() {
    $.ajax({
        type: "GET",
        url: "../mock/data.json",
        success: function (data) {
            console.log(data)
            root.drawing(index, data)
            root.setList(data);
            root.setTime(data[index].duration)
            len = data.length - 1;
            Setaduio = new root.Setaduio(index, data);
            replace(len, data)
            aduioClik();
            startList(data);
            touch(data);
        },
        error: function () {
            console.log("error")
        }
    })
}
function replace(len, data) {
    $(".pre").on("click", function () {
        if (index == 0) {
            index = len;
        } else {
            index--;
        }
        root.setTime(data[index].duration)
        root.drawing(index, data)
        Setaduio.load(index, data);
        root.update(0);
        root.startTime(0);
        if (Setaduio.tag == "pause") {
            Setaduio.play();
            root.startTime(0);
        } else {
            Setaduio.pause();
        }
    })
    $(".next").on("click", function () {
        if (index == len) {
            index = 0;
        } else {
            index++
        }
        root.setTime(data[index].duration)
        root.drawing(index, data);
        Setaduio.load(index, data);
        root.startTime(0);
        root.update(0);
        if (Setaduio.tag == "pause") {
            Setaduio.play();
            root.startTime(0);
        } else {
            Setaduio.pause();
            root.stopTime();
        }
    })
}
function aduioClik() {
    $(".play").on("click", function () {
        if (Setaduio.tag == "play") {
            $(".play ").addClass("playing");
            Setaduio.play();
            root.startTime();
        } else {
            Setaduio.pause();
            $(".play").removeClass("playing");
            root.stopTime()
        }
    })
}
function startList(data) {
    $(".song").on("click", function () {
        $(".song-list-wapper").css({
            display: "block",
        })
    })
    $(".shut").on("click", function () {
        $(".song-list-wapper").css({
            display: "none",
        })
        Setaduio.pause();
        root.stopTime()
    })
    $(".song-list-wapper .songlist").on("click", function () {
        var listIndex = $(this).index() - 1;
        index = listIndex;
        root.drawing(listIndex, data);
        Setaduio.load(listIndex, data);
        Setaduio.play();
        root.startTime(0);
    })
}
function touch(data) {
    var offset = $(".art.top").offset();
    var width = offset.width;
    var left = offset.left;
    var x = left + width;
    $(".org").on("touchstart", function (e) {
        root.stopTime();
        Setaduio.pause();
    }).on("touchmove", function (e) {
        var modX = e.changedTouches[0].clientX;
        percent = (modX - x) / width;
        if (percent < 0 || percent > 1) {
            percent = 0
        }
        root.update(percent);
    }).on("touchend", function (e) {
        var nowTime = data[index].duration*percent;
        if (Setaduio.tag == "play") {
            Setaduio.cont(nowTime);
            $(".play ").addClass("playing");
            Setaduio.play();
            root.startTime(percent);
        } else {
            Setaduio.pause();
            $(".play").removeClass("playing");
            root.stopTime()
        }
       
    })
}