const isEmpty = (str = "") => !str.trim().length;
const delay = (ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const showError = async (input) => {
  input.parentElement.getElementsByTagName("p")[0].style.visibility = "visible";
  input.style.border = "1px solid red";
  input.parentElement.getElementsByTagName("img")[0].style.display = "unset";
  await delay(1000);
  input.parentElement.getElementsByTagName("p")[0].style.visibility = "hidden";
  input.style.border = "1px solid hsl(246, 25%, 77%)";
  input.parentElement.getElementsByTagName("img")[0].style.display = "none";
};

const form = document.querySelector("form");
const inputs = document.querySelectorAll("form input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach(async (input) => {
    if (isEmpty(input.value)) {
      await showError(input);
    } else if (input.id === "emailAddress" && !validateEmail(input.value)) {
      input.parentElement.getElementsByTagName("p")[0].innerText =
        "Looks like this is not an email";
      await showError(input);
      input.parentElement.getElementsByTagName("p")[0].innerText =
        "Email Address cannot be empty";
    }
  });
});
