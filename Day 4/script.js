const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");
const thumbnails = document.querySelectorAll(".thumbnail");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

// Open modal and show clicked image
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = thumb.src;
    currentIndex = index;
  });
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Navigate previous
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  modalImg.src = thumbnails[currentIndex].src;
};

// Navigate next
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % thumbnails.length;
  modalImg.src = thumbnails[currentIndex].src;
};

// Close if clicked outside image
window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
