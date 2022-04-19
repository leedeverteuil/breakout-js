import{S as Z,i as J,s as Y,e as _,c as m,a as g,d as u,b,g as R,J as f,K as B,L as ft,M as kt,N as It,t as P,h as O,w as W,k as C,x as A,m as S,O as z,y as D,P as st,Q as ct,q as k,o as E,B as X,R as Pt,T as Ot,U as Rt,V as mt,W as Lt,X as Et,Y as Ht,n as nt,p as at,j as ut,Z as rt,_ as tt,$ as lt,l as gt,a0 as Nt,a1 as Ct,r as St,D as it}from"../chunks/vendor-3c108218.js";function Bt(r){let t,s;return{c(){t=_("div"),s=_("canvas"),this.h()},l(e){t=m(e,"DIV",{class:!0});var i=g(t);s=m(i,"CANVAS",{class:!0,width:!0,height:!0}),g(s).forEach(u),i.forEach(u),this.h()},h(){b(s,"class","border border-gray-800 bg-black rounded-lg"),b(s,"width","500"),b(s,"height","400"),b(t,"class","flex flex-col justify-center")},m(e,i){R(e,t,i),f(t,s),r[1](s)},p:B,i:B,o:B,d(e){e&&u(t),r[1](null)}}}function Mt(r,t,s){let e=ft("game");function i(a){kt[a?"unshift":"push"](()=>{e.canvas=a,s(0,e)})}return[e,i]}class Gt extends Z{constructor(t){super();J(this,t,Mt,Bt,Y,{})}}const Tt=[{rows:["________","_121121_","_112211_","_211112_"]},{rows:["________","_#1331#_","__1331__","__#11#__","__2222__","__1221__","________"]},{rows:["23_##_32","32_##_23","32_##_23","21_##_12","11_##_11","12_##_21","12_##_21"]},{rows:["________","23####32","12233221","#12__21#","1#1__1#1","11#__#11","________"]},{rows:["________","11111111","11111111","11111111","111#_#11","222#_#22","333#_#33","333#_#33","####_###","________"]}];function Ft(r,t,s){const e=r.slice();return e[6]=t[s],e[8]=s,e}function Wt(r){let t,s,e=r[8]+1+"",i,a;return{c(){t=_("option"),s=P("Level "),i=P(e),this.h()},l(n){t=m(n,"OPTION",{});var o=g(t);s=O(o,"Level "),i=O(o,e),o.forEach(u),this.h()},h(){t.__value=a=r[8],t.value=t.__value},m(n,o){R(n,t,o),f(t,s),f(t,i)},p:B,d(n){n&&u(t)}}}function At(r){let t,s,e,i,a,n,o,h,l,c,d,y,w,M,p,$,T,U,Q;i=new It({});let j=Tt,L=[];for(let v=0;v<j.length;v+=1)L[v]=Wt(Ft(r,j,v));return{c(){t=_("div"),s=_("button"),e=P(`Restart
    `),W(i.$$.fragment),a=C(),n=_("select");for(let v=0;v<L.length;v+=1)L[v].c();o=C(),h=_("select"),l=_("option"),c=P("Novice"),d=_("option"),y=P("Adept"),w=_("option"),M=P("Expert"),p=_("option"),$=P("Legendary"),this.h()},l(v){t=m(v,"DIV",{class:!0});var H=g(t);s=m(H,"BUTTON",{class:!0});var F=g(s);e=O(F,`Restart
    `),A(i.$$.fragment,F),F.forEach(u),a=S(H),n=m(H,"SELECT",{class:!0});var N=g(n);for(let V=0;V<L.length;V+=1)L[V].l(N);N.forEach(u),o=S(H),h=m(H,"SELECT",{class:!0});var I=g(h);l=m(I,"OPTION",{});var x=g(l);c=O(x,"Novice"),x.forEach(u),d=m(I,"OPTION",{});var G=g(d);y=O(G,"Adept"),G.forEach(u),w=m(I,"OPTION",{});var q=g(w);M=O(q,"Expert"),q.forEach(u),p=m(I,"OPTION",{});var K=g(p);$=O(K,"Legendary"),K.forEach(u),I.forEach(u),H.forEach(u),this.h()},h(){b(s,"class","flex flex-row gap-1.5 items-center border border-yellow-400 shadow-sm shadow-gray-900 text-yellow-900 bg-yellow-500 px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:scale-105"),b(n,"class","p-2 rounded-lg bg-gray-700 text-gray-50 shadow-lg"),r[0]===void 0&&z(()=>r[3].call(n)),l.__value="novice",l.value=l.__value,d.__value="adept",d.value=d.__value,w.__value="expert",w.value=w.__value,p.__value="legendary",p.value=p.__value,b(h,"class","p-2 rounded-lg bg-gray-700 text-gray-50 shadow-lg"),r[1]===void 0&&z(()=>r[4].call(h)),b(t,"class","flex flew-row gap-4 justify-center mt-5")},m(v,H){R(v,t,H),f(t,s),f(s,e),D(i,s,null),f(t,a),f(t,n);for(let F=0;F<L.length;F+=1)L[F].m(n,null);st(n,r[0]),f(t,o),f(t,h),f(h,l),f(l,c),f(h,d),f(d,y),f(h,w),f(w,M),f(h,p),f(p,$),st(h,r[1]),T=!0,U||(Q=[ct(s,"click",r[2]),ct(n,"change",r[3]),ct(h,"change",r[4])],U=!0)},p(v,[H]){H&1&&st(n,v[0]),H&2&&st(h,v[1])},i(v){T||(k(i.$$.fragment,v),T=!0)},o(v){E(i.$$.fragment,v),T=!1},d(v){v&&u(t),X(i),Pt(L,v),U=!1,Ot(Q)}}}function Dt(r,t,s){let e=Rt(),i,a;function n(){e("newgame",{level:i,difficulty:a})}function o(){i=mt(this),s(0,i)}function h(){a=mt(this),s(1,a)}return r.$$.update=()=>{r.$$.dirty&3&&e("newgame",{level:i,difficulty:a})},[i,a,n,o,h]}class Xt extends Z{constructor(t){super();J(this,t,Dt,At,Y,{})}}function vt(r){let t,s,e;return{c(){t=_("span"),s=P(r[0])},l(i){t=m(i,"SPAN",{});var a=g(t);s=O(a,r[0]),a.forEach(u)},m(i,a){R(i,t,a),f(t,s)},p(i,a){a&1&&ut(s,i[0])},i(i){e||z(()=>{e=rt(t,lt,{y:-20}),e.start()})},o:B,d(i){i&&u(t)}}}function bt(r){let t,s,e;return{c(){t=_("span"),s=P(r[1])},l(i){t=m(i,"SPAN",{});var a=g(t);s=O(a,r[1]),a.forEach(u)},m(i,a){R(i,t,a),f(t,s)},p(i,a){a&2&&ut(s,i[1])},i(i){e||z(()=>{e=rt(t,lt,{y:-20}),e.start()})},o:B,d(i){i&&u(t)}}}function jt(r){let t,s,e,i,a,n=r[0],o,h,l,c,d,y=r[1],w,M,p,$,T,U,Q,j,L,v,H,F;i=new Lt({});let N=vt(r);c=new Et({});let I=bt(r);return T=new Ht({}),{c(){t=_("div"),s=_("div"),e=_("p"),W(i.$$.fragment),a=C(),N.c(),h=C(),l=_("p"),W(c.$$.fragment),d=C(),I.c(),w=C(),M=_("div"),p=_("p"),$=_("span"),W(T.$$.fragment),U=P(`
      Click to launch ball`),Q=C(),j=_("p"),L=_("span"),v=P("P"),H=P(`
      Pause`),this.h()},l(x){t=m(x,"DIV",{class:!0});var G=g(t);s=m(G,"DIV",{class:!0});var q=g(s);e=m(q,"P",{class:!0});var K=g(e);A(i.$$.fragment,K),a=S(K),N.l(K),K.forEach(u),h=S(q),l=m(q,"P",{class:!0});var V=g(l);A(c.$$.fragment,V),d=S(V),I.l(V),V.forEach(u),q.forEach(u),w=S(G),M=m(G,"DIV",{class:!0});var et=g(M);p=m(et,"P",{class:!0});var ot=g(p);$=m(ot,"SPAN",{class:!0});var pt=g($);A(T.$$.fragment,pt),pt.forEach(u),U=O(ot,`
      Click to launch ball`),ot.forEach(u),Q=S(et),j=m(et,"P",{class:!0});var ht=g(j);L=m(ht,"SPAN",{class:!0});var _t=g(L);v=O(_t,"P"),_t.forEach(u),H=O(ht,`
      Pause`),ht.forEach(u),et.forEach(u),G.forEach(u),this.h()},h(){b(e,"class","flex flex-row gap-2 items-center rounded-lg p-3 bg-red-600 text-gray-100"),b(l,"class","flex flex-row gap-2 items-center rounded-lg p-3 bg-black text-gray-100"),b(s,"class","flex flex-row gap-2"),b($,"class","key-icon svelte-1jjm1gq"),b(p,"class","key-label svelte-1jjm1gq"),b(L,"class","key-icon svelte-1jjm1gq"),b(j,"class","key-label svelte-1jjm1gq"),b(M,"class","flex flex-row gap-6 items-center"),b(t,"class","mb-2 flex flex-row justify-between items-center gap-2")},m(x,G){R(x,t,G),f(t,s),f(s,e),D(i,e,null),f(e,a),N.m(e,null),f(s,h),f(s,l),D(c,l,null),f(l,d),I.m(l,null),f(t,w),f(t,M),f(M,p),f(p,$),D(T,$,null),f(p,U),f(M,Q),f(M,j),f(j,L),f(L,v),f(j,H),F=!0},p(x,[G]){G&1&&Y(n,n=x[0])?(nt(),E(N,1,1,B),at(),N=vt(x),N.c(),k(N),N.m(e,null)):N.p(x,G),G&2&&Y(y,y=x[1])?(nt(),E(I,1,1,B),at(),I=bt(x),I.c(),k(I),I.m(l,null)):I.p(x,G)},i(x){F||(k(i.$$.fragment,x),k(N),o||z(()=>{o=rt(e,lt,{y:-20}),o.start()}),k(c.$$.fragment,x),k(I),k(T.$$.fragment,x),F=!0)},o(x){E(i.$$.fragment,x),E(N),E(c.$$.fragment,x),E(I),E(T.$$.fragment,x),F=!1},d(x){x&&u(t),X(i),N.d(x),X(c),I.d(x),X(T)}}}function Yt(r,t,s){let e,i;const a=ft("game"),n=a.lives;tt(r,n,h=>s(0,e=h));const o=a.points;return tt(r,o,h=>s(1,i=h)),[e,i,n,o]}class Vt extends Z{constructor(t){super();J(this,t,Yt,jt,Y,{})}}function xt(r){let t,s,e,i,a;const n=[qt,Ut],o=[];function h(l,c){return l[1]?0:1}return s=h(r),e=o[s]=n[s](r),{c(){t=_("div"),e.c(),this.h()},l(l){t=m(l,"DIV",{class:!0});var c=g(t);e.l(c),c.forEach(u),this.h()},h(){b(t,"class","text-gray-100 text-3xl font-bold text-center p-3 my-2 rounded-lg")},m(l,c){R(l,t,c),o[s].m(t,null),a=!0},p(l,c){let d=s;s=h(l),s===d?o[s].p(l,c):(nt(),E(o[d],1,1,()=>{o[d]=null}),at(),e=o[s],e?e.p(l,c):(e=o[s]=n[s](l),e.c()),k(e,1),e.m(t,null))},i(l){a||(k(e),i||z(()=>{i=rt(t,lt,{x:200,duration:500}),i.start()}),a=!0)},o(l){E(e),a=!1},d(l){l&&u(t),o[s].d()}}}function Ut(r){let t,s;return{c(){t=_("p"),s=P("Game over!")},l(e){t=m(e,"P",{});var i=g(t);s=O(i,"Game over!"),i.forEach(u)},m(e,i){R(e,t,i),f(t,s)},p:B,i:B,o:B,d(e){e&&u(t)}}}function qt(r){let t,s,e,i,a,n,o,h;return a=new Et({}),{c(){t=_("p"),s=P("Level completed!"),e=C(),i=_("p"),W(a.$$.fragment),n=C(),o=P(r[2]),this.h()},l(l){t=m(l,"P",{});var c=g(t);s=O(c,"Level completed!"),c.forEach(u),e=S(l),i=m(l,"P",{class:!0});var d=g(i);A(a.$$.fragment,d),n=S(d),o=O(d,r[2]),d.forEach(u),this.h()},h(){b(i,"class","flex flex-row items-center justify-center gap-2 text-2xl mt-1")},m(l,c){R(l,t,c),f(t,s),R(l,e,c),R(l,i,c),D(a,i,null),f(i,n),f(i,o),h=!0},p(l,c){(!h||c&4)&&ut(o,l[2])},i(l){h||(k(a.$$.fragment,l),h=!0)},o(l){E(a.$$.fragment,l),h=!1},d(l){l&&u(t),l&&u(e),l&&u(i),X(a)}}}function Kt(r){let t,s,e=r[0]&&xt(r);return{c(){e&&e.c(),t=gt()},l(i){e&&e.l(i),t=gt()},m(i,a){e&&e.m(i,a),R(i,t,a),s=!0},p(i,[a]){i[0]?e?(e.p(i,a),a&1&&k(e,1)):(e=xt(i),e.c(),k(e,1),e.m(t.parentNode,t)):e&&(nt(),E(e,1,1,()=>{e=null}),at())},i(i){s||(k(e),s=!0)},o(i){E(e),s=!1},d(i){e&&e.d(i),i&&u(t)}}}function Zt(r,t,s){let e,i,a;const n=ft("game"),o=n.gameOver,h=n.gameWon,l=n.points;return tt(r,o,c=>s(0,e=c)),tt(r,h,c=>s(1,i=c)),tt(r,l,c=>s(2,a=c)),[e,i,a,o,h,l]}class Jt extends Z{constructor(t){super();J(this,t,Zt,Kt,Y,{})}}let $t=0;class dt{constructor(t,s,e,i,a){this.x=0,this.y=0,this.w=0,this.h=0,this.id=$t.toString(),this.x=t,this.y=s,this.w=e,this.h=i,this.canvas=a,$t++}top(){return this.y}bottom(){return this.y+this.h}left(){return this.x}right(){return this.x+this.w}outOfBoundsX(){return this.canvas&&(this.x+this.w>=this.canvas.width||this.x<=0)}outOfBoundsTop(){return this.y<=0}outOfBoundsBottom(){return this.canvas&&this.bottom()>=this.canvas.height}isIntersecting(t){return this.x<t.x+t.w&&this.x+this.w>t.x&&this.y<t.y+t.h&&this.h+this.y>t.y}getPenetration(t){let s=1/0,e=1/0,i=1/0,a=1/0;const n=this.top(),o=this.bottom(),h=this.left(),l=this.right(),c=t.top(),d=t.bottom(),y=t.left(),w=t.right();return n<=d&&d>=n&&(e=o-c),d>=n&&n<=d&&(s=d-n),y<=l&&w>=h&&(a=l-y),w>=h&&y<=l&&(i=w-h),{top:s,bottom:e,left:i,right:a}}}const yt=[["#4f4f4f"],["#fcc932"],["#37b221","#50fc32"],["#1c5782","#287dba","#329ae5"]];class wt{constructor(t,s,e,i,a){this.WIDTH=500/8,this.HEIGHT=400/12,this.POINTS_FOR_HIT=50,this.POINTS_FOR_BREAK=150,this.broken=!1,this.context=t,this.health=s,this.unbreakable=e,this.row=i,this.col=a,this.makeBox(),this.colorSet=e?yt[0]:yt[s];const n=t.match.difficulty.pointMultiplier;this.POINTS_FOR_BREAK*=n,this.POINTS_FOR_HIT*=n}destroy(){}hit(){if(!this.unbreakable&&!this.broken){this.health-=1,this.broken=this.health<=0;const t=this.broken?this.POINTS_FOR_BREAK:this.POINTS_FOR_HIT;this.context.points.update(s=>s+t),this.broken&&this.context.match.bricks.allBricksBroken()&&this.context.match.endGame(!1,!0)}}hasTopNeighbor(){return this.neighbors.top&&!this.neighbors.top.broken}hasBottomNeighbor(){return this.neighbors.bottom&&!this.neighbors.bottom.broken}hasLeftNeighbor(){return this.neighbors.left&&!this.neighbors.left.broken}hasRightNeighbor(){return this.neighbors.right&&!this.neighbors.right.broken}makeBox(){const t=this.row*this.HEIGHT,s=this.col*this.WIDTH;this.box=new dt(s,t,this.WIDTH,this.HEIGHT)}render(){if(!this.broken){const t=this.box,s=this.context.canvas.getContext("2d");s.fillStyle=this.colorSet[this.health-1],s.fillRect(t.x,t.y,t.w,t.h)}}findNeighbors(t){const s={};t.all.forEach(e=>{if(e!=this){const i=this.row-e.row,a=this.col-e.col;a==0?i==-1?s.bottom=e:i==1&&(s.top=e):i==0&&(a==-1?s.right=e:a==1&&(s.left=e))}}),this.neighbors=s}}class Qt{constructor(t){this.context=t,this.layout=t.match.layout,this.all=new Array,this.makeBricks()}destroy(){this.all.forEach(t=>t.destroy())}update(){this.all.forEach(t=>t.render())}allBricksBroken(){return this.all.every(t=>t.unbreakable||t.broken)}makeBricks(){const t=this.context;this.layout.rows.forEach((s,e)=>{for(let i=0;i<s.length;i++){const a=s.charAt(i);let n;if(a=="#")n=new wt(t,1,!0,e,i);else{const o=parseInt(a);o&&(n=new wt(t,o,!1,e,i))}n&&this.all.push(n)}}),this.all.forEach(s=>s.findNeighbors(this))}}class zt{constructor(t){this.REGULAR_WIDTH=65,this.JUMBO_WIDTH=120,this.HEIGHT=12,this.Y_OFFSET=20,this.context=t,this.box=new dt(0,this.Y_OFFSET,this.REGULAR_WIDTH,this.HEIGHT),this.addListener()}destroy(){this.removeListener()}center(){return this.box.x+this.box.w/2}top(){return this.box.y}addListener(){const t=this,s=e=>t.onMouseMove(e);document.addEventListener("mousemove",s),this.removeListener=()=>{document.removeEventListener("mousemove",s)}}onMouseMove(t){const s=this.context.canvas,e=s.getBoundingClientRect(),i=t.clientX-e.x,a=this.box,n=a.w/2,o=n,h=s.width-n;a.x=Math.min(Math.max(i,o),h)-n}updateWidth(){this.box.w=this.context.powerups.jumboPlatform?this.JUMBO_WIDTH:this.REGULAR_WIDTH}updateHeight(){this.box.y=this.context.canvas.height-this.Y_OFFSET-this.box.h/2}update(){this.updateWidth(),this.updateHeight();const t=this.box,s=this.context.canvas.getContext("2d");s.fillStyle="#fff",s.fillRect(t.x,t.y,t.w,t.h)}}class te{constructor(t,s,e){this.SIZE=12,this.DEFLECT_RANGE=2,this.speedX=.05,this.speedY=-1,this.speedMultiplier=4,this.box=new dt(t,s,this.SIZE,this.SIZE,e.canvas),this.context=e,this.speedMultiplier*=e.match.difficulty.speedMultiplier}flipX(){this.speedX=-this.speedX}flipY(){this.speedY=-this.speedY}destroy(){}update(t){this.updatePosition(t),this.render(),this.updateWallCollisions()||this.updateBrickCollisions()||this.updatePaddleCollisions()||(this.lastHit="")}render(){const t=this.box,s=this.context.canvas.getContext("2d");s.fillStyle="#fff",s.fillRect(t.x,t.y,t.w,t.h)}updatePosition(t){this.box.x+=this.speedX*this.speedMultiplier,this.box.y+=this.speedY*this.speedMultiplier}puckLost(){const t=this.context,s=t.match;t.lives.update(e=>e-=1),Nt(t.lives)==0?s.endGame(!1,!1):s.removePuck()}updateWallCollisions(){return this.box.outOfBoundsBottom()?(this.puckLost(),!0):this.lastHit!="XWall"&&this.box.outOfBoundsX()?(this.lastHit="XWall",this.flipX(),!0):this.lastHit!="TopWall"&&this.box.outOfBoundsTop()?(this.lastHit="TopWall",this.flipY(),!0):!1}updatePaddleCollisions(){const t=this.context.match.paddle,s=this.box,e=t.box;if(this.lastHit!="Paddle"&&e.isIntersecting(s)){this.lastHit="Paddle",this.speedY=-1;let i=Math.min(Math.max((s.x-e.x)/e.w,0),1);return i==.5?this.speedX=0:i>.5?(i=(i-.5)/.5,this.speedX=i*this.DEFLECT_RANGE):i<.5&&(i=(.5-i)/.5,this.speedX=i*-this.DEFLECT_RANGE),!0}return!1}updateBrickCollisions(){const t=this.context.match.bricks;let s=!1;return t.all.forEach(e=>{if(!s&&!e.broken){const i=e.box,a=this.box;if(this.lastHit!=i.id&&i.isIntersecting(a)){s=!0,this.lastHit=i.id;const n=i.getPenetration(a),o=this.speedX,h=this.speedY,l=e.hasLeftNeighbor(),c=e.hasRightNeighbor(),d=e.hasTopNeighbor(),y=e.hasBottomNeighbor();return(h>0||y)&&(n.bottom=1/0),(h<0||d)&&(n.top=1/0),(o>0||c)&&(n.right=1/0),(o<0||l)&&(n.left=1/0),n.left<n.top&&n.left<n.bottom||n.right<n.top&&n.right<n.bottom?this.flipX():this.flipY(),e.hit(),!0}}}),s}}class ee{constructor(t,s,e){this.PUCK_Y_OFFSET=10,this.state=0,this.isRendering=!1,this.context=t,this.layout=s,this.difficulty=e,t.match=this,this.paddle=new zt(t),this.bricks=new Qt(t),this.context.lives.set(this.difficulty.lives),this.addListeners(),this.runGame()}destroy(){this.endGame(!0),this.removeListeners()}removePuck(){var t;(t=this.puck)==null||t.destroy(),this.puck=void 0}spawnPuck(){const t=this.paddle;this.removePuck(),this.puck=new te(t.center(),t.top()-this.PUCK_Y_OFFSET,this.context)}addListeners(){const t=this,s=this.context.canvas,e=a=>{a.code=="KeyP"&&(this.state==1?t.pauseGame():this.state==0&&t.runGame())},i=a=>{this.puck||t.spawnPuck()};document.addEventListener("keydown",e),s.addEventListener("mousedown",i),this.removeListeners=()=>{document.removeEventListener("keydown",e),s.removeEventListener("mousedown",i)}}endGame(t=!1,s=!1){var e;this.state!=2&&(this.state=2,(e=this.puck)==null||e.destroy(),this.paddle.destroy(),this.bricks.destroy(),t||(this.context.gameOver.set(!0),this.context.gameWon.set(s)))}drawPauseBars(){const t=this.context.canvas,s=t.getContext("2d"),e=t.width,i=t.height,a=20,n=80,o=20;s.clearRect(0,0,e,i),s.fillStyle="#fff",s.fillRect(e/2-o-a,i/2-n/2,a,n),s.fillRect(e/2+o,i/2-n/2,a,n)}pauseGame(){this.state==1&&(this.state=0)}runGame(){this.state==0&&(this.state=1,this.isRendering||this.continueRendering())}continueRendering(){requestAnimationFrame(t=>{var i;const s=this.lastTick?t-this.lastTick:.016666666666666666,e=this.context.canvas;e.getContext("2d").clearRect(0,0,e.width,e.height),this.paddle.update(),(i=this.puck)==null||i.update(s),this.bricks.update(),this.state==1?(this.isRendering=!0,this.continueRendering()):(this.isRendering=!1,this.state==0&&this.drawPauseBars())})}}const se={novice:{pointMultiplier:.5,speedMultiplier:1,lives:4},adept:{pointMultiplier:.65,speedMultiplier:1.15,lives:3},expert:{pointMultiplier:.8,speedMultiplier:1.3,lives:2},legendary:{pointMultiplier:1,speedMultiplier:1.6,lives:1}};function ie(r){let t,s,e,i,a,n,o,h,l,c,d,y,w;s=new Vt({}),i=new Jt({});let M={};return n=new Gt({props:M}),r[2](n),h=new Xt({}),h.$on("newgame",r[1]),y=new Ct({}),{c(){t=_("section"),W(s.$$.fragment),e=C(),W(i.$$.fragment),a=C(),W(n.$$.fragment),o=C(),W(h.$$.fragment),l=C(),c=_("a"),d=P(`Made by Lee de Verteuil
    `),W(y.$$.fragment),this.h()},l(p){t=m(p,"SECTION",{class:!0});var $=g(t);A(s.$$.fragment,$),e=S($),A(i.$$.fragment,$),a=S($),A(n.$$.fragment,$),o=S($),A(h.$$.fragment,$),l=S($),c=m($,"A",{class:!0,href:!0});var T=g(c);d=O(T,`Made by Lee de Verteuil
    `),A(y.$$.fragment,T),T.forEach(u),$.forEach(u),this.h()},h(){b(c,"class","flex flex-row justify-center items-center gap-2 mt-4 text-sm text-center text-gray-600 hover:text-blue-500 hover:underline"),b(c,"href","http://github.com/leedeverteuil"),b(t,"class","shadow-lg bg-gray-900 rounded-lg p-5")},m(p,$){R(p,t,$),D(s,t,null),f(t,e),D(i,t,null),f(t,a),D(n,t,null),f(t,o),D(h,t,null),f(t,l),f(t,c),f(c,d),D(y,c,null),w=!0},p(p,[$]){const T={};n.$set(T)},i(p){w||(k(s.$$.fragment,p),k(i.$$.fragment,p),k(n.$$.fragment,p),k(h.$$.fragment,p),k(y.$$.fragment,p),w=!0)},o(p){E(s.$$.fragment,p),E(i.$$.fragment,p),E(n.$$.fragment,p),E(h.$$.fragment,p),E(y.$$.fragment,p),w=!1},d(p){p&&u(t),X(s),X(i),r[2](null),X(n),X(h),X(y)}}}function ne(r,t,s){let e;const i={lives:it(1),points:it(0),gameOver:it(!1),gameWon:it(!1),powerups:{}};function a(){i.lives.set(1),i.points.set(0),i.gameOver.set(!1),i.gameWon.set(!1),i.powerups={}}function n(h){var l;if(e){a(),(l=i.match)==null||l.destroy();const c=h.detail,d=Tt[c.level],y=se[c.difficulty];i.match=new ee(i,d,y)}}St("game",i);function o(h){kt[h?"unshift":"push"](()=>{e=h,s(0,e)})}return[e,n,o]}class ae extends Z{constructor(t){super();J(this,t,ne,ie,Y,{})}}function re(r){let t,s,e,i,a,n;return{c(){t=_("header"),s=_("h1"),e=P("Breakout Remastered"),i=C(),a=_("p"),n=P("The classic brick-breaking game remade & improved!"),this.h()},l(o){t=m(o,"HEADER",{class:!0});var h=g(t);s=m(h,"H1",{class:!0});var l=g(s);e=O(l,"Breakout Remastered"),l.forEach(u),i=S(h),a=m(h,"P",{class:!0});var c=g(a);n=O(c,"The classic brick-breaking game remade & improved!"),c.forEach(u),h.forEach(u),this.h()},h(){b(s,"class","text-gray-300 text-4xl font-bold"),b(a,"class","text-gray-500 mt-2"),b(t,"class","text-center mt-10")},m(o,h){R(o,t,h),f(t,s),f(s,e),f(t,i),f(t,a),f(a,n)},p:B,i:B,o:B,d(o){o&&u(t)}}}class le extends Z{constructor(t){super();J(this,t,null,re,Y,{})}}function oe(r){let t,s,e,i,a;return t=new le({}),i=new ae({}),{c(){W(t.$$.fragment),s=C(),e=_("main"),W(i.$$.fragment),this.h()},l(n){A(t.$$.fragment,n),s=S(n),e=m(n,"MAIN",{class:!0});var o=g(e);A(i.$$.fragment,o),o.forEach(u),this.h()},h(){b(e,"class","mx-auto my-5 max-w-xl")},m(n,o){D(t,n,o),R(n,s,o),R(n,e,o),D(i,e,null),a=!0},p:B,i(n){a||(k(t.$$.fragment,n),k(i.$$.fragment,n),a=!0)},o(n){E(t.$$.fragment,n),E(i.$$.fragment,n),a=!1},d(n){X(t,n),n&&u(s),n&&u(e),X(i)}}}class ce extends Z{constructor(t){super();J(this,t,null,oe,Y,{})}}export{ce as default};
