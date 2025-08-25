const articles = [
  {
    title: "Kenapa Investasi Emas Menarik?",
    body: `
      <p>Emas sudah lama dikenal sebagai aset safe haven, nilainya cenderung stabil dan bahkan meningkat saat ekonomi tidak menentu.</p>
      <p>Dengan bergabung dalam bisnis emas waralaba, Anda tidak hanya menyimpan emas, tapi juga mengembangkan jaringan usaha yang menguntungkan.</p>
    `
  },
  {
    title: "Keuntungan Waralaba Emas",
    body: `
      <p>Waralaba emas memungkinkan Anda memulai bisnis tanpa harus membangun sistem dari nol.</p>
      <p>Dukungan brand, pelatihan, serta jaringan mitra membuat perjalanan bisnis lebih mudah dan potensi profit lebih besar.</p>
    `
  }
];

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const prevBtn = document.getElementById("prev-article");
const nextBtn = document.getElementById("next-article");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const swipeHints = document.querySelectorAll(".swipe-hint");

let currentIndex = 0;

// Open Modal
document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", e => {
    const idx = parseInt(e.target.closest(".article").dataset.index);
    openModal(idx);
  });
});

function openModal(index) {
  currentIndex = index;
  updateModal();
  modal.classList.add("show");
  setTimeout(() => {
    swipeHints.forEach(h => h.style.opacity = 0);
  }, 3000);
}

// Close Modal
modalClose.addEventListener("click", () => modal.classList.remove("show"));
window.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("show");
  if (e.key === "ArrowRight") nextArticle();
  if (e.key === "ArrowLeft") prevArticle();
});

function updateModal() {
  const article = articles[currentIndex];
  modalTitle.innerHTML = article.title;
  modalBody.innerHTML = article.body;
  modalBody.scrollTop = 0;
  progressText.innerText = `${currentIndex+1} / ${articles.length}`;
  progressBar.style.width = ((currentIndex+1)/articles.length * 100) + "%";
}

// Navigation
function nextArticle() {
  if (currentIndex < articles.length-1) {
    currentIndex++;
    updateModal();
  }
}
function prevArticle() {
  if (currentIndex > 0) {
    currentIndex--;
    updateModal();
  }
}
nextBtn.addEventListener("click", nextArticle);
prevBtn.addEventListener("click", prevArticle);

// Swipe
let startX = 0;
modal.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
modal.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextArticle();
  if (endX - startX > 50) prevArticle();
});
