let familyList = [];
let familyCount = 0;

// var error = document.getElementById("error");

let addButton = document.getElementsByClassName("add")[0];
let form = document.forms[0];
let error = document.createElement("div");

error.setAttribute("id", "error");
form.appendChild(error);
form.addEventListener("submit", validateAge);
addButton.addEventListener("click", add);

function validateAge(event) {
  let age = form.age.value;
  let relationship = form.rel.value;
  let smoker = form.smoker.checked;
  console.log(age, relationship, smoker);

  if (age <= 0 || !age || relationship === "") {
    if (age <= 0) {
      error.textContent = "Age must be greater than 0";
      form.age.focus();
    }
    if (!age) {
      error.textContent = "Age must be provided";
      form.age.focus();
    }
    if (relationship === "") {
      error.textContent = "Relationship must be provided";
      form.rel.focus();
    }
  } else {
    familyList.push({ age, relationship, smoker });
    age = "";
    relationship = "";
    smoker = false;
    error.textContent = "";
  }
  event.preventDefault();
}

function add() {
  let form = document.forms[0];
  var node = document.createElement("LI");
  for (let i = familyCount; i < familyList.length; i++) {
    let age = familyList[i].age;
    let relationship = familyList[i].relationship;
    let relCapitalized =
      relationship.charAt(0).toUpperCase() + relationship.slice(1);
    let smoker = familyList[i].smoker;
    let smoke = "";
    if (smoker) {
      smoke = "Smoker";
    } else {
      smoke = "Non-Smoker";
    }
    var textnode = document.createTextNode(
      `Age: ${age}, Relationship: ${relCapitalized}, ${smoke} `
    );
    node.appendChild(textnode);
    form.appendChild(node);
    familyCount++;
  }
}

// var formData = new FormData(document.querySelector("form"));
// console.log("test", formData);

// var params = "";
// for (var i = 0; i < document.myform.elements.length; i++) {
//   var fieldName = document.myform.elements[i].name;
//   var fieldValue = document.myform.elements[i].value;

//   params += fieldName + "=" + fieldValue + "&";
// }
// console.log(params);
