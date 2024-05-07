import React, { useState } from "react";
import webServerUrl from "../configurations/WebServer";
import { useNavigate } from "react-router-dom";
import HttpService from "../services/HttpService";


const SetPassword = () => {
    const [username, setusername] = useState(""); 
    const [pass_wd, setPass_WD] = useState(""); 
    const [password1, setPassword1] = useState(""); 
    const [password2, setPassword2] = useState(""); 

    const navigate = useNavigate();

    const getIsFormValid = () => { 
        return ( 
          username && pass_wd && password1 && password2
        ); 
    }; 

    const clearForm = () => { 
        setusername("");
        setPass_WD("");
        setPassword1("");
        setPassword2("");
    }; 

    const handleSubmit = async(e) => { 
        let password_pattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if(getIsFormValid())
        {
            if(password_pattern.test(password1))
            {
                if(password1 === password2)
                {
                    e.preventDefault(); 
                    const forgotPasswordURL=webServerUrl+"/auth/forgotPassword/doctor";
                    const method='POST';
                    const data={
                        username:username,
                        currentPassword:pass_wd,
                        newPassword:password1
                    };
                    const headers={
                        'ngrok-skip-browser-warning': 'true',
                    }
                    try{
                        const response=await HttpService(method,forgotPasswordURL,data,headers);
                        console.log(response.status)
                        if(response.status===200){
                            console.log("Successful");
                            console.log(response.data);
                            alert("Passsword changed successfully!"); 
                            navigate('/login');
                        }
                        else{
                            console.log("else part error:");
                            alert(response.data.message);
                            clearForm();
                        }
                    }catch(error){
                        console.log("catch block of error");
                        alert(error.data.message);
                        clearForm();                   
                    }
                    
                }
                else{
                    document.getElementById('error-password-not-matching').innerHTML = " Passwords not matching ! ";
                    document.getElementById('error-password-not-matching').style.color="Red";
                    e.preventDefault(); 
                }
            }
            else{

                document.getElementById('error-password').innerHTML = " Passwords weak. Password should have 8-15 charaters, It should have 1 uppercase, 1 lower case, 1 special character ! ";
                document.getElementById('error-password').style.color="Red";
                e.preventDefault(); 
            }
            
            
        }
        else
        {
            alert("Fill all the fields"); 
            e.preventDefault(); 
        }
        
    }; 

    return (
        <div className="h-full bg-doctor-background bg-cover flex justify-center content-center">
            <div className="bg-white bg-opacity-85 w-2/3 m-10 rounded-3xl flex flex-col justify-content-center content-center">
                    
                    <div className="relative w-3/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
                    
                        <h6 className="text-2xl font-semibold mb-10">Set Password</h6>

                        <form className="w-full" onSubmit={handleSubmit}>
                            <span id="error-password-not-matching"></span>
                            <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                                <input type="text" value={username} placeholder="username" id="username" name="username" className="w-1/2 p-2 rounded-3xl bg-slate-400 bg-opacity-50 border-2 border-gray-500" onChange= {(e) => { setusername(e.target.value); }} />
                            </div>
                            
                            <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                                <input type="password" value={pass_wd} placeholder="Generated Password" id="pass_wd" name="pass_wd" className="w-1/2 p-2 rounded-3xl bg-slate-400 bg-opacity-50 border-2 border-gray-500" onChange= {(e) => { setPass_WD(e.target.value); }}/>
                            </div>

                            <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                                <input type="password" value={password1} placeholder="New Password" id="password1" name="password1" className="w-1/2 p-2 rounded-3xl bg-slate-400 bg-opacity-50 border-2 border-gray-500" onChange= {(e) => { setPassword1(e.target.value); }}/>
                            </div>
                            <span id="error-password"></span>

                            <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                                <input type="password" value={password2} placeholder="Confirm New Password" id="password2" name="password2" className="w-1/2 p-2 rounded-3xl bg-slate-400 bg-opacity-50 border-2 border-gray-500" onChange= {(e) => { setPassword2(e.target.value); }}/>
                            </div>

                            <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-3  w-1/2 rounded-3xl hover:bg-blue-600">Submit</button>
                            </div>


                        </form>
                    
                    </div>
                
                
            </div>
         </div>
    );
}


export default SetPassword;