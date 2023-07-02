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

// Function check input value is empty
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

// Function show items in the DOM
const showItems = () => {
  const jsonData = localStorage.getItem("storageData");
  const objData = JSON.parse(jsonData);
  //Check Data array is not null
  if (objData !== null) {
    const mappedData = objData.map((element) => {
      return `<div class="item">
      <p class="item-name">${element}</p><span class="edit"><i class="fas fa-solid fa-pen"></i></span><span
      class="delete"><i class="fas fa-regular fa-trash"></i></span>
      </div>`;
    });
    const itemsContent = mappedData.join("");
    items.innerHTML = itemsContent;
  }
};

showItems();

const editBtns = document.querySelectorAll(".edit");
let elementToEdit = "";
const deleteBtns = document.querySelectorAll(".delete");

// On submit
submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputIsEmpty(input.value) && submit.value === "Submit") {
    data.unshift(input.value);
    updateStorage();
    input.value = "";
    showItems();
    document.location.reload();
    showAlertMsg("Item added to the list", "#6de676");
  } else if (!inputIsEmpty(input.value) && submit.value === "Edit") {
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
  } else {
    document.location.reload();
    showAlertMsg("Please enter a value", "#e66b6c");
  }
});

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", (e) => {
    submit.value = "Edit";
    input.value = editBtn.previousSibling.textContent;
    input.focus();
    elementToEdit = editBtn.previousSibling;
  });
});

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    var nodes = Array.prototype.slice.call(
      document.querySelector(".items").children
    );
    const itemToDeleteId = nodes.indexOf(deleteBtn.parentNode);
    data.splice(itemToDeleteId, 1);
    updateStorage();
    showItems();
    showAlertMsg("Item removed", "#e66b6c");
    input.focus();
    // showItems();
    document.location.reload();
  });
});

clearItems.addEventListener("click", (e) => {
  data = [];
  updateStorage();
  showItems();
  input.focus();
  document.location.reload();
});

input.addEventListener("focus", (e) => {
  submit.style.outline = "solid 2px var(--button-background-color)";
});
input.addEventListener("focusout", (e) => {
  submit.style.outline = "none";
});

if (items.childNodes.length < 2) {
  clearItems.classList.add("invisible");
}
