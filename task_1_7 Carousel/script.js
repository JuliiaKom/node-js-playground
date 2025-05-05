document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    const carouselNextBtn = document.querySelector(".carousel-next");
    const carouselPrevBtn = document.querySelector(".carousel-prev");

    let currentIndex = 0;

    const slidesData = [
        { src: '/images/img1.jpg', alt: 'Image 1' },
        { src: '/images/img2.jpg', alt: 'Image 2' },
        { src: '/images/img3.jpg', alt: 'Image 3' },
        { src: '/images/img4.jpg', alt: 'Image 4' },
        { src: '/images/img5.jpg', alt: 'Image 5' },
    ];

    if (!carouselContainer || !indicatorsContainer) {
        console.error("Елемент не знайдено!");
        return;
    }

    // рендер слайдів
    function renderSlides(slides) {
        carouselContainer.innerHTML = "";
        slides.forEach((slide) => {
            const imgElement = document.createElement("img");
            imgElement.src = slide.src;
            imgElement.alt = slide.alt;
            imgElement.classList.add("carousel-img");
            carouselContainer.appendChild(imgElement);
        });
    }

    //    рендер індикаторів
    function renderIndicators(slides) {
        indicatorsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const li = document.createElement("li");
            li.classList.add("carousel-indicator");
            if (index === currentIndex) li.classList.add("active");
            li.dataset.index = index;
            indicatorsContainer.appendChild(li);
        });
    }

    //    оновлення відображення слайдів та індикаторів
    function updateCarousel() {
        const images = carouselContainer.querySelectorAll(".carousel-img");
        const indicators = indicatorsContainer.querySelectorAll(".carousel-indicator");

        images.forEach((img, index) => {
            img.style.display = index === currentIndex ? "block" : "none";
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    // Показ наступного зображення
    function showNextImage() {
        currentIndex = (currentIndex + 1) % slidesData.length;
        updateCarousel();
    }

    // Показ попереднього зображення
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
        updateCarousel();
    }

    //  ініціалізація каруселі
    function initCarousel() {
        renderSlides(slidesData);
        renderIndicators(slidesData);
        updateCarousel();

        // Обробники подій для кнопок
        carouselNextBtn.addEventListener("click", showNextImage);
        carouselPrevBtn.addEventListener("click", showPrevImage);

        // клік по індикаторах
        indicatorsContainer.addEventListener("click", (event) => {
            const clickedIndicator = event.target.closest(".carousel-indicator");
            if (clickedIndicator) {
                currentIndex = Number(clickedIndicator.dataset.index);
                updateCarousel();
            }
        });
    }

    initCarousel();
});

