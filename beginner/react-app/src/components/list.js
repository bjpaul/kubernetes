import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
let ENV = require('../env');

const Contact = props => (
    <tr>
        <td>{props.contact.name}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.gender}</td>
        <td>{props.contact.phone}</td>
        <td>
            <Link to={"/edit/"+props.contact._id}>Edit</Link> |  
            <Link to={"/delete/"+props.contact._id}>Delete</Link> 
        </td>
    </tr>
)

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {contacts: []};
    }

    componentDidMount() {
        axios.get(ENV.READER_ENDPOINT+'/reader/contacts')
            .then(response => {
                this.setState({ contacts: response.data.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    contactList() {
        return this.state.contacts.map(function(currentContact, i){
            return <Contact contact={currentContact} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Contact List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
                </table>
            </div>
        )
    }
}