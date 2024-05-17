let serialNumber = 1;
let editIndex = -1;

// Load data from local storage on page load
document.addEventListener('DOMContentLoaded', loadExpenses);

function addExpense() {
  const productName = document.getElementById('productName').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);

  if (productName && quantity && price) {
    const total = quantity * price;

    if (editIndex === -1) {
      // Adding a new expense
      const row = `<tr>
                    <td>${serialNumber}</td>
                    <td>${productName}</td>
                    <td>${quantity}</td>
                    <td>${total}</td>
                    <td>
                      <button id="deleteBtn" onclick="deleteExpense(this)">Delete</button>
                      <button id="editBtn" onclick="editExpense(this)">Edit</button>
                    </td>
                  </tr>`;
      document.getElementById('expenseList').innerHTML += row;
      saveExpense({ serialNumber, productName, quantity, price: total });
      serialNumber++;
    } else {
      // Editing an existing expense
      const rows = document.querySelectorAll('#expenseList tr');
      rows[editIndex].cells[1].innerText = productName;
      rows[editIndex].cells[2].innerText = quantity;
      rows[editIndex].cells[3].innerText = total;
      updateLocalStorage();
      editIndex = -1;
    }

    updateTotalAmount();
    clearInputs();
  } else {
    alert('Please fill in all fields.');
  }
}

function deleteExpense(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateLocalStorage();
  updateTotalAmount();
}

function editExpense(btn) {
  const row = btn.parentNode.parentNode;
  const cells = row.getElementsByTagName('td');

  document.getElementById('productName').value = cells[1].innerText;
  document.getElementById('quantity').value = cells[2].innerText;
  document.getElementById('price').value = parseFloat(cells[3].innerText) / parseInt(cells[2].innerText);

  editIndex = Array.from(document.querySelectorAll('#expenseList tr')).indexOf(row);
}

function updateTotalAmount() {
  const prices = Array.from(document.querySelectorAll('#expenseList td:nth-child(4)')).map(cell => parseFloat(cell.innerText));
  const total = prices.reduce((acc, curr) => acc + curr, 0);

  document.getElementById('totalAmount').innerText = `Expense Tracker Amount: ${total.toFixed(2)} Rs`;
}

function clearInputs() {
  document.getElementById('productName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
}

// Save expense to local storage
function saveExpense(expense) {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from local storage
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.forEach(expense => {
    const row = `<tr>
                  <td>${expense.serialNumber}</td>
                  <td>${expense.productName}</td>
                  <td>${expense.quantity}</td>
                  <td>${expense.price}</td>
                  <td>
                    <button id="deleteBtn" onclick="deleteExpense(this)">Delete</button>
                    <button id="editBtn" onclick="editExpense(this)">Edit</button>
                  </td>
                </tr>`;
    document.getElementById('expenseList').innerHTML += row;
    serialNumber++;
  });
  updateTotalAmount();
}

// Update local storage
function updateLocalStorage() {
  const rows = document.querySelectorAll('#expenseList tr');
  const expenses = Array.from(rows).map(row => {
    const cells = row.getElementsByTagName('td');
    return {
      serialNumber: parseInt(cells[0].innerText),
      productName: cells[1].innerText,
      quantity: parseInt(cells[2].innerText),
      price: parseFloat(cells[3].innerText)
    };
  });
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
