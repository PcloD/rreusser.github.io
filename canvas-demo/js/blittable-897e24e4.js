window.CTK=window.CTK||{};var guid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}();window.CTK.Loader=Class.extend({init:function(){this.waitIds=[],this.completeIds=[]},getCallback:function(){var t=guid();return this.waitIds.push(t),function(){var i=this.waitIds.indexOf(t);i>-1&&(this.completeIds=this.completeIds.concat(this.waitIds.splice(i,1))),0==this.waitIds.length&&(this.onComplete&&this.onComplete(),this.onComplete=null)}.bind(this)},complete:function(t){0==this.waitIds.length?t.apply(this,arguments):this.onComplete=function(){t.apply(this,arguments)}.bind(this)}}),Object.defineProperties(window.CTK.Loader.prototype,{isComplete:{get:function(){return 0==this.waitIds.length}},isWaiting:{get:function(){return this.waitIds.length>0}}}),window.CTK.Blittable=Class.extend({init:function(t,i){return this.options=$.extend({},i),this.events=this.options.events||{},this.options.loader&&(this.loader=this.options.loader,this.loaderCallback=this.loader.getCallback()),this},setEvents:function(){for(ev in this.events)if(this.events.hasOwnProperty(ev)){var t=this.el[ev];this.el[ev]=function(){t&&t(),this.events[ev]()}.bind(this)}return this},draw:function(t,i){var e=t.ctx;return e.drawImage(this.el,0,0),this}}),window.CTK.Image=window.CTK.Blittable.extend({init:function(t,i){return void 0!==t?(this._super.apply(this,arguments),this.el=document.createElement("img"),this.el.onload=function(){this.width=this.el.width,this.height=this.el.height,this.loaderCallback&&this.loaderCallback()}.bind(this),this.setEvents(),this.el.src=t,this):void 0},draw:function(t){var i=t.ctx;i.drawImage(this.el,0,0)}}),window.CTK.Video=window.CTK.Blittable.extend({init:function(t,i){function e(t,i,e){var n=document.createElement("source");n.src=i,n.type=e,t.appendChild(n)}return this.el=document.createElement("video"),this.el.loop=!0,this.el.autoplay=!0,this.el.oncanplay=function(){this.width=this.el.videoWidth,this.height=this.el.videoHeight,this.loaderCallback&&this.loaderCallback()}.bind(this),this.setEvents(),e(this.el,i.mp4url,"video/mp4"),e(this.el,i.ogvurl,"video/ogg"),this},play:function(){this.el.paused&&this.el.play()},pause:function(){this.el.paused||this.el.pause()},draw:function(t){var i=t.ctx;i.drawImage(this.el,0,0)}}),Object.defineProperties(window.CTK.Video.prototype,{playing:{get:function(){return!this.el.paused}}});