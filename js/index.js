// Get localStorage items
let data = JSON.parse(localStorage.getItem("storageData"));

// If data undefined
if (data === null) {
  data = [];
}

// Select DOM elements
const input = document.querySelector('input[type ="text"]');
const submit = document.querySelector('input[type ="submit"]');
const items = document.querySelector(".items");
const alertMsg = document.querySelector(".alertMsg");
const clearItems = document.querySelector(".clear-items");

// Funtion Update localStorage
const updateStorage = () => {
  localStorage.setItem("storageData", JSON.stringify(data));
};

// Function check if input value is empty
const inputIsEmpty = (str) => {
  if (!str.replace(/\s/g, "").length) {
    return true;
  }
};

// Function alert Message

const showAlertMsg = (msgContent, backgroundColor) => {
  alertMsg.textContent = msgContent;
  alertMsg.style.backgroundColor = backgroundColor;
  setTimeout((e) => {
    alertMsg.textContent = "";
  }, 2000);
};

// Funtion check if we display clear all items button and set paddig to items div
const buttonClearAndItemsPaddingState = () => {
  items.childNodes.length < 2
    ? clearItems.classList.add("invisible")
    : clearItems.classList.remove("invisible");
  items.childNodes.length === 0
    ? (items.style.padding = "0px")
    : (items.style.padding = "2px");
};

// Function show items in the DOM
const showItems = () => {
  const jsonData = localStorage.getItem("storageData");
  const objData = JSON.parse(jsonData);
  //Check Data array is not null and map elements width HTML tags
  if (objData !== null) {
    const mappedData = objData.map((element) => {
      return `<div class="item">
      <p class="item-name">${element}</p><div class="edit"><i class="fas fa-solid fa-pen"></i></div><div
      class="delete"><i class="fas fa-regular fa-trash"></i></div>
      </div>`;
    });
    // Join mapped elements
    const itemsContent = mappedData.join("");
    // Push elements to the DOM
    items.innerHTML = itemsContent;
  }
};

showItems();
buttonClearAndItemsPaddingState();

const editBtns = document.querySelectorAll(".edit");
let elementToEdit = "";
const deleteBtns = document.querySelectorAll(".delete");

// On submit
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // To add new item
  if (!inputIsEmpty(input.value) && submit.value === "Submit") {
    data.unshift(input.value);
    updateStorage();
    input.value = "";
    input.focus();
    showItems();
    showAlertMsg("Item added to the list", "#6de676");
    buttonClearAndItemsPaddingState();
  }
  // To edit an item
  else if (!inputIsEmpty(input.value) && submit.value === "Edit") {
    submit.value = "Submit";
    var nodes = Array.prototype.slice.call(
      document.querySelector(".items").children
    );
    const itemToEdit = nodes.indexOf(elementToEdit.parentNode);
    data.splice(itemToEdit, 1, input.value);
    updateStorage();
    showItems();
    input.value = "";
    input.focus();
    showAlertMsg("Value changed", "#6de676");
    buttonClearAndItemsPaddingState();
  }

  // Avoid input empty value
  else {
    showAlertMsg("Please enter a value", "#e66b6c");
  }
});

// Edit and Delete button click listener
items.addEventListener("click", (e) => {
  // Edit
  if (e.target.classList.contains("fa-pen")) {
    submit.value = "Edit";
    input.value = e.target.parentNode.previousSibling.textContent;
    input.focus();
    elementToEdit = e.target.parentNode.previousSibling;

    // Delete
  } else if (e.target.classList.contains("fa-trash")) {
    var nodes = Array.prototype.slice.call(
      document.querySelector(".items").children
    );
    const itemToDeleteId = nodes.indexOf(e.target.parentNode.parentNode);
    data.splice(itemToDeleteId, 1);
    updateStorage();
    showItems();
    showAlertMsg("Item removed", "#e66b6c");
    input.focus();
    input.value = "";
    buttonClearAndItemsPaddingState();
  }
});

// Clear all items button click listener
clearItems.addEventListener("click", (e) => {
  data = [];
  updateStorage();
  showItems();
  input.focus();
  input.value = "";
  buttonClearAndItemsPaddingState();
});

// Input focus listener
input.addEventListener("focus", (e) => {
  submit.style.outline = "solid 2px var(--button-background-color)";
});

// Input focus out listener
input.addEventListener("focusout", (e) => {
  submit.style.outline = "none";
});
