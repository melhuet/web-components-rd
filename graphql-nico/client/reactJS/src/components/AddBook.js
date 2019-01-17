import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:'',
          genre:'',
          authorId:''
        };
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
               return(<option key={author.id} value={author.id}>{author.name}</option>)
            });
        }
    }
    submitForm(e){
        // this refers to the component because we called
        // this.submitForm.bind(this) at a time when 'this' was a reference to the component
        e.preventDefault(); // avoid to reload the page when submitting the form
        this.props.addBookMutation({
            variables : {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        });
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId:e.target.value})}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button title="Add Book">+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name: "getAuthorsQuery"}), // the name will be used as a property name in the .props
    graphql(addBookMutation,{name: "addBookMutation"})  // the name will be used as property name in the .props
)(AddBook);
