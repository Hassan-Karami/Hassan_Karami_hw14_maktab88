$(document).ready(function () {
  (async () => {
    let users = await fetch("http://localhost:4000/product/get-all-products");
    users = await users.json();
    const tableBody = $("#tableBody");
    const tableHeadID = $("#tableHeadID");
    const tableHeadTitle = $("#tableHeadTitle");
    const tableHeadPrice = $("#tableHeadPrice");
    const tableHeadRating = $("#tableHeadRating");
    const tableHeadStock = $("#tableHeadStock");
    const tableHeadBrand = $("#tableHeadBrand");
    const tableHeadCategory = $("#tableHeadCategory");

    const creationModal = $("#creationModal");
    const creationModalSubmitButton = $("#creationModal-submitButton");

    const creationModalTitleInput = $("#creationModal-titleInput");
    const creationModalPriceInput = $("#creationModal-priceInput");
    const creationModalRatingInput = $("#creationModal-ratingInput");
    const creationModalStockInput = $("#creationModal-stockInput");
    const creationModalBrandInput = $("#creationModal-brandInput");
    const creationModalCategoryInput = $("#creationModal-categoryInput");
    const showInfoModal = $("#showInfoModal");
    const showInfoModalLabel = $("#showInfoModalLabel");
    const showInfoModalBody = $("#showInfoModalBody");
    const removeBtn = $("#removeBtn");
    const editBtn = $("#editBtn");
    const updateBtn = $("#updateBtn");
    const editFields = [
      {
        fieldname: "title",
        fieldId: "editModal-titleInput",
        label: "Title *",
        type: "text",
      },
      {
        fieldname: "price",
        fieldId: "editModal-priceInput",
        label: "Price *",
        type: "number",
      },
      {
        fieldname: "rating",
        fieldId: "editModal-ratingInput",
        label: "Rating *",
        type: "number",
      },
      {
        fieldname: "stock",
        fieldId: "editModal-stockInput",
        label: "Stock *",
        type: "number",
      },
      {
        fieldname: "brand",
        fieldId: "editModal-brandInput",
        label: "Brand *",
        type: "text",
      },
      {
        fieldname: "category",
        fieldId: "editModal-categoryInput",
        label: "Category *",
        type: "text",
      },
    ];
    let rowNumber;
    let idCounter = calculateMaxId();
    let selectedId = -1;

    function calculateMaxId() {
      let ids = users.map((el) => el.id);
      let max = Math.max.apply({}, ids);
      return max + 1;
    }

    creationModalSubmitButton.on("click", async () => {
      const newUser = {
        id: idCounter,
        title: creationModalTitleInput.val().trim(),
        price: +creationModalPriceInput.val().trim(),
        rating: +creationModalRatingInput.val().trim(),
        stock: +creationModalStockInput.val().trim(),
        brand: creationModalBrandInput.val().trim(),
        category: creationModalCategoryInput.val().trim(),
      };
      if (
        !newUser.title ||
        !newUser.price ||
        !newUser.rating ||
        !newUser.stock ||
        !newUser.brand ||
        !newUser.category
      ) {
        alert("Invalid inputs");
        return null;
      }

      await fetch("http://localhost:4000/product/create-product", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => {
          if (res.status === 201) {
            idCounter += 1;
            users.push(newUser);
            creationModal.modal("hide");
            creationModalTitleInput.val("");
            creationModalPriceInput.val("");
            creationModalRatingInput.val("");
            creationModalStockInput.val("");
            creationModalBrandInput.val("");
            creationModalCategoryInput.val("");
            tableBodyRenderer();
          }
        })
        .catch((err) => console.log("Hassan Error" + err));
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
          <p>Title: ${user.title}</p>
          <p>Price: ${user.price}</p>
          <p>Rating: ${user.rating}</p>
          <p>Stock: ${user.stock}</p>
          <p>Brand: ${user.brand}</p>
          <p>Category: ${user.category}</p>

      `;
    };

    updateBtn.on("click", async () => {
      let newUserInformation = { id: selectedId };
      for (const field of editFields) {
        let value = $(`#${field.fieldId}`).val();
        newUserInformation[field.fieldname] = value;
      }

      await fetch(
        `http://localhost:4000/product/update-product/${selectedId}`,
        {
          method: "PUT",
          body: JSON.stringify(newUserInformation),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      users = users.map((el) => {
        if (el.id === selectedId) {
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
      const targetUser = users.find((el) => el.id === selectedId);
      editModeBodyGenerator(targetUser);
    });

    removeBtn.on("click", async () => {
      let response= await fetch(
        `http://localhost:4000/product/remove-product/${selectedId}`,
        {
          method: "DELETE",
        }
      )
      // if(response.status===201){
      //   console.log("heoollo");
      // // await fetch("http://localhost:4000/product-page");
        
      // }
      
    });

    this.handleOnClickTableRow = (id) => {
      selectedId = id;
      showInfoModalLabel.text(`UserId: ${selectedId}`);
      const targetUser = users.find((el) => el.id === id);
      showInfoModalBody.html(infoModalBodyGenerator(targetUser));

      removeBtn.addClass("d-none");
      updateBtn.addClass("d-none");
      editBtn.removeClass("d-none");
    };
    const rowGenerator = (user) => {
      return `
        <tr data-bs-toggle="modal" data-bs-target="#showInfoModal" onclick="handleOnClickTableRow(${user.id})">
          <th scope="row">${rowNumber}</th>
          <td>${user.id}</td>
          <td>${user.title}</td>
          <td>${user.price}</td>
          <td>${user.rating}</td>
          <td>${user.stock}</td>
          <td>${user.brand}</td>
          <td>${user.category}</td>

        </tr>
        `;
    };

    const tableBodyRenderer = () => {
      rowNumber = 0;
      let html = "";

      for (user of users) {
        rowNumber++;
        html += rowGenerator(user);
      }

      tableBody.html(html);
    };

    const sortEvents = () => {
      tableHeadID.on("click", function () {
        users.sort((a, b) => a.id - b.id);
        tableBodyRenderer();
      });
      tableHeadTitle.on("click", function () {
        users.sort((a, b) => a.first_name.localeCompare(b.first_name));
        tableBodyRenderer();
      });
      tableHeadPrice.on("click", function () {
        users.sort((a, b) => a.last_name.localeCompare(b.last_name));
        tableBodyRenderer();
      });
      tableHeadRating.on("click", function () {
        users.sort((a, b) => a.email.localeCompare(b.email));
        tableBodyRenderer();
      });
    };

    tableBodyRenderer();
    sortEvents();
  })();
});

function reloadP() {
  return new Promise((res, rej) => {
    location.reload(true);
    res();
  });
}

// Define a promisified version of the reload.location method
function reloadLocationAsync() {
  return new Promise((resolve, reject) => {
    try {
      window.location.reload();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
