function _(id) {
    return document.getElementById(id);
}

function getRs() {
    // Get the text from the textarea
    let txt = _('txt').value;

    // Only create an entry if there is text in textarea
    if (!txt) {
        return; // If empty, do not create a new entry
    }

    const d = new Date();

    // Create a new entry called 'card' (brings input from textarea to be outputted)
    let div = document.createElement('div');
    div.classList.add('card');

    // Create a <p> element to display the text
    let p = document.createElement('p');
    p.setAttribute('contenteditable', 'false');
    p.innerText = txt;

    // Display time/date stamp at bottom left of entry
    let small = document.createElement('small');
    small.innerText = `${d.toLocaleTimeString()}, ${d.toLocaleDateString()}`;

    // Create an 'Edit' button to allow editing of the journal entry
    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', function() {
        let p = this.previousSibling.previousSibling;
        if (p.getAttribute('contenteditable') === 'true') {
            p.setAttribute('contenteditable', 'false');
        } else {
            p.setAttribute('contenteditable', 'true');
            p.focus();
        }
    });

    // Create a 'Clear' button to remove the card of your choice
    let clearBtn = document.createElement('button');
    clearBtn.innerText = "x";
    clearBtn.classList.add('clear');
    clearBtn.addEventListener('click', function() {
        _('rs').removeChild(div);
        localStorage.setItem("savedEntries", _("rs").innerHTML);
    });

    // Append the elements to the entry div
    div.appendChild(p);
    div.appendChild(small);
    div.appendChild(editBtn);
    div.appendChild(clearBtn);

    // Append the entry div to the diary
    _('rs').appendChild(div);
    localStorage.setItem("savedEntries", _("rs").innerHTML);

    // Clear the textarea after creating the entry
    _('txt').value = '';
}

// Get the input field
var input = document.getElementById("txt");

input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        event.preventDefault();
        // Enter 'clicks' the Create button
        document.getElementById("Create").click();
    }
});

// Can print out the diary entries if wanted to
const buttonPrintOrSaveDocument = document.querySelector(".button-print-or-save-document");
function printOrSave() {
    window.print();
}
buttonPrintOrSaveDocument.addEventListener("click", printOrSave);

// Clears saved data when pressing 'Clear' button
document.getElementById("Clear").addEventListener("click", function() {
    _("rs").innerHTML = "";
    localStorage.removeItem("savedEntries");
});

// When clicking 'save', entries are saved. Load saved entries on page load
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("savedEntries")) {
        _("rs").innerHTML = localStorage.getItem("savedEntries");
        let editButtons = document.querySelectorAll('.edit');
        let clearButtons = document.querySelectorAll('.clear');
        
        for (let i = 0; i < editButtons.length; i++) { // Lets edit and clear buttons be useable even after page is reloaded
            let editBtn = editButtons[i];
            let clearBtn = clearButtons[i];
            editBtn.addEventListener('click', function() {
                let p = this.previousSibling.previousSibling;
                if (p.getAttribute('contenteditable') === 'true') {
                    p.setAttribute('contenteditable', 'false');
                } else {
                    p.setAttribute('contenteditable', 'true');
                    p.focus();
                }
            });
            clearBtn.addEventListener('click', function() {
                let div = this.parentElement;
                _('rs').removeChild(div);
                localStorage.setItem("savedEntries", _("rs").innerHTML);
            });
        }
    }
});

// Display current date
document.getElementById("date").innerHTML = new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

// Update clock
function updateClock() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    document.getElementById("clock").innerHTML = time;
}
setInterval(updateClock, 1000);

// Function to toggle contenteditable attribute for the journal entry
function toggleEditable(element) {
    if (element.getAttribute('contenteditable') === 'true') {
        element.setAttribute('contenteditable', 'false');
    } else {
        element.setAttribute('contenteditable', 'true');
        element.focus();
    }
}

// Function to handle clicking the edit button
function handleEditClick() {
    let p = this.previousSibling.previousSibling;
    toggleEditable(p);
}


// Function to handle clicking the clear button
function handleClearClick() {
    let div = this.parentElement;
    _('rs').removeChild(div);
    localStorage.setItem("savedEntries", _("rs").innerHTML);
}

// Get all edit buttons and add event listeners
let editButtons = document.querySelectorAll('.edit');
editButtons.forEach(function(button) {
    button.addEventListener('click', handleEditClick);
});

// Get all clear buttons and add event listeners
let clearButtons = document.querySelectorAll('.clear');
clearButtons.forEach(function(button) {
    button.addEventListener('click', handleClearClick);
});

// Get all journal entries and add event listeners to disable editing when clicked
let entries = document.querySelectorAll('.card p');
entries.forEach(function(entry) {
    entry.addEventListener('click', function() {
        toggleEditable(this);
    });
});
