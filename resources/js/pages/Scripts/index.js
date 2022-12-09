import React, {Component, Fragment} from 'react';

export default class Scripts extends Component {

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
                <div className="container">
                    <h5>Scripts</h5>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                        </div>
                    </div>

                </div>
                

            </Fragment>

        )


    }

}