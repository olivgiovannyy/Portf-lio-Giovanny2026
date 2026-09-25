/* SEUS PROJETOS: altere os projetos abaixo e preencha demo, codigo e imagem.
   categoria deve ser Front-end, Python ou Dados. Use apenas links http/https.
   Enquanto os links estiverem vazios, os botões ficam desativados. */
const projetos = [
  {
    "titulo": "Monte Sião — Campeonato de Futebol",
    "categoria": "Front-end",
    "descricao": "Gerenciador de campeonatos com cadastro de times e atletas, grupos, rodadas, placar ao vivo, mata-mata e estatísticas.",
    "tecnologias": [
      "Futebol",
      "Gestão de campeonatos"
    ],
    "imagem": "assets/projetos/monte-siao.png",
    "demo": "https://olivgiovannyy.github.io/Gerenciador-de-Campeonato-de-Futebol/",
    "codigo": "",
    "simbolo": "⚽",
    "placeholder": false
  },
  {
    "titulo": "ISAH — Tecnologia para o lar",
    "categoria": "Front-end",
    "descricao": "Projeto universitário sobre automação residencial, com apresentação de soluções para iluminação, energia, clima e segurança. Minha atuação: desenvolvimento front-end.",
    "tecnologias": [
      "Front-end",
      "Automação residencial"
    ],
    "imagem": "assets/projetos/isah.png",
    "demo": "https://olivgiovannyy.github.io/Project-ISAH-University/",
    "codigo": "",
    "simbolo": "</>",
    "placeholder": false
  },
  {
    "titulo": "Clareza — Controle Financeiro",
    "categoria": "Python",
    "descricao": "Sistema de controle financeiro pessoal com dashboard, transações, metas, planejamento e relatórios para acompanhar receitas e despesas.",
    "tecnologias": [
      "Finanças",
      "Dashboard",
      "Planejamento"
    ],
    "imagem": "assets/projetos/clareza.png",
    "demo": "https://controle-financeiro-xegj.onrender.com/",
    "codigo": "",
    "simbolo": "$",
    "placeholder": false
  }
];
// Ícones salvos em assets/icons. SQL usa um símbolo genérico de banco de dados.
const tecnologias = [
  ['python','Python'],['javascript','JavaScript'],['html5','HTML5'],['css3','CSS3'],
  ['sql','SQL'],['git','Git'],['github','GitHub'],['vscode','VS Code'],
  ['salesforce','Salesforce'],['powerbi','Power BI'],
  ['flask','Flask'],['photoshop','Photoshop'],['illustrator','Illustrator']
];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const grid = document.querySelector('#project-grid');
function safeLink(url) { try { const u = new URL(url); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } }
function element(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className=cls; if (text) e.textContent=text; return e; }
function renderProjects(category='Todos') {
  grid.replaceChildren();
  projetos.filter(p => category==='Todos' || p.categoria===category).forEach((p, index) => {
    const card=element('article','project-card tilt');
    const visual=element('div','project-visual');
    if (p.imagem) { const img=element('img'); img.src=p.imagem; img.alt=p.titulo; img.loading='lazy'; visual.append(img); }
    else visual.append(element('span','project-mark',p.simbolo));
    visual.append(element('span','project-index',String(index+1).padStart(2,'0')));
    if(p.placeholder) visual.append(element('span','project-soon','EM BREVE'));
    const body=element('div','project-body'); body.append(element('h3','',p.titulo),element('p','',p.descricao));
    const tags=element('div','project-tags'); p.tecnologias.forEach(t=>tags.append(element('span','',t))); body.append(tags);
    const links=element('div','project-links');
    [['Ver projeto ↗',p.demo],['Código ↗',p.codigo]].filter(([label,url])=>label!=='Código ↗'||safeLink(url)).forEach(([label,url])=>{const href=safeLink(url);const a=element(href?'a':'span','',label);if(href){a.href=href;a.target='_blank';a.rel='noopener noreferrer';}else{a.setAttribute('aria-disabled','true');a.title='Disponível quando o projeto for publicado';}links.append(a);});
    body.append(links); card.append(visual,body); grid.append(card);
  });
  if(!grid.children.length) grid.append(element('p','','Ainda não há projetos nesta categoria.'));
  bindTilt();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderProjects(button.dataset.filter);}));
renderProjects();
const techGrid=document.querySelector('#tech-grid');
tecnologias.forEach(([slug,name])=>{
  const item=element('div','tech'),icon=element('div','tech-icon'),img=element('img');
  img.src=`assets/icons/${slug}.${slug==='illustrator'?'png':'svg'}`;img.alt='';img.width=35;img.height=35;img.loading='lazy';
  if(['github','flask'].includes(slug))img.className='monochrome';
  icon.setAttribute('aria-hidden','true');icon.append(img);item.append(icon,element('p','',name));techGrid.append(item);
});

/* Foto: coloque sua foto em assets/foto-giovanny.png. */
const portrait=document.querySelector('#portrait-image');
function showPortrait(){if(portrait.naturalWidth){portrait.hidden=false;document.querySelector('#portrait-fallback').hidden=true;}}
portrait.addEventListener('load',showPortrait);showPortrait();

/* Menu acessível para celular. */
const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus();}});

/* Copiar e-mail também funciona ao abrir index.html localmente. */
document.querySelector('#copy-email').addEventListener('click',async()=>{
  const email='2007oliveira.giovanny@gmail.com',status=document.querySelector('#copy-status');
  try { if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else {const input=document.createElement('textarea');input.value=email;input.style.cssText='position:fixed;left:-9999px';document.body.append(input);input.select();const ok=document.execCommand('copy');input.remove();if(!ok)throw new Error('copy');}
    status.textContent='E-mail copiado!';
  }catch{status.textContent='Selecione o endereço acima para copiar o e-mail.';}
});
document.querySelectorAll('.github-stats img').forEach(img=>{function failed(){img.hidden=true;document.querySelector('.stats-fallback').hidden=false;}img.addEventListener('error',failed);if(img.complete&&!img.naturalWidth)failed();});

/* Efeitos são opcionais: todo o conteúdo permanece legível sem eles. */
function bindTilt(){document.querySelectorAll('.tilt').forEach(card=>{if(card.dataset.tiltBound)return;card.dataset.tiltBound='true';card.addEventListener('pointermove',e=>{if(reducedMotion.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});}
bindTilt();
if('IntersectionObserver' in window&&!reducedMotion.matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.about-grid,.timeline-item,.learning-grid,.github-top').forEach(e=>{e.classList.add('reveal','pending');observer.observe(e);});}

/* Fundo contínuo: fios e pontos em diferentes profundidades formam uma teia.
   A animação reage ao mouse e à rolagem, sem interceptar cliques.
   Pausa quando a aba está oculta e respeita movimento reduzido. */
const canvas=document.querySelector('#web-background'),ctx=canvas.getContext('2d');
const motionButton=document.querySelector('#motion-toggle');
let width=0,height=0,frame=0,lastTime=0,phase=0,paused=reducedMotion.matches;
let pointer={x:0,y:0},smoothPointer={x:0,y:0};
let scroll=window.scrollY,scrollPending=false;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
function updateScroll(){
  scrollPending=false;scroll=window.scrollY;
  const length=document.documentElement.scrollHeight-innerHeight;
  document.querySelector('.progress').style.transform=`scaleX(${length>0?scroll/length:0})`;
  const r=document.querySelector('.timeline').getBoundingClientRect();
  document.querySelector('.timeline-track i').style.transform=`scaleY(${clamp((innerHeight*.75-r.top)/r.height,0,1)})`;
}
function drawWeb(){
  if(!ctx)return;
  ctx.clearRect(0,0,width,height);
  const mobile=width<721;
  // Rayons et fils courbes : forme reconnaissable d'une toile d'araignée.
  function spiderWeb(cx,cy,radius,opacity,offset){
    const spokes=16,rings=mobile?9:12,rotation=offset+Math.sin(phase*.16+offset)*.025;
    cx+=smoothPointer.x*16+Math.sin(phase*.24+offset)*9;
    cy+=smoothPointer.y*12+Math.cos(phase*.2+offset)*7;
    function point(angle,r){
      const wave=1+Math.sin(angle*3+phase*.65+offset)*.016;
      return {x:cx+Math.cos(angle)*r*wave,y:cy+Math.sin(angle)*r*wave};
    }
    ctx.lineWidth=mobile?.75:1;
    ctx.strokeStyle=`rgba(120,169,228,${opacity})`;
    for(let i=0;i<spokes;i++){
      const angle=rotation+i*Math.PI*2/spokes,end=point(angle,radius);
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(end.x,end.y);ctx.stroke();
    }
    for(let ring=1;ring<=rings;ring++){
      const r=radius*Math.pow(ring/rings,1.35);
      ctx.beginPath();
      for(let i=0;i<spokes;i++){
        const angle=rotation+i*Math.PI*2/spokes,next=angle+Math.PI*2/spokes;
        const a=point(angle,r),b=point(next,r),control=point((angle+next)/2,r*.86);
        if(i===0)ctx.moveTo(a.x,a.y);
        ctx.quadraticCurveTo(control.x,control.y,b.x,b.y);
      }
      ctx.closePath();ctx.strokeStyle=ring%4===0?`rgba(223,31,45,${opacity*1.2})`:`rgba(120,169,228,${opacity})`;ctx.stroke();
    }
  }
  const shift=paused?0:Math.sin(scroll*.00065)*16;
  spiderWeb(width*(mobile?1.02:.91),height*.27+shift,Math.max(width*.58,height*.7),mobile?.20:.27,.15);
  spiderWeb(-width*.04,height*.91-shift,Math.max(width*.31,height*.43),.15,1.1);
}
function animate(time){
  frame=0;if(paused||document.hidden)return;
  const delta=lastTime?Math.min((time-lastTime)/1000,.05):0;lastTime=time;phase+=delta;
  smoothPointer.x+=(pointer.x-smoothPointer.x)*.035;smoothPointer.y+=(pointer.y-smoothPointer.y)*.035;
  drawWeb();frame=requestAnimationFrame(animate);
}
function syncMotion(){
  if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.setAttribute('aria-label',paused?'Retomar animação do fundo':'Pausar animação do fundo');
  motionButton.replaceChildren(document.createTextNode(paused?'▶ ':'Ⅱ '),element('span','',paused?'Animar fundo':'Pausar fundo'));
  drawWeb();if(!paused&&!document.hidden)frame=requestAnimationFrame(animate);
}
function resize(){
  width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=width*dpr;canvas.height=height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);
  updateScroll();drawWeb();
}
motionButton.addEventListener('click',()=>{paused=!paused;syncMotion();});
addEventListener('pointermove',e=>{if(e.pointerType==='mouse'&&!paused){pointer.x=e.clientX/width-.5;pointer.y=e.clientY/height-.5;}},{passive:true});
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll);}},{passive:true});
addEventListener('resize',resize);
document.addEventListener('visibilitychange',syncMotion);
reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;document.querySelectorAll('.pending').forEach(e=>e.classList.remove('pending'));syncMotion();});
resize();syncMotion();
