import React from 'react';
import { Form,Button,Input, message, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../api/users';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate=useNavigate();

const onfinsh= async (values) =>{
    try{
const response= await RegisterUser(values);
if(response.success){
    // success
    message.success(response.message)
    navigate('/login')
}
else{
    message.success(response.message)
}
    }catch(err){
        console.log(err);
        message.success(err.message)

    }
}

  return (
    <div>      <main className='App-header'>
    <h1>Register to Book My Show</h1>

    <section className='mw-500 text-center px-3'>
      <Form layout="vertical" onFinish={onfinsh}>
        <Form.Item
 label="Username"
 htmlFor='name'
 name='name'
 className="d-block"
 rules={[{required:true,message:"please enter your name it's manaftory"}]}
 >
    <Input id="email" type="text" placeholder='enter your name'/>
</Form.Item>
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
 rules={[{required:true,message:"please enter your name it's manaftory"}]}
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
        Rigister
    </Button>
</Form.Item>
<Form.Item className='d-block text-center'
label="register as a partner" 
htmlFor='role' 
name="role" 
initialValue={false}
rules={[{required:true, message:"please select an option"}]}>

<div className='d-flex justify-content-start'>
<Radio.Group name="radioGroup" className='flex-start'>
    <Radio value={"partner"}>Yes</Radio>
    <Radio value={"user"}>No</Radio>
</Radio.Group>
</div>
</Form.Item>
<p>
    {" "}
    Already a user ? <Link to="/login">Login</Link></p>

        </Form>
    </section>
    </main>
</div>
  )
}

export default Register