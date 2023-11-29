
function signin (){
    window.location="./signin.html"
    
}
function loginx(){
    window.location="./login.html"
    
}
function signinx(){
    newuser={
    
        usernamex:uname.value,
        passwordx:psword.value,
        mobilex:mobile.value,
        emailx:email.value,
        jobx:job.value,

    }

    if(uname.value==""||psword.value==""||mobile.value==""||email.value==""||job.value=="") {
        alert('Enter all Credentials');

    
}
else if(newuser.usernamex in localStorage){
    alert('Account already Registered');
}
else{
    localStorage.setItem(newuser.usernamex,JSON.stringify(newuser))
    
alert('Account Registered successfully');
window.location="./login.html"
}
}
function login(){
    
    key=loginame.value
    if(key in localStorage){
        
        localStorage.setItem("USERNAME",key)
        window.location="./index.html"
 
      
        
    }else if( loginame.value==""||passwordx==""){
        alert('Please Enter data')

    }else{
        alert('login Credentials Incorrect')
    }
        
    
   
    
   
}
keyx=localStorage.getItem("USERNAME")
console.log(keyx);
userinfo=JSON.parse(localStorage.getItem(keyx))
usernamey.innerHTML=`Name : ${userinfo.usernamex}`;
mobiley.innerHTML=`Mobile : ${userinfo.mobilex}`;
emialy.innerHTML=`Email : ${userinfo.emailx}`;
joby.innerHTML=`Job : ${userinfo.jobx}`
usernamez.innerHTML=`${userinfo.usernamex}`











function logout(){
    localStorage.removeItem('USERNAME')
    window.location="./login.html"

}












var incomeList = [];
var expensesList = [];

function showIncomeDialog() {
    document.getElementById('income-dialog-container').style.display = 'block';
}

function closeIncomeDialog() {
    document.getElementById('income-dialog-container').style.display = 'none';
    clearIncomeInput();
}

function showExpenseDialog() {
    document.getElementById('expense-dialog-container').style.display = 'block';
}

function closeExpenseDialog() {
    document.getElementById('expense-dialog-container').style.display = 'none';
    clearExpenseInput();
}

function showConfirmDeleteDialog(index, isIncome) {
    var confirmDeleteDialog = document.getElementById('confirm-delete-dialog');
    confirmDeleteDialog.style.display = 'block';
    confirmDeleteDialog.dataset.index = index;
    confirmDeleteDialog.dataset.isIncome = isIncome;
}

function closeConfirmDeleteDialog() {
    var confirmDeleteDialog = document.getElementById('confirm-delete-dialog');
    confirmDeleteDialog.style.display = 'none';
    confirmDeleteDialog.dataset.index = '';
    confirmDeleteDialog.dataset.isIncome = '';
}

function clearIncomeInput() {
    document.getElementById('income-source-input').value = '';
    document.getElementById('income-amount-input').value = '';
    document.getElementById('income-date-input').value = '';
}

function clearExpenseInput() {
    document.getElementById('expense-source-input').value = '';
    document.getElementById('expense-amount-input').value = '';
    document.getElementById('expense-date-input').value = '';
}
function showEditDialog(index, isIncome) {
    var item = isIncome ? incomeList[index] : expensesList[index];
    document.getElementById('edit-source-input').value = item.source;
    document.getElementById('edit-amount-input').value = item.amount;
    document.getElementById('edit-date-input').value = item.date;
    
    
    document.getElementById('edit-dialog-container').dataset.index = index;
    document.getElementById('edit-dialog-container').dataset.isIncome = isIncome;
    document.getElementById('edit-dialog-container').style.display = 'block';
}

function closeEditDialog() {
    document.getElementById('edit-dialog-container').style.display = 'none';
}

function addIncome() {
    var source = document.getElementById('income-source-input').value;
    var amount = parseFloat(document.getElementById('income-amount-input').value);
    var date = document.getElementById('income-date-input').value;
    if (source && !isNaN(amount)) {
        incomeList.push({ source: source, amount: amount, date: date });
        updateIncomeTable();
        closeIncomeDialog();
        clearIncomeInput();
        updateBudget();
    }
}
function updateItem() {
    var index = parseInt(document.getElementById('edit-dialog-container').dataset.index);
    var isIncome = document.getElementById('edit-dialog-container').dataset.isIncome === 'true';
    var source = document.getElementById('edit-source-input').value;
    var date = document.getElementById('edit-date-input').value;
    var amount = parseFloat(document.getElementById('edit-amount-input').value);
    if (source && !isNaN(amount)) {
        if (isIncome) {
            incomeList[index].source = source;
            incomeList[index].amount = amount;
            incomeList[index].date = date;
            updateIncomeTable();
        } else {
            expensesList[index].source = source;
            expensesList[index].amount = amount;
            expensesList[index].date = date;
            updateExpenseTable();
        }
        closeEditDialog();
        updateBudget();
    }
}

function addExpense() {
    var source = document.getElementById('expense-source-input').value;
    var amount = parseFloat(document.getElementById('expense-amount-input').value);
    var date = document.getElementById('expense-date-input').value;
    if (source && !isNaN(amount)) {
        expensesList.push({ source: source, amount: amount, date: date });
        updateExpenseTable();
        closeExpenseDialog();
        clearExpenseInput();
        updateBudget();
    }
}

function deleteConfirmed() {
    var index = parseInt(document.getElementById('confirm-delete-dialog').dataset.index);
    var isIncome = document.getElementById('confirm-delete-dialog').dataset.isIncome === 'true';
    if (isIncome) {
        deleteIncome(index);
    } else {
        deleteExpense(index);
    }
    closeConfirmDeleteDialog();
}

function deleteIncome(index) {
    incomeList.splice(index, 1);
    updateIncomeTable();
    updateBudget();
}

function deleteExpense(index) {
    expensesList.splice(index, 1);
    updateExpenseTable();
    updateBudget();
}

function updateIncomeTable() {
    var incomeTable = document.getElementById('income-list');
    var tableBody = incomeTable.querySelector('tbody');
    if (!tableBody) {
        tableBody = document.createElement('tbody');
        incomeTable.appendChild(tableBody);
    } else {
        tableBody.innerHTML = '';
    }

    incomeList.forEach(function (income, index) {
        var row = document.createElement('tr');
        var sourceCell = document.createElement('td');
        var amountCell = document.createElement('td');
        var dateCell = document.createElement('td');
        var actionsCell = document.createElement('td');
        sourceCell.textContent = income.source;
        amountCell.textContent = '₹' + income.amount.toFixed(2);
        dateCell.textContent = income.date;
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            showEditDialog(index, true);
        });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            showConfirmDeleteDialog(index, true);
        });
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(sourceCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

function updateExpenseTable() {
    var expenseTable = document.getElementById('expenses-list');
    var tableBody = expenseTable.querySelector('tbody');
    if (!tableBody) {
        tableBody = document.createElement('tbody');
        expenseTable.appendChild(tableBody);
    } else {
        tableBody.innerHTML = '';
    }

    expensesList.forEach(function (expense, index) {
        var row = document.createElement('tr');
        var sourceCell = document.createElement('td');
        var amountCell = document.createElement('td');
        var dateCell = document.createElement('td');
        var actionsCell = document.createElement('td');
        sourceCell.textContent = expense.source;
        amountCell.textContent = '₹' + expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            showEditDialog(index, false);
        });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            showConfirmDeleteDialog(index, false);
        });
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(sourceCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

function updateBudget() {
var totalIncome = incomeList.reduce(function (total, income) {
return total + income.amount;
}, 0);
var totalExpenses = expensesList.reduce(function (total, expense) {
return total + expense.amount;
}, 0);
var budget = totalIncome - totalExpenses;
budget = budget >= 0 ? budget : 0; // If budget is negative, set it to zero
document.getElementById('results').innerHTML = '<h3>Total Budget: ₹' + budget.toFixed(2) + '</h3>';
}