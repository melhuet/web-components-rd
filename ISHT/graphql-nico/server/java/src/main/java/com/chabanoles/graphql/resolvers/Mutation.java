package com.chabanoles.graphql.resolvers;

import com.chabanoles.graphql.model.Book;
import com.chabanoles.graphql.repositories.BookRepository;
import com.coxautodev.graphql.tools.GraphQLRootResolver;

/**
 * Created by Nicolas Chabanoles on 08/06/18.
 */
public class Mutation implements GraphQLRootResolver {

    private final BookRepository BookRepository;

    public Mutation(BookRepository bookRepository) {
        this.BookRepository = bookRepository;
    }

    public Book createBook(String name, String genre) {
        Book newBook = new Book(name, genre);
        return BookRepository.saveBook(newBook);
    }
}