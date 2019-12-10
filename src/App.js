import React from 'react';
import './App.css';
import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      listOfHolidays : [],
      listOfDates : [],
      todaysDate: "2019-01-14",
      isTodayHoliday: false,
      indexOfHoliday: null
    };
  }

  getListOfHolidays =async  () => {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=f29052781f27e01c6598c27fb6f26a40254eb2ee&country=IN&year=2019`);
const myJson = await response.json();
console.log(myJson);
this.setState({
  listOfHolidays: myJson.response.holidays
})
console.log(this.state.listOfHolidays)
  this.isTodayHoliday()

  }

  isTodayHoliday = () => {
    var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;
this.setState({
  todaysDate: today
})
console.log( "HEYYY " + this.state.todaysDate)
      this.state.listOfHolidays.map(eachHoliday => {
        this.setState({
          listOfDates: [...this.state.listOfDates, eachHoliday.date.iso]
        })
      })
      let isHoliday = this.state.listOfDates.indexOf(this.state.todaysDate);
console.log("isHoliday " , isHoliday)
if(isHoliday != -1) {
  this.setState({
    isTodayHoliday: true,
    indexOfHoliday: isHolidayss
  })
}
  }
componentDidMount(){
  this.getListOfHolidays();
}
showDetails = (index) => {
  alert(this.state.listOfHolidays[index].name + " - " + this.state.listOfHolidays[index].type )
}
  render() {
    let holidays = this.state.listOfHolidays.map((eachHoliday,index) => (
      <div onClick={() => this.showDetails(index)}>{eachHoliday.date.iso}</div>
    ))
    return (
      <div>
        <h1>List Of Holidays</h1>
          {this.state.isTodayHoliday? (<h1>Today is holiday for {this.state.listOfHolidays[this.state.indexOfHoliday].name}</h1>): (<h1>Today is not holiday</h1>)}
          <div className="flex-container">
        {holidays}
        </div>
        <div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>  
  <div>4</div>
  <div>5</div>
  <div>6</div>  
  <div>7</div>
  <div>8</div>
</div>
      </div>
    );
  }
}
export default App;
