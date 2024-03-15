import React from "react";
import SideNavigationMenu from "./SideNavigationMenu";
import { Link, useNavigate } from "react-router-dom";
import loginbackground from "../assets/loginbackground.jpg";


const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        navigate('/');
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
                    <p className="text-gray-600 mb-4">Don't have an account?</p>
                    <Link to="/signup" className=" underline hover:underline hover:text-cyan-500">Create an account</Link>
                
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

                                <div className="mb-4 rounded-3xl flex justify-end text-gray-500 hover:text-black hover:underline">
                                    <Link to="/forgotPassword" className="text-xs">Forgot your password?</Link>
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