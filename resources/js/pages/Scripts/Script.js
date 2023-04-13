import React, {Component, Fragment} from 'react';
import { Card, CardBody, CardHeader, Row, Col, Label } from 'reactstrap';
import Authservice from '../../components/Authservice';


export default class Script extends Component {

    constructor(props) {

        super(props);  

        this.state = {

            name: '',
            email: '',
            greeting: '',
            response: '',
            business_activity: '',
            names: '',
            call_answering: 0,
            voicemail: 0

        }

    }   
    
    componentDidMount() {

        const path = window.location.pathname.split('/');

        const phone = path[2];

        Authservice.post('/companies/script', {phone})
        .then(response => {

            if (response.company) {

                const company = response.company;

                const greeting = company.greeting.replace(/\n/g, '<br />');

                this.setState({
                    name: company.name,
                    email: company.email,
                    business_activity: company.business_activity,
                    greeting: greeting,
                    response: company.response,
                    names: company.names,
                    call_answering: company.call_answering,
                    voicemail: company.voicemail
                })

            }

        })

    }

    render() {

        return (

            <Fragment>

                <div className="container">

                    <Card>
                        <CardHeader>
                            {this.state.name} script
                        </CardHeader>
                        <CardBody>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Business Name:
                                </Col>
                                <Col>
                                    {this.state.name}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Email Address:
                                </Col>
                                <Col>
                                    {this.state.email}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Greeting:
                                </Col>
                                <Col>
                                    <div dangerouslySetInnerHTML={{ __html: this.state.greeting }} />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Response:
                                </Col>
                                <Col>
                                    {this.state.response}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Business Activity:
                                </Col>
                                <Col>
                                    {
                                        this.state.business_activity ?

                                            this.state.business_activity.split("\n").map( b => {

                                                return <p>{b}</p>

                                            })

                                        : '' 
                                    }
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    Names:
                                </Col>
                                <Col>
                                    {this.state.names}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={2}>
                                    
                                </Col>
                                <Col>
                                    
                                    <Label className="mr-4">Call Answering: { this.state.call_answering === 1 ? 'Yes' : 'No'}</Label>

                                    <Label>Voicemail: { this.state.voicemail === 1 ? 'Yes' : 'No'}</Label>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                    

                </div>

            </Fragment>

        )


    }

}