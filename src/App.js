import React, {Component } from 'react'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      AllHolidays : [],
      holidayDates : [],
      todaysDate: "",
      todayHoliday: false,
      holidayindex: -1,
      show: false,
      name:'',
      description:'',
      type:'',
      date:'',
      month:'',
      year:'',
      PassedHolidays: [],
      upcomingHolidays: [],
      loading: 'PENDING',
    };
  }
  
holidays2019 =async  () => {
const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=94115799c6076a5d0fda14183cfcef69a78a01e6&country=IN&year=2019`);
if(response.status !==200) {
  this.setState({
    loading: 'ERROR'
  })
}
else {
  const myJson = await response.json();
  this.setState({
  AllHolidays: myJson.response.holidays
  })

this.alldates(); 
this.todayHoliday();  
  this.setState({
    loading: "SUCCESS"
  })
  this.pastholidays();
}
}

todayHoliday = () => {  var today = new Date();
  var dates = today.getDate();
  var months = today.getMonth()+1; 
  var years = today.getFullYear();
  if(dates<10) 
  {
      dates='0'+dates;
  } 
  if(months<10) 
  {
      months='0'+months;
  } 
  today = years+'-'+months+'-'+dates;
  
  this.setState({
    todaysDate: today
  })
  this.state.AllHolidays.map(i => {
    this.setState({
      holidayDates: [...this.state.holidayDates, i.date.iso]
    })
  })
  
  let istodayHoliday = this.state.holidayDates.indexOf(this.state.todaysDate);
  if(istodayHoliday !== -1) {
    this.setState({
      todayHoliday: true,
      holidayindex: istodayHoliday
    })}

}

componentDidMount(){
  this.holidays2019();
}

holidayinfo = (i) => {
  this.setState({ show: true });
    this.setState({
    name: this.state.AllHolidays[i].name,
    description: this.state.AllHolidays[i].description,
    type:this.state.AllHolidays[i].type,
    date:this.state.AllHolidays[i].date.datetime.day,
    month:this.state.AllHolidays[i].date.datetime.month,
    year:this.state.AllHolidays[i].date.datetime.year,
    
  }) 
}


alldates = () => {

var today = new Date();
var dates = today.getDate();
var months = today.getMonth()+1; 
var years = today.getFullYear();
if(dates<10) 
{
    dates='0'+dates;
} 

if(months<10) 
{
    months='0'+months;
} 
today = years+'-'+months+'-'+dates;
var todaydate = new Date(today);
let allpassedholidays = this.state.AllHolidays.filter(i => {
let holidayDate = new Date(i.date.iso);
let difference = holidayDate - todaydate ;
return (difference<0)
})  

this.setState({
  PassedHolidays: allpassedholidays
})

let allupcomingholidays = this.state.AllHolidays.filter(i => {
let holidayDate = new Date(i.date.iso);
let difference = holidayDate - todaydate;
  return (difference>0)
})

this.setState({
  upcomingHolidays: allupcomingholidays
})

}

futureholidays = () => {
  this.setState({
   AllHolidays: this.state.upcomingHolidays
  })
}

pastholidays = () =>{
  this.setState({
    AllHolidays: this.state.PassedHolidays
  })
}

hideModal = () => {
  this.setState({ show: false });
}

showModal = () => {
  this.setState({ show: false });
}

render() {
 
  let holidays = this.state.AllHolidays.map((i,index) => (
    <div onClick={() =>this.holidayinfo(index)}>  
    {this.showModal}
    <p id="day">{i.date.datetime.day}</p>
    {<p id="month">{(() => {switch (i.date.datetime.month) {
          case 1: return "January";
          case 2: return "Feburary";
          case 3:  return "March";
          case 4: return "April";
          case 5: return "May";
          case 6: return "June";
          case 7: return "July";
          case 8: return "August";
          case 9: return "September";
          case 10: return "October";
          case 11: return "November";
          case 12: return "December";
          default: return;
        }
      })()}</p>} 
    </div>))

    return (
      <div>
        {this.state.todayHoliday?(<center>
      <h1>Hey, you got a Holiday today.</h1>
{/* 
       { <h1 className="date">{this.state.AllHolidays[this.state.holidayindex].date.datetime.day} {(() => {switch (this.state.AllHolidays[this.state.holidayindex].date.datetime.month) {
          case 1:  return "January";
          case 2: return "Feburary";
          case 3:  return "March";
          case 4: return "April";
          case 5: return "May";
          case 6: return "June";
          case 7: return "July";
          case 8: return "August";
          case 9: return "September";
          case 10: return "October";
          case 11: return "November";
          case 12: return "December";
          default: return;}})()} {this.state.AllHolidays[this.state.holidayindex].date.datetime.year}</h1>
        }
      {<p className="name">{this.state.AllHolidays[this.state.holidayindex].name}</p> }
      {<button className="type">{this.state.AllHolidays[this.state.holidayindex].type}</button>} */}
      </center>):
      (<center><h1>No Holiday Today</h1></center>)}

      <Modal show={this.state.show} handleClose={this.hideModal} >
         <center> <h1 class="date">
        {this.state.date} {(() => {switch (this.state.month) {
          case 1:  return "January";
          case 2: return "Feburary";
          case 3:  return "March";
          case 4: return "April";
          case 5: return "May";
          case 6: return "June";
          case 7: return "July";
          case 8: return "August";
          case 9: return "September";
          case 10: return "October";
          case 11: return "November";
          case 12: return "December";
        default: return;}})()} {this.state.year} </h1>

        <p className="name">{ this.state.name}</p>
        <button className="type">{this.state.type} </button>
        <p className="description">{this.state.description}</p>
        </center>
      </Modal>
      
      
            
    <div className="btn"> 
    <button className="upcomingholidaybtn" onClick={this.futureholidays}>Upcoming Holidays</button>
    <button className="passedholidaybtn" onClick={this.pastholidays}>Passed Holidays</button> 
    </div>

    <center><div className="holiday-container">
    {this.state.loading === "ERROR" ? (<h1 className="loading">ERROR IN LOADING</h1>): (null)}
    {this.state.loading ==="SUCCESS"  ? (holidays) : (<h1 className="loading">Loading...</h1>)}
    </div></center>
    </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <center><button
        className='close'
          onClick={handleClose}
        >
          Close
        </button></center>
      </section>
    </div>
  );
};
const container = document.createElement('div');
document.body.appendChild(container);


export default App;