import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import { formatter, format_datetime, format_date } from '../../components/Functions';
import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";

import paginationFactory from 'react-bootstrap-table2-paginator';

import Contacts from './Contacts';
import Scripts from './Scripts';

export default class Companies extends Component {

    constructor(props) {

        super(props);

        this.state = {

            companies: [],
            keywords: '',

        }

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getData = this.getData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);

    }

    search(e) {

        this.setState({keywords: e.target.value});

    }

    delete(company) {

        Authservice.post('/companies/delete', { id: company.id })
        .then( response => {

            if (response.companies) {

                this.setState({ companies: response.companies });

            }

        })

    }

    getUser() {
    
    }

    getData() {

        Authservice.post('/companies/get', false)
        .then( response => {

            if (response.companies) {

                this.setState({ companies: response.companies });

                ReactTooltip.rebuild();

            }

        })

    }

    change(e) {

        this.setState({[e.target.name]: e.target.value});

    }

    save(data) {

        Authservice.post('/companies/save', data)
        .then( response => {

            if (response.companies) {

                this.setState({ companies: response.companies });

            }

        })
        
    }

    update(data) {

        Authservice.post('/companies/update', data)
        .then( response => {

            if (response.companies) {

                this.setState({ companies: response.companies });

            }

        })

    }

    componentDidMount() {

        this.getUser();
        this.getData();

    }

    render() {

        const companies = this.state.companies.filter( c => {

            const str = `${c.name}${c.phone_number}${c.direct}`.toString().toUpperCase();

            const keywords = this.state.keywords.toString().toUpperCase();

            if (keywords === '' || str.indexOf(keywords) >= 0 ) {

                return c;

            }

        });

        const data = companies.map( c => {

            c.actions = <Fragment>

                <Edit
                    company={c} 
                    save={this.update}
                />

                <Contacts
                    company={c} 
                />

                <Scripts 
                    company={c}
                />

                
                <Button color="danger" data-tip="Delete" onClick={() => this.delete(c) }><FontAwesomeIcon icon={faTrash} /> </Button>


            </Fragment>

            return c;

        })

        const columns = [
                {
                    dataField: 'name',
                    text: 'Company Name'
                },
                {
                    dataField: 'phone_number',
                    text: 'Phone Number'
                },
                {
                    dataField: 'direct',
                    text: 'Direct Dialing'
                },
                {
                    dataField: 'actions',
                    text: 'Actions'
                }

            ];

        const pageOptions = {
            showTotal: false,
            sizePerPage: 15,
            hideSizePerPage: true
        }

        return (

            <Fragment>

                <div className="container">

                    <Row className="mb-3">
                        <Col md={8}>
                            <h5>COMPANIES</h5>
                        </Col>
                        <Col className="text-right d-flex">

                            <Input type="search" placeholder="Search" onChange={this.search} />

                            <Add
                                save={this.save} 
                            />
                        </Col>
                    </Row>
                    
                
                    <Row>
                        <Col>
                            <BootstrapTable 
                                keyField='id'
                                data={data}
                                columns={columns}
                                striped={true}
                                hover={true}
                                pagination={ paginationFactory( pageOptions ) }
                            />
                        </Col>
                    </Row>

                </div>
                
                <ReactTooltip />


            </Fragment>

        )


    }

}

class Add extends Component {

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            contact_person_firstname: '',
            contact_person_lastname: '',
            email: '',
            phone_number: '',
            business_activity: '',
            direct: '',
            open: false,
            errorName: false,
            errorContactFirstname: false,
            errorContactLastname: false,
            errorEmail: false,
            errorPhone: false,
            errorDirect: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);

    }

    open() {

        this.setState({ open: true });

    }

    close() {

        this.setState({ open: false });

    }

    save() {

        let valid = true;
        let errorName = false;
        let errorContactFirstname = false;
        let errorContactLastname = false;
        let errorEmail = false;
        let errorPhone = false;
        let errorDirect = false;

        const {name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity} = this.state;

        if (name === '') {

            valid = false;
            errorName = true;

        }

        /* if (contact_person_firstname === '') {

            valid = false;
            errorContactFirstname = true;

        }

        if (contact_person_lastname === '') {

            valid = false;
            errorContactLastname = true;

        }

        if (email === '') {

            valid = false;
            errorEmail = true;

        } */

        if (phone_number === '') {

            valid = false;
            errorPhone = true;

        }

        if (direct === '') {

            valid = false;
            errorDirect = true;

        }

        if (valid) {

            this.setState( { open: false}, () => {

                const data = {name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity};

                this.props.save(data)

            })

        } else {

            this.setState({errorName, errorContactFirstname, errorContactLastname, errorEmail, errorPhone, errorDirect});

        }

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errorName: false,
            errorContactFirstname: false,
            errorContactLastname: false,
            errorEmail: false,
            errorPhone: false,
            errorDirect: false
        });

    }

    render() {

        return (

            <Fragment>
                <Button onClick={this.open} color="primary" className="text-nowrap ml-1"><FontAwesomeIcon icon={faPlus} /> Add Company</Button>
                <Modal isOpen={this.state.open} toggle={this.close}>
                    <ModalHeader>
                        Add Company
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label>
                                Company Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="name" 
                                value={this.state.name} 
                                onChange={this.change} 
                            />
                            { this.state.errorName ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        {/* <FormGroup row>
                            <Col>
                                <Label>
                                    Contact First Name:
                                </Label>
                                <Input type="text" name="contact_person_firstname" value={this.state.contact_person_firstname} onChange={this.change} />
                                { this.state.errorContactFirstname ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>

                            <Col>
                                <Label>
                                    Contact Last Name:
                                </Label>
                                <Input type="text" name="contact_person_lastname" value={this.state.contact_person_lastname} onChange={this.change} />
                                { this.state.errorContactLastname ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>
                        </FormGroup> */ }

                         <FormGroup>
                            <Label>
                                Email Address:
                            </Label>
                            <Input 
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.change}
                            />
                            
                        </FormGroup>

                        

                        <FormGroup>
                            <Label>
                                Phone Number:
                            </Label>
                            <Input type="text" name="phone_number" value={this.state.phone_number} onChange={this.change} />
                            { this.state.errorPhone ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Direct Dialing:
                            </Label>
                            <Input type="text" name="direct" value={this.state.direct} onChange={this.change} />
                            { this.state.errorDirect ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Business Activity:
                            </Label>
                            <Input type="textarea" rows={10} name="business_activity" value={this.state.business_activity} onChange={this.change} />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close} color="danger"><FontAwesomeIcon icon={faBan} /> Cancel</Button>
                        <Button onClick={this.save} color="success"><FontAwesomeIcon icon={faSave} /> Save</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>

        )

    }


}


class Edit extends Component {

    constructor(props) {

        super(props);

        const company = props.company;

        this.state = {
            id: company.id,
            name: company.name,
            contact_person_firstname: '',
            contact_person_lastname: '',
            business_activity: company.business_activity,
            email: company.email,
            phone_number: company.phone_number,
            direct: company.direct,
            open: false,
            errorName: false,
            errorContactFirstname: false,
            errorContactLastname: false,
            errorEmail: false,
            errorPhone: false,
            errorDirect: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);

    }

    open() {

        this.setState({ open: true });

    }

    close() {

        this.setState({ open: false });

    }

    save() {

        let valid = true;
        let errorName = false;
        let errorContactFirstname = false;
        let errorContactLastname = false;
        let errorEmail = false;
        let errorPhone = false;
        let errorDirect = false;

        const {id, name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity} = this.state;

        if (name === '') {

            valid = false;
            errorName = true;

        }

       
        if (phone_number === '') {

            valid = false;
            errorPhone = true;

        }

        if (direct === '') {

            valid = false;
            errorDirect = true;

        }

        if (valid) {

            this.setState( { open: false}, () => {

                const data = {id, name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity};

                this.props.save(data)

            })

        } else {

            this.setState({errorName, errorContactFirstname, errorContactLastname, errorEmail, errorPhone, errorDirect});

        }

    }

    change(e) {

        this.setState({
            [e.target.name]: e.target.value,
            errorName: false,
            errorContactFirstname: false,
            errorContactLastname: false,
            errorEmail: false,
            errorPhone: false,
            errorDirect: false
        });

    }


    render() {

        return (

            <Fragment>
                <Button onClick={this.open} color="info" data-tip="Edit" className="mr-1"><FontAwesomeIcon icon={faEdit} /> </Button>
                <Modal isOpen={this.state.open} toggle={this.close}>
                    <ModalHeader>
                        Edit Company
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label>
                                Company Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="name" 
                                value={this.state.name} 
                                onChange={this.change} 
                            />
                            { this.state.errorName ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Email Address:
                            </Label>
                            <Input 
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.change}
                            />
                            
                        </FormGroup>

                        
                        <FormGroup>
                            <Label>
                                Phone Number:
                            </Label>
                            <Input type="text" name="phone_number" value={this.state.phone_number} onChange={this.change} />
                            { this.state.errorPhone ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Direct Dialing:
                            </Label>
                            <Input type="text" name="direct" value={this.state.direct} onChange={this.change} />
                            { this.state.errorDirect ?
                                <span className="invalid-feedback d-block" role="alert">
                                    <strong>this is required</strong>
                                </span>

                            : '' }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Business Activity:
                            </Label>
                            <Input type="textarea" rows={10} name="business_activity" value={this.state.business_activity} onChange={this.change} />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close} color="danger"><FontAwesomeIcon icon={faBan} /> Cancel</Button>
                        <Button onClick={this.save} color="success"><FontAwesomeIcon icon={faSave} /> Save</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>

        )

    }

}