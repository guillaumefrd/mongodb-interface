# mongodb-interface

## Introduction 

This web application is an interface to make queries on a MongoDB dataset. 

The dataset contains the 5000 top sell movies on Amazon. 

## Get started

### Installation

- open your **MongoDB** server (**mongod**)
- copy the repository on your computer 
- with the **Node.js** command prompt, go to the folder and run: 
```
> npm install
```
- to launch the application, run:
```
> npm start
```

### Usage

- open your web browser (application tested on Chrome and Firefox)
- go to [localhost:3000](http://localhost:3000)

### Import the movies dataset

- download the file [movies.json](https://github.com/guillaumefrd/mongodb-interface/blob/master/src/movies.json)
- on the application, go to the **Configuration** page
- log with: 
  - username: prof
  - password: prof
- import the file [movies.json](https://github.com/guillaumefrd/mongodb-interface/blob/master/src/movies.json) (*mongod must be open on your computer*)

## Features

### Queries

You can explore the movies dataset with the following queries: 

- title: *select all the movies that contains your word(s) in the title*
- plot: *select all the movies that contains your word(s) in the plot*
- year: *select all the movies from this year*
- rank: *select all the movies with a rank between your range*
- rating: *select all the movies with a rating between your range*

### Admin

The admin must log on the configuration page. 

Then, he/she can import the movies dataset.

### Screenshots

1. Query on title

![screen_search_title](https://raw.githubusercontent.com/guillaumefrd/mongodb-interface/master/img/screen_title_search.PNG)

2. Query on year

![screen_year_title](https://raw.githubusercontent.com/guillaumefrd/mongodb-interface/master/img/screen_year_search.PNG)

3. Query on rating

![screen_rating_title](https://raw.githubusercontent.com/guillaumefrd/mongodb-interface/master/img/screen_rating_search.PNG)

4. Upload page

![screen_upload](https://raw.githubusercontent.com/guillaumefrd/mongodb-interface/master/img/screen_upload.PNG)
