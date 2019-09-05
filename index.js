let familyList = [];
let familyCount = 0;

let addButton = document.getElementsByClassName("add")[0];
let debug = document.getElementsByClassName("debug")[0];
let form = document.forms[0];
let error = document.createElement("div");

addButton.addEventListener("click", add);
// form.addEventListener("submit", formValidation);

//create empty div for error message
error.setAttribute("id", "error");
form.appendChild(error);

function formValidation(event) {
  let age = form.age.value;
  let relationship = form.rel.value;
  let smoker = form.smoker.checked;
  event.preventDefault();

  if (age <= 0 || !age || !relationship) {
    error.textContent = errorMessage(age, relationship);
    return;
  } else {
    familyList.push({ id: familyCount, age, relationship, smoker });
    error.textContent = "";
  }
  return true;
}

function add(event) {
  if (formValidation(event)) {
    let node = document.createElement("LI");
    let { age, relationship, smoker } = familyList[familyList.length - 1];
    let textnode = document.createTextNode(
      normalizedText(age, relationship, smoker)
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
}

function deleteItem(event) {
  let listId = event.target.parentNode.id;
  event.target.parentNode.remove();
  familyList = familyList.filter(({ id }) => id !== +listId);
}

function errorMessage(age, relationship) {
  let text = "";
  if (age <= 0) {
    text += "Age must be greater than 0. ";
    form.age.focus();
  }
  if (!age) {
    text += "Age must be provided. ";
    form.age.focus();
  }
  if (!relationship) {
    text += "Relationship must be provided";
    form.rel.focus();
  }

  return text;
}

function normalizedText(age, relationship, smoker) {
  let relCapitalized =
    relationship.charAt(0).toUpperCase() + relationship.slice(1);
  let smoke = smoker ? "Smoker" : "Non-Smoker";

  return `Age: ${age}, Relationship: ${relCapitalized}, Smoke: ${smoke}`;
}

// function submitForm()


// let familyList = [];
// let familyCount = 0;

// // var error = document.getElementById("error");

// let addButton = document.getElementsByClassName("add")[0];
// let form = document.forms[0];
// let error = document.createElement("div");

// error.setAttribute("id", "error");
// form.appendChild(error);
// form.addEventListener("submit", validateAge);
// addButton.addEventListener("click", add);

// function validateAge(event) {
//   let age = form.age.value;
//   let relationship = form.rel.value;
//   let smoker = form.smoker.checked;

//   if (age <= 0 || !age || relationship === "") {
//     if (age <= 0) {
//       error.textContent = "Age must be greater than 0";
//       form.age.focus();
//     }
//     if (!age) {
//       error.textContent = "Age must be provided";
//       form.age.focus();
//     }
//     if (relationship === "") {
//       error.textContent = "Relationship must be provided";
//       form.rel.focus();
//     }
//   } else {
//     familyList.push({ id: familyCount, age, relationship, smoker });
//     age = "";
//     relationship = "";
//     smoker = false;
//     error.textContent = "";
//   }
//   event.preventDefault();
// }

// function add(event) {
//   validateAge(event);
//   let node = document.createElement("LI");

//   let last = familyList ? familyList.length - 1 : 0;

//   let age = familyList[last].age;
//   let relationship = familyList[last].relationship;
//   let relCapitalized =
//     relationship.charAt(0).toUpperCase() + relationship.slice(1);
//   let smoker = familyList[last].smoker;
//   let smoke = "";
//   if (smoker) {
//     smoke = "Smoker";
//   } else {
//     smoke = "Non-Smoker";
//   }
//   let textnode = document.createTextNode(
//     `Age: ${age}, Relationship: ${relCapitalized}, ${smoke}`
//   );

//   let removeButton = document.createElement("BUTTON");
//   removeButton.innerHTML = "Delete";
//   removeButton.addEventListener("click", deleteItem);

//   node.setAttribute("id", familyCount);
//   node.appendChild(textnode);
//   node.appendChild(removeButton);
//   form.appendChild(node);

//   familyCount++;
// }

// function deleteItem(event) {
//   let listId = event.target.parentNode.id;
//   console.log(listId);
//   event.target.parentNode.remove();
//   familyList = familyList.filter(({ id }) => id !== +listId);
// }
