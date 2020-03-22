// Storage Controller

// Item Controller
const ItemController = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookie", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      // Create ID
      let ID;

      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Parse calories string to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function (id) {
      let found = null;

      // Loop through items
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    getTotalCalories: function () {
      let total = 0;

      // Iterate through items to obtain total calories
      data.items.forEach(item => total += item.calories);

      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },

    logData: function () {
      return data;
    }
  }
})();



// UI Controller
const UIController = (function () {

  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  }

  // Public methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItemToUI: function (item) {
      // Show list in UI
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
        }
      });
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function () {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    getSelectors: function () {
      return UISelectors;
    }
  }

})();



// App Controller
const AppController = (function (ItemController, UIController) {

  // Load event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);
  }

  // Add item submit
  const itemAddSubmit = function (e) {

    //Get form input from UI Controller
    const input = UIController.getItemInput();

    // Ensure name and calorie inputs are filled before submission
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add item to UI list
      UIController.addListItemToUI(newItem);

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);

      // Clear input fields
      UIController.clearInput();
    }

    e.preventDefault();
  }

  // Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Differentiate "item" from number
      const listIdArr = listId.split("-");

      // Get the actual ID
      const id = parseInt(listIdArr[1]);

      // Get item to edit
      const itemToEdit = ItemController.getItemById(id);

      // Set current item
      ItemController.setCurrentItem(itemToEdit);

      // Add item to form
      UIController.addItemToForm();

    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UIController.getItemInput();

    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);

    // Update UI
    UIController.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();

    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);

    UIController.clearEditState();

    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {

      // Clear edit state / set initial state
      UIController.clearEditState();

      // Fetch items from data structure
      const items = ItemController.getItems();

      // Hide List UI if empty
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemController, UIController);

// Initialise App
AppController.init();