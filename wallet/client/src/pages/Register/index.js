import React from 'react'
import {Col, Form, Row, message} from 'antd'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users';
import { useState } from 'react';



function Register() {
    const [firstName, setFirst] = useState('');
    function handleFirstNameChange (e) {
        console.log(`here is e`)
        setFirst(e.target.value);
        console.log(`here is e2`)
    }
    const [lastName, setLast] = useState('');
    function handleLastNameChange (e) {
        setLast(e.target.value);
    }
    const [email, setEmail] = useState('');
    function handleEmailChange (e) {
        setEmail(e.target.value);
    }
    const [phoneNumber, setPhone] = useState('');
    function handlePhoneChange (e) {
        setPhone(e.target.value);
    }
    const [identificationType, setIdType] = useState('');
    function handleIdTypeChange (e) {
        setIdType(e.target.value);
    }
    const [identificationNumber, setIdNumber] = useState('');
    function handleIdNumberChange (e) {
        setIdNumber(e.target.value);
    }
    const [address, setAddress] = useState('');
    function handleAddressChange (e) {
        setAddress(e.target.value);
    }
    const [password, setPassword] = useState('');
    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    function handleConfirmPasswordChange (e) {
        setConfirmPassword(e.target.value);
    }
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response =  await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
                navigate('/login');
            } else {
                message.error(response.message);
            }
        } catch (error) {
             message.error(error.message);
        }
    }

    return(
        <div className='margin3'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>Wallet - Register</h1>
                <h2 className='text-s text-underline' onClick={()=>navigate("/login")}>Already a member, Login</h2>
            </div>
            <hr></hr>
            <Form layout='vertical' onFinish={onFinish}>
               <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="First Name" name="firstName">
                            <input type="text" value={ firstName || ""} onChange={(e) => handleFirstNameChange(e)}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Last Name" name="lastName">
                            <input type="text" value={lastName} onChange={handleLastNameChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Email" name="email">
                            <input type="text" value={email} onChange={handleEmailChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <input type="text" value={phoneNumber} onChange={handlePhoneChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Identification Type" name="identificationType">
                            <select value={identificationType} onChange={handleIdTypeChange}>
                                <option value="Driver's License">Driver's License</option>
                                <option value="Passport">Passport</option>
                                <option value="Social Security Card">Social Security Card</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Identification Number" name="identificationNumber">
                            <input type="text" value={identificationNumber} onChange={handleIdNumberChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address" name="address">
                            <textarea type="text" value={address} onChange={handleAddressChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Password" name="password">
                            <input type="password" value={password} onChange={handlePasswordChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Confirm Password" name="confirmPassword">
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                        </Form.Item>
                    </Col>
                </Row> 
                <div className='flex justify-end'>
                    <button className='primary-contained-btn'type="submit">Register</button>
                </div>

            </Form>
        </div>
    )
}

export default Register;