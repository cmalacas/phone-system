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

        greetings: []

      }

  }

  render() {

    const data = this.state.greetings;

    const columns = [
                {
                  dataField: 'name',
                  text: 'Name'
                },
                {
                  dataField: 'response',
                  text: 'Response'
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
      greeting: '',

    }

  }

  render() {

    return (

      <Fragment>
        <Button color="primary"><FontAwesomeIcon icon={faPlus} /> Add Response</Button>
      </Fragment>

    )


  }

}