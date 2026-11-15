(function(){
/* EDIT HERE: the price of ONE template in each currency.
   Change "v" to set your own price. Values other than USD are rounded approximations. */
var P=[
{c:'USD',n:'US Dollar',v:15},
{c:'THB',n:'Thai Baht',v:500},
{c:'MMK',n:'Myanmar Kyat',v:66000},
{c:'SGD',n:'Singapore Dollar',v:19.5},
{c:'TWD',n:'Taiwan Dollar',v:470},
{c:'KRW',n:'Korean Won',v:22000},
{c:'EUR',n:'Euro',v:13.5},
{c:'GBP',n:'British Pound',v:11}
];
var KEY='novi-currency';
function find(c){for(var i=0;i<P.length;i++)if(P[i].c===c)return P[i];return null;}
function guess(){var z='';try{z=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
if(z==='Asia/Bangkok')return'THB';if(z==='Asia/Yangon'||z==='Asia/Rangoon')return'MMK';if(z==='Asia/Singapore')return'SGD';
if(z==='Asia/Taipei')return'TWD';if(z==='Asia/Seoul')return'KRW';if(z==='Europe/London')return'GBP';if(z.indexOf('Europe/')===0)return'EUR';return'USD';}
var cur=null;try{cur=localStorage.getItem(KEY);}catch(e){}
if(!find(cur))cur=guess();
function fmt(it){var v=it.v,d=(it.c==='MMK'||it.c==='KRW')?0:(v%1?2:0),s;
try{s=new Intl.NumberFormat('en',{style:'currency',currency:it.c,minimumFractionDigits:d,maximumFractionDigits:d}).format(v);}catch(e){s=String(v);}
return s.indexOf(it.c)<0?s+' '+it.c:s;}
var chips=[];
function render(){var it=find(cur),els=document.querySelectorAll('.price[data-price]');
for(var i=0;i<els.length;i++)els[i].textContent=fmt(it);
for(var j=0;j<chips.length;j++)chips[j].setAttribute('aria-pressed',chips[j].getAttribute('data-c')===cur?'true':'false');}
var slot=document.getElementById('cur-slot');
if(slot){
var st=document.createElement('style');
st.textContent='.curbar{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:640px;margin:0 auto 36px}'
+'.curbar button{font:500 12px Montserrat,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#3A1028;background:transparent;border:1px solid #3A1028;border-radius:999px;padding:9px 16px;cursor:pointer;transition:background .2s,color .2s}'
+'.curbar button:hover{background:#EAD3E0}'
+'.curbar button[aria-pressed="true"]{background:#3A1028;color:#fff}'
+'.curbar button:focus-visible{outline:2px solid #3A1028;outline-offset:3px}';
document.head.appendChild(st);
slot.className='curbar';slot.setAttribute('role','group');slot.setAttribute('aria-label','Choose currency');
P.forEach(function(it){var b=document.createElement('button');b.type='button';b.textContent=it.c;b.title=it.n;b.setAttribute('data-c',it.c);
b.addEventListener('click',function(){cur=it.c;try{localStorage.setItem(KEY,cur);}catch(e){}render();});
slot.appendChild(b);chips.push(b);});}
render();
})();
