const data = window.productData[0];
const featuresContainer = document.getElementById("features");
function renderFeatures() {
  featuresContainer.innerHTML = data.features.map(feature => `
    <article class="card ${feature.icon}">
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </article>
  `).join("");
}
renderFeatures();
const faqContainer = document.getElementById("faqs");
function renderFaqs() {
  faqContainer.innerHTML = data.faqs.map((faq, index) => `
    <details class="card" data-index="${index}" ${faq.attribute}>
      <summary class="flex-box between nowrap">
         ${faq.question}
      </summary>
      <p>${faq.answer}</p>
    </details>
  `).join("");
}
renderFaqs();
const header = document.getElementById("header");
const headerHeight = header.offsetHeight;
window.addEventListener("scroll", () => {
  if (window.scrollY > headerHeight) {
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.zIndex = "1000";
    header.style.backgroundColor = "#fff";
    header.style.right = "0";
    header.style.width = "100%";
    document.body.style.paddingTop = headerHeight + "px";
  } else {
    header.style.position = "static";
    document.body.style.paddingTop = "0";
  }
});
const menuBtn = document.querySelector(".menu");
const nav = document.querySelector(".burger");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.classList.toggle("open");
});
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const thumbsContainer = document.querySelector('.carousel-thumbs');
let currentIndex = 0;
slides.forEach((slide, index) => {
  const img = slide.querySelector('img');
  const thumb = document.createElement('img');
  thumb.src = img.src;
  if (index === 0) thumb.classList.add('active');
  thumbsContainer.appendChild(thumb);
  thumb.addEventListener('click', () => {
    moveToSlide(index);
  });
});
const thumbs = Array.from(thumbsContainer.children);
function updateThumbs(index) {
  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[index].classList.add('active');
}
function moveToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
  updateThumbs(index);
}
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});
document.querySelectorAll('.zoom-container').forEach(container => {
  const img = container.querySelectorAll('.carousel-img');
  const preview = document.createElement('div');
  preview.classList.add('zoom-preview');
  container.appendChild(preview);
  function setZoomBackground() {
    preview.style.backgroundImage = `url(${img.src})`;
    preview.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
  }
  if (img.complete) {
    setZoomBackground();
  } else {
    img.addEventListener('load', setZoomBackground);
  }
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    preview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });
});