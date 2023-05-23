import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTime.css';

class DATETIME3_3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      date: null,
      dateText: '',
    })
  }
  addZero = num => {
    let newNum = num.length === 1 ? '0' + num : num
    return newNum
  }
  setStartDate = date => {

    
    const year = (date.getFullYear() + 543).toString()
    const month = this.addZero((date.getMonth() + 1).toString())
    const day = this.addZero(date.getDate().toString())
    const dateText = day + '-' + month + '-' + year
    this.props.f_date_set(date,dateText)
    this.setState({
      date,
      dateText,
    })
  }

  componentDidMount(){
    if(this.props.oEdit && this.props.oEdit.date && this.props.oEdit.dateText){
      this.setState({
        date:this.props.oEdit.date,
        dateText:this.props.oEdit.dateText
      })
    }
  }
  // componentDidUpdate(prevPros,prevState){
  //   if(prevPros.warn!==this.props.warn){
  //       if(this.props.warn){
          
  //       }
  //   }
  // }
  render() {
    return (
      <div >
        <div className='dt-con1'>
          <input
            type="text"
            id="my-input1"
            value={this.state.dateText}
            disabled={true}
            className='dt-aa1'
            placeholder={this.props.warn && ' กรุณาเลือกวันที่'}
          />

          <div className='dt-aa2'>
            <DatePicker
              disabled={this.props.disabled}
              selected={this.state.date}
              onChange={date => this.setStartDate(date)}
              customInput={
                <CHILD_COMPONENT3_3
                  startDate={this.state.date}
                  childRef={ref => (this.child = ref)}
                />}
            />
          </div>
        </div>
      </div>
    )
  }
}

class CHILD_COMPONENT3_3 extends React.Component {
  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }
  render() {
    return (
      <button className="example-custom-input" onClick={this.props.onClick}>
        <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

    )
  }
}

export {DATETIME3_3} 