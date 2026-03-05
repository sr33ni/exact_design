const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const thumbsContainer = document.querySelector('.carousel-thumbs');

let currentIndex = 0;

// Create Thumbnails
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
  currentIndex =
    (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});

// Zoom Effect
document.querySelectorAll('.zoom-container').forEach(container => {
  const img = container.querySelector('img');
  const preview = container.querySelector('.zoom-preview');

  preview.style.backgroundImage = `url(${img.src})`;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    preview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });
});

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


const tabs = document.querySelectorAll('.tab');
const contentTrack = document.querySelector('.process-content');
const sliders = document.querySelectorAll('.content-item');
const prev = document.querySelector('.mobile-arrow.prev');
const next = document.querySelector('.mobile-arrow.next');

let currentIndexs = 0;

/* ========== TAB CLICK (Desktop) ========== */
tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        if (window.innerWidth <= 768) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const index = parseInt(tab.dataset.index);
        sliders.forEach(s => s.classList.remove('active'));
        sliders[index].classList.add('active');
    });
});

/* ========== MOBILE CAROUSEL ========== */
function updateCarousel() {
    contentTrack.style.transform =
        `translateX(-${currentIndexs * 100}%)`;
}

next.addEventListener('click', () => {
    if (currentIndexs < sliders.length - 1) {
        currentIndexs++;
        updateCarousel();
    }
});

prev.addEventListener('click', () => {
    if (currentIndexs > 0) {
        currentIndexs--;
        updateCarousel();
    }
});

/* Sync tab when sliding */
function syncTabs() {
    tabs.forEach(t => t.classList.remove('active'));
    if (tabs[currentIndexs]) {
        tabs[currentIndexs].classList.add('active');
    }
}