document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const backgroundImg = document.querySelector(".background-img-carousel");
    const carouselTitle = document.querySelector(".carouselTitle");
    const carouselText = document.querySelector(".carouselText");
    const carouselTextFox = document.querySelector(".carouselText-fox");
    const mainFox = document.querySelector(".main-fox");

    const slides = [
        {
            type: "text", // Перший слайд з текстом
            title: "What the fox say",
            text: "Amet in elementum nulla scelerisque dui, egestas at. Elit consectetur turpis elementum amet vitae et etiam nec. Varius volutpat hac adipiscing tincidunt pretium.",
            subText: "Foxy",
            image: "/images/main-fox.png"
        },
        {
            type: "image", // Другий слайд тільки з зображенням
            image: "/images/main-fox2.png"
        }
    ];

    function updateCarousel() {
        const currentSlide = slides[currentIndex];

        // Оновлюємо контент в залежності від типу слайду
        if (currentSlide.type === "text") {
            carouselTitle.textContent = currentSlide.title;
            carouselText.textContent = currentSlide.text;
            carouselTextFox.textContent = currentSlide.subText;
            mainFox.style.display = "block";
            backgroundImg.style.backgroundImage = "";

            carouselTitle.style.display = "block";
            carouselText.style.display = "block";
            carouselTextFox.style.display = "block";
        } else if (currentSlide.type === "image") {
            mainFox.style.display = "none"; // Приховуємо зображення з текстом
            backgroundImg.style.backgroundImage = `url(${currentSlide.image})`; // Встановлюємо фонове зображення

            carouselTitle.style.display = "none";
            carouselText.style.display = "none";
            carouselTextFox.style.display = "none";
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Перехід до наступного слайду
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Перехід до попереднього слайду
        updateCarousel();
    }

    document.querySelector(".next-button").addEventListener("click", nextSlide);
    document.querySelector(".prev-button").addEventListener("click", prevSlide);

    updateCarousel();



    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    const closeBtn = document.querySelector(".close");

    if (burger && menu && overlay && closeBtn) {
        burger.addEventListener("click", () => {
            menu.classList.add("active");
            overlay.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
            menu.classList.remove("active");
            overlay.classList.remove("active");
        });

        overlay.addEventListener("click", () => {
            menu.classList.remove("active");
            overlay.classList.remove("active");
        });
    } else {
        console.error("Помилка: Один або кілька елементів не знайдені!");
    }
   

});


