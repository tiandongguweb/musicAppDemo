(function($,root){
    function setList(data){
        var str="";
        data.forEach(function(ele) {
            str += '<li class="songlist"><em>'+ele.song+"</em>"+ele.singer+"</li>";
        });
        $(".song-list-wapper").append(str)
    }
    root.setList = setList;
})(window.Zepto, window.player || (window.player = {}))