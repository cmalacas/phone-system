import React, {Component, Fragment} from 'react';

export default class Script extends Component {

    constructor(props) {

        super(props);

        this.state = {

            email: '',
            password: '',
            errorEmail: false,
            errorPassword: false

        }

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);

    }

    change(e) {

        this.setState({[e.target.name]: e.target.value});

    }

    save() {


        
    }

    render() {

        return (

            <Fragment>

                

            </Fragment>

        )


    }

}