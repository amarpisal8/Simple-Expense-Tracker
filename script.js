let serialNumber = 1;

function addExpense() {
  const productName = document.getElementById('productName').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);

  if (productName && quantity && price) {
    const total = quantity * price;
    const row = `<tr>
                   <td>${serialNumber}</td>
                   <td>${productName}</td>
                   <td>${quantity}</td>
                   <td>${price}</td>
                   <td>
                     <button id="deleteBtn" onclick="deleteExpense(this)">Delete</button>
                   </td>
                 </tr>`;

    document.getElementById('expenseList').innerHTML += row;

    serialNumber++;
    updateTotalAmount();
  } else {
    alert('Please fill in all fields.');
  }
}

function deleteExpense(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateTotalAmount();
}

function updateTotalAmount() {
  const prices = Array.from(document.querySelectorAll('#expenseList td:nth-child(4)')).map(cell => parseFloat(cell.innerText));
  const total = prices.reduce((acc, curr) => acc + curr, 0);

  document.getElementById('totalAmount').innerText = `Expense Tracker Amount: ${total.toFixed(2)}Rs`;
}
