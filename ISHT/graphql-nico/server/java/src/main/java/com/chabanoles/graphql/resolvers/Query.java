package com.chabanoles.graphql.resolvers;

import java.util.List;

import com.chabanoles.graphql.model.Book;
import com.chabanoles.graphql.repositories.BookRepository;
import com.coxautodev.graphql.tools.GraphQLRootResolver;

/**
 * Created by Nicolas Chabanoles on 07/06/18.
 */
public class Query implements GraphQLRootResolver {

    private final BookRepository bookRepository;

    public Query(BookRepository bookRepository) {

        this.bookRepository = bookRepository;
    }

    public List<Book> allBooks() {
        return bookRepository.getAllBooks();
    }

    public Book book(String id) { return bookRepository.findById(id); }

}