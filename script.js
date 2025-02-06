document.addEventListener("DOMContentLoaded", () => {
    const barsContainer = document.getElementById("bars-container");
    const randomizeBtn = document.getElementById("randomize");
    const bubbleSortBtn = document.getElementById("bubbleSort");
    const insertionSortBtn = document.getElementById("insertionSort");
    const selectionSortBtn = document.getElementById("selectionSort");
    const mergeSortBtn = document.getElementById("mergeSort");
    const quickSortBtn = document.getElementById("quickSort");
    const heapSortBtn = document.getElementById("heapSort");

    let array = [];

    function createBars() {
        barsContainer.innerHTML = "";
        array.forEach(value => {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value * 3}px`;
            barsContainer.appendChild(bar);
        });
    }

    function randomizeArray() {
        array = [];
        for (let i = 0; i < 20; i++) {
            array.push(Math.floor(Math.random() * (150 - 10 + 1)) + 10);
        }
        createBars();
    }

    async function swap(bar1, bar2) {
        return new Promise(resolve => {
            setTimeout(() => {
                let tempHeight = bar1.style.height;
                bar1.style.height = bar2.style.height;
                bar2.style.height = tempHeight;
                resolve();
            }, 100);
        });
    }

    async function bubbleSort() {
        let bars = document.querySelectorAll(".bar");
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    await swap(bars[j], bars[j + 1]);
                }
            }
        }
    }

    async function insertionSort() {
        let bars = document.querySelectorAll(".bar");
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                await swap(bars[j], bars[j + 1]);
                j--;
            }
            array[j + 1] = key;
        }
    }

    async function selectionSort() {
        let bars = document.querySelectorAll(".bar");
        for (let i = 0; i < array.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [array[i], array[minIdx]] = [array[minIdx], array[i]];
                await swap(bars[i], bars[minIdx]);
            }
        }
    }

    async function mergeSort(arr = array, l = 0, r = array.length - 1) {
        if (l >= r) return;
        let m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
        let left = arr.slice(l, m + 1);
        let right = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) arr[k++] = left[i++];
            else arr[k++] = right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
        createBars();
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    async function quickSort(start = 0, end = array.length - 1) {
        if (start >= end) return;
        let pivot = array[end], index = start;
        for (let i = start; i < end; i++) {
            if (array[i] < pivot) {
                [array[i], array[index]] = [array[index], array[i]];
                index++;
            }
        }
        [array[index], array[end]] = [array[end], array[index]];
        createBars();
        await new Promise(resolve => setTimeout(resolve, 100));
        await quickSort(start, index - 1);
        await quickSort(index + 1, end);
    }

    async function heapSort() {
        function heapify(n, i) {
            let largest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && array[left] > array[largest]) largest = left;
            if (right < n && array[right] > array[largest]) largest = right;
            if (largest !== i) {
                [array[i], array[largest]] = [array[largest], array[i]];
                createBars();
                return new Promise(resolve => setTimeout(resolve, 100)).then(() => heapify(n, largest));
            }
        }
        for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) await heapify(array.length, i);
        for (let i = array.length - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            await heapify(i, 0);
        }
    }

    randomizeBtn.addEventListener("click", randomizeArray);
    bubbleSortBtn.addEventListener("click", bubbleSort);
    insertionSortBtn.addEventListener("click", insertionSort);
    selectionSortBtn.addEventListener("click", selectionSort);
    mergeSortBtn.addEventListener("click", () => mergeSort());
    quickSortBtn.addEventListener("click", () => quickSort());
    heapSortBtn.addEventListener("click", heapSort);

    randomizeArray();
});
