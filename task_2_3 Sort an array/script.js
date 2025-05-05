document.addEventListener("DOMContentLoaded", () => {
    const sortBtn = document.querySelector("#sort-btn");
    const statsElement = document.querySelector("#stats");
    const conclusionElement = document.querySelector("#conclusion");

    if (!sortBtn || !statsElement || !conclusionElement) {
        console.error("Не знайдено один із елементів: #sort-btn, #stats, #conclusion");
        return;
    }

// сортування bubbleSort

    function bubbleSort(arr) {
        let iterations = 0;
        let sortedArray = [...arr];
        for (let i = 0; i < sortedArray.length - 1; i++) {
            for (let j = 0; j < sortedArray.length - 1 - i; j++) {
                iterations++;
                if (sortedArray[j] > sortedArray[j + 1]) {
                    [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                }
            }
        }
        return { sortedArray, iterations };
    }

    // Сортування Selection Sort
    function selectionSort(arr) {
        let iterations = 0;
        let sortedArray = [...arr];
        for (let i = 0; i < sortedArray.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < sortedArray.length; j++) {
                iterations++;
                if (sortedArray[j] < sortedArray[minIndex]) {
                    minIndex = j;
                }
            }
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
        return { sortedArray, iterations };
    }

     // Сортування Insertion Sort
    function insertionSort(arr) {
        let iterations = 0;
        let sortedArray = [...arr];
        for (let i = 1; i < sortedArray.length; i++) {
            let key = sortedArray[i];
            let j = i - 1;
            while (j >= 0 && sortedArray[j] > key) {
                iterations++;
                sortedArray[j + 1] = sortedArray[j];
                j--;
            }
            sortedArray[j + 1] = key;
        }
        return { sortedArray, iterations };
    }
    
      // Сортування Merge Sort
    function mergeSort(arr, iterations = { count: 0 }) {
        if (arr.length <= 1) return { sortedArray: arr, iterations: iterations.count };

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid), iterations);
        const right = mergeSort(arr.slice(mid), iterations);
        const merged = merge(left.sortedArray, right.sortedArray, iterations);

        return { sortedArray: merged, iterations: iterations.count };
    }

        // Функція злиття для Merge Sort
    function merge(left, right, iterations) {
        let result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            iterations.count++;
            if (left[i] < right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        return [...result, ...left.slice(i), ...right.slice(j)];
    }

      // Швидке сортування Quick Sort

    function quickSort(arr, iterations = { count: 0 }) {
        if (arr.length <= 1) return { sortedArray: arr, iterations: iterations.count };

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [], right = [];

        for (let i = 0; i < arr.length; i++) {
            iterations.count++;
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else if (arr[i] > pivot) {
                right.push(arr[i]);
            }
        }

        const leftSorted = quickSort(left, iterations);
        const rightSorted = quickSort(right, iterations);

        return { sortedArray: [...leftSorted.sortedArray, pivot, ...rightSorted.sortedArray], iterations: iterations.count };
    }

    // Функція генерації випадкового масиву

    function generateRandomArray(size, min, max) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

       // Обробка натискання кнопки "Сортувати"
    sortBtn.addEventListener("click", () => {
        const arr = generateRandomArray(20, 1, 300);
        statsElement.innerHTML = "...";

        setTimeout(() => {
            const sortingAlgorithms = [
                { name: "Bubble Sort", func: bubbleSort },
                { name: "Selection Sort", func: selectionSort },
                { name: "Insertion Sort", func: insertionSort },
                { name: "Merge Sort", func: mergeSort },
                { name: "Quick Sort", func: quickSort }
            ];

            let results = sortingAlgorithms.map(({ name, func }) => {
                const iterations = { count: 0 };
                const startTime = performance.now();
                const { sortedArray, iterations: iters } = func(arr, iterations);
                const endTime = performance.now();
                return { name, sortedArray, time: (endTime - startTime).toFixed(4), iterations: iters };
            });

            statsElement.innerHTML = `<table class="sorting-table">
                <tr>
                  <th class="table-header">Алгоритм</th>
                  <th class="table-header">Відсортований масив</th>
                  <th class="table-header">Час (мс)</th>
                  <th class="table-header">Ітерації</th>
                </tr>
                ${results.map(r => `<tr>
                     <td class="first-column">${r.name}</td>
                     <td class="algoritm-name">${r.sortedArray.join(", ")}</td>
                     <td class="algoritm-name">${r.time}</td>
                     <td class="algoritm-name">${r.iterations}</td>
                </tr>`).join("")}
            </table>`;

            const fastest = results.reduce((prev, curr) => (parseFloat(curr.time) < parseFloat(prev.time) ? curr : prev));

            conclusionElement.innerHTML = `🔹 Найшвидший алгоритм: <strong>${fastest.name}</strong> (Час: ${fastest.time} мс)`;

        }, 50);
    });
});

