import React, {Component, Fragment} from 'react';

import Authservice from '../../components/Authservice';

export default class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {

            email: '',
            password: '',
            errorEmail: false,
            errorPassword: false

        }

        this.change = this.change.bind(this);
        this.login = this.login.bind(this);

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errorPassword: false,
            errorEmail: false
        });

    }

    login() {

        let valid = true;
        let errorEmail = false;
        let errorPassword = false;

        const {email, password} = this.state;


        if (email === '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {

            valid = false;
            errorEmail = true;

        }

        if (password === '') {

            valid = false;
            errorPassword = true;

        }

        if (valid) {

            const data = {email, password}

            Authservice.post('/login', data)
            .then(response => {

                if (response.success) {

                    location = '/dashboard'

                }

            })

        } else {

            this.setState({
                errorPassword,
                errorEmail
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
                                <div className="card-header">Login</div>

                                <div className="card-body">
                                    
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input 
                                                    id="email" 
                                                    type="email" 
                                                    className={`form-control ${this.state.errorEmail ? "is-invalid" :  ""}`} 
                                                    name="email" 
                                                    value={this.state.email} 
                                                    required 
                                                    onChange={this.change}
                                                    autoComplete="email" 
                                                    autoFocus={true} 
                                                />

                                                { this.state.errorEmail ?
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>Invalid email address</strong>
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
                                                    className={`form-control ${this.state.errorPassword ? "is-invalid" : ""}`} 
                                                    name="password" 
                                                    required
                                                    value={this.state.password}
                                                    onChange={this.change} 
                                                    autoComplete="current-password" 
                                                />

                                                { this.state.errorPassword ? 
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>Invalid password</strong>
                                                    </span>
                                                : '' }
                                            </div>
                                        </div>

                                        {/* <div className="form-group row">
                                            <div className="col-md-6 offset-md-4">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="remember" 
                                                        id="remember"  
                                                    />

                                                    <label className="form-check-label">
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                                </div> */}

                                        <div className="form-group row mb-0">
                                            <div className="col-md-8 offset-md-4">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    onClick={this.login}
                                                >
                                                    Login
                                                </button>

                                                
                                                {/* <a className="btn btn-link" href="/password/request">
                                                    Forgot Your Password?
                                            </a> */}
                                                
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