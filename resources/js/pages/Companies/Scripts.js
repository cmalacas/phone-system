import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import { formatter, format_datetime, format_date } from '../../components/Functions';
import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";


export default class Scripts extends Component {

    constructor(props) {

        super(props);

        this.state = {

            open: false,

        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.change = this.change.bind(this);
        this.save = this.save.bind(this);

    }

    open() {
        this.setState({ open: true });
    }

    close() {

        this.setState({ open: false });

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    save() {



    }

    render() {

        const company = this.props.company;

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
                                <Input type="textarea" 
                                    name="greeting"
                                    rows={3}
                                    value={this.state.greeting}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="mb-4">
                            <Col md={2} className="font-weight-bold">
                                Response
                            </Col>
                            <Col>
                                <Input type="textarea" 
                                    name="response"
                                    rows={3}
                                    value={this.state.response}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>

                        <Row className="mb-2">
                            <Col md={2} className="font-weight-bold">
                                Names:
                            </Col>
                            <Col>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={2}>

                            </Col>
                            <Col>
                                <Label className="mr-4 pr-2">
                                    <Input className="position-relative ml-0" type="checkbox" /> Call Answering
                                </Label>
                                <Label>
                                    <Input className="position-relative ml-0" type="checkbox" /> Voicemail
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
