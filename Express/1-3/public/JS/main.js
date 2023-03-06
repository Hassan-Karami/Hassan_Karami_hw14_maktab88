$(document).ready(function () {
  (async () => {
    let users = await fetch("http://localhost:4000/admin/get-all-users");
    users = await users.json();
    const tableBody = $("#tableBody");
    const tableHeadUsername = $("#tableHeadUsername");
    const tableHeadFirstName = $("#tableHeadFirstName");
    const tableHeadLastName = $("#tableHeadLastName");
    const tableHeadGender = $("#tableHeadGender");
  
  
  

    const creationModal = $("#creationModal");
    const creationModalSubmitButton = $("#creationModal-submitButton");

    const creationModalUsernameInput = $("#creationModal-usernameInput");

    const creationModalFirstNameInput = $("#creationModal-firstNameInput");

    const creationModalLastNameInput = $("#creationModal-lastNameInput");

    const creationModalGenderInput = $("#creationModal-genderInput");

    
    const showInfoModal = $("#showInfoModal");
    const showInfoModalLabel = $("#showInfoModalLabel");
    const showInfoModalBody = $("#showInfoModalBody");
    const removeBtn = $("#removeBtn");
    const editBtn = $("#editBtn");
    const updateBtn = $("#updateBtn");

    let selectedUsername;
    const editFields = [
      {
        fieldname: "username",
        fieldId: "editModal-titleInput",
        label: "User Name *",
        type: "text",
      },
      {
        fieldname: "firstname",
        fieldId: "editModal-priceInput",
        label: "First Name *",
        type: "text",
      },
      {
        fieldname: "lastname",
        fieldId: "editModal-ratingInput",
        label: "Last Name *",
        type: "text",
      },
      {
        fieldname: "gender",
        fieldId: "editModal-stockInput",
        label: "Gender *",
        type: "text",
      }
    ];


  

    creationModalSubmitButton.on("click", async () => {
      const newUser = {
        username: creationModalUsernameInput.val().trim(),
        firstname: creationModalFirstNameInput.val().trim(),
        lastname: creationModalLastNameInput.val().trim(),
        gender: creationModalGenderInput.val().trim(),
      };
      if (
        !newUser.username ||
        !newUser.firstname||
        !newUser.lastname ||
        !newUser.gender  
      ) {
        alert("Invalid inputs");
        return null;
      }

      await fetch("http://localhost:4000/admin/create-user", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => {
          if (res.status === 201) {
            users.push(newUser);
            creationModal.modal("hide");
            creationModalFirstNameInput.val("");
            creationModalLastNameInput.val("");
            creationModalUsernameInput.val("");
            creationModalGenderInput.val("");
            tableBodyRenderer();
          }
        })
        .catch((err) => console.log(err));
    });

    const inputGenerator = (id, label, value, type) => {
      return `
      <div class="mb-3">
        <label for="creationModal-lnameInput" class="form-label"
          >${label}</label
        >
        <input
          type="${type}"
          class="form-control"
          id="${id}"
          value="${value}"
        />
      </div>
      `;
    };

    const editModeBodyGenerator = (user) => {
      let html = "";
      for (const field of editFields) {
        let value = user[field.fieldname];
        html += inputGenerator(field.fieldId, field.label, value, field.type);
      }
      showInfoModalBody.html(html);
    };

    const infoModalBodyGenerator = (user) => {
      return `
          <p>Username: ${user.username}</p>
          <p>First Name: ${user.firstname}</p>
          <p>Last Name: ${user.lastname}</p>
          <p>Gender: ${user.gender}</p>
      `;
    };

    updateBtn.on("click", async () => {
      let newUserInformation = {};
      for (const field of editFields) {
        let value = $(`#${field.fieldId}`).val();
        newUserInformation[field.fieldname] = value;
      }

      await fetch(
        `http://localhost:4000/admin/update-user/${selectedUsername}`,
        {
          method: "PUT",
          body: JSON.stringify(newUserInformation),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      users = users.map((el) => {
        if (el.username === newUserInformation.username) {
          return newUserInformation;
        }
        return el;
      });
      tableBodyRenderer();
      showInfoModal.modal("hide");
    });

    editBtn.on("click", function () {
      removeBtn.removeClass("d-none");
      updateBtn.removeClass("d-none");
      editBtn.addClass("d-none");
      const targetUser = users.find((el) => el.username === selectedUsername);
      editModeBodyGenerator(targetUser);
    });

    removeBtn.on("click", async () => {
      let response= await fetch(
        `http://localhost:4000/admin/remove-user/${selectedUsername}`,
        {
          method: "DELETE",
        }
      )
      // if(response.status===201){
      //   console.log("heoollo");
      // // await fetch("http://localhost:4000/product-page");
        
      // }
      
    });


    

    
    

   this.handleOnClickTableRow = (username) => {
     selectedUsername = username;
     const targetUser = users.find((el) => el.username === username);
     showInfoModalBody.html(infoModalBodyGenerator(targetUser));

     removeBtn.addClass("d-none");
     updateBtn.addClass("d-none");
     editBtn.removeClass("d-none");
   };

    const rowGenerator = (user) => {
      return `
        <tr data-bs-toggle="modal" data-bs-target="#showInfoModal" onclick="handleOnClickTableRow('${user.username}')">
          <td>${user.username}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.gender}</td>
        </tr>
        `;
    };

    const tableBodyRenderer = () => {
      let html = "";

      for (user of users) {
        html += rowGenerator(user);
      }

      tableBody.html(html);
    };

    const sortEvents = () => {
      tableHeadUsername.on("click", function () {
        users.sort((a, b) => a.username - b.username);
        tableBodyRenderer();
      });
      tableHeadFirstName.on("click", function () {
        users.sort((a, b) => a.firstname.localeCompare(b.firstname));
        tableBodyRenderer();
      });
      tableHeadLastName.on("click", function () {
        users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        tableBodyRenderer();
      });
      tableHeadGender.on("click", function () {
        users.sort((a, b) => a.gender.localeCompare(b.gender));
        tableBodyRenderer();
      });
    };

    tableBodyRenderer();
    sortEvents();
  })();
});

