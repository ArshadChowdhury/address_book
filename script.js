// checking if the dom is ready if ready then it'll start executing code
$(document).ready(function () {
  let contacts = [];
  // adding an event listener for the add new contact button and swapping styles to show/not show the add new contact form
  $(".create-new-btn").on("click", function () {
    if (
      $(".hidden-form")[0].style.display === "" ||
      $(".hidden-form")[0].style.display === "none"
    ) {
      $(".hidden-form").css("display", "block");
      $(".create-new-btn").html("Close");
      $(".create-new-btn").css("background-color", "red");
    } else if ($(".hidden-form")[0].style.display === "block") {
      $(".hidden-form").css("display", "none");
      $(".create-new-btn").html("+ Add New Contact");
      $(".create-new-btn").css("background-color", "green");
    }
  });

  // the assignment states that all these fields are a must, so I've decided to return an alert if the field is empty instead of storing the data in the contacts array above
  $(".add-btn").on("click", function () {
    let name = $("#name").val();
    if (!name.length) return alert("Name field is required");
    let surName = $("#surname").val();
    if (!surName.length) return alert("Surname field is required");
    let number = $("#number").val();
    if (!number.length) return alert("Phone Number field is required");
    let address = $("#address").val();
    if (!address.length) return alert("Address field is required");
    // storing the input from user into an object of new contact then storing it in contacts array
    let newContact = {
      contactName: name,
      contactSurname: surName,
      contactNumber: number,
      contactAddress: address,
    };

    contacts.push(newContact);
    // setting the value after submission to empty strings
    $("#name").val("");
    $("#surname").val("");
    $("#number").val("");
    $("#address").val("");
    $(".hidden-form")[0].style.display = "none";
    $(".create-new-btn").html("+ Add New Contact");
    $(".create-new-btn").css("background-color", "green");
    // setting the initial html to empty string so it doesn't append same array value twice
    $(".contact-cards").html("");
    // looping through the contacts array where all the values are stored as object form
    for (let i = 0; i < contacts.length; i++) {
      $(".contact-cards").append(`<div class="card">
                <div class="title">${contacts[i].contactName}</div>
                <button class="delete-contact"></button>
                <div class="rest">Surname: ${contacts[i].contactSurname}<br>
                Contact Number: ${contacts[i].contactNumber}<br>
                Contact Address: ${contacts[i].contactAddress}
                </div>
              </div>`);
    }

    // adding event listener to the delete button so it can listen for clicks and delete when triggered
    $(".delete-contact").on("click", (e) => {
      let title = e.target.parentNode.querySelector(".title");
      let titleText = title.innerText;
      contacts.forEach((contact) => {
        // checking for a match to determine which one to delete here from the array
        if (contact.contactName === titleText) {
          removeFromArray(contacts, titleText);
        }
      });
      // after a match this function is invoked which deletes the arr index by splice
      function removeFromArray(arr, name) {
        const objName = arr.findIndex((obj) => obj.contactName === name);
        arr.splice(objName, 1);
        return arr;
      }
      // deleting the entire card by targetting the parent node here
      e.target.parentNode.remove();
    });
  });

  // adding event listener to search box so I can take the input from the user and filter the data accordingly
  $("#searchText").on("input", (e) => {
    let target = e.target.value.toLowerCase();
    $(".contact-cards").html("");
    contacts.forEach((contact) => {
      // looping through the contacts array and finding out which of the target(user input) is matching the array elements
      const isContact = contact.contactName.toLowerCase().includes(target);
      if (isContact) {
        // if there is a match I create a new array and store the filtered one in here and then show it to the user
        let searchedArr = [];
        searchedArr.push(contact);
        for (let i = 0; i < searchedArr.length; i++) {
          $(".contact-cards").append(`<div class="card">
          <div class="title">${searchedArr[i].contactName}</div>
          <button class="delete-contact"></button>
          <div class="rest">Surname: ${searchedArr[i].contactSurname}<br>
          Contact Number: ${searchedArr[i].contactNumber}<br>
          Contact Address: ${searchedArr[i].contactAddress}
          </div>
        </div>`);
        }
      }
    });
    // added the delete option in the filtered array too so it can be deleted after filtering of new array
    $(".delete-contact").on("click", (e) => {
      let title = e.target.parentNode.querySelector(".title");
      let titleText = title.innerText;
      contacts.forEach((contact) => {
        if (contact.contactName === titleText) {
          removeFromArray(contacts, titleText);
        }
      });

      function removeFromArray(arr, name) {
        const objName = arr.findIndex((obj) => obj.contactName === name);
        arr.splice(objName, 1);
        return arr;
      }

      e.target.parentNode.remove();
    });
  });
});
