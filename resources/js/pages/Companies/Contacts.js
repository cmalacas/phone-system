import React, {Fragment, Component}  from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import { formatter, format_datetime, format_date } from '../../components/Functions';
import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";


export default class Contacts extends Component {

    constructor(props) {

        super(props);

        this.state = {

            open: false,
            contacts: []

        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.getData = this.getData.bind(this);
        this.delete = this.delete.bind(this);

    }

    delete(company) {

        Authservice.post(`/contacts/delete`, {id: company.id})
        .then( response => {

            if (response.contacts) {

                this.setState({contacts: response.contacts});

            }
        })

    }

    getData() {

        const company = this.props.company;

        Authservice.post(`/contacts/${company.id}/get`, false)
        .then( response => {

            if (response.contacts) {

                this.setState({contacts: response.contacts});

            }
        })


    }

    update(data) {

        Authservice.post('/contacts/update', data)
        .then(response => {

            if (response.contacts) {

                this.setState({contacts: response.contacts});

            }

        });


    }

    save(data) {

        Authservice.post('/contacts/save', data)
        .then(response => {

            if (response.contacts) {

                this.setState({contacts: response.contacts});

            }

        });

    }

    open() {
        this.setState({open:true}, () => this.getData() );
    }

    close() {
        this.setState({open:false});
    }

    componentDidMount() {

        //this.getData();

    }

    render() {

        const data = this.state.contacts.map( c => {

            c.actions = <Fragment>
                            <Edit
                                contact={c}
                                save={this.update}
                            />
                            <Button onClick={() => this.delete(c)} data-tip="Delete" color="danger"><FontAwesomeIcon icon={faTrash} /> </Button>
                        </Fragment>

            return c;

        })

        const columns = [
            {
                dataField: 'contact_name',
                text: 'Contact Name'
            },
            {
                dataField: 'email',
                text: 'Email'
            },
            {
                dataField: 'phone_number',
                text: 'Phone Number'
            },
            {
                dataField: 'position',
                text: 'Position'
            },
            {
                dataField: 'actions',
                text: 'Actions'
            }
        ];

        return (

            <Fragment>
                <Button onClick={this.open} color="info" data-tip="Contacts" className="mr-1"><FontAwesomeIcon icon={faUsers} /> </Button>
                <Modal isOpen={this.state.open} toggle={this.close} className="w-75 mw-100">
                    <div className="modal-header">
                        <h5 className="modal-title">Contacts</h5>

                        <Add
                            company={this.props.company}
                            save={this.save} 
                        />
                    </div>
                    <ModalBody>
                        <BootstrapTable 
                                keyField='id'
                                data={data}
                                columns={columns}
                                striped={true}
                                hover={true}
                            />
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </Fragment>

        )

    }


}

class Add extends Component {

    constructor(props) {

        super(props);

        const company = props.company;

        this.state = {

            open: false,
            firstname: '',
            lastname: '',
            email: '',
            phone_number: '',
            position: '',
            company_id: company.id,
            errorFirstname: false,
            errorLastname: false

        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);

    }

    change(e) {
    
        this.setState({
            [e.target.name]: e.target.value,
            errorFirstname: false,
            errorLastname: false
        })
    
    } 

    save() {

        let valid = true;
        let errorFirstname = false;
        let errorLastname = false;

        const {company_id, firstname, lastname, email, phone_number, position} = this.state;

        if (firstname === '') {

            valid = false;
            errorFirstname = true;

        }

        if (lastname === '') {

            valid = false;
            errorLastname = true;

        }

        if (valid) {

            const data = {company_id, firstname, lastname, email, phone_number, position};

            this.setState({ open: false}, () => {

                this.props.save(data);


            });


        } else {


            this.setState({errorFirstname, errorLastname})

        }
        


    }

    open() {

        this.setState({open:true});

    }

    close() {

        this.setState({open:false});

    }

    render() {

        return (

            <Fragment>
                <Button onClick={this.open} color="primary"><FontAwesomeIcon icon={faPlus} /> Add Contact</Button>
                <Modal isOpen={this.state.open} toggle={this.close}>
                    <ModalHeader>
                        Add Contact
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label>
                                First Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="firstname" 
                                value={this.state.firstname} 
                                className={this.state.errorFirstname ? 'is-invalid' : '' }
                                onChange={this.change} 
                            />
                            { this.state.errorFirstname ?

                                <span className="invalid-feedback" role="alert">
                                    <strong>This is required</strong>
                                </span>

                                : ''
                            }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Last Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="lastname" 
                                value={this.state.lastname} 
                                className={this.state.errorLastname ? 'is-invalid' : '' }
                                onChange={this.change} 
                            />
                            { this.state.errorLastname ?

                                <span className="invalid-feedback" role="alert">
                                    <strong>This is required</strong>
                                </span>

                                : ''
                            }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Email:
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
                            <Input 
                                type="text" 
                                name="phone_number" 
                                value={this.state.phone_number} 
                                onChange={this.change} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Position:
                            </Label>
                            <Input 
                                type="text" 
                                name="position" 
                                value={this.state.position} 
                                onChange={this.change} 
                            />
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

        const contact = props.contact;
        
        this.state = {

            open: false,
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email,
            phone_number: contact.phone_number,
            position: contact.position,
            company_id: contact.company_id,
            errorFirstname: false,
            errorLastname: false

        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);

    }

    change(e) {
    
        this.setState({
            [e.target.name]: e.target.value,
            errorFirstname: false,
            errorLastname: false
        })
    
    } 

    save() {

        let valid = true;
        let errorFirstname = false;
        let errorLastname = false;

        const {id, company_id, firstname, lastname, email, phone_number, position} = this.state;

        if (firstname === '') {

            valid = false;
            errorFirstname = true;

        }

        if (lastname === '') {

            valid = false;
            errorLastname = true;

        }

        if (valid) {

            const data = {id, company_id, firstname, lastname, email, phone_number, position};

            this.setState({ open: false}, () => {

                this.props.save(data);


            });


        } else {


            this.setState({errorFirstname, errorLastname})

        }
        


    }

    open() {

        this.setState({open:true});

    }

    close() {

        this.setState({open:false});

    }

    render() {

        return (

            <Fragment>
                <Button onClick={this.open} className="mr-1" color="primary"><FontAwesomeIcon icon={faEdit} /></Button>
                <Modal isOpen={this.state.open} toggle={this.close}>
                    <ModalHeader>
                        Edit Contact
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label>
                                First Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="firstname" 
                                value={this.state.firstname} 
                                className={this.state.errorFirstname ? 'is-invalid' : '' }
                                onChange={this.change} 
                            />
                            { this.state.errorFirstname ?

                                <span className="invalid-feedback" role="alert">
                                    <strong>This is required</strong>
                                </span>

                                : ''
                            }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Last Name:
                            </Label>
                            <Input 
                                type="text" 
                                name="lastname" 
                                value={this.state.lastname} 
                                className={this.state.errorLastname ? 'is-invalid' : '' }
                                onChange={this.change} 
                            />
                            { this.state.errorLastname ?

                                <span className="invalid-feedback" role="alert">
                                    <strong>This is required</strong>
                                </span>

                                : ''
                            }
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Email:
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
                            <Input 
                                type="text" 
                                name="phone_number" 
                                value={this.state.phone_number} 
                                onChange={this.change} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Position:
                            </Label>
                            <Input 
                                type="text" 
                                name="position" 
                                value={this.state.position} 
                                onChange={this.change} 
                            />
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