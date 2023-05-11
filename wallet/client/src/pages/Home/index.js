import React, {useEffect} from 'react'
import { useSelector , useDispatch } from "react-redux"
import PageTitle from "../../components/pageTitle"

function Home(){
    const {user} = useSelector(state => state.users); 
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Hello World!</h1>
            <PageTitle title={`
                hello ${user.firstName}, welcome to your Wallet
            `}/>
            <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Account Number</h1>
                    <h1 className='text-md'>{user._id}</h1>
                </div>
                
            </div>
             <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Balance</h1>
                    <h1 className='text-md'>{user.balance || 0}</h1>
                </div>
                
            </div>
            <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>First Name</h1>
                    <h1 className='text-md'>{user.firstName || 'User'}</h1>
                </div>
                
            </div>
            <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Last Name</h1>
                    <h1 className='text-md'>{user.lastName || 'User'}</h1>
                </div>
                
            </div>
            <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Phone</h1>
                    <h1 className='text-md'>{user.phoneNumber || 'User'}</h1>
                </div>
                
            </div>
        </div>

    )
}

export default Home