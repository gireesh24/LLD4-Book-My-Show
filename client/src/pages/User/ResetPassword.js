import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { resetpassword } from '../../api/users'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import FormItem from 'antd/es/form/FormItem'


function ResetPassword() {
    const {email}=useParams();
    const navigate=useNavigate();
    const onFinish=async(values)=>{
        console.log("reset password values", values)
        try{
            const response= await resetpassword(values, email);
            if(response.status==='success'){
                message.success(response.message)
                navigate('/login');
            }
            else{
                message.error(response.message)
            }
        }catch(err){
            message.error(err);
        }
    }
useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate('/');
    }
},[])

  return (
 <>
    <header className='App-header'>
        <section className='main-area mw-500 text-centre px-3'>
        <h1>Reset password</h1>
        </section>
        <section className='right-section'>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item className='d-block'
                label='otp'
                htmlFor='otp'
                name='otp'
                rules={[{required:true, message:"OTP is required"}]}
                >
                    <Input id='otp'
                    type='number'
                    placeholder='Enter Your OTP'
                    ></Input>
                </Form.Item>
                <Form.Item className='d-block'
                label='password'
                htmlFor='password'
                name='password'
                rules={[{required:true, message:"your new password is required to reset"}]}
                >
                    <Input id='password'
                    type='password'
                    placeholder='Enter Your new password'
                    ></Input>
                </Form.Item>
                <FormItem className="d-block">
                    <Button type="primary"
                    block
                    htmlType="submit"
                    style={{fontSize:"1rem", fontWeight:"600"}}>
                        Reset password
                    </Button>
                </FormItem>
            </Form>
        </section>
    </header>
 </>
  )
}

export default ResetPassword