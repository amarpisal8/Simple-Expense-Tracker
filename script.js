let serialNumber = 1;
let editIndex = -1;

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
                    <td>${price}</td>
                    <td>
                      <button id="deleteBtn" onclick="deleteExpense(this)">Delete</button>
                      <button id="editBtn" onclick="editExpense(this)">Edit</button>
                    </td>
                  </tr>`;
      document.getElementById('expenseList').innerHTML += row;
      serialNumber++;
    } else {
      // Editing an existing expense
      const rows = document.querySelectorAll('#expenseList tr');
      rows[editIndex].cells[1].innerText = productName;
      rows[editIndex].cells[2].innerText = quantity;
      rows[editIndex].cells[3].innerText = price;
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
  updateTotalAmount();
}

function editExpense(btn) {
  const row = btn.parentNode.parentNode;
  const cells = row.getElementsByTagName('td');

  document.getElementById('productName').value = cells[1].innerText;
  document.getElementById('quantity').value = cells[2].innerText;
  document.getElementById('price').value = cells[3].innerText;

  editIndex = Array.from(document.querySelectorAll('#expenseList tr')).indexOf(row);
}

function updateTotalAmount() {
  const prices = Array.from(document.querySelectorAll('#expenseList td:nth-child(4)')).map(cell => parseFloat(cell.innerText));
  const total = prices.reduce((acc, curr) => acc + curr, 0);

  document.getElementById('totalAmount').innerText = `Expense Tracker Amount: ${total.toFixed(2)}Rs`;
}

function clearInputs() {
  document.getElementById('productName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
}
