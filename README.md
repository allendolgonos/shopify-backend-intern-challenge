# Shopify Backend Developer Intern Challenge
The Shopify Backend Developer Intern Challenge is to create an inventory tracking web application that has basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)  functionalities as well as an additional function listed on their [challenge document](https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit).
## Setting Up The Application
1. Make sure you have Python installed on your system, which can be downloaded [here](https://www.python.org/downloads/).
2. Once installed, you will need to install flask, which can be done by executing `pip install flask` in your command prompt.
3. Download this github repository.
## Running The Application
1. In your project directory, execute `python backend.py` to start the backend.
2. The web application is now live at [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
## Using The Application
Create items: Simply click the "Create Item" button.  
Select items: Right click on the item you want to select.  
Delete items: Click on "Delete Item" button. This will delete all selected items.  
Edit items: Click on the field you want to edit, type your value and click off of the field when finished editing.  
Export items to CSV: Click on the "Export Items To CSV" button. The CSV will be created in your project directory.  
Load an example item: Click on the "Load Example Item" button.
## How It Works
### Storage
All items that a user creates is stored in a JSON file in the project directory instead of a SQLite database as appending the data to a database would add unneccesary complexity for this project. Anytime a user makes a change (creating, deleting, editing, etc.) the file is automatically updated. The application will automatically read previously saved data and load it in, allowing you to start and stop the program without losing any of you data.  
  
The window uses the [load event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) to trigger a request to [http://127.0.0.1:5000/loadItems](http://127.0.0.1:5000/loadItems) which triggers the backend to return the list of saved items back to the user.
### Communication Between Frontend And Backend
The browser uses the built-in [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to send requests to the Python backend which is hosted using the [Flask web framework](https://flask.palletsprojects.com/en/2.0.x/).
### CRUD Functionalities
#### Creating Items
An item is created when the user hits the "Create Item" button. The button uses the [onclick Event](https://www.w3schools.com/jsref/event_onclick.asp) to trigger an update to the backend.
![alt text](https://i.imgur.com/JG2d6Mp.png)
#### Editing Items
An item is edited whenever the user updates one of the fields on the items and clicks off of it. These changes are detected by binding the [blur event listener](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) to each of the inputs, which triggers an update to the backend.
![alt text](https://i.imgur.com/rgn6kji.png)
#### Deleting Items
An item is deleted whenever the user selects item(s) using right click and then left clicks the "Delete Item" button. The button uses the [onclick Event](https://www.w3schools.com/jsref/event_onclick.asp) to trigger an update to the backend. The backend receives an array of indexes and interates through them while deleting each index from the array.  
![Hnet-image](https://user-images.githubusercontent.com/97235621/149675782-5911c7d7-c978-4e3b-8aab-b3e44daafb0c.gif)
#### Viewing Items
Items can be viewed at [http://127.0.0.1:5000/](http://127.0.0.1:5000/) once the application is running. The page can be reloaded, the program can be restarted, and the items will still be there.
![alt text](https://i.imgur.com/GqKy4bu.png)
### Bonus Functionalities
#### Exporting Items to CSV
The items will be exported to a csv and automatically downloaded through the browser when the user clicks the "Export Items To CSV" button. The button uses the [onclick Event](https://www.w3schools.com/jsref/event_onclick.asp) to open a new window to [http://127.0.0.1:5000/exportToCSV](http://127.0.0.1:5000/exportToCSV) which triggers the backend to create a CSV file with all the items and return it back to the user.
![alt text](https://i.imgur.com/tdTpEBP.png)
