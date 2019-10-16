import React, { Component } from 'react';
import axios from 'axios';
let ENV = require('../env');

export default class Edit extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            gender: '',
            phone: ''
        }
    }

    componentDidMount() {
        axios.get(ENV.READER_ENDPOINT+'/reader/contacts/'+this.props.match.params.id)
            .then(response => {
                let contact = response.data.data
                this.setState({
                    name: contact.name,
                    email: contact.email,
                    gender: contact.gender,
                    phone: contact.phone
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const contact = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            phone: this.state.phone
        };

        axios.put(ENV.WRITER_ENDPOINT+'/writer/contacts/'+this.props.match.params.id, contact)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Contact</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genderOptions" 
                                    id="genderMale" 
                                    value="M"
                                    checked={this.state.gender==='M'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">M</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genderOptions" 
                                    id="genderFemale" 
                                    value="F" 
                                    checked={this.state.gender==='F'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">F</label>
                        </div>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input 
                                type="tel" 
                                className="form-control"
                                value={this.state.phone}
                                onChange={this.onChangePhone}
                                />
                        </div>
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Contact" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}