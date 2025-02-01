import React from 'react'
import {Form, Button, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../api/users';
function Login() {

    const Navigate=useNavigate();
    const onfinsh= async (values)=>{
        try{
            const response= await LoginUser(values)
            if(response.success){
                message.success(response.message); 
                localStorage.setItem("token",response.data)
                Navigate("/");
                console.log("successfuly logined in")
            }
            else{
                message.success(response.message); 
                console.log("login file onfinsh failed")
            }
        }
        catch(err){
            console.log(err)
            message.success(err.message); 
        }
    }
  return (
    <div>
        <main className='App-header'>
        <h1>Login to Book My Show</h1>
        <section className='mw-500 text-center px-3'>
            <Form layout="vertical" onFinish={onfinsh}>
    <Form.Item
     label="Email"
     htmlFor='email'
     name='email'
     className="d-block"
     rules={[{required:true,message:"please enter your email it's manaftory"}]}
     >
        <Input id="email" type="text" placeholder='enter your email'/>
    </Form.Item>
    <Form.Item
     label="Password"
     htmlFor='passowrd'
     name='password'
     className="d-block"
     rules={[{required:true,message:"please enter your email it's manaftory"}]}
     >
        <Input id="password" type="text" placeholder='enter your password'>
        </Input>
    </Form.Item>
    <Form.Item className='d-blcok'>
        <Button
        type="primary"
        block
        htmlType='submit'
        style={{fontSize: "1rem", fontWeight:"600"}}
        >
            Login
        </Button>
    </Form.Item>
    <p>New user? <Link to="/register">Register</Link></p>
    <p>Forgot Passowrd? <Link to="/forgot_password">forgot password</Link></p>
            </Form>
        </section>
        </main>

    </div>
  )
}

export default Login