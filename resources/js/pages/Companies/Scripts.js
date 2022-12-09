import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import { formatter, format_datetime, format_date } from '../../components/Functions';
import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";
import Greetings from '../Greetings';


export default class Scripts extends Component {

    constructor(props) {

        super(props);

        const company = props.company;

        this.state = {

            open: false,

            id: company.id,
            greeting: company.greeting,
            response: company.response,
            call_answering: company.call_answering,
            voicemail: company.voicemail

        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.change = this.change.bind(this);
        this.save = this.save.bind(this);
        this.selectGreeting = this.selectGreeting.bind(this);
        this.selectResponse = this.selectResponse.bind(this);

    }

    selectResponse(e) {

        const response_id = parseInt(e.target.value);

        const company_id = this.state.id;

        const data = { response_id, company_id }

        Authservice.post('/companies/responses', data)
        .then(response => {

            if (response.response) {

                this.setState({response: response.response});

            }

        })

    }

    selectGreeting(e) {

        const greeting_id = parseInt(e.target.value);

        const company_id = this.state.id;

        const data = { greeting_id, company_id }

        Authservice.post('/companies/greetings', data)
        .then(response => {

            if (response.greeting) {

                this.setState({greeting: response.greeting});

            }

        })

    }

    open() {
        this.setState({ open: true });
    }

    close() {

        this.setState({ open: false });

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errorGreeting: false,
            errorResponse: false
        });

    }

    save() {

        let valid = true;
        let errorGreeting = false;
        let errorResponse = false;

        const { greeting, response, call_answering, voicemail, id } = this.state;

        if (!greeting) {

            valid = false;
            errorGreeting = true;

        }

        if (!response) {

            valid = false;
            errorResponse = true;

        }

        if (valid) {

            const data = { id, greeting, response, call_answering, voicemail };

            Authservice.post('/companies/save-scripts', data);

        } else {

            this.setState({
                errorGreeting,
                errorResponse
            });

        }


    }

    render() {

        const company = this.props.company;

        const greetings = this.props.greetings;

        const responses = this.props.responses;

        return (

            <Fragment>

                <Button onClick={this.open} color="info" data-tip="Scripts" className="mr-1"><FontAwesomeIcon icon={faBook} /> </Button>
                <Modal isOpen={this.state.open} toggle={this.close} className="mw-100 w-75">
                    <ModalHeader>
                        Scripts
                    </ModalHeader>
                    <ModalBody>

                        <Row className="mb-2">
                            <Col md={2} className="font-weight-bold">
                                Business Name:
                            </Col>
                            <Col>
                                {company.name}
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Email Address:
                            </Col>
                            <Col>
                                {company.email}
                            </Col>
                        </Row>

                        <FormGroup row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Greeting
                            </Col>
                            <Col>
                                <Input onChange={this.selectGreeting} type="select" className="form-control mb-2">
                                    <option value="">select</option>
                                    {
                                        greetings.map( g => {

                                            return <option value={g.id}>{g.name}</option>

                                        })
                                    }
                                </Input>
                                <Input type="textarea" 
                                    name="greeting"
                                    rows={3}
                                    value={this.state.greeting}
                                    onChange={this.change}
                                    className={ this.state.errorGreeting ? 'is-invalid' : '' }
                                />
                                { this.state.errorGreeting ?
                                    <span className="invalid-feedback" role="alert">
                                        <strong>This is required</strong>
                                    </span>
                                : '' }
                            </Col>
                        </FormGroup>

                        <FormGroup row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Response
                            </Col>
                            <Col>
                                <Input onChange={this.selectResponse} type="select" className="form-control mb-2">
                                    <option value="">select</option>
                                    {
                                        responses.map( r => {

                                            return <option value={r.id}>{r.name}</option>

                                        })
                                    }
                                </Input>
                                <Input type="textarea" 
                                    name="response"
                                    rows={3}
                                    value={this.state.response}
                                    onChange={this.change}
                                    className={ this.state.errorResponse ? 'is-invalid' : ''}
                                />
                                { this.state.errorResponse ?
                                    <span className="invalid-feedback" role="alert">
                                        <strong>This is required</strong>
                                    </span>
                                : '' }
                            </Col>
                        </FormGroup>

                        <Row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Names:
                            </Col>
                            <Col>
                                {company.names}
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Business Activity:
                            </Col>
                            <Col>
                                {company.business_activity}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={2}>

                            </Col>
                            <Col>
                                <Label className="mr-4 pr-2">
                                    <Input checked={this.state.call_answering === 1} onChange={() => this.setState({ call_answering: this.state.call_answering === 0 ? 1 : 0})} className="position-relative ml-0" type="checkbox" /> Call Answering
                                </Label>
                                <Label>
                                    <Input checked={this.state.voicemail === 1} onChange={() => this.setState({ voicemail: this.state.voicemail === 0 ? 1 : 0})} className="position-relative ml-0" type="checkbox" /> Voicemail
                                </Label>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close} className="mr=1" color="danger"><FontAwesomeIcon icon={faBan} /> Close</Button>
                        <Button onClick={this.save} color="success"><FontAwesomeIcon icon={faSave} /> Save </Button>
                    </ModalFooter>
                </Modal>    

            </Fragment>

        )


    }

}
