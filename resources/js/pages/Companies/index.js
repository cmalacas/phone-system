import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import { formatter, format_datetime, format_date } from '../../components/Functions';
import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";

import paginationFactory from 'react-bootstrap-table2-paginator';

import Dropzone from 'react-dropzone';

import Contacts from './Contacts';
import Scripts from './Scripts';

export default class Companies extends Component {

    constructor(props) {

        super(props);

        this.state = {

            companies: [],
            keywords: '',
            greetings: [],
            responses: []

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

                this.setState({ 
                    companies: response.companies,
                    greetings: response.greetings,
                    responses: response.responses
                });

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

            const phone_number = c.phone_number.replace(/\s/g, '');

            const direct = c.direct.replace(/\s/g, '');

            c._phone_number = <a href={`/company/${phone_number}/script`} target="_blank">{c.phone_number}</a>

            c._direct = <a href={`/company/${direct}/script`} target="_blank">{c.direct}</a>

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
                    greetings={this.state.greetings}
                    responses={this.state.responses}
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
                    dataField: '_phone_number',
                    text: 'Phone Number'
                },
                {
                    dataField: '_direct',
                    text: 'Direct Dialing'
                },
                {
                    dataField: 'company',
                    text: 'Company'
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
            company: 'CO',
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

        const {name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity, company} = this.state;

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

                const data = {name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity, company};

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
                <Modal isOpen={this.state.open} toggle={this.close} className="mw-100 w-75">
                    <ModalHeader>
                        Add Company
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup row>
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
                                <Label>
                                    Email Address:
                                </Label>
                                <Input 
                                    type="text" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>

                        

                        <FormGroup row>
                            <Col md={6}>
                                <Label>
                                    Phone Number:
                                </Label>
                                <Input type="text" name="phone_number" value={this.state.phone_number} onChange={this.change} />
                                { this.state.errorPhone ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>

                            <Col md={6}>
                                <Label>
                                    Direct Dialing:
                                </Label>
                                <Input type="text" name="direct" value={this.state.direct} onChange={this.change} />
                                { this.state.errorDirect ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>
                            
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Business Activity:
                            </Label>
                            <Input type="textarea" rows={20} name="business_activity" value={this.state.business_activity} onChange={this.change} />
                        </FormGroup>

                        <FormGroup row>
                            <Col md={6}>
                                <Label>
                                    Company:
                                </Label>
                                <Input className="form-control" name="company" onChange={ this.change } type="select" value={ this.state.company }>
                                    <option value="">select company</option>
                                    <option value="CO">CO</option>
                                    <option value="YCF">YCF</option>
                                </Input>
                            </Col>
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
            vm_path: company.vm_path,
            greeting_path: company.greeting_path,
            direct: company.direct,
            company: company.company,
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
       
        this.drop = this.drop.bind(this);
    }

    drop(files, section) {

        const data = new FormData();

        files.forEach((file, index) => {
            data.append(`file`, file, file.name);
        });

        data.append('company_id', this.state.id);
        data.append('section', section);

        this.setState( { uploading: true } );

        Authservice.post('/companies/upload', data)
        .then( response => {

            if (response.path) {

                if (section === 'vm') {

                    this.setState( { vm_path: response.path } );

                } else if (section === 'greeting') {

                    this.setState( { greeting_path: response.path } );

                }

            }

        })

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

        const {id, name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity, vm_path, greeting_path, company} = this.state;

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

                const data = {id, name, contact_person_firstname, contact_person_lastname, email, phone_number, direct, business_activity, vm_path, greeting_path, company};

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
                <Modal isOpen={this.state.open} toggle={this.close} className="mw-100 w-75">
                    <ModalHeader>
                        Edit Company
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup row>
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
                                <Label>
                                    Email Address:
                                </Label>
                                <Input 
                                    type="text" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>                       

                        
                        <FormGroup row>
                            <Col md={6}>
                                <Label>
                                    Phone Number:
                                </Label>
                                <Input type="text" name="phone_number" value={this.state.phone_number} onChange={this.change} />
                                { this.state.errorPhone ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>
                            <Col md={6}>
                                <Label>
                                    Direct Dialing:
                                </Label>
                                <Input type="text" name="direct" value={this.state.direct} onChange={this.change} />
                                { this.state.errorDirect ?
                                    <span className="invalid-feedback d-block" role="alert">
                                        <strong>this is required</strong>
                                    </span>

                                : '' }
                            </Col>
                        </FormGroup>                       

                        <FormGroup>
                            <Label>
                                Business Activity:
                            </Label>
                            <Input type="textarea" rows={20} name="business_activity" value={this.state.business_activity} onChange={this.change} />                             
                            
                        </FormGroup>

                        <FormGroup row>
                            <Col md={6}>
                                <Label>
                                    Company:
                                </Label>
                                <Input className="form-control" name="company" onChange={ this.change } type="select" value={ this.state.company }>
                                    <option value="">select company</option>
                                    <option value="CO">CO</option>
                                    <option value="YCF">YCF</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup className="ml-0" row>
                            <Col md={4} className="p-4 border">
                               
                                
                                <Dropzone 
                                    accept={{'audio/wav': []}}
                                    onDrop={(acceptedFiles) => this.drop(acceptedFiles, "vm")}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Label className="d-block">VM</Label>
                                                { this.state.vm_path ?

                                                    <Fragment>

                                                        <Label className="d-block">
                                                            <audio controls>
                                                                <source src={ this.state.vm_path } type="audio/wav" />
                                                            </audio>
                                                        </Label>
                                                        <Label
                                                            className="text-nowrap"
                                                            style={{ overflow: 'hidden', width: '450px', textOverflow: 'ellipsis' }}
                                                        >
                                                            File: { this.state.vm_path }
                                                        </Label>

                                                    </Fragment>

                                                : '' }
                                                <p>Click here to select the .wav file</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={4} className="p-4 border">
                                
                                
                                <Dropzone 
                                    accept={{'audio/wav': []}}
                                    onDrop={(acceptedFiles) => this.drop(acceptedFiles, "greeting")}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Label className="d-block">Greeting</Label>
                                                { this.state.greeting_path ?

                                                    <Fragment>

                                                        <Label className="d-block">
                                                            <audio controls>
                                                                <source src={ this.state.greeting_path } type="audio/wav" />
                                                            </audio>
                                                        </Label>
                                                        <Label
                                                            className="text-nowrap"
                                                            style={{ overflow: 'hidden', width: '450px', textOverflow: 'ellipsis' }}
                                                        >
                                                            File: { this.state.greeting_path }
                                                        </Label>

                                                    </Fragment>

                                                    : '' }
                                                <p>Click here to select the .wav file</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>
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