import React, {useEffect} from 'react'
import { useSelector , useDispatch } from "react-redux"
import PageTitle from "../../components/pageTitle"

function Home(){
    const {user} = useSelector(state => state.users); 
    const dispatch = useDispatch();

    return (
        <div>
            <PageTitle title={`
                hello ${user.firstName}, welcome to your Wallet
            `}/>
            <div className='bg-secondary p-2 mt-3'>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Account Number</h1>
                    <h1 className='text-md'>{user._id}</h1>
                </div>
                
            </div>
        </div>

    )
}

export default Home