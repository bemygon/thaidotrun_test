import React from 'react';
import {
  Button,
  Col,
  Modal,
  Row
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { DATETIME3_3 } from './DateTime';
import './PageLanding.css';


class ModalFilter extends React.Component {
  state = {
    date1: null,
    date2: null,
    dateText1: '',
    dateText2: '',
    category: { value: '100', label: 'ทั้งหมด' }
  }
  f_date_set1 = (date1, dateText1) => {
    this.setState({ date1, dateText1 })
  }
  f_date_set2 = (date2, dateText2) => {
    this.setState({ date2, dateText2 })
  }
  f_set_null=()=>{
    this.setState({
      date1: null,
      date2: null,
      dateText1: '',
      dateText2: '',
      category: { value: '100', label: 'ทั้งหมด' }
    })
  }
  f_submitFilter = () => {
    this.props.f_submitFilter(this.state.date1, this.state.date2, this.state.category)
    this.f_set_null()
  }
  f_closeFilter=()=>{
    this.f_set_null()
    this.props.f_closeFilter()
  }

  render() {
    return (
      <Modal show={this.props.showFilter} onHide={this.f_closeFilter}>
        <Modal.Header>
          <Modal.Title>กรองข้อมูล</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className='pl-row'>
            <Col xs={3} className='align-r'>ระหว่างวันที่</Col>
            <Col xs={9} ><DATETIME3_3 f_date_set={this.f_date_set1} oEdit={{}} /></Col>
          </Row>
          <Row className='pl-row'>
            <Col xs={3} className='align-r'>ถึงวันที่</Col>
            <Col xs={9} ><DATETIME3_3 f_date_set={this.f_date_set2} oEdit={{}} /></Col>
          </Row>
          <Row className='pl-row'>
            <Col xs={3} className='align-r'>ประเภท</Col>
            <Col xs={9} >
              <Select
                isSearchable={false}
                options={
                  [
                    { value: '100', label: 'ทั้งหมด' },
                    { value: '0', label: 'ค่าน้ำ' },
                    { value: '1', label: 'ค่าไฟ' },
                    { value: '2', label: 'ค่าโทรศัพท์' },
                    { value: '3', label: 'ค่าอาหาร' },
                    { value: '4', label: 'อื่นๆ' },
                  ]
                }
                placeholder=""
                value={this.state.category}
                onChange={(category) => this.setState({ category })}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondaryxx" onClick={this.f_closeFilter}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={this.f_submitFilter}>
            กรองข้อมูล
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export { ModalFilter };
