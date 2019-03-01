package com.chabanoles.graphql;

import com.chabanoles.graphql.repositories.BookRepository;

import com.chabanoles.graphql.resolvers.Mutation;
import com.chabanoles.graphql.resolvers.Query;
import com.coxautodev.graphql.tools.SchemaParser;
import javax.servlet.annotation.WebServlet;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import graphql.schema.GraphQLSchema;
import graphql.servlet.SimpleGraphQLServlet;

/**
 * Created by Nicolas Chabanoles on 07/06/18.
 */
@WebServlet(urlPatterns = "/graphql")
public class GraphQLEndpoint extends SimpleGraphQLServlet {

    private static final BookRepository bookRepository;
    static {
        MongoDatabase mongo = new MongoClient(new MongoClientURI("mongodb://mongouser:mongopassword@ds255319.mlab.com:55319/graphql-nodejs")).getDatabase("graphql-nodejs");
        bookRepository = new BookRepository(mongo.getCollection("books"));
    }

    public GraphQLEndpoint() {
        super(buildSchema());
    }

    private static GraphQLSchema buildSchema() {

        return SchemaParser.newParser()
                .file("schema.graphqls")
                .resolvers(new Query(bookRepository), new Mutation(bookRepository))
                .build()
                .makeExecutableSchema();
    }
}