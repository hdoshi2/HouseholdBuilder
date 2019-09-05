const familyList = [];
let familyCount = 0;

//Initial definition of DOM documents
const addButton = document.getElementsByClassName("add")[0];
const debug = document.getElementsByClassName("debug")[0];
const form = document.forms[0];
const error = document.createElement("div");

//Add elements and add events
addButton.addEventListener("click", add);
form.addEventListener("submit", submitForm);
error.setAttribute("id", "error");
form.prepend(error);

//Data input verification function
function formValidation(event) {
  let age = form.age.value;
  let relationship = form.rel.value;
  let smoker = form.smoker.checked;
  event.preventDefault();

  if (age <= 0 || !age || !relationship) {
    error.textContent = errorMessage(age, relationship);
    error.setAttribute("style", "color: red ");
    return;
  } else {
    familyList.push({ id: familyCount, age, relationship, smoker });
    error.textContent = "";
    error.removeAttribute("style");
    form.reset();
  }
  return true;
}

//Add list items when family member is added.
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

//Filters & deletes data from family member list.
function deleteItem(event) {
  let listId = event.target.parentNode.id;
  event.target.parentNode.remove();
  familyList.filter(({ id }) => id !== +listId);
}

//Error message when user inputs are incorrect or missing.
function errorMessage(age, relationship) {
  let text = "";
  if (age <= 0 || !age) {
    text += "Provide a valid Age. ";
    form.age.focus();
  }
  if (!relationship) {
    text += "Relationship must be provided.";
    form.rel.focus();
  }

  return text;
}

//Formats text for display.
function normalizedText(age, relationship, smoker) {
  let relCapitalized =
    relationship.charAt(0).toUpperCase() + relationship.slice(1);
  let smoke = smoker ? "Smoker" : "Non-Smoker";
  return `Age: ${age}, Relationship: ${relCapitalized}, Smoke: ${smoke}`;
}

//Submits data in JSON format.
function submitForm(event) {
  event.preventDefault();
  if (familyList.length) {
    debug.textContent = JSON.stringify(familyList, null, 4);
    debug.setAttribute("style", "display: block;");
  } else {
    debug.textContent = "Family members must be added prior to Submit.";
    debug.setAttribute("style", "display: block;");
  }
}
