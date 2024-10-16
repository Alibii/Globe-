    // Первый виджет
    document.addEventListener('DOMContentLoaded', function() {
      const mainElement = document.querySelector('.main');
      let currentCountryIndex = 0;
      const apiUrl = './country.json';

      async function fetchData() {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }

      function hideMainBlock() {
        mainElement.classList.remove('show');
        mainElement.classList.add('fade-out');
      }

      function showMainBlock() {
        mainElement.classList.remove('fade-out');
        mainElement.classList.add('show');
      }

  async function displayCountryData() {
    const data = await fetchData();
    
    if (!data || !data.data) return;
    
    const countryData = data.data[currentCountryIndex];

    const initialValue = countryData.d_sum / ((countryData.tod - countryData.ystrd) + 1);
    const higherValue = countryData.prev2wks_d_daily_avg * 1.2;
    const avgOutgoing = countryData.prev2wks_d_daily_avg;
    const avgOnMonth = countryData.c_sum;
    const avgOnYear = countryData.prev2wks_c_sum;
    
    const customTicks = [
      0, 
      Math.max(250, initialValue * 0.8),  
      initialValue, 
      Math.min(initialValue * 1.2, 1560), 
      avgOutgoing, 
      Math.min(avgOutgoing * 1.2)
    ];
    
    displayData(
      countryData.tcount, initialValue, higherValue, avgOutgoing,
      avgOnMonth, avgOnYear, customTicks
    );

        showMainBlock();

        // После 15 секунд скрываем первый виджет и запускаем второй
        setTimeout(() => {
          hideMainBlock();
          setTimeout(() => {
            displaySecondWidget(); // Запуск второго виджета
          }, 1000);
        }, 15000);
      }

      function displayData(countryCode, initialValue, higherValue, avgOutgoing, avgOnMonth, avgOnYear, customTicks) {
    const gaugeContainer = document.querySelector('.gauge-container');
    
    gaugeContainer.innerHTML = '';
    
    const gaugeElement = document.createElement('div');
    gaugeElement.classList.add('gauge');
    gaugeContainer.appendChild(gaugeElement);

    const params = {
      initialValue: initialValue,
      higherValue: higherValue,
      title: `${countryCode} тыс.тг`,
      subtitle: `${initialValue.toLocaleString('ru-RU')}`,
      customTicks: customTicks  
    };

    let gauge = new GaugeChart(gaugeElement, params);
    gauge.init();
    
    const listElement = document.querySelector('.style-1');
    const formattedInitialValue = initialValue.toLocaleString('ru-RU');
    const formattedAvgOutgoing = avgOutgoing.toLocaleString('ru-RU');
    const formattedAvgOnMonth = avgOnMonth.toLocaleString('ru-RU');
    const formattedAvgOnYear = avgOnYear.toLocaleString('ru-RU');


    listElement.innerHTML = `
      <li><em>Исходящие:</em><span> ${formattedInitialValue} </span></li>
      <li><em>В среднем исх.:</em><span>${formattedAvgOutgoing}</span></li>
      <li><em>Исходящие в месяц:</em><span>${formattedAvgOnMonth}</span></li>
      <li><em>Исходящие на год:</em><span>${formattedAvgOnYear}</span></li>
    `;
    
    // Показываем элементы данных
    const dataElements = mainElement.querySelectorAll('.hidden');
    dataElements.forEach((el) => {
      el.classList.remove('hidden');
      el.classList.add('visible');
    });
  }

      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          return {
            value: this._initialValue,
            valueIndicator: { color: '#fff' },
            geometry: { startAngle: 180, endAngle: 360 },
            scale: {
              startValue: 0, endValue: this._higherValue,
              label: { font: { color: '#fff', size: 12 } }
            },
            title: {
              text: this._title,
              font: { family: '"Open Sans", sans-serif', color: '#fff', size: 18 },
              subtitle: { text: this._subtitle, font: { color: '#fff', size: 28 } }
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }

        // Старт анимации и отображения данных первой страны
  setTimeout(displayCountryData, 500);

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Исходящие',
            data: [8700, 5700, 3740, 5005, 2013, 9013],
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "white", 
                    font: {
                        size: 18
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white", 
                    font: {
                        size: 18
                    },
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white", 
                    font: {
                        size: 10
                    },
                    stepSize: 1,
                    beginAtZero: true
                }
            }
        }
    }
});

      setTimeout(displayCountryData, 500);
    });

    // Второй виджет
    function displaySecondWidget() {
      let data = [];
      let currentIndex = 0;

      async function fetchData() {
        const response = await fetch('./country.json');
        const result = await response.json();
        data = result.data;
        displayData();
      }

      function calculatePercentage(current, total) {
        return total === 0 ? 0 : Math.round((current / total) * 100);
      }

      function displayData() {
        const container = document.querySelector('.row');
        container.innerHTML = '';

        const currentData = data.slice(currentIndex, currentIndex + 4);
        currentData.forEach((item, index) => {
          const percentage = calculatePercentage(item.d_sum, item.prev2wks_d_sum);
          const formattedDsum = item.d_sum.toLocaleString('ru-RU');

          const html = `
            <div class="col-12 p-2">
              <div class="mprc-container fade-in">
                <div class="svg-container">
                  <svg viewBox="0 0 36 36" class="crht-circular-chart orange" style="width:30%; min-width:100px">
                    <path class="crht-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="crht-circle" stroke-dasharray="${percentage}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="20.35" class="crht-percentage">${percentage}%</text>
                  </svg>
                </div>
                <div class="text-container">
                  <span class="mprc-this-month">₸ ${formattedDsum}</span>
                  <span class="mprc-month-year"><strong>${item.tcount}</strong> </span>
                </div>
              </div>
            </div>
          `;

          container.innerHTML += html;
        });

        currentIndex += 4;
        if (currentIndex >= data.length) {
          currentIndex = 0;
        }

        setTimeout(() => {
          displayData();
        }, 17000); // Обновляем данные каждые 17 секунд
      }

      fetchData();
    }
