(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"getEvents",(function(){return o}));var r=n(38),a=n.n(r),i=n(40),s=n(109),c=n(7),u=Object(s.a)("PalletTown");function o(e){function t(t){return new Promise((function(n){e.setMessage({value:t,callback:n})}))}return{meetOak:function(){return Object(i.a)(a.a.mark((function n(){var r;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.getItem("meetOak");case 2:if(!n.sent){n.next=4;break}return n.abrupt("return");case 4:return n.next=6,t("\xa1Eh tu, espera!");case 6:return(r=e.characters[c.a.OAK]).position.x=9*c.c,r.position.y=7*c.c,r.sprite.visible=!0,r.walk("up"),r.event=function(){return 3===r.nextTile.y},n.next=14,r.event.promise;case 14:return r.walk("right"),r.event=function(){return r.nextTile.x===r.game.player.position.x/c.c},n.next=18,r.event.promise;case 18:return r.walk("up"),r.event=function(){return 2===r.nextTile.y},n.next=22,r.event.promise;case 22:r.still(),u.setItem("meetOak",!0);case 24:case"end":return n.stop()}}),n)})))()}}}}}]);
//# sourceMappingURL=0.810e55dd.chunk.js.map