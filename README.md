**The Library - Single Page Application**

_A responsive book-search web application built with vanilla JavaScript and powered by Open Library API.
The app features real time book-search, select by author filter, app theme management and local storage synchronization for favourites._

**Task:** https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view?usp=sharing

**GitHub Pages:** https://nathan-d7.github.io/the_library_task/

**How to run the app:**

1. Make sure you have Node.js installed on your machine.
2. Clone the repository or exctract the project as an archieve.
3. Navigate to the root directory of the project in your terminal.
4. Install the required packages running the command - _**npm install**_

- For development mode use: _**npm run dev**_
- For production build run: _ **npm run build**_
- To locally preview the final production build: _**npm run preview**_

**Project structure:**

```text
├── assets/
│   └── icons/          # Vector SVG assets 
├── src/
│   ├── styles/         # App stylesheets
│   └── scripts/
│       ├── api.js      # Fetches data from the Open Library Search API
│       ├── main.js     # App entry point
│       ├── render.js   # Manages DOM manipulation, active UI states, and template generation
│       ├── storage.js  # Handles local storage functionality for favourites
│       └── theme.js    # Implements theme management logic
├── index.html          # Main HTML5 application shell and semantic layout markup
├── package.json        
└── vite.config.js
