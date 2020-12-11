import React,{Component} from 'react';
import qs from 'qs';
import { Form, Input,Button,message } from 'antd';
import axios from 'axios';
import Home from '../Home';

import './style.css';

//const Button = require('antd-mobile/lib/button');

class Login extends Component{
  state={
    login:false
  }
  componentDidMount(){
    this.isLogin();
  }
  isLogin=()=>{    
     axios.get('/api').then(res=>{
      if(res.data.data){
        this.setState({
          login:true
        })
      }
     });
  }
   onFinish = values => {
    axios.post('/api/login',qs.stringify(values) ).then(res=>{
      if(res.data.data){
        this.setState({
          login:true
        })
      }else{
        alert('please try again');
      }
     });
  };
 onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  render(){
    const {login}=this.state;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    if(!login){
      return (
        <div className= 'loginForm'>
          <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className='button'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
    }else{
      return <Home/>
    }


  }
}

export default Login;