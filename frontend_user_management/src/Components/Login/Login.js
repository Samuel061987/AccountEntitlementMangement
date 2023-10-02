import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import WrapperComponent from '../HigherOrderComponent/WrapperComponent';
import './Login.css';
import useToken from '../../useToken';
import { useNavigate } from "react-router-dom";
import UserServices from '../../helper/UserServices';
import LoadingSpinner from '../Common/LoadingSpinner';
import Notification from '../Common/Notification';

const LoginForm = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const navigate=useNavigate();
    const {token,setToken}= useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [message,setMessage]=useState({});

      const onSubmit = (data) => {
        setIsLoading(true);
        setIsNotification(false);
        UserServices.loginUsers(data).then((reponse)=>{
          setIsLoading(false);
          //setIsNotification(true);
          setToken(reponse.data);
          navigate('/dashboard');
          
        }).catch(function(error) {
          // handle error
          setIsNotification(true);
          setIsLoading(false);
          if(error.response.status === 400){
          setMessage({type:'error',title:'error',description:'Incorrect Username or Password'});
          }
          else {
            setMessage({type:'error',title:'error',description:'Unexcepted Error Please Try Again Later'});
          }
          console.log("Error is: " + error);
        });
       
      };

    useEffect(()=>{
        if(token){
            navigate('/dashboard');
          }
    },[navigate,token]);

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {isNotification && <Notification {...message}/>}
        <div className="form-inner">
          <form onSubmit={handleSubmit(onSubmit)} className="login">
          <div className="field">
              <input  {...register('email',{ required: true, pattern: // eslint-disable-next-line 
            /[a-zA-Z0-9.]*@[a-z]*[.a-z]*/, })} placeholder="Email Address"/>
            </div>
            {errors.email && <p className="error">Please enter valid Email.</p>}
            <div className="field">
              <input type="password" {...register('password', { required: true })} placeholder="Password"/>
            </div>
            {errors.password && <p className="error">Please enter password.</p>}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login"/>
            </div>
          </form>
          
        </div>
      </div>
    );
};

const Login = WrapperComponent(LoginForm);

export default Login;