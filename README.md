### Problem Statement
Create web application with the following 2 pages

## Stocks page
1. Display a table listing the symbol, name and category for each instrument
2. Provide a search box that fuzzy searches the symbol and name and filters the list
of stocks shown in the table
3. On clicking any symbol, user must be redirected to quotes page for that symbol
(see below)
4. For this page, load data from /instruments API (see 'Input API Details' section
below)

## Quotes page
1. For the selected instrument, show the list of quotes
2. The quotes must be sort-able by timestamp ascending or descending
3. Please refresh the quotes when the valid_till timestamp for the data expires
4. For this page, load data from /quotes API (see 'Input API Details' section below)

### 1. Install NPM packages

```npm install```

### 2. Run
```npm start```

Open http://localhost:3000 to view it in the browser

### Libraries Used
The libraries used in this project are.
* I used:
     1. Frontend - React, MUI, React Icons
     2. Functionality - Fuse.js (Fuzzy search)

### Authors
 1. [Shubhraj Prasad Singh](https://linkedin.com/in/shubhrajps)
