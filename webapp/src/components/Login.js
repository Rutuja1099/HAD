import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginbackground from "../assets/loginbackground.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorInfo } from "../redux/features/doctorInfo/doctorInfoSlice";
import { LoginInputValidation } from "../services/InputValidation";
import webServerUrl from "../configurations/WebServer";
import HttpService from "../services/HttpService.js";
import { FaArrowLeft } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";



const Login = ({setAuthenticated}) => {

    const [selectedOption, setSelectedOption] = useState('doctor');
    const [username,setUsername]=useState('');
    const [password, setPassword]=useState('');

    const navigate = useNavigate();

    let loginURL;

    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    // useEffect(() => {
    //     const data = window.localStorage.getItem('Data');
    //     if(data){
    //         navigate("main");
    //     }
    // }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(selectedOption);
        const isValid=LoginInputValidation({username,password});
        if(!isValid)
            return;
        if(selectedOption==='doctor'){
            loginURL = webServerUrl+"/auth/login/doctor";
        }
        else{
            loginURL= webServerUrl+"/auth/login/admin";
        }

        const method='POST';
        const data={
            username:username,
            password:password
        };
        const headers={
            'ngrok-skip-browser-warning': 'true'
        }
            
        try{
            const response=await HttpService(method,loginURL,data,headers);
            console.log(response.status)
            
            if(response.status===200){
                console.log("Successful");
                console.log(response.data);
                try{
                    const userData = {
                        ...response.data,
                        role: selectedOption
                    };
                    await window.localStorage.setItem('Data',JSON.stringify(userData));
                    setAuthenticated(true);
    
                    //console.log("from storage");
                    //console.log(await window.localStorage.getItem('Data'));
    
                }catch(error){
                    console.log("error while saving data");
                    console.log(error);
                }
                if(selectedOption==='doctor'){
                    console.log("hello doctor");
                    navigate('/main');
                }
                else{
                    console.log("Welcome Admin");
                    navigate('/doctorOnboarding');
                }
            }
            else{
                console.log("else part error:");
                alert(response);
                setPassword("");
                setUsername("");
            }
        }catch(error){
            console.log("catch block of error");

            alert(error);
            setPassword("");
            setUsername("");  
            // window.location.reload();                  
        }
        
      };

    const handleOptionChange = (option) => {
        if(selectedOption === option){
            setSelectedOption('doctor');
        }
        else{
            setSelectedOption(option);
        }
    
    };

    return (
        <div className="flex flex-col h-full dark:bg-blue-950">
            
            
        
            {/* Main Content */}
            <div className="flex flex-grow justify-center items-center">
                
                {/* Left Side */}
                <div className="h-full w-1/2 flex flex-col justify-center items-center content-center">
                    
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">Welcome to Suhrud!</h2>
                    <p className="text-gray-600 mb-4 dark:text-gray-200">NAMASKAR</p>
                    
                    <button onClick={()=> darkModeHandler()}>
                        {
                            
                            dark && <MdOutlineLightMode /> // render sunny when dark is true
                        }
                        {
                            !dark && <MdDarkMode /> // render moon when dark is false
                        }
                    </button>
                    
                    {/* <div className="flex-col items-center">
                        
                        <div className={`flex items-center border-2 border-cyan-500 rounded-md py-4 px-10 mb-3 cursor-pointer hover:bg-cyan-300 hover:border-cyan-900 ${selectedOption === 'doctor' ? 'bg-cyan-300' : ''}`} onClick={() => handleOptionChange('doctor')}>
                            <input
                                type="checkbox"
                                id="doctor"
                                name="doctor"
                                value="doctor"
                                checked={selectedOption === 'doctor'}
                                onChange={() => handleOptionChange('doctor')}
                                className="mr-2 cursor-pointer size-5"
                            />
                                <label htmlFor="doctor" className="cursor-pointer text-xl">Doctor</label>
                        </div>

                        <div className={`flex items-center border-2 border-cyan-500 rounded-md py-4 px-10 cursor-pointer hover:bg-cyan-300 hover:border-cyan-900 ${selectedOption === 'admin' ? 'bg-cyan-300' : ''}`} onClick={() => handleOptionChange('admin')}>
                            <input
                                type="checkbox"
                                id="admin"
                                name="admin"
                                value="admin"
                                checked={selectedOption === 'admin'}
                                onChange={() => handleOptionChange('admin')}
                                className="mr-2 cursor-pointer size-5"
                            />
                            <label htmlFor="admin" className="cursor-pointer text-xl" >Admin</label>
                        </div>
                    </div>                 */}
                </div>


                {/* Right Side */}
                <div className="w-1/2 h-full flex justify-center items-center">
                    <div className="relative h-full w-3/5 rounded-3xl">
                        
                        <img src={loginbackground} alt="Background" className="w-full h-full object-cover rounded-3xl" />
                        
                        <div className="absolute w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
                        
                            <h6 className="text-2xl font-semibold mb-5">LOGIN</h6>

                            {/* Login Form */}
                            <form 
                                className="w-full"
                                onSubmit={handleSubmit}
                            >
                                
                                <div className="mb-5 w-full rounded-3xl overflow-hidden">
                                    <input type="text" placeholder="Username" id="username" name="username" className="w-full p-2 py-3 pl-10 rounded-3xl bg-cyan-200"
                                        onChange={(text)=>{setUsername(text.target.value)}}
                                        value={username}
                                    />
                                </div>
                                
                                <div className="mb-1 rounded-3xl overflow-hidden">
                                    <input type="password" placeholder="Password" id="password" name="password" className="w-full p-2 py-3 pl-10 rounded-3xl bg-cyan-200" 
                                        onChange={(text)=>{setPassword(text.target.value)}}
                                        value={password}
                                    />
                                </div>

                                <div className="mb-4 flex justify-between">
                                    <div className="flex justify-center items-center ml-2">
                                        <input
                                        type="checkbox"
                                        id="admin"
                                        name="admin"
                                        value="admin"
                                        checked={selectedOption === 'admin'}
                                        onChange={() => handleOptionChange('admin')}
                                        className="cursor-pointer mr-1"
                                        />
                                        <label htmlFor="admin" className="cursor-pointer text-xs text-gray-500 hover:text-black hover:underline" >Admin</label>
                                    </div>
                                    
                                    <div>
                                        <Link to="/forgotPasswordMail" className="text-xs text-gray-500 hover:text-black hover:underline">Forgot your password?</Link>
                                    </div>
                                
                                </div>
                                
                                <button type="submit" className="bg-blue-500 dark:bg-blue-900 text-white px-4 py-3 w-full rounded-3xl hover:bg-blue-600">Submit</button>
                            
                            </form>
                        
                        </div>
                    
                    </div>
                </div>


            </div>



        </div>
    );
}


export default Login;