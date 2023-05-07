import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react'
import GetUserInfo from './protectedRoute';
import {message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { HideLoading, ShowLoading } from '../redux/loaderslice';
import DefaultLayout from './DefaultLayout'
require('react-dom');
window.React2 = require('react');

function ProtectedRoute(props) {
    const {user} = useSelector(state=>state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await GetUserInfo()
            dispatch(HideLoading())
            if (response.success) {
                dispatch(setUser(response.data))
            } else {
                message.error(response.message);
                navigate("/login");
            }
        } catch (error) {
            dispatch(HideLoading())
            navigate("/login");
            message.error(error.message)
    
        }
    }

    useEffect(()=>{
       if(localStorage.getItem('token')) {
            if(!user){
                getData();
            }
        
       } else {
        navigate('/login');
       }
        
    },[])

    return (
       user && (<div>
        <DefaultLayout>{props.children}</DefaultLayout>
        </div>)
    )
}

export default ProtectedRoute

