# Getting started with GraphQL
 
 This project is a discovery project for GraphQL.  
 The same application has been implemented in several technologies.    
 
 The front-end has been implemented with:  
 * ReactJS (in client/reactJS folder)
 * AngularJS (in client/angularJS folder)  
 
 The back-end has been implemented with:  
 * NodeJS (in server/nodeJS folder)
 * Java (in server/java folder)  
 
 In all back-end implementations, the persistence is made on MongoDb.


## Pre-requisits
### MongoDb:

To avoid the complexity of installing and managing a local database, this projects rely on an online database from https://mlab.com. If you want to execute this project, you will need to create an account (free) and use your own credentials.

### NodeJS
This project has been built with NodeJS v10.2.1

## Run project
  
### Server

****NodeJS Server****
* cd server/nodeJS
* `npm run start`

****Java Server****
* cd server/java
* `mvn jetty:run`


### Client
You can choose between several client implementation.

****React Client****
* cd client/reactJS
* `npm run start`

****AngularJS Client****
* cd client/angularJS
* `npm run start`

Once both server and client have been started, the application is available here: http://localhost:3000


## Developer notes

### Populate MongoDb with GraphiQL
To manually insert data into MongoDB using GraphQL mutations:
* cd server
* `npm run start`
* access GraphiQL webapp: http://localhost:4000/graphql
* Issue the following mutations:
```GraphQL
mutation {  
	addAuthor(name: "Patrick Rothfuss", age:44) {  
    		id  
    		name  
    		age  
  	}  
}  

mutation {
	addAuthor(name: "Brandon Sanderson", age:42) {
    		id
    		name
    		age
  	}
}

mutation {
	addAuthor(name: "Terry Pratchett", age:66) {
    		id
    		name
    		age
  	}
}

mutation {
	addBook(name: "The Long Earth", genre:"Sci-Fi", authorId:"5b0d747de784af20701a2297") {
    		id
    		name
    		genre
  	}
}

mutation {
	addBook(name: "The Final Empire", genre:"Fantasy", authorId:"5b0d746ce784af20701a2296") {
    		id
    		name
    		genre
  	}
}

mutation {
	addBook(name: "The Hero of Ages", genre:"Fantasy", authorId:"5b0d746ce784af20701a2296") {
    		id
    		name
    		genre
  	}
}

mutation {
	addBook(name: "The Colour of Magic", genre:"Fantasy", authorId:"5b0d747de784af20701a2297") {
    		id
    		name
    		genre
  	}
}

mutation {
	addBook(name: "The Light Fantastic", genre:"Fantasy", authorId:"5b0d747de784af20701a2297") {
    		id
    		name
    		genre
  	}
}

mutation {
	addBook(name: "Name of the Wind", genre:"Fantasy", authorId:"5b0d745ce784af20701a2295") {
    		id
    		name
    		genre
  	}
}
```

## Query MongoDb with GraphiQL
cd server
* `npm run start` or `nodemon server/app.js`
* access GraphiQL webapp: http://localhost:4000/graphql
* Issue the following queries:
```GraphQL
Get author with id 1 and the list of his/her books 
{
  author(id:1){
    name
  	books{
      name
	  genre
    }
  }
}

List all books with their author
{
  books{
    name
  	genre
    author{
      name
    }
  }
}
```
