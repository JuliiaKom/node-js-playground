document.addEventListener("DOMContentLoaded", () => {
    const foxList = document.querySelector("#foxList");
    if (!foxList) {
        console.error("Element with id 'foxList' not found.");
        return;
    }
    const buttons = document.querySelectorAll(".button");

    const foxes = [
        {
            type: "Fennec fox",
            name: "Fennec smile fox",
            likes: 9897, img: "images/fennec-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his assentior, libris docendi tractatos mea eu.",
            link: "https://en.wikipedia.org/wiki/Fennec_fox"
        },
        {
            type: "Arctic fox",
            name: "Arctic smile fox",
            likes: 4659,
            img: "images/arctic-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his assentior, libris docendi tractatos mea eu."
        },
        {
            type: "Kit fox",
            name: "Kit smile fox",
            likes: 1287,
            img: "images/kit-smile-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his ipsum corpora no."
        },
        {
            type: "Kit fox",
            name: "Kit fox",
            likes: 1037,
            img: "images/kit-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te,"
        },
        {
            type: "Red fox",
            name: "Red smile fox",
            likes: 2547,
            img: "images/red-smile-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere."
        },
        {
            type: "Red fox",
            name: "Red fox",
            likes: 1100,
            img: "images/red-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te, his \assentior, libris docendi tractatos mea eu."
        },
        {
            type: "Pet fox",
            name: "Pet smile fox",
            likes: 1000,
            img: "images/pet-smile-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere te,"
        },
        {
            type: "Pet fox",
            name: "Pet fox",
            likes: 9764,
            img: "images/pet-fox.png",
            description: "Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option"
        },
    ];

    function renderFoxes(filter) {
        foxList.innerHTML = "";
        const filteredFoxes = filter === "All" ? foxes : foxes.filter(fox => fox.type === filter);

        filteredFoxes.forEach(fox => {
            const foxCard = document.createElement("div");
            foxCard.classList.add("card");
            foxCard.innerHTML = `
               <img src="${fox.img}" alt="${fox.name}" class="fox-img">
                <div class="card-content">
                <h2  class="card-title">${fox.name} <span class="likes">❤️ ${fox.likes}</span></h2>
                <p class="card-text">${fox.description}</p>  <!-- Використовуємо опис лисиці -->
                    <span class="read-more">Read more >></span>
            </div>
            `;
            foxList.appendChild(foxCard);
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const isActive = button.classList.contains("active");

            buttons.forEach(btn => btn.classList.remove("active"));

            if (isActive) {
                renderFoxes("All");
            } else {
                button.classList.add("active");
                renderFoxes(button.dataset.filter);

                // Перехід на сторінку для Fennec fox
                if (button.dataset.filter === "Fennec fox") {
                    const fennecFox = foxes.find(fox => fox.type === "Fennec fox");
                    if (fennecFox?.link) {
                        location.href = fennecFox.link;
                    }
                }
            }
        });
    });

    renderFoxes("All");
});