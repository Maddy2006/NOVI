(function(){
var hero=document.querySelector('.hero');
if(!hero||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cv=document.createElement('canvas');cv.id='pond';cv.setAttribute('aria-hidden','true');hero.insertBefore(cv,hero.firstChild);
var ctx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),rip=[],gl=[],running=false,t0=performance.now(),nextAuto=t0+2500;
function size(){var r=hero.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
size();if('ResizeObserver' in window)new ResizeObserver(size).observe(hero);else addEventListener('resize',size);
for(var i=0;i<18;i++)gl.push({x:Math.random(),y:.1+Math.random()*.85,w:6+Math.random()*14,s:.5+Math.random()*.9,p:Math.random()*6.28});
function frame(now){
if(!running)return;
var t=(now-t0)/1000,k,j,i;
ctx.clearRect(0,0,W,H);
var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(255,255,255,.28)');g.addColorStop(1,'rgba(176,120,160,.16)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
for(k=0;k<9;k++){var y0=H*(.12+k*.1);ctx.beginPath();
for(var x=0;x<=W+24;x+=24){var y=y0+Math.sin(x*.012+t*.5+k)*5+Math.sin(x*.005-t*.3+k*2)*4;if(x)ctx.lineTo(x,y);else ctx.moveTo(x,y);}
ctx.strokeStyle=k%2?'rgba(255,255,255,.35)':'rgba(150,90,130,.10)';ctx.lineWidth=k%2?1.5:1;ctx.stroke();}
gl.forEach(function(q){var a=Math.max(0,Math.sin(t*q.s+q.p));a=a*a*a;ctx.fillStyle='rgba(255,255,255,'+(a*.7)+')';ctx.beginPath();ctx.ellipse(q.x*W,q.y*H,q.w,1.6,0,0,6.283);ctx.fill();});
if(now>nextAuto){rip.push({x:Math.random()*W,y:H*(.35+Math.random()*.6),t:now,str:.45});nextAuto=now+3500+Math.random()*3500;}
for(i=rip.length-1;i>=0;i--){var r=rip[i],age=(now-r.t)/1000;if(age>3.6){rip.splice(i,1);continue;}
for(j=0;j<3;j++){var a2=age-j*.28;if(a2<=0)continue;var rad=a2*(70+r.str*40),al=Math.max(0,1-a2/2.6)*r.str;
ctx.lineWidth=2.2-j*.5;ctx.strokeStyle='rgba(255,255,255,'+(al*.9)+')';ctx.beginPath();ctx.ellipse(r.x,r.y,rad,rad*.42,0,0,6.283);ctx.stroke();
ctx.lineWidth=1;ctx.strokeStyle='rgba(170,100,140,'+(al*.35)+')';ctx.beginPath();ctx.ellipse(r.x,r.y+2,rad+2,rad*.42+1,0,0,6.283);ctx.stroke();}}
requestAnimationFrame(frame);}
function start(){if(!running){running=true;requestAnimationFrame(frame);}}
if('IntersectionObserver' in window){new IntersectionObserver(function(e){if(e[0].isIntersecting)start();else running=false;}).observe(hero);}else start();
/* sound (off by default) */
var ac=null,snd=false;
function plop(){if(!snd||!ac)return;var n=ac.currentTime,f=520+Math.random()*260;
var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(f*.28,n+.16);
g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.16,n+.012);g.gain.exponentialRampToValueAtTime(.0001,n+.3);
o.connect(g);g.connect(ac.destination);o.start(n);o.stop(n+.32);
var len=Math.floor(ac.sampleRate*.08),b=ac.createBuffer(1,len,ac.sampleRate),d=b.getChannelData(0);
for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);
var s=ac.createBufferSource(),lp=ac.createBiquadFilter(),g2=ac.createGain();s.buffer=b;lp.type='lowpass';lp.frequency.value=1400;g2.gain.value=.05;
s.connect(lp);lp.connect(g2);g2.connect(ac.destination);s.start(n);}
hero.addEventListener('pointerdown',function(e){if(e.target.closest('a,button'))return;var r=hero.getBoundingClientRect();
rip.push({x:e.clientX-r.left,y:e.clientY-r.top,t:performance.now(),str:1});plop();
if(window.noviPetals)window.noviPetals.drop(e.clientX,e.clientY,3);});
var tg=document.createElement('button');tg.className='pt-toggle';tg.type='button';tg.setAttribute('aria-pressed','false');tg.textContent='Sound: off';tg.style.right='160px';
tg.addEventListener('click',function(){if(!snd){var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!ac)ac=new AC();if(ac.state==='suspended')ac.resume();snd=true;}else{snd=false;}
tg.setAttribute('aria-pressed',snd);tg.textContent='Sound: '+(snd?'on':'off');if(snd)plop();});
document.body.appendChild(tg);
})();
