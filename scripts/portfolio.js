// MENU HAMBURGER
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Fermer le menu quand on clique sur un lien (mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// DARK MODE
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

// MODAL PROJET
const projectMoreButtons = document.querySelectorAll(".project-more");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalBody = document.getElementById("modalBody");

const projectsData = {
  1: {
    title: "Portfolio personnel",
    date: "2025",
    tech: "HTML, CSS, JavaScript",
    description:
      "Création de mon portfolio personnel responsive pour présenter mes projets, mes compétences et me contacter.",
    link: "https://github.com/mahyahf/portfolio-mahya"
  },
  2: {
    title: "Mini application To-Do",
    date: "2025",
    tech: "HTML, CSS, JavaScript (localStorage)",
    description:
      "Mini application To-Do permettant d’ajouter, gérer et supprimer des tâches. Les données sont sauvegardées dans le navigateur grâce au localStorage.",
    link: "https://github.com/mahyahf/todo-app-mahya"
  }
};


function openModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;
  modalBody.innerHTML = `
    <h3>${project.title}</h3>
    <p><strong>Date :</strong> ${project.date}</p>
    <p><strong>Technologies :</strong> ${project.tech}</p>
    <p>${project.description}</p>
    <p><a href="${project.link}" target="_blank">Voir le code sur GitHub</a></p>
  `;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

projectMoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-project");
    openModal(id);
  });
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

// FORMULAIRE CONTACT – Validation simple
const contactForm = document.getElementById("contactForm");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorMessage = document.getElementById("errorMessage");
const formStatus = document.getElementById("formStatus");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorMessage.textContent = "";
  formStatus.textContent = "";

  const nameValue = contactForm.name.value.trim();
  const emailValue = contactForm.email.value.trim();
  const messageValue = contactForm.message.value.trim();

  if (nameValue.length < 2) {
    errorName.textContent = "Merci d’indiquer votre nom.";
    valid = false;
  }

  if (!validateEmail(emailValue)) {
    errorEmail.textContent = "Merci d’indiquer un e-mail valide.";
    valid = false;
  }

  if (messageValue.length < 5) {
    errorMessage.textContent = "Merci d’écrire un message plus détaillé.";
    valid = false;
  }

  if (!valid) return;

  // Pour le devoir, on simule l’envoi
  formStatus.textContent = "Merci ! Votre message a été validé (simulation).";
  contactForm.reset();
});
