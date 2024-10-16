let allItems = []; // Массив для всех элементов
let currentStartIndex = 0; // Текущий стартовый индекс для показа

async function fetchData() {
  try {
    const response = await fetch('./country.json'); // Укажите свой API URL
    const jsonData = await response.json();

    // Фильтруем и выбираем данные
    allItems = jsonData.data.filter(item => {
      const calculatedDSum = item.d_sum;
      const percent = (calculatedDSum / item.prev2wks_d_daily_avg) - 1;
      return isFinite(percent) && percent > 1;
    });

    updateAlerts(); // Изначально запускаем цикл показа
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateAlerts() {
  const alertList = document.getElementById('alert-list');
  alertList.innerHTML = ''; // Очищаем предыдущие элементы

  // Отображаем 4 элемента, начиная с currentStartIndex
  const alertsToShow = allItems.slice(currentStartIndex, currentStartIndex + 4).map(item => {
    const calculatedDSum = item.d_sum;
    const percent = ((calculatedDSum / item.prev2wks_d_daily_avg) - 1).toFixed(2);

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="alert-icon">
       <div class="alert-notification">
        <dotlottie-player src="https://lottie.host/424e771a-30b9-4840-a72a-2c4db993bfc4/TBdmfEkhaS.json"
          background="transparent" speed="1" style="width: 60px; height: 60px;" loop autoplay></dotlottie-player>
      </div>
      </span>
      <strong>${item.tcount}</strong> - ${percent}%
    `;
    return li;
  });

  // Добавляем элементы в DOM
  alertsToShow.forEach(alert => alertList.appendChild(alert));

  const liItems = alertList.getElementsByTagName('li');

  if (liItems.length > 0) {
    displayNextBatch(liItems);

    // Увеличиваем индекс для показа следующих элементов
    currentStartIndex = (currentStartIndex + 4) % allItems.length;

    setTimeout(() => {
      hideAllItems(liItems); // Скрываем текущие элементы перед показом новых
      setTimeout(() => {
        updateAlerts(); // Обновляем элементы
      }, 500); // Задержка для плавного скрытия
    }, 5000); // Интервал между показами (5 секунд)
  }
}

function displayNextBatch(items) {
  for (let i = 0; i < items.length; i++) {
    setTimeout(() => {
      items[i].classList.add('visible');
    }, i * 200); // Задержка для плавного показа каждого элемента
  }
}

function hideAllItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('visible');
  }
}

fetchData(); // Первичный вызов при загрузке страницы