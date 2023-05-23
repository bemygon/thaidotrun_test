import React from 'react';
import {
  Button,
  ButtonGroup,
  Col, Container,
  Row, Table
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router-dom';
import { ModalAdd } from './ModalAdd';
import { ModalDelete } from './ModalDelete';
import { ModalEdit } from './ModalEdit';
import { ModalFilter } from './ModalFilter';
import './PageLanding.css';
import $ from 'jquery';


export function f_yy_mm_dd(date, bool) {
  //bool=true -> return array
  //bool=false -> return string yyyy-mm-dd
  const year = (date.getFullYear()).toString()
  const month = f_addZero((date.getMonth() + 1).toString())
  const day = f_addZero(date.getDate().toString())
  if (bool) {
    return [year, month, day]
  } else {
    return year + '-' + month + '-' + day
  }
}
export function f_addZero(num) {
  let newNum = num.length === 1 ? '0' + num : num
  return newNum
}


class PageLanding extends React.Component {
  state = {
    isFilter: false,
    showAdd: false,
    showEdit: false,
    showDelete: false,
    showFilter: false,
    bs1: 3,
    bs2: 4,
    align: 'r',
    aRecord: [],
    oEdit: {},
    ww1: 4,

  }
  f_submitAdd = (date, dateText, category, amount) => {
    //internal
    let aRecord = [...this.state.aRecord]
    let aRecord2 = [...this.state.aRecord]
    const pk = Date.now()
    aRecord.push({ date: date, dateText, category, amount: Number(amount), pk })
    aRecord2.push({ date: Date.parse(date), dateText, category, amount: Number(amount), pk })
    this.setState({ aRecord })
    //external
    localStorage.setItem('aRecord', JSON.stringify(aRecord2))
  }
  f_closeAdd = () => {
    this.setState({ showAdd: false })
  }
  f_closeFilter = () => {
    this.setState({ showFilter: false })
  }
  f_submitFilter = (date1, date2, category) => {
    this.f_closeFilter()
    const aRecord = this.f_load()

    const numDate1 = Date.parse(date1)
    const numDate2 = Date.parse(date2)
    const bothIsNaN = isNaN(numDate1) && isNaN(numDate2)
    let aRecordFilter = aRecord.filter(x =>
      (
        (Date.parse(x.date) >= numDate1) &&
        (Date.parse(x.date) <= numDate2) &&
        ((category.value === '100') || (x.category.value === category.value))
      )
      ||
      (
        bothIsNaN &&
        ((category.value === '100') || (x.category.value === category.value))
      )
    )
    this.setState({ aRecord: aRecordFilter, isFilter: true })

  }
  f_edit_x = (aRecordxx, pk, date, dateText, category, amount) => {
    let temp = [...aRecordxx]
    let temp2 = [...aRecordxx]

    let aRecord = temp.filter(x => (x.pk !== pk))
    let aRecord2 = temp2.filter(x => (x.pk !== pk))

    aRecord.push({ date, dateText, category, amount: Number(amount), pk })
    aRecord2.push({ date: Date.parse(date), dateText, category, amount: Number(amount), pk })

    aRecord.sort((a, b) => a.pk > b.pk ? 1 : -1);
    aRecord2.sort((a, b) => a.pk > b.pk ? 1 : -1);

    return [aRecord, aRecord2]
  }
  f_submitEdit = (pk, date, dateText, category, amount) => {
    let aRecord = this.f_load()
    let [a1Record, a1Record2] = this.f_edit_x(this.state.aRecord, pk, date, dateText, category, amount)
    let [a2Record, a2Record2] = this.f_edit_x(aRecord, pk, date, dateText, category, amount)
    // internal
    this.setState({ aRecord: a1Record })
    // external
    localStorage.setItem('aRecord', JSON.stringify(a2Record2))
  }
  f_submitDelete = (pk) => {
    const aRecord = this.f_load()
    let aRecordx1 = this.state.aRecord.filter(x => x.pk !== pk)
    let aRecordx2 = aRecord.filter(x => x.pk !== pk)
    //internal
    this.setState({ aRecord: aRecordx1 })
    //external
    localStorage.setItem('aRecord', JSON.stringify(aRecordx2))

  }
  f_closeEdit = () => {
    this.setState({ showEdit: false })
  }
  f_closeDelete = () => {
    this.setState({ showDelete: false })
  }
  f_showEdit = (pk, date, dateText, category, amount) => {
    this.setState({
      showEdit: true,
      oEdit: { pk, date, dateText, category, amount }
    })
  }
  f_showDelete = (pk, date, dateText, category, amount) => {
    this.setState({
      showDelete: true,
      oEdit: { pk, date, dateText, category, amount }
    })
  }

  f_load = () => {
    const aRecord = JSON.parse(localStorage.getItem('aRecord'))
    const aRecord2 = []
    if (aRecord === null) {
      return []
    } else {
      for (const x of aRecord) {
        let temp = x
        temp.date = new Date(x.date)
        aRecord2.push(temp)
      }
      return aRecord2
    }
  }
  f_cancle_filter = () => {
    this.setState({ isFilter: false })
    this.f_first_load()
  }

  f_first_load = () => {
    const aRecord = this.f_load()
    this.setState({ aRecord })
  }
  f_width = () => {
    const w = $(window).width()
    if (w < 850) {
      this.setState({ ww1: 12 })
    } else {
      this.setState({ ww1: 4 })
    }
  }
  f_window_resize = () => {
    $(window).on('resize',
      () => {
        this.f_width()
      }
    );
  }
  f_chart = () => {
    let aExpense = new Array(5).fill(0)
    let aRecord = this.state.aRecord
    for (const x of aRecord) {
      const num = Number(x.category.value)
      const amount = Number(x.amount)
      aExpense[num]+=amount
    }    
    let aAmount = new Array(5).fill(0)
    if(aExpense.length>0){
      aAmount = aExpense
    }
    this.props.history.push("/chart", aAmount)
  }

  componentDidMount() {
    this.f_window_resize()
    this.f_first_load()
    this.f_width()
  }

  render() {
    return (
      <div className='pl-out1'>
        <h1>รายการค่าใช้จ่าย</h1>
        <div className='pl-box'>
          <Container fluid style={{ padding: "0 10px 1px 10px" }}>
            <Row style={{
              padding: "15px 0"
            }} >
              <Col
                xs={this.state.ww1}
                className='pl-w9'
              >
                {
                  !this.state.isFilter ?
                    <Button variant="primary" className='bt-333'
                      onClick={() => this.setState({ showAdd: true, amount: 0, category: null })}>เพิ่มรายการ</Button>
                    : <Button variant="warning" className='bt-333' onClick={this.f_cancle_filter}>หยุดกรอง</Button>
                }
              </Col>
              <Col xs={this.state.ww1} className='pl-w9'>
                <Button variant="success"
                  className='bt-333'
                  onClick={() => this.setState({ showFilter: true })}>กรองข้อมูล</Button>
              </Col>
              <Col xs={this.state.ww1} className='pl-w9'>
                <Button variant="danger"
                  className='bt-333'
                  onClick={this.f_chart}>แสดงแผนภูมิ</Button></Col>
            </Row>
            <div>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>ประเภท</th>
                    <th>จำนวน</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.aRecord.map(x =>
                      <tr key={x.pk}>
                        <td>{x.dateText}</td>
                        <td>{x.category && x.category.label}</td>
                        <td>{x.amount && x.amount.toLocaleString()}</td>
                        <td><ButtonGroup size='sm'>
                          <Button variant='secondary'
                            onClick={() => this.f_showEdit(x.pk, x.date, x.dateText, x.category, x.amount)}>แก้ไข</Button>
                          <Button variant='dark'
                            onClick={() => this.f_showDelete(x.pk, x.date, x.dateText, x.category, x.amount)}>ลบ</Button>
                        </ButtonGroup></td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </div>
          </Container>
        </div>

        <ModalAdd
          showAdd={this.state.showAdd}
          f_closeAdd={this.f_closeAdd}
          f_submitAdd={this.f_submitAdd}
        />

        <ModalEdit
          showEdit={this.state.showEdit}
          oEdit={this.state.oEdit}
          f_closeEdit={this.f_closeEdit}
          f_submitEdit={this.f_submitEdit}
        />
        <ModalDelete
          showDelete={this.state.showDelete}
          oEdit={this.state.oEdit}
          f_closeDelete={this.f_closeDelete}
          f_submitDelete={this.f_submitDelete}
        />

        <ModalFilter
          showFilter={this.state.showFilter}
          f_closeFilter={this.f_closeFilter}
          f_submitFilter={this.f_submitFilter}
        />



      </div >
    )
  }
}








export default withRouter(PageLanding)