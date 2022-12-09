import React, {Component, Fragment} from 'react';

import {Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, Modal, Button, Label, Input, FormGroup, Row, Col} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faSave, faBan, faTrash, faEdit, faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

import Authservice from '../../components/Authservice';

import ReactTooltip from "react-tooltip";

export default class Responses extends Component {

  constructor(props) {

      super(props);

      this.state = {

        responses: []

      }

      this.getData = this.getData.bind(this);
      this.save = this.save.bind(this);
      this.update = this.update.bind(this);

  }

  update(data) {

    Authservice.post('/responses/update', data)
    .then(response => {

      if (response.responses) {

        this.setState({responses: response.responses});

      }

    })

  }

  save(data) {

    Authservice.post('/responses/save', data)
    .then(response => {

      if (response.responses) {

        this.setState({responses: response.responses});

      }

    })

  }

  getData() {

    Authservice.post('/responses/get', false)
    .then(response => {

      if (response.responses) {

        this.setState({responses: response.responses});

      }

    })

  }

  componentDidMount() {

    this.getData();

  }

  render() {

    const data = this.state.responses.map( r => {

      r.actions = <Fragment>
                    <Edit 
                      response={r}
                      save={this.update}
                    />
                    <Button data-tip="Delete" className="ml-1" color="danger"><FontAwesomeIcon icon={faTrash} /> </Button>
                  </Fragment>

      return r;

    })

    const columns = [
                {
                  dataField: 'name',
                  text: 'Name',
                  classes: 'text-nowrap'
                },
                {
                  dataField: 'response',
                  text: 'Response'
                },
                {
                  dataField: 'actions',
                  text: 'Actions',
                  classes: 'text-nowrap'
                }
              ];

    return (

      <Fragment>
           <div className="container">

              <Row className="mb-3">
                  <Col md={8}>
                      <h5>RESPONSES</h5>
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
      response: '',
      name: '',
      errorResponse: false,
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

    this.setState({[e.target.name]: e.target.value, errorResponse: false, errorName: false});

  }

  save() {

    let valid = true;
    let errorResponse = false;
    let errorName = false;

    const {response, name} = this.state;

    if (response === '') {

      valid = false;
      errorResponse = true;

    }

    if (name === '') {

      valid = false;
      errorName = true;

    }

    if (valid) {

      const data = {response, name}

      this.setState({open: false}, () => {

        this.props.save(data);

      })

      

    } else {

      this.setState({ errorResponse, errorName });

    }

  }

  render() {

    return (

      <Fragment>
        <Button onClick={this.open} color="primary"><FontAwesomeIcon icon={faPlus} /> Add Response</Button>
        <Modal isOpen={this.state.open} toggle={this.close}>
          <ModalHeader>
            Add Response
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
              <Label>Response</Label>
              <Input 
                type="textarea" 
                name="response" 
                rows={10}
                className={this.state.errorResponse ? 'is-invalid' : ''}
                value={this.state.response} 
                onChange={this.change} 
              />
              { this.state.errorResponse ?
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

    const response = props.response;

    this.state = {

      open: false,
      id: response.id,
      response: response.response,
      name: response.name,
      errorResponse: false,
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

    this.setState({[e.target.name]: e.target.value, errorResponse: false, errorName: false});

  }

  save() {

    let valid = true;
    let errorResponse = false;
    let errorName = false;

    const {response, name, id} = this.state;

    if (response === '') {

      valid = false;
      errorResponse = true;

    }

    if (name === '') {

      valid = false;
      errorName = true;

    }

    if (valid) {

      const data = {response, name, id}

      this.setState({open: false}, () => {

        this.props.save(data);

      })

      

    } else {

      this.setState({ errorResponse, errorName });

    }

  }

  render() {

    return (

      <Fragment>
        <Button onClick={this.open} color="primary"><FontAwesomeIcon icon={faEdit} /></Button>
        <Modal isOpen={this.state.open} toggle={this.close}>
          <ModalHeader>
            Edit Response
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
              <Label>Response</Label>
              <Input 
                type="textarea" 
                name="response" 
                rows={10}
                className={this.state.errorResponse ? 'is-invalid' : ''}
                value={this.state.response} 
                onChange={this.change} 
              />
              { this.state.errorResponse ?
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