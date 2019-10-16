import React, { Component } from 'react';
import axios from 'axios';
let ENV = require('../env');

export default class Delete extends Component {
    componentDidMount() {
        window.alert("Are you sure want to delete it?");
        console.log(this.props)
        axios.delete(ENV.WRITER_ENDPOINT+'/writer/contacts/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
                <h3 align="center">Deleted...</h3>
            </div>
        )
    }
}