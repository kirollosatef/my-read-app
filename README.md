# My Reads App

I created this website as a project for my Front-End Web Development Nanodegree from Udacity. This website allows the user to keep track of books that have been read, are currently being read, or that he or she would like to read.

## Download

These instructions will allow you to get a copy of the project that runs on your local machine.

### Prerequisites

* [Git](https://git-scm.com/downloads)
* [npm](https://www.npmjs.com/get-npm)

### Installing

Instructions to clone and run the project:
1. In Terminal, clone the git project using `$ git clone https://github.com/grantiverson/myreads.git`.
2. Navigate to the root directory for the project.
3. Run the command `npm install` to install the necessary dependancies
3. Run the command `npm start` to start the server. This will automatically open the website in your browser.

## Built with

* [React](https://reactjs.org/) - Text Editor
* [Create React App](https://github.com/facebookincubator/create-react-app) - React scaffolding package
* [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
* [Atom](https://atom.io) - Text Editor
* [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming Language
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Markup Language
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) - Styling
* [Google Chrome](https://www.google.com/chrome/) - Browser and Debugging Tool

### How I made this app

I began by scaffolding out the app using [Create React App](https://github.com/facebookincubator/create-react-app). Then I downloaded Udacity's [BooksAPI.js](https://github.com/udacity/reactnd-project-myreads-starter/tree/master/src/booksAPI.js), which allows me to retrieve data from a mock server. I wrote the code that fetches the array of books from the Udacity server, then maps over the array to display each book on the appropriate shelf according to its 'shelf' key. Each book has a 'select' tag that allows for switching shelves, or removing the book altogether. Once I got this functionality working, I added a component to search for books to add to the shelf. This component dynamically searches the server for books whose titles match the inputted query as it is entered. I used [React Router](https://github.com/ReactTraining/react-router) to sync the URL with the app's state so that the back button and bookmark browser features still work.
