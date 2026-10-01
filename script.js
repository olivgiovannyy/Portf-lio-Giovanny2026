/* =========================================
   01. PROJETOS DO PORTFÓLIO

   Categoria única:
   categoria: "Front-end"

   Mais de uma categoria:
   categoria: ["Python", "Dados"]
========================================= */

const projetos = [
  {
    titulo: "FoodPoint — Projeto da Faculdade",
    categoria: ["Front-end","Python"],
    descricao:
      "Projeto acadêmico desenvolvido durante a graduação em Análise e Desenvolvimento de Sistemas. Código ainda em desenvolvimento, com funcionalidades e melhorias sendo implementadas.",
    tecnologias: [
      "Projeto acadêmico",
      "Em desenvolvimento"
    ],
    imagem: "assets/projetos/foodpoint.png",
    demo: "https://olivgiovannyy.github.io/FoodPoint/page-principal.html",
    codigo: "",
    simbolo: "🍔",
    placeholder: false
  },

  {
    titulo: "Monte Sião — Campeonato de Futebol",
    categoria: ["Front-end"],
    descricao:
      "Gerenciador de campeonatos com cadastro de times e atletas, grupos, rodadas, placar ao vivo, mata-mata e estatísticas.",
    tecnologias: [
      "Futebol",
      "Gestão de campeonatos"
    ],
    imagem: "assets/projetos/monte-siao.png",
    demo: "https://olivgiovannyy.github.io/Gerenciador-de-Campeonato-de-Futebol/",
    codigo: "",
    simbolo: "⚽",
    placeholder: false
  },

  {
    titulo: "ISAH — Tecnologia para o lar",
    categoria: ["Front-end"],
    descricao:
      "Projeto universitário sobre automação residencial, com apresentação de soluções para iluminação, energia, clima e segurança. Minha atuação: desenvolvimento front-end.",
    tecnologias: [
      "Front-end",
      "Automação residencial"
    ],
    imagem: "assets/projetos/isah.png",
    demo: "https://olivgiovannyy.github.io/Project-ISAH-University/",
    codigo: "",
    simbolo: "</>",
    placeholder: false
  },

  {
    titulo: "Clareza — Controle Financeiro",
    categoria: ["Python", "Dados"],
    descricao:
      "Sistema de controle financeiro pessoal com dashboard, transações, metas, planejamento e relatórios para acompanhar receitas e despesas.",
    tecnologias: [
      "Finanças",
      "Dashboard",
      "Planejamento"
    ],
    imagem: "assets/projetos/clareza.png",
    demo: "https://controle-financeiro-xegj.onrender.com/",
    codigo: "",
    simbolo: "$",
    placeholder: false
  }
];


/* =========================================
   02. TECNOLOGIAS E FERRAMENTAS

   Os ícones ficam na pasta assets/icons.
========================================= */

const tecnologias = [
  ["python", "Python"],
  ["javascript", "JavaScript"],
  ["html5", "HTML5"],
  ["css3", "CSS3"],
  ["sql", "SQL"],
  ["git", "Git"],
  ["github", "GitHub"],
  ["vscode", "VS Code"],
  ["salesforce", "Salesforce"],
  ["powerbi", "Power BI"],
  ["flask", "Flask"],
  ["photoshop", "Photoshop"],
  ["illustrator", "Illustrator"]
];


/* =========================================
   03. CONFIGURAÇÕES E FUNÇÕES AUXILIARES
========================================= */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const grid = document.querySelector("#project-grid");

/* Aceita apenas links HTTP ou HTTPS. */
function safeLink(url) {
  try {
    const endereco = new URL(url);
    const protocolosPermitidos = ["http:", "https:"];

    return protocolosPermitidos.includes(endereco.protocol)
      ? endereco.href
      : "";
  } catch {
    return "";
  }
}

/* Cria um elemento HTML com classe e texto opcionais. */
function element(tag, classe, texto) {
  const novoElemento = document.createElement(tag);

  if (classe) {
    novoElemento.className = classe;
  }

  if (texto) {
    novoElemento.textContent = texto;
  }

  return novoElemento;
}


/* =========================================
   04. FILTRO E EXIBIÇÃO DOS PROJETOS
========================================= */

function renderProjects(category = "Todos") {
  grid.replaceChildren();

  /*
     Converte a categoria em uma lista.

     "Front-end" vira ["Front-end"].
     ["Python", "Dados"] permanece como está.
  */
  const projetosFiltrados = projetos.filter((projeto) => {
    const categorias = Array.isArray(projeto.categoria)
      ? projeto.categoria
      : [projeto.categoria];

    return category === "Todos" || categorias.includes(category);
  });

  projetosFiltrados.forEach((projeto, index) => {
    /* Estrutura principal do card */
    const card = element("article", "project-card tilt");
    const visual = element("div", "project-visual");

    /* Imagem ou símbolo do projeto */
    if (projeto.imagem) {
      const imagem = element("img");

      imagem.src = projeto.imagem;
      imagem.alt = projeto.titulo;
      imagem.loading = "lazy";

      visual.append(imagem);
    } else {
      visual.append(
        element("span", "project-mark", projeto.simbolo)
      );
    }

    /* Número do card */
    const numero = String(index + 1).padStart(2, "0");

    visual.append(
      element("span", "project-index", numero)
    );

    /* Aviso para projetos futuros */
    if (projeto.placeholder) {
      visual.append(
        element("span", "project-soon", "EM BREVE")
      );
    }

    /* Título e descrição */
    const corpo = element("div", "project-body");

    corpo.append(
      element("h3", "", projeto.titulo),
      element("p", "", projeto.descricao)
    );

    /* Etiquetas de tecnologias */
    const etiquetas = element("div", "project-tags");

    projeto.tecnologias.forEach((tecnologia) => {
      etiquetas.append(
        element("span", "", tecnologia)
      );
    });

    corpo.append(etiquetas);

    /* Links do projeto */
    const links = element("div", "project-links");

    const linksDoProjeto = [
      ["Ver projeto ↗", projeto.demo],
      ["Código ↗", projeto.codigo]
    ];

    linksDoProjeto.forEach(([texto, url]) => {
      const endereco = safeLink(url);

      /* Esconde o link do código quando não foi preenchido. */
      if (texto === "Código ↗" && !endereco) {
        return;
      }

      const link = element(
        endereco ? "a" : "span",
        "",
        texto
      );

      if (endereco) {
        link.href = endereco;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.setAttribute("aria-disabled", "true");
        link.title = "Disponível quando o projeto for publicado";
      }

      links.append(link);
    });

    corpo.append(links);
    card.append(visual, corpo);
    grid.append(card);
  });

  /* Mensagem para categorias sem projetos */
  if (!grid.children.length) {
    grid.append(
      element(
        "p",
        "",
        "Ainda não há projetos nesta categoria."
      )
    );
  }

  /* Aplica o efeito de movimento aos novos cards. */
  bindTilt();
}


/* =========================================
   05. BOTÕES DOS FILTROS
========================================= */

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((outroBotao) => {
      const ativo = outroBotao === button;

      outroBotao.classList.toggle("active", ativo);
      outroBotao.setAttribute("aria-pressed", String(ativo));
    });

    renderProjects(button.dataset.filter);
  });
});

/* Mostra todos os projetos ao abrir a página. */
renderProjects();


/* =========================================
   06. EXIBIÇÃO DAS TECNOLOGIAS
========================================= */

const techGrid = document.querySelector("#tech-grid");

tecnologias.forEach(([slug, nome]) => {
  const item = element("div", "tech");
  const icone = element("div", "tech-icon");
  const imagem = element("img");

  const extensao = slug === "illustrator" ? "png" : "svg";

  imagem.src = `assets/icons/${slug}.${extensao}`;
  imagem.alt = "";
  imagem.width = 35;
  imagem.height = 35;
  imagem.loading = "lazy";

  if (["github", "flask"].includes(slug)) {
    imagem.className = "monochrome";
  }

  icone.setAttribute("aria-hidden", "true");
  icone.append(imagem);

  item.append(
    icone,
    element("p", "", nome)
  );

  techGrid.append(item);
});


/* =========================================
   07. FOTO DO PERFIL

   Caminho da foto: assets/foto-giovanny.png
========================================= */

const portrait = document.querySelector("#portrait-image");

function showPortrait() {
  if (portrait.naturalWidth) {
    portrait.hidden = false;
    document.querySelector("#portrait-fallback").hidden = true;
  }
}

portrait.addEventListener("load", showPortrait);
showPortrait();


/* =========================================
   08. MENU PARA CELULAR
========================================= */

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

function closeMenu() {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
}

toggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");

  toggle.setAttribute("aria-expanded", String(aberto));
  toggle.setAttribute(
    "aria-label",
    aberto ? "Fechar menu" : "Abrir menu"
  );
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menu.classList.contains("open")) {
    closeMenu();
    toggle.focus();
  }
});


/* =========================================
   09. BOTÃO PARA COPIAR E-MAIL
========================================= */

const copyEmailButton = document.querySelector("#copy-email");

copyEmailButton.addEventListener("click", async () => {
  const email = "2007oliveira.giovanny@gmail.com";
  const status = document.querySelector("#copy-status");

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      /* Alternativa para ambientes sem Clipboard API. */
      const campo = document.createElement("textarea");

      campo.value = email;
      campo.style.cssText = "position: fixed; left: -9999px;";

      document.body.append(campo);
      campo.select();

      const copiado = document.execCommand("copy");

      campo.remove();

      if (!copiado) {
        throw new Error("Não foi possível copiar o e-mail.");
      }
    }

    status.textContent = "E-mail copiado!";
  } catch {
    status.textContent =
      "Selecione o endereço acima para copiar o e-mail.";
  }
});


/* =========================================
   10. ESTATÍSTICAS DO GITHUB
========================================= */

document.querySelectorAll(".github-stats img").forEach((imagem) => {
  function failed() {
    imagem.hidden = true;
    document.querySelector(".stats-fallback").hidden = false;
  }

  imagem.addEventListener("error", failed);

  if (imagem.complete && !imagem.naturalWidth) {
    failed();
  }
});


/* =========================================
   11. EFEITO DE INCLINAÇÃO DOS CARDS
========================================= */

function bindTilt() {
  document.querySelectorAll(".tilt").forEach((card) => {
    /* Evita adicionar o mesmo evento mais de uma vez. */
    if (card.dataset.tiltBound) {
      return;
    }

    card.dataset.tiltBound = "true";

    card.addEventListener("pointermove", (evento) => {
      if (reducedMotion.matches || evento.pointerType !== "mouse") {
        return;
      }

      const area = card.getBoundingClientRect();

      const x = (evento.clientX - area.left) / area.width - 0.5;
      const y = (evento.clientY - area.top) / area.height - 0.5;

      card.style.transform =
        `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

bindTilt();


/* =========================================
   12. ANIMAÇÕES DE ENTRADA
========================================= */

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pending");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  const elementosAnimados = document.querySelectorAll(
    ".section-heading, .about-grid, .timeline-item, .learning-grid, .github-top"
  );

  elementosAnimados.forEach((item) => {
    item.classList.add("reveal", "pending");
    observer.observe(item);
  });
}


/* =========================================
   13. CONFIGURAÇÕES DA TEIA ANIMADA
========================================= */

const canvas = document.querySelector("#web-background");
const ctx = canvas.getContext("2d");
const motionButton = document.querySelector("#motion-toggle");

let width = 0;
let height = 0;
let frame = 0;
let lastTime = 0;
let phase = 0;
let paused = reducedMotion.matches;

const pointer = {
  x: 0,
  y: 0
};

const smoothPointer = {
  x: 0,
  y: 0
};

let scroll = window.scrollY;
let scrollPending = false;

const clamp = (numero, minimo, maximo) => {
  return Math.max(minimo, Math.min(maximo, numero));
};


/* =========================================
   14. PROGRESSO DA ROLAGEM E TRAJETÓRIA
========================================= */

function updateScroll() {
  scrollPending = false;
  scroll = window.scrollY;

  const comprimento =
    document.documentElement.scrollHeight - window.innerHeight;

  const progresso = comprimento > 0
    ? scroll / comprimento
    : 0;

  document.querySelector(".progress").style.transform =
    `scaleX(${progresso})`;

  const area = document
    .querySelector(".timeline")
    .getBoundingClientRect();

  const progressoDaLinha = clamp(
    (window.innerHeight * 0.75 - area.top) / area.height,
    0,
    1
  );

  document.querySelector(".timeline-track i").style.transform =
    `scaleY(${progressoDaLinha})`;
}


/* =========================================
   15. DESENHO DA TEIA
========================================= */

function drawWeb() {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, width, height);

  const mobile = width < 721;

  function spiderWeb(cx, cy, radius, opacity, offset) {
    const spokes = 16;
    const rings = mobile ? 9 : 12;

    const rotation =
      offset + Math.sin(phase * 0.16 + offset) * 0.025;

    cx +=
      smoothPointer.x * 16 +
      Math.sin(phase * 0.24 + offset) * 9;

    cy +=
      smoothPointer.y * 12 +
      Math.cos(phase * 0.2 + offset) * 7;

    function point(angle, raio) {
      const wave =
        1 + Math.sin(angle * 3 + phase * 0.65 + offset) * 0.016;

      return {
        x: cx + Math.cos(angle) * raio * wave,
        y: cy + Math.sin(angle) * raio * wave
      };
    }

    ctx.lineWidth = mobile ? 0.75 : 1;
    ctx.strokeStyle = `rgba(120, 169, 228, ${opacity})`;

    /* Fios que saem do centro da teia */
    for (let i = 0; i < spokes; i++) {
      const angle = rotation + (i * Math.PI * 2) / spokes;
      const end = point(angle, radius);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    /* Fios curvos que conectam a teia */
    for (let ring = 1; ring <= rings; ring++) {
      const raio = radius * Math.pow(ring / rings, 1.35);

      ctx.beginPath();

      for (let i = 0; i < spokes; i++) {
        const angle = rotation + (i * Math.PI * 2) / spokes;
        const next = angle + (Math.PI * 2) / spokes;

        const inicio = point(angle, raio);
        const fim = point(next, raio);
        const controle = point((angle + next) / 2, raio * 0.86);

        if (i === 0) {
          ctx.moveTo(inicio.x, inicio.y);
        }

        ctx.quadraticCurveTo(
          controle.x,
          controle.y,
          fim.x,
          fim.y
        );
      }

      ctx.closePath();

      ctx.strokeStyle = ring % 4 === 0
        ? `rgba(223, 31, 45, ${opacity * 1.2})`
        : `rgba(120, 169, 228, ${opacity})`;

      ctx.stroke();
    }
  }

  const deslocamento = paused
    ? 0
    : Math.sin(scroll * 0.00065) * 16;

  /* Teia principal, à direita */
  spiderWeb(
    width * (mobile ? 1.02 : 0.91),
    height * 0.27 + deslocamento,
    Math.max(width * 0.58, height * 0.7),
    mobile ? 0.2 : 0.27,
    0.15
  );

  /* Teia secundária, à esquerda */
  spiderWeb(
    -width * 0.04,
    height * 0.91 - deslocamento,
    Math.max(width * 0.31, height * 0.43),
    0.15,
    1.1
  );
}


/* =========================================
   16. ANIMAÇÃO DA TEIA
========================================= */

function animate(time) {
  frame = 0;

  if (paused || document.hidden) {
    return;
  }

  const delta = lastTime
    ? Math.min((time - lastTime) / 1000, 0.05)
    : 0;

  lastTime = time;
  phase += delta;

  smoothPointer.x += (pointer.x - smoothPointer.x) * 0.035;
  smoothPointer.y += (pointer.y - smoothPointer.y) * 0.035;

  drawWeb();

  frame = requestAnimationFrame(animate);
}


/* =========================================
   17. PAUSAR OU RETOMAR O FUNDO
========================================= */

function syncMotion() {
  if (frame) {
    cancelAnimationFrame(frame);
  }

  frame = 0;
  lastTime = 0;

  motionButton.setAttribute("aria-pressed", String(paused));

  motionButton.setAttribute(
    "aria-label",
    paused
      ? "Retomar animação do fundo"
      : "Pausar animação do fundo"
  );

  motionButton.replaceChildren(
    document.createTextNode(paused ? "▶ " : "Ⅱ "),
    element(
      "span",
      "",
      paused ? "Animar fundo" : "Pausar fundo"
    )
  );

  drawWeb();

  if (!paused && !document.hidden) {
    frame = requestAnimationFrame(animate);
  }
}


/* =========================================
   18. AJUSTE DO FUNDO AO TAMANHO DA TELA
========================================= */

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  updateScroll();
  drawWeb();
}


/* =========================================
   19. EVENTOS DO FUNDO ANIMADO
========================================= */

motionButton.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});

window.addEventListener(
  "pointermove",
  (evento) => {
    if (evento.pointerType === "mouse" && !paused) {
      pointer.x = evento.clientX / width - 0.5;
      pointer.y = evento.clientY / height - 0.5;
    }
  },
  {
    passive: true
  }
);

window.addEventListener(
  "scroll",
  () => {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(updateScroll);
    }
  },
  {
    passive: true
  }
);

window.addEventListener("resize", resize);

document.addEventListener("visibilitychange", syncMotion);

reducedMotion.addEventListener("change", () => {
  paused = reducedMotion.matches;

  document.querySelectorAll(".pending").forEach((item) => {
    item.classList.remove("pending");
  });

  syncMotion();
});


/* =========================================
   20. INICIALIZAÇÃO DO FUNDO
========================================= */

resize();
syncMotion();