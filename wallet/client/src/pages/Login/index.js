import React from 'react'
import {Col, Form, Row, message} from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users';



function Login() {

    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response =  await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                // navigate('/login');
            } else {
                message.error(response.message);
            }
        } catch (error) {
             message.error(error.message);
        }
    }

    return(
        <div className='bg-primary flex items-center justify-center h-screen'>
            <div className='w-400 card padding2'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>Wallet - Login</h1>
                
            </div>
            <hr></hr>
            <Form layout='vertical' onFinish={onFinish}>
               <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Email" name="email">
                            <input type="text"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Password" name="password">
                            <input type="password"/>
                        </Form.Item>
                    </Col>
                </Row> 
                <div className='flex justify-end'>
                    <button className='primary-contained-btn w-100'type="submit">Login</button>
                </div>
                <br></br>
                <h2 className='text-s text-underline' onClick={()=>navigate("/register")}>Not a member, Register</h2>
            </Form>
            </div>
        </div>
    )
}

export default Login