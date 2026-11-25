/* ==========================================================
   Configuração do cliente: troque aqui os links de cada empresa
   ========================================================== */
const CONFIG = {
  whatsapp: "5541900000000", // DDI + DDD + número, só números
  instagram: "https://www.instagram.com/", // perfil do escritório
  google: "https://www.google.com/maps/search/personal+trainer+curitiba", // link "Avaliar no Google" do Perfil da Empresa
  mensagemPadrao: "Olá! Vi o site e quero agendar uma aula experimental.",
};

const linkZap = (texto) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

document.querySelectorAll('[data-link="instagram"]').forEach((a) => (a.href = CONFIG.instagram));
document.querySelectorAll('[data-link="google"]').forEach((a) => (a.href = CONFIG.google));
document.querySelectorAll('[data-link="whatsapp"]').forEach((a) => (a.href = linkZap(CONFIG.mensagemPadrao)));
document.getElementById("ano").textContent = new Date().getFullYear();

/* ============ Topo que muda ao rolar ============ */
const header = document.getElementById("header");
const aoRolar = () => header.classList.toggle("rolado", window.scrollY > 60);
aoRolar();
window.addEventListener("scroll", aoRolar, { passive: true });

/* ============ Menu do celular ============ */
const menu = document.getElementById("menu");
const menuBotao = document.getElementById("menuBotao");
const fecharMenu = () => {
  menu.classList.remove("aberto");
  document.body.classList.remove("menu-aberto");
  menuBotao.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};
menuBotao.addEventListener("click", () => {
  const abrir = !menu.classList.contains("aberto");
  if (!abrir) return fecharMenu();
  menu.classList.add("aberto");
  document.body.classList.add("menu-aberto");
  menuBotao.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));

/* ============ Carrosséis ============ */
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

new Swiper(".hero-swiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  speed: 1400,
  loop: true,
  autoplay: semMovimento ? false : { delay: 6000, disableOnInteraction: false },
  pagination: { el: ".hero-paginacao", clickable: true },
  navigation: { prevEl: ".hero-anterior", nextEl: ".hero-proxima" },
  keyboard: { enabled: true },
});

new Swiper(".avaliacoes-swiper", {
  slidesPerView: 1,
  spaceBetween: 18,
  speed: 700,
  grabCursor: true,
  autoplay: semMovimento ? false : { delay: 5000, pauseOnMouseEnter: true },
  pagination: { el: ".aval-paginacao", clickable: true },
  navigation: { prevEl: ".aval-anterior", nextEl: ".aval-proxima" },
  breakpoints: { 700: { slidesPerView: 2 }, 1050: { slidesPerView: 3, spaceBetween: 24 } },
});

/* ============ Aparecer ao rolar ============ */
const observador = new IntersectionObserver(
  (itens) =>
    itens.forEach((item) => {
      if (!item.isIntersecting) return;
      item.target.classList.add("visivel");
      observador.unobserve(item.target);
    }),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".aparecer").forEach((el) => observador.observe(el));

/* ============ Números que sobem ============ */
const contar = (el) => {
  const alvo = Number(el.dataset.contar);
  const sufixo = el.dataset.sufixo ? " " + el.dataset.sufixo : "";
  const inicio = performance.now();
  const duracao = 1800;
  const passo = (agora) => {
    const p = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(alvo * suave).toLocaleString("pt-BR") + sufixo.replace(" %", "%").replace(" +", "+");
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
};
const observaNumeros = new IntersectionObserver(
  (itens) =>
    itens.forEach((item) => {
      if (!item.isIntersecting) return;
      contar(item.target);
      observaNumeros.unobserve(item.target);
    }),
  { threshold: 0.6 }
);
document.querySelectorAll("[data-contar]").forEach((el) => observaNumeros.observe(el));

/* ============ Filtros da galeria ============ */
const obras = [...document.querySelectorAll(".obra")];
document.querySelectorAll(".filtro").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach((b) => {
      b.classList.toggle("ativo", b === botao);
      b.setAttribute("aria-selected", b === botao);
    });
    const filtro = botao.dataset.filtro;
    obras.forEach((obra) => obra.classList.add("saindo"));
    setTimeout(() => {
      obras.forEach((obra) => {
        const mostrar = filtro === "todos" || obra.dataset.cat === filtro;
        obra.classList.toggle("escondida", !mostrar);
      });
      requestAnimationFrame(() => obras.forEach((obra) => obra.classList.remove("saindo")));
    }, 300);
  });
});

/* ============ Foto ampliada ============ */
const lightbox = document.getElementById("lightbox");
const lbFoto = document.getElementById("lbFoto");
const lbLegenda = document.getElementById("lbLegenda");
let atual = 0;
const visiveis = () => obras.filter((o) => !o.classList.contains("escondida"));
const fotoGrande = (img) => img.src.replace(/w=\d+/, "w=1800");

const mostrarFoto = (i) => {
  const lista = visiveis();
  atual = (i + lista.length) % lista.length;
  const img = lista[atual].querySelector("img");
  lbFoto.src = fotoGrande(img);
  lbFoto.alt = img.alt;
  lbLegenda.textContent = lista[atual].querySelector("strong").textContent;
};
const abrirLightbox = (obra) => {
  mostrarFoto(visiveis().indexOf(obra));
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("aberto"));
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lb-fechar").focus();
};
const fecharLightbox = () => {
  lightbox.classList.remove("aberto");
  document.body.style.overflow = "";
  setTimeout(() => (lightbox.hidden = true), 350);
};
obras.forEach((obra) => {
  obra.tabIndex = 0;
  obra.setAttribute("role", "button");
  obra.addEventListener("click", () => abrirLightbox(obra));
  obra.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirLightbox(obra); }
  });
});
lightbox.querySelector(".lb-fechar").addEventListener("click", fecharLightbox);
lightbox.querySelector(".lb-anterior").addEventListener("click", () => mostrarFoto(atual - 1));
lightbox.querySelector(".lb-proxima").addEventListener("click", () => mostrarFoto(atual + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) fecharLightbox(); });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") fecharLightbox();
  if (e.key === "ArrowLeft") mostrarFoto(atual - 1);
  if (e.key === "ArrowRight") mostrarFoto(atual + 1);
});
let toqueX = 0;
lightbox.addEventListener("touchstart", (e) => (toqueX = e.touches[0].clientX), { passive: true });
lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) mostrarFoto(atual + (dx < 0 ? 1 : -1));
});

/* ============ Antes e depois ============ */
const comparador = document.getElementById("comparador");
comparador.querySelector("input").addEventListener("input", (e) => {
  comparador.style.setProperty("--pos", e.target.value + "%");
});

/* ============ Formulário que abre o WhatsApp ============ */
const form = document.getElementById("formContato");
const aviso = document.getElementById("formAviso");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = new FormData(form);
  const nome = dados.get("nome").trim();
  const telefone = dados.get("telefone").trim();
  if (!nome || !telefone) {
    aviso.textContent = "Preencha seu nome e telefone para continuar.";
    return;
  }
  const texto =
    `Olá! Meu nome é ${nome}.\n` +
    `Quero agendar uma aula experimental. Objetivo: ${dados.get("tipo")}.\n` +
    (dados.get("mensagem").trim() ? `${dados.get("mensagem").trim()}\n` : "") +
    `Meu telefone: ${telefone}`;
  aviso.textContent = "Abrindo o WhatsApp...";
  window.open(linkZap(texto), "_blank", "noopener");
});
