// Fungsi untuk membangkitkan bilangan acak
function generateBilangan(jumlah) {
    const bilangan = [];
    for (let i = 0; i < jumlah; i++) {
        bilangan.push(Math.floor(Math.random() * 100));
    }
    return bilangan;
}

// Fungsi untuk melakukan QUICK sort
function quickSort(bilangan) {
    if (bilangan.length <= 1) {
        return bilangan;
    }
    const pivot = bilangan[0];
    const left = [];
    const right = [];
    for (let i = 1; i < bilangan.length; i++) {
        if (bilangan[i] <= pivot) {
            left.push(bilangan[i]);
        } else {
            right.push(bilangan[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

// Fungsi untuk melakukan MERGE sort
function mergeSort(bilangan) {
    if (bilangan.length <= 1) {
        return bilangan;
    }
    const mid = Math.floor(bilangan.length / 2);
    const left = bilangan.slice(0, mid);
    const right = bilangan.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

// Fungsi untuk mengukur durasi waktu
function measureTime(func, bilangan) {
    const startTime = performance.now();
    func(bilangan);
    const endTime = performance.now();
    return endTime - startTime;
}

// Fungsi untuk melakukan sorting dan menampilkan hasil
function performSort(type) {
    const jumlahBilangan = parseInt(document.getElementById('jumlah-bilangan').value);
    if (isNaN(jumlahBilangan) || jumlahBilangan <= 0) {
        alert('Masukkan jumlah bilangan yang valid!');
        return;
    }

    const bilangan = generateBilangan(jumlahBilangan);

    let normalCaseDuration, worstCaseDuration, bestCaseDuration;
    let sortedBilanganNormal, sortedBilanganWorst, sortedBilanganBest;

    if (type === 'quick') {
        normalCaseDuration = measureTime(quickSort, bilangan.slice());
        sortedBilanganNormal = quickSort(bilangan.slice());

        worstCaseDuration = measureTime(quickSort, bilangan.slice().sort((a, b) => b - a));
        sortedBilanganWorst = quickSort(bilangan.slice().sort((a, b) => b - a));

        bestCaseDuration = measureTime(quickSort, bilangan.slice().sort((a, b) => a - b));
        sortedBilanganBest = quickSort(bilangan.slice().sort((a, b) => a - b));
    } else if (type === 'merge') {
        normalCaseDuration = measureTime(mergeSort, bilangan.slice());
        sortedBilanganNormal = mergeSort(bilangan.slice());

        worstCaseDuration = measureTime(mergeSort, bilangan.slice().sort((a, b) => b - a));
        sortedBilanganWorst = mergeSort(bilangan.slice().sort((a, b) => b - a));

        bestCaseDuration = measureTime(mergeSort, bilangan.slice().sort((a, b) => a - b));
        sortedBilanganBest = mergeSort(bilangan.slice().sort((a, b) => a - b));
    }

    document.getElementById('hasil-sorting').innerHTML = `
        <h3>Hasil ${type.toUpperCase()} Sort:</h3>
        <table>
            <thead>
                <tr>
                    <th>Normal Case</th>
                    <th>Worst Case</th>
                    <th>Best Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${sortedBilanganNormal.join(', ')}</td>
                    <td>${sortedBilanganWorst.join(', ')}</td>
                    <td>${sortedBilanganBest.join(', ')}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById('durasi-waktu').innerHTML = `
        <h3>Durasi Waktu ${type.toUpperCase()} Sort:</h3>
        <table>
            <thead>
                <tr>
                    <th>Normal Case</th>
                    <th>Worst Case</th>
                    <th>Best Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${normalCaseDuration.toFixed(2)} ms</td>
                    <td>${worstCaseDuration.toFixed(2)} ms</td>
                    <td>${bestCaseDuration.toFixed(2)} ms</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Fungsi untuk mengosongkan hasil
function clearResults() {
    document.getElementById('hasil-sorting').innerHTML = '';
    document.getElementById('durasi-waktu').innerHTML = '';
    document.getElementById('jumlah-bilangan').value = ''; // Bersihkan input bilangan juga
}

// Event listener untuk tombol sort quick
document.getElementById('sort-quick').addEventListener('click', () => {
    performSort('quick');
});

// Event listener untuk tombol sort merge
document.getElementById('sort-merge').addEventListener('click', () => {
    performSort('merge');
});

// Event listener untuk tombol clear
document.getElementById('clear-results').addEventListener('click', clearResults);