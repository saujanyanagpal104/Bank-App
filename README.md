# Assignment

### Folder Structure

```.
|--- api (mock api)
     |--- public(temp folder for storage)
     |--- data.json
     |--- package.json
     |--- server.js
|--- public
     |--- index.html
|--- src
     |--- components
          |--- App.js
          |--- AuthPage.js
          |--- CapitalDetails.js
          |--- CapitalPage.js
          |--- Header.js
          |--- LoanRecord.js
          |--- NewTransaction.js
          |--- SignUpForm.js
          |--- TransactionAndCapital.js
          |--- TransactionDetails.js
          |--- TransactionRecord.js
          |--- TransactionsPage.js
          |--- UploadDocument.js
     |--- utils
          |--- helperFunctions.js
          |--- constants.js
     |--- styles
          |--- index.css
     |--- index.js
|--- package.json
|--- README.md
```

### Follow the steps to run on local machine:

1. Navigate to the code directory.
2. Install all the dependencies by running **npm install** in the terminal.
3. To run the mock api server, navigate to the *api* directory, install all the dependencies by running **npm install** and **npm start** in the terminal.
4. Navigate back to the *main* directory, run **npm start** in the terminal to launch the app on you local machine.
5. testUserCredentials: username: david_warner, password: testPassword.

> *This app is initialized using create-react-app.