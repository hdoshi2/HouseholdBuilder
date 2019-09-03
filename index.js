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
    familyList.push({ id: familyCount, age, relationship, smoker });
    age = "";
    relationship = "";
    smoker = false;
    error.textContent = "";
  }
  event.preventDefault();
}

function add(event) {
  validateAge(event);
  let node = document.createElement("LI");

  let last = familyList ? familyList.length - 1 : 0;

  let age = familyList[last].age;
  let relationship = familyList[last].relationship;
  let relCapitalized =
    relationship.charAt(0).toUpperCase() + relationship.slice(1);
  let smoker = familyList[last].smoker;
  let smoke = "";
  if (smoker) {
    smoke = "Smoker";
  } else {
    smoke = "Non-Smoker";
  }
  let textnode = document.createTextNode(
    `Age: ${age}, Relationship: ${relCapitalized}, ${smoke}`
  );

  let removeButton = document.createElement("BUTTON");
  removeButton.innerHTML = "Delete";
  removeButton.addEventListener("click", deleteItem);

  node.setAttribute("id", familyCount);
  node.appendChild(textnode);
  node.appendChild(removeButton);
  form.appendChild(node);

  familyCount++;
}

function deleteItem(event) {
  let listId = event.target.parentNode.id;
  console.log(listId);
  event.target.parentNode.remove();
  familyList = familyList.filter(({ id }) => id !== +listId);
}
