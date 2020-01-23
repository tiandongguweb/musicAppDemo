(function ($, root) {
    var allTime, realTime, realTimer, percent = 0, newTime = 0;
    function setTime(time) {
        allTime = time;
        var poi = Math.floor(allTime / 60);
        var sec = allTime - poi * 60;
        var poiEnd = poi >= 10 ? poi : "0" + poi;
        var secEnd = sec >= 10 ? sec : "0" + sec;
        var str = poiEnd + ":" + secEnd;
        $(".over.time").html(str);
    }
    function startTime(vale) {
        vale == undefined?newTime = percent:newTime = vale;
        var nowTime = new Date().getTime();
        cancelAnimationFrame(realTimer);
        function RealTime() {
            realTime = new Date().getTime();
            percent = newTime + (realTime - nowTime) / (allTime * 1000);
            if (percent >= 1) {
                cancelAnimationFrame(realTimer);
            } else {
                realTimer = requestAnimationFrame(RealTime);
                update(percent);
            }
        }
        RealTime();
    }
    function update(percent) {
        var width = $(".art.top").width();
        var nowTime = Math.round(percent * allTime);
        var data =(percent - 1) * 100;
        $(".art.top").css({
            transform:"translateX(" + data +"%)",
        })
        startTime = nowTime;
        var poi = Math.floor(startTime / 60);
        var sec = startTime - poi * 60;
        var poiEnd = poi >= 10 ? poi : "0" + poi;
        var secEnd = sec >= 10 ? sec : "0" + sec;
        var str = poiEnd + ":" + secEnd;
        $(".start.time").html(str);
    }
    function stopTime() {
        newTime = percent;
        cancelAnimationFrame(realTimer)
    }
    root.stopTime = stopTime;
    root.setTime = setTime;
    root.startTime = startTime;
    root.update = update;
})(window.Zepto, window.player || (window.player = {}))