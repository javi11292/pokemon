(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{107:function(e,n,t){"use strict";t.r(n),t.d(n,"getEvents",(function(){return l}));var r=t(38),a=t.n(r),o=t(110),i=t(40),s=t(109),u=t(7),c=Object(s.a)("PalletTown");function l(e){function n(n){return new Promise((function(t){e.setMessage({value:n,callback:t})}))}return{meetOak:function(){return Object(i.a)(a.a.mark((function t(){var r,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.getItem("meetOak");case 2:if(!t.sent){t.next=4;break}return t.abrupt("return");case 4:return r=e.characters[u.a.OAK],i=e.player,e.enableControls=!1,t.next=9,n("\xa1Eh t\xfa, espera!");case 9:return i.still("down"),r.position.x=9*u.c,r.position.y=7*u.c,r.properties=Object(o.a)({},r.properties,{visible:!0}),r.walk("up"),r.event=function(){return 3===r.nextTile.y},t.next=17,r.event;case 17:return r.walk("right"),r.event=function(){return r.nextTile.x===i.position.x/u.c},t.next=21,r.event;case 21:return r.still("up"),t.next=24,n("\n      No puedes irte por ah\xed a lo loco sin un pokemon, \xbfes que no has visto la noticia del ni\xf1o que muri\xf3 incinerado por un charmander?\n      \xbfY la se\xf1ora que estaba recogiendo la ropa tendida felizmente cuando vino un magikarp y se la chapote\xf3 entera? S\xedgueme anda, que te doy uno.\n      ");case 24:e.enableControls=!0,c.setItem("meetOak",!0);case 26:case"end":return t.stop()}}),t)})))()}}}}}]);
//# sourceMappingURL=0.b94cc492.chunk.js.map