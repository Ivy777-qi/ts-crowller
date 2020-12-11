import React,{Component} from 'react';
import {Button } from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import axios from 'axios';
import Login from '../login';

import './style.css';

class Home extends Component{
state={
  login:true,
  lineChart:false,
  data:{}
}

  getData=()=>{
    axios.get('/api/getdata').then(res=>{
      if(res.data.data){
        alert('Get Data Success!');
      }
    
    })
  }
  showData=()=>{
    axios.get('/api/showdata').then(res=>{
      if(res.data.data){
        this.setState({
          lineChart:true,
          data:res.data.data,
        })
      }
    
    })
  }
  handleSignOut=()=>{
    axios.get('/api/loginout').then(res=>{
      if(!res.data.data){
        this.setState({
          login:false
        })
       }
  
    })
  }
  getOption=()=>{
    const {data}=this.state;
    const arrTitle:string[] = [];
    const times:string[] = [];
    const titleData:{
      [title:string]:number[]
    }={}
    let num={};
        for(let key in data){
          const arr= data[key];
          times.push(moment(Number(key)).format('MM-DD HH:mm'));
          arr.map(item=>{
           
            const id =(num as any).id;
            const{title,count}=item;
            if(arrTitle.indexOf(title)===-1){
                arrTitle.push(title);
            }
          // if(!num[index]){
          //   num[index]=[];
          //   num[index].push(count);
          // }else{
          //   num[index].push(count);
          // }
         
            if(!titleData[title]){ //主要判断是否存在,并且在[]
              titleData[title]=[];
              titleData[title].push(count);
          }else{
            titleData[title].push(count);
          }
          console.log(titleData);
          })   
      }
      const result:any=[];
      for(let i in titleData){
        result.push(
          {
            name: i,
            type: 'line',
            data: titleData[i]
        }
        )
          
      }
    const option = {
      title: {
          text: 'Crowller Data'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: arrTitle
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times,
      },
      yAxis: {
          type: 'value'
      },
      series:result
      }
      return option;
  }

  render(){
    const {login,lineChart}=this.state;
    if(login){
      if(lineChart){
        return(
          <div className= 'showLine'>
           <Button onClick={this.getData}>Get Data</Button>
           <Button onClick={this.handleSignOut}>Sign Out</Button>
           <ReactEchartsCore
           echarts={echarts}
            option={this.getOption()}
            style={{ height: '300px', width: '100%' }}
          />
        </div>
        )
      }else{
        return (
          <div className= 'Home'>
           <Button onClick={this.getData}>Get Data</Button>
           <Button onClick={this.showData}>Show Data</Button>
           <Button onClick={this.handleSignOut}>Sign Out</Button>
        </div>
        )
      }
     
    }else{
      return <Login/>
    }
  }
}

export default Home;