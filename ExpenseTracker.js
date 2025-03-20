let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;

const incomeInput = document.getElementById('income-input');
const addIncomeBtn = document.getElementById('add-income-btn');
const totalIncomeCell = document.getElementById('total-income');
const balanceAmount = document.getElementById('balance-amount');

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addIncomeBtn.addEventListener('click', function() {
    const income = Number(incomeInput.value);
    if (isNaN(income) || income <= 0) {
        alert('Please enter a valid income amount');
        return;
    }
    totalIncome += income;
    transactions.push({ type: 'income', amount: income });
    totalIncomeCell.textContent = totalIncome;
    updateBalance();
    incomeInput.value = '';
});

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount: -amount, date };
    transactions.push(expense);
    totalExpenses += amount;
    totalAmountCell.textContent = totalExpenses;
    updateBalance();

    renderTransactions();
});

function renderTransactions() {
    expenseTableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const actionsCell = newRow.insertCell();

        categoryCell.textContent = transaction.category;
        amountCell.textContent = transaction.amount;
        dateCell.textContent = transaction.date;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function () {
            editTransaction(index, newRow);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            transactions.splice(index, 1);
            renderTransactions();
            calculateTotals();
        });

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    });
}

function editTransaction(index, row) {
    const transaction = transactions[index];

    row.innerHTML = `
        <td><input type="text" value="${transaction.category}" id="edit-category-${index}"></td>
        <td><input type="number" value="${Math.abs(transaction.amount)}" id="edit-amount-${index}"></td>
        <td><input type="date" value="${transaction.date}" id="edit-date-${index}"></td>
        <td>
            <button onclick="saveTransaction(${index})">Save</button>
        </td>
    `;
}

function saveTransaction(index) {
    const newCategory = document.getElementById(`edit-category-${index}`).value;
    const newAmount = Number(document.getElementById(`edit-amount-${index}`).value);
    const newDate = document.getElementById(`edit-date-${index}`).value;

    if (!newCategory || isNaN(newAmount) || newAmount <= 0 || !newDate) {
        alert('Please enter valid details');
        return;
    }

    transactions[index].category = newCategory;
    transactions[index].amount = -newAmount;
    transactions[index].date = newDate;

    renderTransactions();
    calculateTotals();
}

function calculateTotals() {
    totalExpenses = transactions.reduce((sum, txn) => txn.type !== 'income' ? sum + Math.abs(txn.amount) : sum, 0);
    totalAmountCell.textContent = totalExpenses;

    totalIncome = transactions.reduce((sum, txn) => txn.type === 'income' ? sum + txn.amount : sum, 0);
    totalIncomeCell.textContent = totalIncome;

    updateBalance();
}

function updateBalance() {
    const balance = totalIncome - totalExpenses;
    balanceAmount.textContent = balance;
}
