!function(r,t){function i(t,i){this.index=t,this.data=i,this.tag="play",this.aduio=new Audio;var a=this.data[this.index];this.aduio.src=a.audio,this.rot=0}i.prototype.turn=function(){var t,i=this,a=i.rot;clearInterval(this.timer);var o=i.aduio.duration;this.timer=setInterval(function(){a+=2,r(".image").addClass("playing"),r(".image").css("transform","rotateZ("+a+"deg"),t=i.aduio.currentTime,i.rot=a,t==o&&clearInterval(i.timer)},500)},i.prototype.play=function(){this.tag="pause",this.aduio.play(),this.turn()},i.prototype.pause=function(){this.aduio.pause(),this.tag="play",clearInterval(this.timer)},i.prototype.load=function(t,i){var a=i[t].audio;this.aduio.src=a,this.aduio.load(),this.rot=0,r(".image").removeClass("playing"),r(".image").css("transform","rotateZ(0deg")},i.prototype.cont=function(t){this.aduio.currentTime=t,this.aduio.play()},t.Setaduio=i}(window.Zepto,window.player||(window.player={}));