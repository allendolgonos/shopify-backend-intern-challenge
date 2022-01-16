# Written by: Allen Dolgonos
# Last edited: 1/16/2022


# Imports
import flask
import json
import csv


items = []  # List for storing the items

app = flask.Flask(__name__, template_folder="template")  # Creates the flask app and sets the template folder
app.static_folder = "static"  # Sets my static folder directory so I can access the styles.css file from index.html


@app.route("/", methods=["GET", "POST"])
def index():
    if flask.request.method == "GET":
        return flask.render_template("index.html")
    elif flask.request.method == "POST":
        if flask.request.json.get("status") == "createItem":
            items.append({
                "itemName": flask.request.json.get("itemName"),
                "itemDescription": flask.request.json.get("itemDescription"),
                "itemPrice": flask.request.json.get("itemPrice")
            })
            return "Created item"
        elif flask.request.json.get("status") == "deleteItem":
            for i in reversed(flask.request.json.get("selectedItemIndex")):
                items.pop(i)
            return "Deleted items"
        elif flask.request.json.get("status") == "updateItems":
            items.clear()
            for item in flask.request.json.get("itemList"):
                items.append(item)
            return "Edited items"
        elif flask.request.json.get("status") == "deleteItem":
            items.pop()


@app.route("/loadItems", methods=["GET"])
def loadItems():
    return json.dumps(items)


@app.route("/exportToCSV", methods=["GET"])
def exportToCSV():
    with open("exported_items.csv", "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Item Name", "Item Description", "Item Price"])
        for item in items:
            writer.writerow([item["itemName"], item["itemDescription"], item["itemPrice"]])

    return "Exported CSV file to project directory"


if __name__ == '__main__':
    app.run(port=5000)
