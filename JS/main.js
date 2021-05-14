const element = document.querySelector("#btnAddExpense");
const dispElement = document.querySelector("#expenseDisplay");
const elementAmount = document.querySelector("#inputAmount");
const elementDesc = document.querySelector("#inputDesc");
const ExpenseDispTable = document.querySelector("#ExpenseTable");

let allExpense = [];

element.addEventListener("click", AddExpenseTotal, false);
let totalExpense = 0;
dispElement.textContent = totalExpense;

function AddExpenseTotal() {
    const textAmount = elementAmount.value === "" ? 0 : elementAmount.value.replace('e','');
    const textDesc = elementDesc.value;

    const ExpnseItem = {};
    const expense = parseInt(textAmount, 10);
    totalExpense = totalExpense + expense;

    elementAmount.value = "";
    elementDesc.value = "";

    ExpnseItem.desc = textDesc;
    ExpnseItem.exp = textAmount;
    ExpnseItem.moment = new Date();

    allExpense.push(ExpnseItem);
    const ExampleText = `expense is :${totalExpense}`;
    dispElement.textContent = ExampleText;
    renderList(allExpense);
}

function getDateString(moment) {
    return moment.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function deleteItem(dateVal,expen) {
    const newArr = allExpense.filter(expense => expense.moment.valueOf() !== dateVal)
    totalExpense = totalExpense - expen;
    const ExampleText = `expense is :${totalExpense}`;
    dispElement.textContent = ExampleText;
    allExpense = newArr;
    renderList(newArr);
}

function renderList(listArr) {
    const ExpensTabs = listArr.map((exp1) => createListItem(exp1));
    const allJoinedTabs = ExpensTabs.join("");
    ExpenseDispTable.innerHTML = allJoinedTabs;
}

function createListItem({ desc, exp, moment }) {
    return `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
        ${desc}
            <small class="text-muted">${getDateString(moment)}</small>
        </div>
        <div>
            <span class="px-5">
            ${exp}
            </span>
            <button type="button" 
            onCLick = "deleteItem(${moment.valueOf()}, ${exp})" 
            class="btn btn-outline-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </li>`
}