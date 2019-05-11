// ======================
// VARIABLES
// ======================

// 1st: pull initial budgetItems/lastId from localStorage to set initial values

var budgetItems = JSON.parse(localStorage.getItem("budgetItems"));
var lastID = localStorage.getItem("lastID") || 0;

if (!Array.isArray(budgetItems)) {
    budgetItems = [];
}

// ======================
// FUNCTIONS
// ======================

// 4th: update localStorage with latest budgetItems and latest lastID
function updateStorage() {
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    localStorage.setItem("lastID", lastID);
};

// 5th: render budgetItems on table
function renderItems(items) {
    if (!items) {
        items = budgetItems;
    }

    var tbody = $("#budgetItems tbody");
    // clear out previous budget items
    tbody.empty();

    // make table row for each budget item
    items.forEach(function (item) {
        var row = `<tr><td>${item.date}</td><td>${item.name}</td><td>${item.category}</td><td>${item.amount}</td><td>${item.notes}</td><td class="delete">X</td></tr>`
        tbody.prepend(row);
    });
};

// ======================
// MAIN PROCESS
// ======================

renderItems();

// 2nd: wire up click event on 'Enter New Budget Item' button to toggle display of form
$("#toggleFormButton").on("click", function () {
    var button = $("#toggleFormButton");
    var form = $("#addItemForm");

    form.toggle("slow", function () {
        if ($(this).is(":visible")) {
            button.text("Hide Form");
        } else {
            button.text("Enter New Budget Item");
        }
    });
});

// 3rd: on click of 'Add Budget Item' button, gather user input and add newest item to budgetItems array
// each budget item should include: id / date / name / category / amount / notes
// (also, trigger localStorage update and trigger budgetItems rerender, once created)
$("#addItem").on("click", function (event) {
    event.preventDefault();

    var budgetItem = {
        id: ++lastID,
        date: moment().format('LLL'),
        name: $("#name").val().trim(),
        category: $("#category").val(),
        amount: $("#amount").val().trim() || "0",
        notes: $("#notes").val().trim()
    };

    console.log(budgetItem);
    budgetItems.push(budgetItem);

    updateStorage();

    // clears form; .val("") -> sets whatever is inside
    $("#addItemForm input, #addItemForm select").val("");
})


// 6th: on change of the category dropdown, show filtered budgetItems and total


// 7th: on click of the delete button on a given row, delete that budgetItem




