const correctPassword = "eusouamadaporlulu";

const gateScreen = document.getElementById("gateScreen");
const mainScreen = document.getElementById("mainScreen");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const passwordMessage = document.getElementById("passwordMessage");
const portalTransition = document.getElementById("portalTransition");
const unlockFlash = document.getElementById("unlockFlash");

// DESBLOQUEIO
unlockBtn.addEventListener("click", unlockAdventure);
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockAdventure();
});

function unlockAdventure() {
  const typedPassword = passwordInput.value.trim().toLowerCase();

  if (typedPassword === correctPassword) {
    passwordMessage.textContent = "Aventura liberada com sucesso ✨";
    passwordMessage.style.color = "#ffd36e";

    unlockFlash.classList.add("active");
    portalTransition.classList.add("active");

    setTimeout(() => {
      unlockFlash.classList.remove("active");
    }, 450);

    setTimeout(() => {
      gateScreen.classList.remove("active");
      mainScreen.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);

    setTimeout(() => {
      portalTransition.classList.remove("active");
    }, 2200);
  } else {
    passwordMessage.textContent = "Senha incorreta. Tenta de novo, astronauta 💫";
    passwordMessage.style.color = "#ff8edf";
  }
}

// TABS
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// PLAYER DE MÚSICA
const musicFrame = document.getElementById("musicFrame");
const musicModeButtons = document.querySelectorAll(".music-mode-btn");
const songSelector = document.getElementById("songSelector");
const songButtons = document.querySelectorAll(".song-btn");

musicModeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    musicModeButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    const mode = btn.dataset.mode;

    if (mode === "playlist") {
      songSelector.classList.add("hidden");
      musicFrame.src = "https://www.youtube.com/embed/videoseries?list=PLrbfT4u9TnqBvzNfvsaRS1poM_sYZMMEN";
      songButtons.forEach((item) => item.classList.remove("active"));
      songButtons[0].classList.add("active");
    } else {
      songSelector.classList.remove("hidden");
    }
  });
});

songButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    songButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    const video = btn.dataset.video;
    musicFrame.src = `https://www.youtube.com/embed/${video}`;
  });
});

// GALERIAS - 2 ESPAÇOS / 20 FOTOS
const galleries = {
  gallery1: [
    { src: "images/f1-1.jpg", caption: "eu sou feliz com você " },
    { src: "images/f1-2.jpg", caption: "você sabe o que é isso, né? " },
    { src: "images/f1-3.jpg", caption: "como tá de frio aí?" },
    { src: "images/f1-4.jpg", caption: "yo te quiero" },
    { src: "images/f1-5.jpg", caption: "você é a irmã que eu pedi a Deus " },
    { src: "images/f1-6.jpg", caption: "criar memórias contigo é incrível " },
    { src: "images/f1-7.jpg", caption: " amo sorrir de besteirolinhas com você " },
    { src: "images/f1-8.jpg", caption: "tô contigo e não abro" },
    { src: "images/f1-9.jpg", caption: "sorriremos juntas ainda..." },
    { src: "images/f1-10.jpg", caption: "viveremos dias ainda mais felizes <3 " }
  ],
  gallery2: [
    { src: "images/f2-1.jpg", caption: "te amo!" },
    { src: "images/f2-2.jpg", caption: "pepê " },
    { src: "images/f2-3.jpg", caption: "neneca" },
    { src: "images/f2-4.jpg", caption: "minha sisis" },
    { src: "images/f2-5.jpg", caption: "seja muito feliz e viva tudo que vc tem p viver" },
    { src: "images/f2-6.jpg", caption: "obrigada pela sua vida e seu coração " },
    { src: "images/f2-7.jpg", caption: "estamos juntas em todo tempo " },
    { src: "images/f2-8.jpg", caption: "você é linda <3 " },
    { src: "images/f2-9.jpg", caption: "um carinho enorme pelo seu coração " },
    { src: "images/f2-10.jpg", caption: " você nasceu para prosperar e viver a vida sorrindo e alegre.  " }
  ]
};

function renderGallery(galleryId, photos) {
  const galleryElement = document.getElementById(galleryId);

  galleryElement.innerHTML = photos.map(photo => `
    <div class="photo-card" data-image="${photo.src}" data-caption="${photo.caption}">
      <img
        src="${photo.src}"
        alt="${photo.caption}"
        onerror="this.src='https://placehold.co/800x1000/1b0a2a/ffffff?text=Sua+foto+aqui';"
      />
      <div class="photo-caption">${photo.caption}</div>
    </div>
  `).join("");
}

Object.entries(galleries).forEach(([galleryId, photos]) => {
  renderGallery(galleryId, photos);
});

// EFEITO 3D NAS FOTOS
function activate3DCards() {
  const cards = document.querySelectorAll(".photo-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 12;
      const rotateX = (centerY - y) / 12;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    });
  });
}

activate3DCards();

// MODAL FOTO
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", (e) => {
  const photoCard = e.target.closest(".photo-card");
  if (!photoCard) return;

  modalImage.src = photoCard.dataset.image;
  modalCaption.textContent = photoCard.dataset.caption;
  photoModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  photoModal.classList.remove("active");
});

photoModal.addEventListener("click", (e) => {
  if (e.target === photoModal) {
    photoModal.classList.remove("active");
  }
});

// TO DO
const defaultTodos = [
  "Viajar juntas de novo e viver uma experiência inesquecível",
  "Ter um dia inteiro só nosso com comida boa e conversa profunda",
  "Fazer um álbum físico lindo das nossas memórias",
  "Passar mais um aniversário juntas",
  "Ter um momento de oração e gratidão muito especial",
  "Conhecer um lugar novo juntas",
"Criar uma tradição anual da nossa amizade"
];

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

let todos = [...defaultTodos].map((text) => ({ text, done: false }));

function renderTodos() {
  todoList.innerHTML = todos.map((todo, index) => `
    <li class="todo-item">
      <div class="todo-left">
        <input type="checkbox" ${todo.done ? "checked" : ""} onchange="toggleTodo(${index})" />
        <span class="todo-text ${todo.done ? "done" : ""}">${todo.text}</span>
      </div>
      <button class="remove-todo" onclick="removeTodo(${index})">Remover</button>
    </li>
  `).join("");
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  todoInput.value = "";
  renderTodos();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

window.toggleTodo = toggleTodo;
window.removeTodo = removeTodo;

renderTodos();

// CONTADOR
const friendshipStartDate = new Date("2024-04-02T00:00:00");

function updateFriendshipCounter() {
  const now = new Date();
  const diff = now - friendshipStartDate;

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365.25);
  const days = Math.floor(totalDays - years * 365.25);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  document.getElementById("years").textContent = years;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  document.getElementById("yearsCard").textContent = years;
  document.getElementById("daysCard").textContent = days;
  document.getElementById("hoursCard").textContent = hours;
  document.getElementById("minutesCard").textContent = minutes;
  document.getElementById("secondsCard").textContent = seconds;
}

updateFriendshipCounter();
setInterval(updateFriendshipCounter, 1000);

// PARTÍCULAS
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 95;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function randomColor() {
  const colors = [
    "255,255,255",
    "255,211,110",
    "255,95,207",
    "143,70,255"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.5,
    speedY: Math.random() * 0.4 + 0.1,
    speedX: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.7 + 0.15,
    color: randomColor(),
    glow: Math.random() * 12 + 8
  };
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
    ctx.shadowBlur = p.glow;
    ctx.shadowColor = `rgba(${p.color}, 0.7)`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.y -= p.speedY;
    p.x += p.speedX;

    if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 10;
    }
  });

  requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();