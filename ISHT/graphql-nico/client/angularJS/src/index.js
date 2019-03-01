import AngularApollo from "angular1-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import angular from "angular";

// Queries
import {getBookQuery, getBooksQuery, getAuthorsQuery, addBookMutation} from './queries/queries';

// Style
import ngAnimate from 'angular-animate'
import './index.css';


angular.module("app", [AngularApollo, ngAnimate]).config(apolloProvider => {
    apolloProvider.defaultClient(new ApolloClient({
        link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
        cache: new InMemoryCache()
    }));
})
    .controller('MyController', ['$scope', 'apollo', function ($scope, apollo) {

        var fetchBooks = function() {

            apollo
                .query({query: getBooksQuery})
                .then(result => {
                    $scope.books = result.data.books;
                    console.log('Book list fetched from server:', $scope.books);
                });
        };

        $scope.newBook = {};

        var fetchAuthors = function() {
            apollo
                .query({query: getAuthorsQuery})
                .then(result => {
                    $scope.authors = result.data.authors;
                });
        };

        $scope.submit = function() {
            apollo
                .mutate({
                    mutation: addBookMutation,
                    variables: {
                        name: $scope.newBook.name,
                        genre: $scope.newBook.genre,
                        authorId: $scope.newBook.author.id
                    },
                    update: (proxy, { data: { addBook } }) => { // update cache entry to reflect the mutation
                        const data = proxy.readQuery({ query: getBooksQuery });
                        data.books.push(addBook);
                        proxy.writeQuery({ query: getBooksQuery, data });
                    }
                })
                .then(() => {
                    $scope.newBook = {};
                    fetchBooks();
                });
        };

        $scope.displayBook = function(book) {
            apollo
                .query({
                    query: getBookQuery,
                    variables: {
                        id: book.id
                    }
                })
                .then(result => {
                    $scope.selectedBook = result.data.book;
                    console.log('Book fetched from server:', $scope.selectedBook);
                });
        };

        // Init
        fetchBooks();
        fetchAuthors();

    }]);

// Manually bootstrap your angular application
angular.bootstrap(document.getElementById('root'), ['app']);

