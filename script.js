const screens=[...document.querySelectorAll('.screen')];
const bar=document.querySelector('.progress span');
let current=0, selectedPlan='';
const dateInput=document.querySelector('#date');
dateInput.min=new Date().toISOString().split('T')[0];

function show(n){
  current=Math.max(0,Math.min(n,screens.length-1));
  screens.forEach((s,i)=>s.classList.toggle('active',i===current));
  bar.style.width=((current+1)/screens.length*100)+'%';
  if(current===screens.length-1) burst();
}
function burst(){
  const box=document.querySelector('.hearts');
  for(let i=0;i<18;i++){
    const e=document.createElement('span');
    e.className='heart';
    e.textContent=['💗','💕','💖','✨'][Math.floor(Math.random()*4)];
    e.style.left=Math.random()*100+'%';
    e.style.animationDuration=(2.5+Math.random()*2.5)+'s';
    e.style.fontSize=(14+Math.random()*18)+'px';
    box.appendChild(e);
    setTimeout(()=>e.remove(),5500);
  }
}
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>show(current+1)));

document.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>{
  if(b.classList.contains('plan')){
    document.querySelectorAll('.plan').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    selectedPlan=b.dataset.value;
    document.querySelector('#planNext').disabled=false;
  }else{
    b.classList.add('selected');
    setTimeout(()=>show(current+1),250);
  }
}));

document.querySelector('#dateNext').addEventListener('click',()=>{
  if(!dateInput.value){dateInput.focus();return}
  const d=new Date(dateInput.value+'T00:00:00');
  document.querySelector('#summaryPlan').textContent=selectedPlan||'Сюрприз 💗';
  document.querySelector('#summaryDate').textContent=d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'});
  document.querySelector('#summaryTime').textContent=document.querySelector('#time').value||'19:00';
  document.querySelector('#summary').textContent=`Значит, ${selectedPlan||'свидание'} — ${d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'})}. Я уже жду ❤️`;
  show(4);
});

document.querySelector('#restart').addEventListener('click',()=>location.reload());

document.querySelector('#share').addEventListener('click',async()=>{
  const text=`У нас свидание 💗\n${document.querySelector('#summaryPlan').textContent}\n${document.querySelector('#summaryDate').textContent} в ${document.querySelector('#summaryTime').textContent}`;
  if(navigator.share){await navigator.share({title:'Наше свидание 💌',text,url:location.href});}
  else{await navigator.clipboard.writeText(location.href);alert('Ссылка скопирована 💗');}
});
