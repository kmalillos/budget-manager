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
        var row = `<tr><td>${item.date}</td><td>${item.name}</td><td>${item.category}</td><td>$${parseFloat(item.amount).toFixed(2)}</td><td>${item.notes}</td><td class="delete">X</td></tr>`
        tbody.prepend(row);
    });

    // get total amount for all items or categories
    var totalAmount = items.reduce(function (accum, item) {
        return accum + parseFloat(item.amount);
    }, 0);

    $("#total").text(`$${totalAmount.toFixed(2)}`);
};

// ======================
// MAIN PROCESS
// ======================

// call render items at the beginning
renderItems();

// 2nd: wire up click event on 'Enter New Budget Item' button to toggle display of form
$("#toggleFormButton").on("click", function () {
    // console.log("toggle button: ", this);
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

    // call update storage
    updateStorage();

    // call render items at addItem on-click
    renderItems();

    // clears form; .val("") -> sets whatever is inside
    $("#addItemForm input, #addItemForm select").val("");

});

// 6th: on change of the category dropdown, show filtered budgetItems and total
$("#categoryFilter").on("change", function() {
    // console.log("Category Filter: ", this);

    var category = $(this).val();
    // console.log(category);

    var categoryItems = budgetItems.filter(function(item) {
        return item.category == category;
    });

    console.log(categoryItems);

    // re-render filters items
    renderItems(categoryItems);
});

// 7th: on click of the delete button on a given row, delete that budgetItem




