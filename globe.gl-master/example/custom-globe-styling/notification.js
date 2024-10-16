const transactionContainer = document.getElementById('transaction-container');
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

let texts = []; // Здесь хранится только последняя транзакция
const morphTime = 1;
const cooldownTime = 0.25;
let textIndex = 0;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
let isMorphing = true; // Контролируем процесс морфинга

function setMorph(fraction) {
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
}

function doMorph() {
    if (!isMorphing) return;

    morph += cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;
    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);

    if (fraction === 1) {
        isMorphing = false;
        cooldown = cooldownTime;
        elts.text1.textContent = elts.text2.textContent;
    }
}

function doCooldown() {
    morph = 0;
    isMorphing = false;
    elts.text2.style.opacity = "0%";
    elts.text1.style.opacity = "100%";
}

function animate() {
    requestAnimationFrame(animate);
    let newTime = new Date();
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        doMorph();
    } else {
        doCooldown();
    }
}

function updateNotificationContent(transaction) {
    const formattedTam = transaction.tam.toLocaleString('ru-RU');
    texts = [`— ${formattedTam} ${transaction.tcur} 🠆 ${transaction.country} `];
    elts.text1.textContent = texts[0];
    elts.text2.textContent = texts[0];
    isMorphing = true;
}

async function createTransactionAlert(transaction, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const alert = document.createElement('div');
            const formattedTam = transaction.tam.toLocaleString('ru-RU');
            alert.className = 'alert fade alert-info alert-dismissible';

            if (transaction.tp === 'c') {
                alert.classList.add('alert-danger');
                alert.innerHTML = `
                    <i class="start-icon fas fa-exclamation-circle faa-shake"></i>
                    ${transaction.country}:  - ${formattedTam} ${transaction.tcur} 
                `;
            } else if (transaction.tp === 'd') {
                alert.classList.add('alert-success');
                alert.innerHTML = `
                    <i class="start-icon fas fa-info-circle faa-shake"></i>
                    ${transaction.country}:  + ${formattedTam} ${transaction.tcur} 
                `;
            }

            transactionContainer.appendChild(alert);

            setTimeout(() => {
                alert.remove();
                updateNotificationContent(transaction);
                resolve();
            }, 6000); // Анимация слайдера и скрытие
        }, delay);
    });
}

const testTransactions = [
    { country: "USA", tp: "d", tam: 4690.02, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 3932.39, tcur: "EUR" },
    { country: "CHA", tp: "d", tam: 4690.02, tcur: "CNY" },
    { country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 4690.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 4690.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 4690.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 4690.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 5690.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 5490.02, tcur: "EUR" },{ country: "USA", tp: "d", tam: 3972.39, tcur: "USD" },
    { country: "FRA", tp: "c", tam: 5460.02, tcur: "EUR" }
];

async function displayTransactions() {
    for (let i = 0; i < testTransactions.length; i++) {
        await createTransactionAlert(testTransactions[i], i * 500);
    }
}

animate();
displayTransactions();