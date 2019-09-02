let familyList = [];

var error = document.getElementById("error");

function validateAge() {
  let age = document.forms[0]["age"].value;
  let relationship = document.forms[0]["rel"].value;
  console.log(age);
  console.log(relationship);
  if (age <= 0) {
    error.textContent = "Age must be greater than 0";
    document.forms[0]["age"].focus();
  }
  if (!age) {
    error.textContent = "Age must be provided";
    document.forms[0]["age"].focus();
  }
  if (relationship === "") {
    error.textContent = "Relationship must be provided";
    document.forms[0]["rel"].focus();
  }
  event.preventDefault();
}

var formData = new FormData(document.querySelector("form"));
console.log(formData);
