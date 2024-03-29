import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginbackground from "../assets/loginbackground.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorInfo } from "../redux/features/doctorInfo/doctorInfoSlice";


const Login = () => {

    const [selectedOption, setSelectedOption] = useState('doctor');

    const count = useSelector((state) => state.doctorInfo);             //count will contain the whole object
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        dispatch(updateDoctorInfo({username: "saurabh", id:2}))
        navigate('/');
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
        <div className="flex flex-col h-full">
            
            {/* Navigation Bar */}
            <nav className="bg-white text-black p-4 rounded-3xl mb-8">
            
                <div className="container mx-auto">Navigation Bar</div>
            
            </nav>
        
            {/* Main Content */}
            <div className="flex flex-grow justify-center items-center">
                
                {/* Left Side */}
                <div className="h-full w-1/2 flex flex-col justify-center items-center content-center">
                    
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Suhrud!</h2>
                    <p className="text-gray-600 mb-4">NAMASKAR</p>
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
                                onSubmit={() => handleSubmit()}
                            >
                                
                                <div className="mb-5 w-full rounded-3xl overflow-hidden">
                                    <input type="text" placeholder="Username" id="username" name="username" className="w-full p-2 py-3 pl-10 rounded-3xl bg-cyan-200" />
                                </div>
                                
                                <div className="mb-1 rounded-3xl overflow-hidden">
                                    <input type="password" placeholder="Password" id="password" name="password" className="w-full p-2 py-3 pl-10 rounded-3xl bg-cyan-200" />
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
                                        <Link to="/forgotPassword" className="text-xs text-gray-500 hover:text-black hover:underline">Forgot your password?</Link>
                                    </div>
                                
                                </div>
                                
                                <button type="submit" className="bg-blue-500 text-white px-4 py-3 w-full rounded-3xl hover:bg-blue-600">Submit</button>
                            
                            </form>
                        
                        </div>
                    
                    </div>
                </div>


            </div>



        </div>
    );
}


export default Login;