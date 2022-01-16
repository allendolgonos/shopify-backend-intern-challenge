function highlightItem(selectedItem) {
    if (selectedItem.attributes["class"].value === "selected-item") {
        selectedItem.setAttribute("class", "item")
    } else {
        selectedItem.setAttribute("class", "selected-item")
    }
}

function loadExampleItem() {
    var newRow = document.getElementById("item-table").getElementsByTagName("tbody")[0].insertRow()
    newRow.innerHTML = "<tr><td><input style='text-align: center;' placeholder='Item Name'></input></td><td><textarea style='width:300px; height: 80px; resize: none;' placeholder='Describe your item here...'></textarea></td><td><input type='number' min='0.01' step='0.01' style='text-align: center;' placeholder='0.00'></input></td>"
    newRow.setAttribute("onContextMenu", "highlightItem(this); return false;")
    newRow.setAttribute("class", "item")
    newRow.getElementsByTagName("input")[0].value = "Example Item"
    newRow.getElementsByTagName("textarea")[0].value = "This is the description of Example Item."
    newRow.getElementsByTagName("input")[1].value = "99.99"
    for (td of newRow.getElementsByTagName("input")) {
        td.addEventListener('blur', (event) => {
            updateItems()
        }, true);
    }

    for (td of newRow.getElementsByTagName("textarea")) {
        td.addEventListener('blur', (event) => {
            updateItems()
        }, true);
    }

    fetch("/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        status: "createItem",
        itemName: newRow.getElementsByTagName("input")[0].value,
        itemDescription: newRow.getElementsByTagName("textarea")[0].value,
        itemPrice: newRow.getElementsByTagName("input")[1].value
      })
    })
}

function exportItemsToCSV() {
    fetch("/exportToCSV", {
      method: "get",
      headers: {'Content-Type': 'any'}
    })
}

function updateItems() {
    var itemArray = []
    for (tr of document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")) {
        itemArray.push({
            "itemName": tr.getElementsByTagName("input")[0].value,
            "itemDescription": tr.getElementsByTagName("textarea")[0].value,
            "itemPrice": tr.getElementsByTagName("input")[1].value
        })

    }
    fetch("/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        status: "updateItems",
        itemList: itemArray
      })
    })
}

function createItem() {
    var newRow = document.getElementById("item-table").getElementsByTagName("tbody")[0].insertRow()
    newRow.innerHTML = "<tr><td><input style='text-align: center;' placeholder='Item Name'></input></td><td><textarea style='width:300px; height: 80px; resize: none;' placeholder='Describe your item here...'></textarea></td><td><input type='number' min='0.01' step='0.01' style='text-align: center;' placeholder='0.00'></input></td>"
    newRow.setAttribute("onContextMenu", "highlightItem(this); return false;")
    newRow.setAttribute("class", "item")

    for (td of newRow.getElementsByTagName("input")) {
        td.addEventListener('blur', (event) => {
            updateItems()
        }, true);
    }

    for (td of newRow.getElementsByTagName("textarea")) {
        td.addEventListener('blur', (event) => {
            updateItems()
        }, true);
    }

    fetch("/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        status: "createItem",
        itemName: "",
        itemDescription: "",
        itemPrice: ""
      })
    })
}

function deleteItem() {
    var indexArray = []

    for (item of document.getElementsByClassName("selected-item")) {
            indexArray.push(item.rowIndex - 1)
        }

    fetch("/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        status: "deleteItem",
        selectedItemIndex: indexArray
      })
    })

    while (document.getElementsByClassName("selected-item").length > 0){
        for (item of document.getElementsByClassName("selected-item")) {
            item.remove()
        }
    }
}

window.onload = function() {
    fetch("/loadItems", {
      method: "get",
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(data => {
        for (item of data) {
            var newRow = document.getElementById("item-table").getElementsByTagName("tbody")[0].insertRow()
            newRow.innerHTML = "<tr><td><input style='text-align: center;' placeholder='Item Name'></input></td><td><textarea style='width:300px; height: 80px; resize: none;' placeholder='Describe your item here...'></textarea></td><td><input type='number' min='0.01' step='0.01' style='text-align: center;' placeholder='0.00'></input></td>"
            newRow.setAttribute("onContextMenu", "highlightItem(this); return false;")
            newRow.setAttribute("class", "item")
            newRow.getElementsByTagName("input")[0].value=item.itemName
            newRow.getElementsByTagName("input")[1].value=item.itemPrice
            newRow.getElementsByTagName("textarea")[0].value=item.itemDescription
            for (td of newRow.getElementsByTagName("input")) {
                td.addEventListener('blur', (event) => {
                    updateItems()
                }, true);
            }

            for (td of newRow.getElementsByTagName("textarea")) {
                td.addEventListener('blur', (event) => {
                    updateItems()
                }, true);
            }
        }
    })
}