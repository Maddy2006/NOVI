(function(){
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
/* scroll reveal */
if('IntersectionObserver' in window){
var els=document.querySelectorAll('h1,h2,.band p,.sub,.grid>*,.narrow>*,.btns,.tiles>*,details,.enq');
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(el,i){el.classList.add('reveal');
var par=el.parentElement;
if(par.classList.contains('grid')||par.classList.contains('tiles')){el.style.transitionDelay=(Array.prototype.indexOf.call(par.children,el)%4)*90+'ms';}
else if(el.closest('.band')){el.style.transitionDelay=(i%4)*120+'ms';}
el.addEventListener('transitionend',function(){el.style.transitionDelay='';el.classList.add('done');},{once:true});
io.observe(el);});
}
/* sakura petals */
var cv=document.createElement('canvas');cv.id='petals';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
var ctx=cv.getContext('2d'),W,H,dpr=Math.min(window.devicePixelRatio||1,2);
function size(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
size();addEventListener('resize',size);
var cols=['#F4B6C8','#F8CAD6','#EFA9BF','#FBDDE5','#F2C2D0'],ps=[],mx=-999,my=-999,boost=0,lastY=scrollY,on=true;
function mk(x,y,burst){var s=7+Math.random()*8,vy=.5+Math.random()*.8;
return{x:x===undefined?Math.random()*W:x,y:y===undefined?Math.random()*H:y,s:s,c:cols[Math.random()*cols.length|0],a:.55+Math.random()*.35,rot:Math.random()*6.28,vr:(Math.random()-.5)*.03,vy:vy,base:vy,vx:(Math.random()-.5)*.4,t:Math.random()*10,tf:.6+Math.random()*1.2,burst:!!burst};}
for(var i=0;i<(innerWidth<700?16:30);i++)ps.push(mk());
function draw(p){var s=p.s;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.scale(1,Math.max(.3,Math.abs(Math.cos(p.t*p.tf))));
ctx.globalAlpha=p.a;var g=ctx.createLinearGradient(0,s,0,-s);g.addColorStop(0,'#E98AA8');g.addColorStop(.55,p.c);g.addColorStop(1,'#FFF1F5');ctx.fillStyle=g;
ctx.beginPath();ctx.moveTo(0,s*.95);
ctx.bezierCurveTo(s*.14,s*.7,s*.74,s*.05,s*.7,-s*.55);
ctx.bezierCurveTo(s*.67,-s*.78,s*.6,-s*.95,s*.4,-s*.97);
ctx.lineTo(0,-s*.72);ctx.lineTo(-s*.4,-s*.97);
ctx.bezierCurveTo(-s*.6,-s*.95,-s*.67,-s*.78,-s*.7,-s*.55);
ctx.bezierCurveTo(-s*.74,s*.05,-s*.14,s*.7,0,s*.95);
ctx.closePath();ctx.fill();ctx.restore();}
function step(){if(!on)return;ctx.clearRect(0,0,W,H);boost*=.92;
for(var i=ps.length-1;i>=0;i--){var p=ps[i];p.t+=.02;
var dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy);
if(d<130&&d>0){var f=(130-d)/130;p.vx+=dx/d*f*.9;p.vy+=dy/d*f*.5;}
p.vx*=.985;p.vy+=(p.base-p.vy)*.03;
p.x+=p.vx+Math.sin(p.t*p.tf)*.5;p.y+=p.vy+boost*.06;p.rot+=p.vr;draw(p);
if(p.y>H+20||p.y<-80||p.x<-40||p.x>W+40){if(p.burst){ps.splice(i,1);}else{p.y=-20;p.x=Math.random()*W;p.vx=(Math.random()-.5)*.4;p.vy=p.base;}}}
requestAnimationFrame(step);}
step();
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;});
document.addEventListener('pointerleave',function(){mx=my=-999;});
addEventListener('scroll',function(){boost=Math.min(boost+Math.abs(scrollY-lastY),60);lastY=scrollY;},{passive:true});
addEventListener('pointerdown',function(e){if(!on||ps.length>140||e.target.closest('a,button,summary,input,textarea,.hero'))return;
for(var k=0;k<10;k++){var p=mk(e.clientX,e.clientY,true),a=Math.random()*6.28,sp=2+Math.random()*3;p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp-1.5;p.base=.8+Math.random()*.6;ps.push(p);}});
window.noviPetals={drop:function(x,y,n){if(!on||ps.length>140)return;for(var k=0;k<n;k++){var p=mk(x,y,true),a=Math.random()*6.28,sp=1+Math.random()*2;p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp-.5;p.base=.9+Math.random()*.5;ps.push(p);}}};
var tg=document.createElement('button');tg.className='pt-toggle';tg.type='button';tg.setAttribute('aria-pressed','true');tg.textContent='Petals: on';
tg.addEventListener('click',function(){on=!on;tg.setAttribute('aria-pressed',on);tg.textContent='Petals: '+(on?'on':'off');if(on){step();}else{ctx.clearRect(0,0,W,H);}});
document.body.appendChild(tg);
})();
