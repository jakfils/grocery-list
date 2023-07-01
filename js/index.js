const input = document.querySelector('input[type ="text"]');
const submit = document.querySelector('input[type ="submit"]');

input.addEventListener("focus", (e) => {
  submit.style.outline = "solid 2px var(--button-background-color)";
});
input.addEventListener("focusout", (e) => {
  submit.style.outline = "none";
});
