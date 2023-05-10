import React, { useEffect } from 'react';
import PageTitle from '../../components/pageTitle';
import { Table } from 'antd';
import TransferFundsModal from '../../../../server/models/transferFundsModal';
import {useDispatch, useSelector} from "react-redux";
import { HideLoading, ShowLoading } from '../../redux/loaderslice';
import { GetTransactionsOfUser } from '../../apicalls/transactions';
import {message} from 'antd';
import moment from "moment";

function Transactions () {
    const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false);
    const [data = [], setData] = React.useState([]);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.users);
    const columns = [
       {
        title: "Date",
        dataIndex: "date",
        render: (text, record) => {
            return moment(record.createAt).format("DD-MM-YYYY hh:mm:ss A");
        }
       },
       {
        title: "Transaction ID",
        dataIndex: "_id",
       },
       {
        title: "Amount",
        dataIndex: "amount",
       },
       {
        title: "Type",
        dataIndex: "type",
        render: (text, record) => {
            return record.sender._id === user._id ? "Debit" : "credit"
        }
       },
       {
        title: "Reference Account",
        dataIndex: "", 
        render : (text, record) => {
            return record.sender._id === user._id ? <div>
                <h1>{record.receiver.firstName} {record.receiver.lastName}</h1>
            </div> : <div>
                <h1>{record.sender.firstName} {record.sender.lastName}</h1>
            </div>
        }
       },
       {
        title: "Reference",
        dataIndex: "reference",
       },
       {
        title: "Status",
        dataIndex: "status",
       }
        
    ];
    const getData= async()=> {
        try {
            dispatch(ShowLoading());
            const response = await GetTransactionsOfUser();
            if (response.success) {
                setData(response.data)
            }
            dispatch(HideLoading());
        } catch (error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(()=> {
        getData();
    },[]);
    return (
        <div>Transactions
            <div className='flex justify-between'>
                <PageTitle title='Transactions'/>
                <div className='flex gap-1'>
                    <button className='primary-contained-btn'>Transfer</button>
                    <button className='primary-contained-btn' onClick={()=> setShowTransferFundsModal(true)}>Deposit</button>
                </div>
            </div>
            <Table columns={columns} dataSource={data}/>
            {showTransferFundsModal && <TransferFundsModal showTransferFundsModal={showTransferFundsModal}
            setShowTransferFundsModal={setShowTransferFundsModal}/>}
            
        </div>
    )
}

export default Transactions;