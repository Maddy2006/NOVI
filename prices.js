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
function render(){var it=find(cur),els=document.querySelectorAll('.price[data-price]');
for(var i=0;i<els.length;i++)els[i].textContent=fmt(it);}
var slot=document.getElementById('cur-slot');
if(slot){slot.className='cur';
var lb=document.createElement('label');lb.setAttribute('for','cur-sel');lb.textContent='Currency';
var sel=document.createElement('select');sel.id='cur-sel';
P.forEach(function(it){var o=document.createElement('option');o.value=it.c;o.textContent=it.c+' - '+it.n;if(it.c===cur)o.selected=true;sel.appendChild(o);});
sel.addEventListener('change',function(){cur=sel.value;try{localStorage.setItem(KEY,cur);}catch(e){}render();});
var nt=document.createElement('p');nt.textContent='Prices in other currencies are approximate. Checkout may be charged in USD.';
slot.appendChild(lb);slot.appendChild(sel);slot.appendChild(nt);}
render();
})();
