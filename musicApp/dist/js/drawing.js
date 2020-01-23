(function ($, root) {
    function drawding(index, data) {
        var data = data[index];
        var islke = data.isLike;
        var img = new Image();
        var src = data.image
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $("body"))
        }
        $(".image img").attr("src", src);
        var str = '<div class="song-name">' + data.song +'</div>'+
                 ' <div class="singer">' + data.singer +' </div>'+
                 ' <div class="sing-type">' + data.album + '</div>';
        $(".song-infor").html(str);
      if(islke){
          $(".like").addClass("liking")
      }else{
        $(".like").removeClass("liking")
      }
    }
    root.drawing = drawding;
})(window.Zepto, window.player || (window.player = {}))