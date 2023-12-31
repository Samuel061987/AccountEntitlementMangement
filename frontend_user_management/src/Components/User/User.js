import React ,{useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import CreateIcon from '@material-ui/icons/Create';
import TableRow from '@material-ui/core/TableRow';
import { useNavigate,useLocation } from "react-router-dom";
import useToken from '../../useToken';
import NavBar from '../Common/NavBar';
import AccountModal from './AccountModel';
import userServices from '../../helper/UserServices';
import './User.css';
const User = () => {
    const navigate = useNavigate();
    const {token}= useToken();
    const [users,setUsers]=useState({});
    const [accountNumber,setAccountNumber]=useState([]);
    const [selectedAccountNumber,setSelectedAccountNumber]=useState();
    const [showModal, setShowModal]=useState(false);
    const location = useLocation();
    const getPathname= location.pathname;
    const getUserId = getPathname.split('/')[2];
    useEffect(()=>{
        if(!token){
            navigate('/login');
          }
    },[navigate,token]);

   useEffect(()=>{
    
        if(getUserId){
            userServices.fetchUserById(getUserId,token.token).then((reponse)=>{
                setUsers(reponse.data);
            }).catch(function(error) {
                // handle error
                console.log("Error is: " + error);
              });
        }
     const getAccountDetails= Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000000000));
     setAccountNumber(getAccountDetails);
    },[getUserId,token]);
   
    const back=()=>{
        navigate('/dashboard');
    }
    const add=()=>{
        setShowModal(true);
    }
    const modalStatus=(status,data)=>{

        setShowModal(status);
        const userAccount={
            'userId':getUserId,
            'accountNumber':data.accountNumber
        };
        // console.log('data',data);
        userServices.updateAccountNumberForUser(userAccount).then((response)=>{
            console.log(response);
            setSelectedAccountNumber(data.accountNumber);
        }).catch(function(error) {
            // handle error
            console.log("Error is: " + error);
          });
        
    }
    
    return (
        <div style={{backgroundColor:'white'}}>
        <NavBar/>
        <Table style={{marginTop:'30px',marginBottom:'30px',textAlign:'center'}}>
         <TableBody>
                <TableRow><TableCell>FirstName:</TableCell><TableCell>{users.firstName}</TableCell></TableRow>
                <TableRow><TableCell>LastName:</TableCell><TableCell>{users.lastName}</TableCell></TableRow>
                <TableRow><TableCell>Email:</TableCell><TableCell>{users.email}</TableCell></TableRow>
                <TableRow>
                    <TableCell>Account Number:</TableCell>
                    <TableCell>
                        {(users.accountNumber || selectedAccountNumber)  && 
                        <>
                       <span style={{padding:'10px'}}>{users.accountNumber?users.accountNumber :selectedAccountNumber}</span>{token.role === 1 &&<CreateIcon style={{cursor:'pointer'}} onClick={()=>add()}/>}
                        </>
                        }
                        {(!users.accountNumber && !selectedAccountNumber && token.role === 1) && 
                           <>
                            <button className='add' onClick={()=>add()}>Assign Account Number</button>
                           </>  
                        }
                        {(!users.accountNumber && !selectedAccountNumber && token.role !== 1) && 
                           <>
                            UnAssigned
                           </>  
                        }
                        </TableCell>
                 </TableRow>
                </TableBody>
        </Table>
        <AccountModal showModal={showModal} getModalStatus={modalStatus} accountNumber={accountNumber}/>
        <div style={{textAlign:'center'}}>
        <button className="back" onClick={()=>back()}>Back</button>
        </div>
        </div>
    );
}
export default User;