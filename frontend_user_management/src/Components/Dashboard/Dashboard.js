import React ,{useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NavBar from '../Common/NavBar';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import useToken from '../../useToken';
//import UserLists from '../mockData/UserLists';
import UserServices from '../../helper/UserServices';

const Dashboard = () => {
    const navigate = useNavigate();
    const {token}= useToken();
    const [users,setUsers]=useState([]);
    const viewUser=(id)=>{
        navigate(`/user/${id}`,{state:{id:id}});
    }
    useEffect(()=>{
        if(!token){
            navigate('/login');
          }
    },[navigate,token]);

    useEffect(()=>{
       // console.log('UserLists',UserLists);
        UserServices.fetchUsers().then((reponse)=>{
            console.log('reponse',reponse.data);
            setUsers(reponse.data);
          });
    },[]);

    return (
        <div style={{backgroundColor:'white'}}>
        <NavBar/>
       <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>FirstName</TableCell>
                    <TableCell>LastName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users && users.length > 0 && users.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell onClick={()=>viewUser(row.id)}><span style={{color:'#003366',cursor:'pointer'}}>View</span></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    </div>
    );
};

export default Dashboard;