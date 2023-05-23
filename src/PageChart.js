import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import React from 'react';
import {
  Button
} from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import './PageChart.css';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
    },
  },
};

const labels = ['ค่าน้ำ', 'ค่าไฟ', 'ค่าโทรศัพท์', 'ค่าอาหาร', 'อื่นๆ'];

const oData = {
  labels,
  datasets: [
    {
      label: 'ค่าใช้จ่าย',
      data: [0, 0, 0, 0, 0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};


class PageChart extends React.Component {
  state={data:oData}
  
  componentDidMount(){
    const oData2 = {...oData}
    if(!(this.props.location.state===undefined)){
      oData2.datasets[0].data = this.props.location.state      
      this.setState({data:oData2})
    }
  }

  render() {
    
    return (
      <div>
        <h1>
          แผนภูมิ
        </h1>
        <div><Button variant="secondary" onClick={() => this.props.history.push("/")} >กลับหน้าหลัก</Button></div>
        <div className='ch1'>
          <Bar options={options} data={this.state.data} />
        </div>
      </div>



    )
  }
}




export default withRouter(PageChart)