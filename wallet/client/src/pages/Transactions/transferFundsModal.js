import React from 'react';
import { Modal, Form, message} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderslice';
import { TransferFunds } from '../../apicalls/transactions';

function TransferFundsModal({
    showTransferFundsModal,
    setShowTransferFundsModal,
    reloadData
}) {
    const {user} = useSelector(state => state.users);
    const [isVerified, setIsVerified] = React.useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const verifyAccount = async ()=> {
        try{
            dispatch(ShowLoading());
            const response = await verifyAccount({
                reciever: form.getFieldValue("receiver")
            })
             dispatch(HideLoading());
            if(response.success){
                setIsVerified('true');
            }
            else{
                setIsVerified('false');
            }
        } catch (error) {
            dispatch(HideLoading());
            setIsVerified('false');
        }
    }
    const onFinish = async(values)=>{
        try {
            dispatch(ShowLoading);
            const payload = {
                ...values,
                sender: user._id,
                reference: values.reference || 'no reference',
                status: "success",
            };
            const response = await TransferFunds (payload);
            if(response.success)
            {
                reloadData();
                setShowTransferFundsModal(false);
                message.success(response.message)
            } else {
                message.error(response.message);
                dispatch(HideLoading);
            }
            
        } catch (error) {
            message.error(error.message)
            dispatch(HideLoading);
        }
    }
    return (
        <div>
            <Modal 
            title="Transfer Funds"
            open={showTransferFundsModal}
            onCancel={()=> setShowTransferFundsModal(false)}
            onClose={()=> setShowTransferFundsModal(false)}
            footer={null}
            
            >
                <Form layout="vertical" form = {form}
                onFinish={onFinish}>
                    <div className='flex gap-2 items-center'>
                <Form.Item label="Account Numer" name="receiver" className = "w-100">
                    <input type="text" />
                </Form.Item>
                <button className='primary-contained-btn mt-1'>Verify</button>
                </div>
                {isVerified === 'true' && (<div className='success-bg'>
                    <h1 className='txt=sm' type="button" onClick = {verifyAccount}>Account is Verified</h1>
                    </div>)}
                {isVerified === 'false' && (<div className='success-bg'>
                    <h1 className='txt=sm' type="button" onClick = {verifyAccount}>Invalid Account</h1>
                    </div>)}
                    
                <Form.Item label="Amount" name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your amount',
                        },
                        {
                            max: user.balance,
                            message: "Insufficient Balance",
                        }
                    ]}>
                    <input type="number" max={user.balance} />
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                    <textarea type="text" />
                </Form.Item>
                    <div className='flex justify-end gap-1'>
                        <button className='primary-contained-btn'>Cancel</button>
                        <button className='primary-contained-btn'>Transfer</button>
                        
                    </div>
                </Form>
               
            </Modal>
        </div>
    )
}
export default TransferFundsModal;