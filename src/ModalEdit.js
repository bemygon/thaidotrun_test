import React from 'react';
import {
  Button,
  Col,
  FormControl,
  Modal,
  Row
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './PageLanding.css';

import { DATETIME3_3 } from './DateTime';


class ModalEdit extends React.Component {
  state = {
    amount: 0,
    category: null,
    date:null,
    dateText:'',
    bs1: 3,
    bs2: 4,
    align: 'r'
  }
  f_close = ()=>{
    this.setState({amount:0,category:null,date:null,dateText:''})
    this.props.f_closeEdit();
  }
  f_date_set =(date,dateText)=>{this.setState({date,dateText})}
  f_submitEdit =()=>{
    //internal
    this.props.f_submitEdit(this.props.oEdit.pk,this.state.date,this.state.dateText,this.state.category,this.state.amount)
    this.setState({amount:0,category:null,date:null,dateText:''})
    this.props.f_closeEdit();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.oEdit!==this.props.oEdit){
      this.setState({
        date:this.props.oEdit.date,
        dateText:this.props.oEdit.dateText,
        category:this.props.oEdit.category,
        amount:Number(this.props.oEdit.amount)
      })
    }

  }
  render() {
    return (
      <Modal show={this.props.showEdit} onHide={this.f_close}>

        <Modal.Header>
          <Modal.Title>แก้ไขรายการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='pl-row'>
            <Col xs={2} className='align-r'>วันที่</Col>
            <Col xs={10} ><DATETIME3_3 f_date_set={this.f_date_set} 
            disabled={false}
            oEdit={this.props.oEdit} 
            /></Col>
          </Row>

          <Row className='pl-row'>
            <Col xs={2} className='align-r'>ประเภท</Col>
            <Col xs={10}>
              <Select
                isSearchable={false}
                options={
                  [
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
          <Row className='pl-row'>
            <Col xs={2} className='align-r'>จำนวน</Col>
            <Col xs={10}>
              <FormControl                
                onChange={(e) => this.setState({ amount: e.target.value })}
                value={this.state.amount}
                autoComplete="off"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondaryxx" onClick={this.f_close}>
            ยกเลิก
          </Button>
          <Button variant="secondary" onClick={this.f_submitEdit}>
            แก้ไขรายการ
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export { ModalEdit };

