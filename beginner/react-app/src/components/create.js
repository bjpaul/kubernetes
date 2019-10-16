import React, { Component } from 'react';
import axios from 'axios';
let ENV = require('../env');

export default class Create extends Component {
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
        
        const newContact = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            phone: this.state.phone
        };

        axios.post(ENV.WRITER_ENDPOINT+'/writer/contacts', newContact)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            gender: '',
            phone: ''
        })
        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Contact</h3>
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

                    <div className="form-group">
                        <input type="submit" value="Create Contact" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}