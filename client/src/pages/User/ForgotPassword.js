import React, { useEffect } from 'react'
import {Button, Form, Input} from "antd"
import {Link, useNavigate} from "react-router-dom" 
import { forgotPassword, Resetpassword } from '../../api/users'
import { message } from 'antd'


function ForgotPassword() {
    const navigate= useNavigate();
    const onFinsh= async (values)=>{
        // console.log(values)
        try{
            const response=await forgotPassword(values);
            // console.log("fogot passowrd try block", response)
            if(response.success){
                message.success(response.message)
                // console.log("response status", response.success)
                alert("otp sent your email");
                // console.log("fogot password values", values)
                navigate(`/resetpassword/${encodeURIComponent(values.email)}`);
            }
            else{
                message.error(response.message);
                console.log("fogot passowrd else block", response.message)

            }
        }catch(err){
            message.error(err.message);
            console.log("fogot passowrd catch block", err.message)
        }
    };
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[]);
  return (
    <>
    <header className='App-header'>
        <main className='main-area mw-500 text-center px-3'>
    <section className='left-section'>
    <h1>Forgot passpword</h1>
    </section>
    <section className='right-section'>
        <Form layout='vertical' onFinish={onFinsh}>
        <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            className="d-block"
            rules={[{ required: true, message: "Email is required" }]}
            >
            <Input
            id="email"
            type="text"
            placeholder="Enter your Email"
            ></Input>
            </Form.Item>
            <Form.Item className="d-block">
                <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                SEND OTP
                </Button>
                </Form.Item>
        </Form>
        <div><p>Existing password? <Link to="/login">login here</Link></p></div>
    </section>
        </main>
    </header>
    </>
  )
}

export default ForgotPassword