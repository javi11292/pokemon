(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{109:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return l}));var a=n(114),r=n.n(a),i=n(7),o=r.a.createInstance({name:i.a.PLAYER});function l(t){return r.a.createInstance({name:"events",storeName:t})}},129:function(t,e,n){t.exports=n.p+"static/media/characters.111f6faf.png"},130:function(t,e,n){t.exports=n.p+"static/media/world.74af39e9.png"},131:function(t){t.exports=JSON.parse('{"columns":38,"image":"../world.png","imageheight":656,"imagewidth":608,"margin":0,"name":"world","spacing":0,"tilecount":1558,"tiledversion":"1.3.3","tileheight":16,"tiles":[{"id":0,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":2,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":38,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":40,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":231,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":646,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":656,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":690,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":804,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":842,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":1064,"properties":[{"name":"collision","type":"bool","value":false}]},{"id":1102,"properties":[{"name":"collision","type":"bool","value":false}]}],"tilewidth":16,"type":"tileset","version":1.2}')},132:function(t,e,n){var a={"./PalletTown":[107,9,0],"./PalletTown/":[107,9,0],"./PalletTown/index":[107,9,0],"./PalletTown/index.js":[107,9,0],"./welcome.txt":[77,7,1]};function r(t){if(!n.o(a,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=a[t],r=e[0];return n.e(e[2]).then((function(){return n.t(r,e[1])}))}r.keys=function(){return Object.keys(a)},r.id=132,t.exports=r},133:function(t,e,n){var a={"./PalletTown.json":[134,7],"./PalletTownRooms.json":[135,8]};function r(t){if(!n.o(a,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=a[t],r=e[0];return n.e(e[1]).then((function(){return n.t(r,3)}))}r.keys=function(){return Object.keys(a)},r.id=133,t.exports=r},136:function(t,e,n){"use strict";n.r(e),n.d(e,"createGame",(function(){return F}));var a=n(38),r=n.n(a),i=n(40),o=n(111),l=n(7),s=n(109),c=n(42),u=n(14),p=n(110),f=n(115),d=n(114),x=n.n(d),w=n(129),m=n.n(w),h="still",y="walk";function v(t,e,n,a,r){return b.apply(this,arguments)}function b(){return(b=Object(i.a)(r.a.mark((function t(e,n,a,i,s){var u,p,f,d,w,m,v,b,k,j,D,S,M,N,E,P;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(M=function(){var t=new o.g(U.characters.texture,R(n));t.parse((function(){f.textures.stillDown=[t.textures["stillDown"+n]],f.textures.stillUp=[t.textures["stillUp"+n]],f.textures.stillLeft=[t.textures["stillLeft"+n]],f.textures.stillRight=[t.textures["stillRight"+n]],f.textures.walkDown=T(t,"walkDown"),f.textures.walkUp=T(t,"walkUp"),f.textures.walkLeft=T(t,"walkLeft"),f.textures.walkRight=T(t,"walkRight");var e=new o.a(f.textures[f.state+Object(c.b)(f.direction)]);f.sprite=e,e.width=l.c,e.height=l.c,e.animationSpeed=.1,e.x=i,e.y=s,a.addChild(e)}))},S=function(){if(f.sprite){var t=f.textures[f.state+Object(c.b)(f.direction)];t&&f.sprite.textures!==t&&(f.sprite.textures=t,f.sprite.play())}},D=function(){f.nextDirection&&(f.direction=f.nextDirection,f.nextDirection=null),f.nextState&&(f.state=f.nextState,f.nextState=null)},j=function(t,e){if(f.speed[t]){var n=f.speed[t]*l.d;p[t]%l.c||e?p[t]+=n:(f.speed[t]=0,f.updateState())}},k=function(t,e){var n=Math.floor(p.x/l.c+t),a=Math.floor(p.y/l.c+e);if(f.nextTile.x!==n||f.nextTile.y!==a){var r=f.game.world.tileAt(n,a);f.nextTile={x:n,y:a,data:r}}},b=function(){f.sprite.x=p.x,f.sprite.y=p.y},v=function(){var t=f.direction===l.b.RIGHT?1:f.direction===l.b.LEFT?-1:0,e=f.direction===l.b.DOWN?1:f.direction===l.b.UP?-1:0;f.state!==y||f.speed.x||f.speed.y||k(t,e),N&&N.check()&&(N=null),f.state!==y||f.speed.x||f.speed.y||!1!==f.nextTile.data.collision?f.speed.x||f.speed.y?j(f.speed.x?"x":"y"):D():(f.speed.x=t,f.speed.y=e,j(f.speed.x?"x":"y",!0)),S(),f.postUpdate()},m=function(t){w(t),f.nextState=y},w=function(t){f.nextDirection=t},d=function(t){f.nextState=h,t&&(f.nextDirection=t)},U||L){t.next=14;break}return t.next=13,g();case 13:L=t.sent;case 14:return u=x.a.createInstance({name:n}),t.next=17,O(u,i,s);case 17:return p=t.sent,t.t0=u,t.t1=e,t.t2=d,t.t3=w,t.t4=m,t.t5=D,t.t6=b,t.t7=function(){},t.t8=h,t.t9=l.b.DOWN,t.t10={x:0,y:0},t.t11={stillDown:[],stillUp:[],stillLeft:[],stillRight:[],walkDown:[],walkUp:[],walkLeft:[],walkRight:[]},f={database:t.t0,game:t.t1,still:t.t2,face:t.t3,walk:t.t4,updateState:t.t5,get properties(){return P},set properties(t){u.setItem("properties",t),P=t,f.sprite.visible=!1!==P.visible},postUpdate:t.t6,onNextTileUpdate:t.t7,get event(){return N.promise},set event(t){N=I(t)},sprite:null,state:t.t8,direction:t.t9,speed:t.t10,nextDirection:null,nextState:null,get nextTile(){return E},set nextTile(t){E=t,f.onNextTileUpdate(t)},get position(){return p},set position(t){p.x=t.x,p.y=t.y},textures:t.t11},N=null,E={data:{}},t.next=35,u.getItem("properties");case 35:if(t.t12=t.sent,t.t12){t.next=38;break}t.t12={};case 38:return P=t.t12,M(),f.game.app.ticker.add(v),t.abrupt("return",f);case 42:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(){return k.apply(this,arguments)}function k(){return(k=Object(i.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){(new o.e).add("characters",m.a).load((function(e,n){U=n,t()}))})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(t,e,n){return j.apply(this,arguments)}function j(){return(j=Object(i.a)(r.a.mark((function t(e,n,a){var i,o,l,s,c,u;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getItem("position");case 2:return l=t.sent,s=null!==(i=null===l||void 0===l?void 0:l.x)&&void 0!==i?i:n,c=null!==(o=null===l||void 0===l?void 0:l.y)&&void 0!==o?o:a,u={get x(){return s},set x(t){s=t,e.setItem("position",Object(p.a)({},u,{x:s}))},get y(){return c},set y(t){c=t,e.setItem("position",Object(p.a)({},u,{y:c}))}},t.abrupt("return",u);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function T(t,e){return t.data.animations[e].map((function(e){var n,a=t.textures[e];return a.rotate=null!==(n=t.data.frames[e].rotate)&&void 0!==n?n:a.rotate,a}))}function R(t){var e;return{meta:{},frames:(e={},Object(f.a)(e,"stillDown"+t,{frame:D(t)}),Object(f.a)(e,"stillUp"+t,{frame:D(t+1)}),Object(f.a)(e,"stillLeft"+t,{frame:D(t+2)}),Object(f.a)(e,"stillRight"+t,Object(f.a)({frame:D(t+2)},"rotate",o.i.MIRROR_HORIZONTAL)),Object(f.a)(e,"walkDown0"+t,{frame:D(t+3)}),Object(f.a)(e,"walkDown1"+t,Object(f.a)({frame:D(t+3)},"rotate",o.i.MIRROR_HORIZONTAL)),Object(f.a)(e,"walkUp0"+t,{frame:D(t+4)}),Object(f.a)(e,"walkUp1"+t,Object(f.a)({frame:D(t+4)},"rotate",o.i.MIRROR_HORIZONTAL)),Object(f.a)(e,"walkLeft"+t,{frame:D(t+5)}),Object(f.a)(e,"walkRight"+t,Object(f.a)({frame:D(t+5)},"rotate",o.i.MIRROR_HORIZONTAL)),e),animations:{walkDown:["walkDown0"+t,"stillDown"+t,"walkDown1"+t,"stillDown"+t],walkUp:["walkUp0"+t,"stillUp"+t,"walkUp1"+t,"stillUp"+t],walkLeft:["walkLeft"+t,"stillLeft"+t],walkRight:["walkRight"+t,"stillRight"+t]}}}function D(t){return{x:t%8*16,y:16*Math.floor(t/8),w:16,h:16}}function I(t){var e=null;return{check:function(){if(t())return e(),!0},promise:new Promise((function(t){e=t}))}}var U=null,L=null;function S(t){return M.apply(this,arguments)}function M(){return(M=Object(i.a)(r.a.mark((function t(e){var n,a,i,o,s,c,p,f,d,x,w;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=function(t){var n=t.data;n.event&&e.world.events[n.event]()},s=function(){x();var t=n.nextTile.data;if(t.location||t.layer){var a=t.position.split(","),r=Object(u.a)(a,2),i=r[0],o=r[1];e.world.setLocation(t.location,t.layer,{x:i*l.c,y:o*l.c})}},o=function(t){n.direction!==t&&n.state!==y?i(t):p(t)},i=function(t){f(t),w=setTimeout((function(){return o(t)}),50)},a=function(t){d(t),clearTimeout(w)},t.next=7,v(e,l.a.PLAYER,e.app.stage,e.app.screen.width/2-l.c/2,e.app.screen.height/2-l.c/2);case 7:return n=t.sent,p=n.walk,f=n.face,d=n.still,x=n.updateState,n.still=a,n.face=i,n.walk=o,n.updateState=s,n.postUpdate=function(){},n.onNextTileUpdate=c,w=null,t.abrupt("return",n);case 17:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N=n(130),E=n.n(N),P=n(131);function C(t){return A.apply(this,arguments)}function A(){return(A=Object(i.a)(r.a.mark((function t(e){var a,c,u,f,d,x,w,m,h,y,b,g;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y=function(t){var e=t.item,n=t.tilesets,o=t.locationTiles,s=t.locationCharacters,c=t.locationMap,u=t.promises,f=a.data,d=f.tileSize,x=f.columns;e.objects.forEach(function(){var t=Object(i.a)(r.a.mark((function t(e){var i,f,w,m,h,y,b,g,k,O;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.gid,n[1]&&!(i<n[1].firstgid)){t.next=11;break}f=i-n[0].firstgid,w=f%x*d,m=Math.floor(f/x)*d,h=e.x/d,y=e.y/d-1,o["".concat(h,"-").concat(y)]=Object(p.a)({},a.data.tiles[f]||{},{},e.properties.reduce(z,{})),H({texture:a.texture,map:c,tileX:w,tileY:m,x:h,y:y,tileSize:d}),t.next=20;break;case 11:return b=i-n[1].firstgid,g=v(a.game,b,c,l.c*e.x/d,l.c*(e.y/d-1)),u.push(g),k=e.properties?e.properties.reduce(z,{}):{},t.next=17,g;case 17:(O=t.sent).properties=Object(p.a)({},k,{},O.properties),s[b]=O;case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},h=function(t){var e=t.item,n=t.tilesets,r=t.locationTiles,i=t.locationMap,o=t.width,l=a.data,s=l.tileSize,c=l.columns;e.data.forEach((function(t,e){if(t){var l=parseInt(t,10)-n[0].firstgid,u=a.data.tiles[l]||{},p=e%o,f=Math.floor(e/o),d=l%c*s,x=Math.floor(l/c)*s;r["".concat(p,"-").concat(f)]=u,H({texture:a.texture,map:i,tileX:d,tileY:x,x:p,y:f,tileSize:s})}}))},m=function(t,e){return a.tiles[b+g]&&a.tiles[b+g]["".concat(t,"-").concat(e)]||{}},w=function(){return(w=Object(i.a)(r.a.mark((function t(i){var l,s,c,u,p,f,d,x,w,m,v,b,g;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(l=n(132)("./".concat(a.location,"/").concat(a.layer)).catch((function(){return{}})),s=a.location,c=a.layer,u=a.map[s+c],p=a.characters[s+c],u){t.next=21;break}return f={},u=new o.c,p={},t.next=10,n(133)("./".concat(s,".json"));case 10:return d=t.sent,x=d.layers,w=d.tilesets,m=d.width,v=[],x.forEach((function(t){t.name===c&&("tilelayer"===t.type&&h({item:t,tilesets:w,locationTiles:f,locationMap:u,width:m}),"objectgroup"===t.type&&y({item:t,tilesets:w,locationTiles:f,locationCharacters:p,locationMap:u,promises:v}))})),t.next=18,Promise.all(v);case 18:a.map[s+c]=u,a.tiles[s+c]=f,a.characters[s+c]=p;case 21:return t.next=23,l;case 23:b=t.sent,g=b.getEvents,a.events=g?g(e):null,a.camera.removeChildren(),a.camera.addChild(u),a.game.characters=p,i&&(a.game.player.position=i);case 30:case"end":return t.stop()}}),t)})))).apply(this,arguments)},x=function(t){return w.apply(this,arguments)},d=function(){return(d=Object(i.a)(r.a.mark((function t(){var e;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_();case 2:return e=t.sent,a.texture=e,a.data={tileSize:P.tilewidth,columns:P.columns,tiles:P.tiles.reduce((function(t,e){return t[e.id]=e.properties.reduce(z,{}),t}),{})},t.next=7,x();case 7:a.game.enableControls=!0;case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)},f=function(){return d.apply(this,arguments)},u=function(t,e,n){a.location=t||a.location,a.layer=e||"index",s.b.setItem("location",a.location),s.b.setItem("layer",a.layer),x(n)},c=function(){var t,e,n=a.game.player.position;a.camera.pivot.x=-(null===(t=a.game.player.sprite)||void 0===t?void 0:t.x),a.camera.pivot.y=-(null===(e=a.game.player.sprite)||void 0===e?void 0:e.y),a.camera.position.x=-n.x,a.camera.position.y=-n.y},t.t0=e,t.t1=c,t.t2=m,t.t3=u,t.t4=f,t.t5={},t.t6={},t.t7={},t.t8=new o.c,a={game:t.t0,update:t.t1,tileAt:t.t2,setLocation:t.t3,load:t.t4,events:null,get location(){return b},set location(t){b=t,s.b.setItem("location",t)},get layer(){return g},set layer(t){g=t,s.b.setItem("layer",t)},texture:null,data:null,map:t.t5,tiles:t.t6,characters:t.t7,camera:t.t8},e.app.stage.addChildAt(a.camera,0),e.app.ticker.add(c,null,o.h.INTERACTION),b=null,g=null,t.abrupt("return",a);case 24:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function _(){return new Promise((function(t){(new o.e).add("world",E.a).load((function(e,n){t(n.world.texture)}))}))}function H(t){var e=t.texture,n=t.map,a=t.tileX,r=t.tileY,i=t.x,s=t.y,c=t.tileSize,u=new o.d;u.beginTextureFill({texture:e}),u.drawRect(a,r,c,c),u.width=l.c,u.height=l.c,u.x=-a*u.scale.x+i*l.c,u.y=-r*u.scale.y+s*l.c,n.addChild(u)}function z(t,e){return t[e.name]=e.value,t}function F(t){return Y.apply(this,arguments)}function Y(){return(Y=Object(i.a)(r.a.mark((function t(e){var n,a,i,o,u;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=function(t){var e=t.detail;switch(i.enableControls?i.action=e:i.action=null,i.action){case l.b.UP:case l.b.LEFT:case l.b.RIGHT:case l.b.DOWN:i.player.walk(i.action);break;default:i.player.still()}},n=e.view,a=e.setMessage,i={setMessage:a,app:null,action:null,player:null,world:null,characters:{},enableControls:!1},t.next=5,s.b.getItem("position");case 5:return t.t0=t.sent,t.next=8,s.b.getItem("location");case 8:return t.t1=t.sent,t.next=11,s.b.getItem("layer");case 11:return t.t2=t.sent,u={position:t.t0,location:t.t1,layer:t.t2},t.next=15,Z(i,n);case 15:u.position?(i.world.location=u.location,i.world.layer=u.layer):(Object(c.a)("welcome",a),i.player.position={x:3*l.c,y:6*l.c},i.world.location="PalletTownRooms",i.world.layer="house1 f2"),i.world.load(),window.addEventListener("action",o);case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Z(t,e){return G.apply(this,arguments)}function G(){return(G=Object(i.a)(r.a.mark((function t(e,n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o.k.skipHello(),o.j.SCALE_MODE=o.f.NEAREST,e.app=new o.b({view:n,width:1920,height:1080}),e.app.renderer.plugins.accessibility.destroy(),delete e.app.renderer.plugins.accesibility,t.next=7,S(e);case 7:return e.player=t.sent,t.next=10,C(e);case 10:e.world=t.sent;case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=6.80977a84.chunk.js.map