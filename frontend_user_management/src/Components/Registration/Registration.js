import React,{useState} from 'react';
import './Registration.css';
import { useForm } from 'react-hook-form';
//import bcrypt from "bcrypt";
import WrapperComponent from '../HigherOrderComponent/WrapperComponent';
import LoadingSpinner from '../Common/LoadingSpinner';
import Notification from '../Common/Notification';
import { useNavigate } from "react-router-dom";
import useToken from '../../useToken';
import UserServices from '../../helper/UserServices';

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();
      const navigate=useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const [isNotification, setIsNotification] = useState(false);
      const [message,setMessage]=useState({});
      const {setToken}= useToken();

      const onSubmit = (data) => {
        // console.log(data);
        setIsLoading(true);
        setIsNotification(true);
        delete data.confirmPassword;
        UserServices.createUser(data).then((reponse)=>{
          console.log('reponse',reponse);
        
          setIsLoading(false);
          setIsNotification(false);
          setMessage({type:'success',title:'success',description:'Successfully Registered'});
          setToken(reponse.data);
          navigate('/dashboard');
        
        }).catch(function(error) {
          // handle error
          setIsLoading(false);
          setIsNotification(false);
          if(error.response.status === 409){
          setMessage({type:'error',title:'error',description:'User Already Exist'});
          }
          else {
            setMessage({type:'error',title:'error',description:'Unexcepted Error Please Try Again Later'});
          }
        });
       
     };
    
    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {isNotification && <Notification {...message}/>}
             <form onSubmit={handleSubmit(onSubmit)}  className="signup">
             <div className="field">
              <input type="text" {...register('firstName', { required: true })} placeholder="FirstName"/>
            </div>
            {errors.firstName && <p className="error">Please enter FirstName.</p>}

            <div className="field">
              <input type="text" {...register('lastName', { required: true })} placeholder="LastName"/>
            </div>
            {errors.lastName && <p className="error">Please enter LastName.</p>}
            <div className="field">
              <input type="text" placeholder="Email Address" {...register('email',{ required: true, pattern: // eslint-disable-next-line 
            /[a-zA-Z0-9.]*@[a-z]*[.a-z]*/, })} />
            </div>
            {errors.email && <p className="error">Please enter valid Email.</p>}
            <div className="field">
            <select {...register('role',{ required: true})}>
            <option value="">Select</option>
            <option value={1}>Admin</option>
            <option value={2}>User</option>
      </select>
      </div>
            {errors.role && <p className="error">Please select Role</p>}

            <div className="field">
              <input type="password" {...register('password', { required: true })} placeholder="Password" />
            </div>
            {errors.password && <p className="error">Please enter Password.</p>}
            <div className="field">
              <input type="password" {...register('confirmPassword', { required: true,validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Passwords should match!';
              },
            }, })} placeholder="Confirm password"  />
            </div>
            {errors.confirmPassword && <p className="error">Please enter valid confirmPassword.</p>}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
    );
};

const Registration = WrapperComponent(RegistrationForm);

export default Registration;