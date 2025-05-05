document.addEventListener("DOMContentLoaded", () => {
    function getRandomValue(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomColor() {
        const randomType = Math.floor(Math.random() * 3); // Випадковий вибір типу кольору (0 - Hex, 1 - RGB, 2 - RGBA)

        if (randomType === 0) {
            // Генерація кольору в форматі Hex
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        } else if (randomType === 1) {
            // Генерація кольору в форматі RGB
            return `rgb(${getRandomValue(256)}, ${getRandomValue(256)}, ${getRandomValue(256)})`;
        } else {
            // Генерація кольору в форматі RGBA
            const a = Math.random().toFixed(2); // Альфа-канал між 0 і 1
            return `rgba(${getRandomValue(256)}, ${getRandomValue(256)}, ${getRandomValue(256)}, ${a})`;
        }
    }

    function changeBoxColor(box) {
        const newColor = getRandomColor();
        box.style.backgroundColor = newColor;
        box.querySelector('.color-text').textContent = `background: ${newColor}`;
    }

    function createColorBox(index) {
        const box = document.createElement('div');
        box.className = 'color-box';

        const logo = document.createElement('img');
        logo.src = 'image/fox-img.png';
        logo.classList.add('box-logo');

        const colorText = document.createElement('div');
        colorText.className = 'color-text';
        colorText.textContent = 'background: #FFFFFF';

        const button = document.createElement('button');
        button.classList.add('color-button');
        button.textContent = 'Click me';
        button.onclick = () => changeBoxColor(box);

        // Якщо це середній елемент, додаємо спеціальний клас
        if (index === 1) {
            button.classList.add('middle-button');
        }

        box.appendChild(logo);
        box.appendChild(colorText);
        box.appendChild(button);
        document.querySelector('.container').appendChild(box);
    }

    for (let i = 0; i < 6; i++) {
        createColorBox(i);
    }
});
