import React, { Component } from 'react';
import axios from 'axios';
let ENV = require('../env');

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {contacts: []};
    }

    componentDidMount() {
        axios.get(ENV.READER_ENDPOINT+'/reader/contacts/count/M')
            .then(response => {
                this.setState({ maleCount: response.data.data });
            })
            .catch(function (error){
                console.log(error);
            })
        axios.get(ENV.READER_ENDPOINT+'/reader/contacts/count/F')
            .then(response => {
                this.setState({ femaleCount: response.data.data });
            })
            .catch(function (error){
                console.log(error);
            })
        axios.get(ENV.READER_ENDPOINT+'/reader/contacts/stat')
            .then(response => {
                let event = response.data.data;
                this.setState({ 
                    createEvent: event.createEvent, 
                    updateEvent: event.updateEvent, 
                    deleteEvent: event.deleteEvent 
                });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3>Contact Summary</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Male</th>
                            <th>Femail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.maleCount}</td>
                            <td>{this.state.femaleCount}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Activity History</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Create</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.createEvent}</td>
                            <td>{this.state.updateEvent}</td>
                            <td>{this.state.deleteEvent}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}