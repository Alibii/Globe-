// Получаем элементы DOM
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const modButton = document.querySelector('.buttons button:nth-child(5)');
const historyList = document.getElementById('history-list');
const clearHistoryButton = document.querySelector('.clear-history');

// Функция для выполнения вычислений
function calculate(operator) {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    alert('Пожалуйста, введите оба числа.');
    return;
  }

  let result;
  let operation;

  switch (operator) {
    case '+':
      result = num1 + num2;
      operation = `${num1} + ${num2} = ${result}`;
      break;
    case '-':
      result = num1 - num2;
      operation = `${num1} - ${num2} = ${result}`;
      break;
    case '*':
      result = num1 * num2;
      operation = `${num1} × ${num2} = ${result}`;
      break;
    case '/':
      if (num2 === 0) {
        alert('Деление на ноль невозможно.');
        return;
      }
      result = num1 / num2;
      operation = `${num1} ÷ ${num2} = ${result}`;
      break;
    case '%':
      result = num1 % num2;
      operation = `${num1} % ${num2} = ${result}`;
      break;
    default:
      return;
  }

  // Добавляем результат в историю
  addToHistory(operation);
}

// Функция для добавления записи в историю
function addToHistory(operation) {
  const listItem = document.createElement('li');
  listItem.textContent = operation;
  historyList.appendChild(listItem);
}

// Функция для очистки истории
function clearHistory() {
  historyList.innerHTML = '';
}

// Назначаем обработчики событий кнопкам
addButton.addEventListener('click', () => calculate('+'));
subtractButton.addEventListener('click', () => calculate('-'));
multiplyButton.addEventListener('click', () => calculate('*'));
divideButton.addEventListener('click', () => calculate('/'));
modButton.addEventListener('click', () => calculate('%'));
clearHistoryButton.addEventListener('click', clearHistory);