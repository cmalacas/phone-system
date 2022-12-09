import React, {Component, Fragment} from 'react';

import Authservice from '../../components/Authservice';

export default class Register extends Component {

    constructor(props) {

        super(props);

        this.state = {

            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password_confirmation: '',
            errorFirstname: false,
            errorLastname: false,
            errorEmail: false,
            errorPassword: false

        }

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errorFirstname: false,
            errorLastname: false,
            errorEmail: false,
            errorPassword: false
        });

    }

    save() {

        let valid = true;
        let errorFirstname = false;
        let errorLastname = false;
        let errorEmail = false;
        let errorPassword = false;

        const {firstname, lastname, email, password, password_confirmation} = this.state;

        if (firstname === '') {

            errorFirstname = true;
            valid = false;

        }

        if (lastname === '') {

            errorLastname = true;
            valid = false;

        }

        if (email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {

            valid = false;
            errorEmail = true;

        }

        if (password === '' || password != password_confirmation) {

            errorPassword = true;
            valid = false;

        }

        if (valid) {

            const data = {firstname, lastname, email, password, password_confirmation};
            console.log('data', data);

            Authservice.post('/register', data)
            .then( response => {
                if (response.success) {
                    location = '/login';
                }
            })

        } else {

            this.setState({
                errorFirstname,
                errorLastname,
                errorEmail,
                errorPassword
            });

        }
        
    }

    render() {

        return (

            <Fragment>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>

                                <div className="card-body">
                                    
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">First Name</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="firstname" 
                                                    type="text" 
                                                    className={`form-control ${this.state.errorFirstname ? 'is-invalid' : ''}`} 
                                                    name="firstname" 
                                                    value={this.state.firstname} 
                                                    onChange={this.change}
                                                    required autoComplete="firstname" 
                                                    autoFocus 
                                                />

                                                { this.state.errorFirstname ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>This is required</strong>
                                                    </span>
                                                : '' }
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Last Name</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="lastname" 
                                                    type="text" 
                                                    className={`form-control ${this.state.errorLastname ? 'is-invalid' : ''}`} 
                                                    name="lastname" 
                                                    value={this.state.lastname} 
                                                    onChange={this.change}
                                                    required 
                                                    autoComplete="lastname"
                                                />

                                                { this.state.errorLastname ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>This is required</strong>
                                                    </span>
                                                : '' }
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="email" 
                                                    type="email" 
                                                    className={`form-control ${this.state.errorEmail ? 'is-invalid' : ''}`} 
                                                    name="email" 
                                                    value={this.state.email} 
                                                    onChange={this.change}
                                                    required 
                                                    autoComplete="email" 
                                                />

                                                { this.state.errorEmail ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>Email must be valid</strong>
                                                    </span>
                                                : '' }
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="password" 
                                                    type="password" 
                                                    className={`form-control ${this.state.errorPassword ? 'is-invalid' : ''}`} 
                                                    name="password" 
                                                    value={this.state.password}
                                                    onChange={this.change}
                                                    required 
                                                    autoComplete="new-password" 
                                                />

                                                { this.state.errorPassword ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>This is required and must be confirmed</strong>
                                                    </span>
                                                : '' }
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="password-confirm" 
                                                    type="password" 
                                                    className="form-control" 
                                                    name="password_confirmation" 
                                                    required
                                                    value={this.state.password_confirmation}
                                                    onChange={this.change} 
                                                    autoComplete="new-password" 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button onClick={this.save} type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        )


    }

}