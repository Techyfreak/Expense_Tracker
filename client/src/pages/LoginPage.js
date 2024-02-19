import React,{useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import {default as api} from '../store/apiSlice';
import axios from "axios";
const Login = () => {
  const[isLogin,setIsLogin] = useState(true)
  const navigate = useNavigate();
  const LoginForm = () => {
    const navigate = useNavigate();
    const toastOptions = {
        position:'top-right',
        autoClose:1000,
        pauseOnHover:true,
        draggable: true,
        theme: 'dark',
        };

    const [values, setValues] = useState({
        username:"",
        password:"",
    });

     useEffect(()=>{
         if(localStorage.getItem("appUser")){
           navigate("/main");
        }
    },[])

    const [getUser] = api.useGetUserMutation();

    const handleSubmit= async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            const{password,username}=values;
            const {data} = await axios.post('https://expensetracker-md31.onrender.com/api/user',{ 
              username,
              password,
            });
            if(data.status != true){
                toast.error("Incorrect Password or Username", toastOptions);
            }
            if(data.status){
                localStorage.setItem('appUser',JSON.stringify(data.user)); 
                navigate("/main");
            }

        }   

    };
    const handleValidation=()=>{
        const{password,username}=values;
        if(password===""){
            // alert("Password and confirm password must be same.");  
            toast.error("Username and Password are required ",toastOptions);
          return false;  
        }
        else if(username===""){
            toast.error("Username and Password are required",toastOptions);
            return false;
        }
        return true;
    };
    const handleChange=(event)=>{
        setValues({...values,[event.target.name]: event.target.value});
    }; 

    return(
      <div className="fom" style={{justifyContent:"center", display:"flex",flexWrap:"unset",marginTop:"175px"}} >
       <form className="bg-white rounded-2xl shadow-2xl flex flex-col md:w-1/3 items-center max-w-2xl transition duration-1000 ease-out" style={{width:"300px"}} onSubmit={(event)=>handleSubmit(event)}>
             <h2 className='p-3 text-3xl font-bold text-pink-400'>Expense Tracker</h2>
             <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
             <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>
             {/* Inputs */}
             <div className='flex flex-col items-center justify-center'>
              <input type='text' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password'name='password' onChange={e=>handleChange(e)} />
              <button type='submit' className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
                Sign In
              </button>
             </div>
             <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
             <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
             <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
          </form>
          </div>
    )
  }

    
  
  
  const  SignUpForm = () => {

    const navigate = useNavigate();
    const toastOptions = {
      position:'bottom-right',
      autoClose:2000,
      pauseOnHover:true,
      draggable: true,
      theme: 'dark',
      };

    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
      });
  
  useEffect(()=>{
      if(localStorage.getItem("appUser")){
          navigate('/main');
      }
  },[])
  
  const [addUser] = api.useAddUserMutation();
  
  const handleSubmit= async(event)=>{
    event.preventDefault();
    if(handleValidation()){
        const{password,username,email}=values;
        const {data} = await addUser(values);
        if(!data){
            toast.error("Couldn't connect the database", toastOptions);
        }
        if(data){
            localStorage.setItem('appUser',JSON.stringify(data)); 
            navigate("/main");
        }
    }   
  };
  
  const handleValidation=()=>{
    const{password, confirmpassword,username,email}=values;

    if(password!==confirmpassword){
        alert("Password and confirm password must be same.");  
        toast.error("Password and confirm password must be same. ",toastOptions);
      return false;  
    }
    else if(username.length<3){
        toast.error("Username must be greater than 3 letters",toastOptions);
        return false;
    }
    else if(password.length<6){
        toast.error("Password must be greater than or equal to 6 letters",toastOptions);
        return false;
    }
    else if(email===""){
        toast.error("Email is required!",toastOptions);
        return false;
    }
    return true;
  };
  
  
  const handleChange=(event)=>{
    setValues({...values,[event.target.name]: event.target.value});
}; 

     return(
      <div className="fom" style={{justifyContent:"center", display:"flex",flexWrap:"unset", marginTop:"145px"}}>
        <form className="bg-blue-400 text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in" style={{width:"350px"}} onSubmit={(event)=>handleSubmit(event)}>
              <h2 className='p-3 text-3xl font-bold text-white'>Expense Tracker</h2>
             <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
             <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
             {/* Inputs */}
             <div className='flex flex-col items-center justify-center mt-2'>
             <input type="text" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] text-black border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Name' name='username' onChange={e=>handleChange(e)}/>
              <input type='email' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] text-black border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Email' name='email'  onChange={e=>handleChange(e)}/>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] text-black border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] text-black border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='ReEnter Password' name='confirmpassword'onChange={e=>handleChange(e)}/>
              <button type="submit" className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in' onClick={e=>handleValidation(e)}>
                Sign Up
              </button>
             </div>
             <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
             <p className='text-white mt-4 text-sm'>Already have an account?</p>
             <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
          </form>
        </div>
     )
  }

  return (
    <div class='min-h-100 mb-96 dark:bg-black'>
      {
        isLogin? (
         <LoginForm/>
        ):(
         <SignUpForm/>
        )
      }
    </div>
  )
}

export default Login
