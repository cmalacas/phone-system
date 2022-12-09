import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";

export default class Greetings extends Component {

  constructor(props) {

      super(props);

      this.state = {

        greetings: [],

      }

      this.save = this.save.bind(this);
      this.getData = this.getData.bind(this);
      this.update = this.update.bind(this);
  }

  update(data) {

    Authservice.post('/greetings/update', data)
    .then(response => {

      if (response.greetings) {

        this.setState({ greetings: response.greetings});

      }

    })

  }

  getData() {

    Authservice.post('/greetings/get', false)
    .then(response => {

      if (response.greetings) {

        this.setState({ greetings: response.greetings});

      }

    })

  }

  componentDidMount() {

    this.getData();

  }

  save(data) {

    Authservice.post('/greetings/save', data)
    .then(response => {

      if (response.greetings) {

        this.setState({ greetings: response.greetings});

      }

    })

  }

  render() {

    const data = this.state.greetings.map( g => {

      g.actions = <Fragment>
                    <Edit 
                      greeting={g}
                      save={this.update}
                    />
                    <Button data-tip="delete" color="danger"><FontAwesomeIcon icon={faTrash}/> </Button>
                </Fragment>

      return g;

    })

    const columns = [
                {
                  dataField: 'name',
                  text: 'Name'
                },
                {
                  dataField: 'greeting',
                  text: 'Greeting'
                },
                {
                  dataField: 'actions',
                  text: 'Actions'
                }
              ];

    return (

      <Fragment>
           <div className="container">

              <Row className="mb-3">
                  <Col md={8}>
                      <h5>GREETINGS</h5>
                  </Col>
                  <Col className="text-right">

                      <Add
                          save={this.save} 
                      />
                  </Col>
              </Row>

              <BootstrapTable 
                keyField="id"
                data={data}
                columns={columns}
                striped={true}
                hover={true}
              />
          </div>
      </Fragment>

    )

  }

}

class Add extends Component {

  constructor(props) {

    super(props);

    this.state = {

      open: false,
      greeting: '',
      name: '',
      errorGreeting: false,
      errorName: false

    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);

  }

  open() {

    this.setState({open:true});

  }

  close() {

    this.setState({open:false});

  }

  change(e) {

    this.setState({[e.target.name]: e.target.value, errorGreeting: false, errorName: false});

  }

  save() {

    let valid = true;
    let errorGreeting = false;
    let errorName = false;

    const {greeting, name} = this.state;

    if (greeting === '') {

      valid = false;
      errorGreeting = true;

    }

    if (name === '') {

      valid = false;
      errorName = true;

    }

    if (valid) {

      const data = {greeting, name}

      this.setState({open: false}, () => {

        this.props.save(data);

      })

      

    } else {

      this.setState({ errorGreeting, errorName });

    }

  }

  render() {

    return (

      <Fragment>
        <Button onClick={this.open} color="primary"><FontAwesomeIcon icon={faPlus} /> Add Greeting</Button>
        <Modal isOpen={this.state.open} toggle={this.close}>
          <ModalHeader>
            Add Greeting
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input 
                type="text" 
                name="name" 
                className={this.state.errorName ? 'is-invalid' : ''}
                value={this.state.name} 
                onChange={this.change} 
              />
              { this.state.errorName ?
                  <span className="invalid-feedback" role="alert">
                      <strong>This is required</strong>
                  </span>
              : '' }              
            </FormGroup>
            <FormGroup>
              <Label>Greeting</Label>
              <Input 
                type="textarea" 
                name="greeting" 
                rows={10}
                className={this.state.errorGreeting ? 'is-invalid' : ''}
                value={this.state.greeting} 
                onChange={this.change} 
              />
              { this.state.errorGreeting ?
                  <span className="invalid-feedback" role="alert">
                      <strong>This is required</strong>
                  </span>
              : '' }              
            </FormGroup>
            <Row>
              <Col>
                Tags:<br />
                [company] = display the company name
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.close} color="danger"><FontAwesomeIcon icon={faBan} /> Close</Button>
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

    const greeting = props.greeting;

    this.state = {

      open: false,
      id: greeting.id,
      greeting: greeting.greeting,
      name: greeting.name,
      errorGreeting: false,
      errorName: false

    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);

  }

  open() {

    this.setState({open:true});

  }

  close() {

    this.setState({open:false});

  }

  change(e) {

    this.setState({[e.target.name]: e.target.value, errorGreeting: false, errorName: false});

  }

  save() {

    let valid = true;
    let errorGreeting = false;
    let errorName = false;

    const {id, greeting, name} = this.state;

    if (greeting === '') {

      valid = false;
      errorGreeting = true;

    }

    if (name === '') {

      valid = false;
      errorName = true;

    }

    if (valid) {

      const data = {id, greeting, name}

      this.setState({open: false}, () => {

        this.props.save(data);

      })

      

    } else {

      this.setState({ errorGreeting, errorName });

    }

  }

  render() {

    return (

      <Fragment>
        <Button className="mr-1" onClick={this.open} color="primary"><FontAwesomeIcon icon={faEdit} /></Button>
        <Modal isOpen={this.state.open} toggle={this.close}>
          <ModalHeader>
            Edit Greeting
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input 
                type="text" 
                name="name" 
                className={this.state.errorName ? 'is-invalid' : ''}
                value={this.state.name} 
                onChange={this.change} 
              />
              { this.state.errorName ?
                  <span className="invalid-feedback" role="alert">
                      <strong>This is required</strong>
                  </span>
              : '' }              
            </FormGroup>
            <FormGroup>
              <Label>Greeting</Label>
              <Input 
                type="textarea" 
                name="greeting" 
                rows={10}
                className={this.state.errorGreeting ? 'is-invalid' : ''}
                value={this.state.greeting} 
                onChange={this.change} 
              />
              { this.state.errorGreeting ?
                  <span className="invalid-feedback" role="alert">
                      <strong>This is required</strong>
                  </span>
              : '' }              
            </FormGroup>
            <Row>
              <Col>
                Tags:<br />
                [company] = display the company name
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.close} color="danger"><FontAwesomeIcon icon={faBan} /> Close</Button>
            <Button onClick={this.save} color="success"><FontAwesomeIcon icon={faSave} /> Save</Button>
          </ModalFooter>
        </Modal>
      </Fragment>

    )


  }

}