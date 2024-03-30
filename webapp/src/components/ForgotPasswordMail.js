import React, { useState } from "react";
import webServerUrl from "../configurations/WebServer";
import { useNavigate } from "react-router-dom";
import HttpService from "../services/HttpService";

const ForgotPasswordMail = () => {
    const [email, setEmail] = useState(""); 

    const navigate = useNavigate();

    function ValidateEmail(uemail)
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.length<1) {
            // document.getElementById('error-email').innerHTML = " Please Enter Your Email *";
            // document.getElementById('error-email').style.color="Red";
            alert(" Please Enter Your Email ");
        }
        else if (!email.match(mailformat))
        {
            // document.getElementById('error-email').innerHTML = " Please Enter Valid Email *";
            // document.getElementById('error-email').style.color="Red";
            alert("Please Enter Valid Email")
        }
        else{
            return true;
        }
    }

    const handleSubmit = async(e) => { 
        if(ValidateEmail(email)){
            e.preventDefault(); 
            const forgotPasswordURL = webServerUrl+"/auth/email/doctor?mail="+email;
            const method='POST';
            try{
            const response=await HttpService(method,forgotPasswordURL);
            console.log(response.status)
            if(response.status===200){
                console.log("Successful");
                alert(`Please check Email ${email} for id and password`);
                navigate("/setPassword");
            }else{
                alert(response.data);
                setEmail("");
                navigate("/login");
            }
            }catch(error){
                alert(error.data);
                console.log(error);
                setEmail("");
                navigate("/login");
            }
        }else{
            alert("Please provide your registered email"); 
            e.preventDefault(); 
        }
    }

  return (
    <div className="h-full bg-doctor-background bg-cover flex justify-center content-center">
        <div className="bg-white bg-opacity-85 w-2/3 m-10 rounded-3xl flex flex-col justify-content-center content-center">        
            <div className="relative w-3/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
                <h6 className="text-2xl font-semibold mb-10">Set Password</h6>
                <form className="w-full" onSubmit={handleSubmit}>
                    <span id="error-password-not-matching"></span>
                    <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                        <input type="text" value={email} placeholder="Registered Email address" id="username" name="username" className="w-1/2 p-2 rounded-3xl bg-slate-400 bg-opacity-50 border-2 border-gray-500" onChange= {(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className="flex justify-center mb-5 w-full rounded-3xl overflow-hidden">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-3  w-1/2 rounded-3xl hover:bg-blue-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPasswordMail