import React from 'react';
import {useState} from 'react'; 
import HttpService from "../services/HttpService.js";
import webServerUrl from "../configurations/WebServer";
import { useNavigate } from "react-router-dom";

// const PasswordErrorMessage = () => { 
//   return ( 
//     <p className="FieldError">Password should have at least 8 characters</p> 
//   ); 
//  }; 

function DoctorOnboarding() { 
  const [FullName, setFullName] = useState(""); 
  const [gender, setGender] = useState("gender"); 
  const [email, setEmail] = useState(""); 
  const [Phone, setPhone] = useState(""); 
  const [Degree, setDegree] = useState(""); 
  const [Specialization, setSpecialization] = useState("Specialization"); 
  const [Address, setAddress] = useState(""); 
  const [Experience, setExperience] = useState(""); 
  const [RegNo, setRegNo] = useState(""); 
  const [drIsModerator,setDrIsModerator] = useState(false);
  const [drUsername,setDrUsername] = useState("");
  
  const navigate = useNavigate();

  const getIsFormValid = () => { 
    return ( 
      FullName && gender  &&
      ValidateEmail(email) && allnumeric(Phone) && Degree && Specialization && RegNo && Experience && Address && drUsername
    
    ); 
  }; 
  function allnumeric(uzip)
    { 
        var numbers = /^[0-9]+$/;
        if(Phone.match(numbers))
        {
            return true;
        }
        else
        {
            // document.getElementById('error-phone').innerHTML = " Please Enter All Numeric 10 digit no *";
            // document.getElementById('error-phone').style.color="Red";
            alert("Please Enter All Numeric 10 digit no");
        }
    }

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

  const clearForm = () => { 
    setFullName(""); 
    setEmail(""); 
    setRegNo("");
    setAddress("");
    setDegree("");
    setSpecialization("specialization");
    setPhone("");
    setExperience("");
    setGender("gender");
  }; 

  const handleSubmit = async(e) => { 
    if(getIsFormValid())
    {
        e.preventDefault(); 

        const drRegistrationURL= webServerUrl+"/suhrud/register/doctor";

        const method='POST';
        const data={
          drRegNo:RegNo,
          drFullName:FullName,
          drPhone:Phone,
          drAddr:Address,
          drEmail:email,
          drExperience:Experience,
          drPatientLimit:5,
          drActivePatients:0,
          drIsModerator:drIsModerator,
          drGender:gender,
          drUsername:drUsername,
          drSpecialization:Specialization,
          drDegree:Degree
        };

        
        const sessionData = JSON.parse(window.localStorage.getItem('Data'));
        const bearerToken = sessionData.token;

        const headers = {
          'Authorization': `Bearer ${bearerToken}`, // Include your token here
          'Content-Type': 'application/json', // Specify the content type if needed
        };

        try{
          const response=await HttpService(method,drRegistrationURL,data,headers);
          console.log(response.status)
          if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              alert("Account created!");
              navigate('/doctorOnboarding');
          }
          else{
              console.log("else part error:");
              alert(response.data.message);
          }
        }catch(error){
          console.log("catch block of error");
          alert(error.data.message);                   
      } 
        clearForm(); 
        setDrIsModerator(false);
    }
    else
    {
      alert("All fields are mandatory. Please provide valid input for them");
        e.preventDefault(); 

    }
    
  }; 

  const handleOptionChange = (option) => {
    if(drIsModerator === option){
        setDrIsModerator(false);
    }
    else{
        setDrIsModerator(true);
    }

};

  return ( 
    
    <div className="bg-doctor-background  bg-cover flex justify-center content-center">
    <div className="bg-white bg-opacity-85 w-2/3 m-10 rounded-3xl">
      <form className="p-10 m-5 block content-center" onSubmit={handleSubmit}> 
        
          <h2 className="font-serif text-5xl font-bold text-gray-500 text-center m-5">Doctor OnBoarding</h2> 

          <h3 className="font-serif  text-gray-500 text-2xl italic font-bold text-center">Enter details of doctor below: </h3> 

          <div className="flex">
            <div className="w-1/2 p-2">
              <div className="relative flex flex-col"> 
              <input 
                className="rounded-xl w-30 h-10 bg-white text-black placeholder-black p-5 border-2 border-indigo-500/75"
                value={FullName} 
                onChange={(e) => { 
                  setFullName(e.target.value); 
                }
                } 
                placeholder="Full Name" 
              /> 
              </div> 
            </div>
            <div className="w-1/2 p-2">
            <div className="relative flex flex-col"> 
            <select
          className="form-select appearance-auto block w-30 h-30 px-5 py-2.5
      text-base font-normal text-black bg-white bg-clip-padding bg-no-repeat border -2 border-solid border-indigo-500/75 
      rounded-xl transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
        
                value={gender} onChange={(e) => setGender(e.target.value)}  name="gender">
                <option defaultValue={gender}>Choose your gender</option>
                <option value="Female">Female</option> 
                <option value="Male">Male</option> 
                <option value="Other">Other</option> 
                </select>
            </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2 p-2">
              <div className="relative flex flex-col"> 
                <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75" 
                  value={RegNo} 
                  onChange={(e) => { 
                    setRegNo(e.target.value); 
                  }} 
                  placeholder="Registration Number" 
                /> 
              </div> 
            </div>
            <div className="w-1/2 p-2">
              <div className="relative flex flex-col"> 
             
              <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
                value={Experience} 
                onChange={(e) => { 
                  setExperience(e.target.value); 
                }} 
                placeholder="Experience" 
              /> 
              </div>  
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 p-2">
              <div className="relative flex flex-col"> 
              
              <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
                value={Degree} 
                onChange={(e) => { 
                  setDegree(e.target.value); 
                }} 
                placeholder="Degree" 
              /> 
              </div> 
            </div>
            <div className="w-1/2 p-5">
            <div className="relative flex flex-col"> 
            
            <select 
            className="form-select appearance-auto block w-30 h-30 px-5 py-2.5
            text-base font-normal text-black bg-white bg-clip-padding bg-no-repeat border -2 border-solid border-indigo-500/75 
            rounded-xl transition ease-in-out focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
            value={Specialization} onChange={(e) => setSpecialization(e.target.value)}  name="Specialization" > 
             <option defaultValue={Specialization}>Choose your specialization</option>
              <option value="Family_Counselor">Family Counselor</option> 
              <option value="School_Counsellor">School Counselor</option> 
              <option value="Substance_misuse_Counselor">Substance misuse Counselor</option> 
              <option value="Trauma_Counselor">Trauma Counselor</option> 
              <option value="Rehabiitation_Counselor">Rehabiitation Counselor</option> 
            </select> 
          </div> 
            </div>
          </div>


         <h3 className="font-serif  text-gray-500 text-2xl italic font-bold text-left"> Contact Details : </h3>
         <div className="flex">
          <div className="w-1/2 p-2">
          <div className="relative flex flex-col"> 
           
          <span id="error-email"></span>
            <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
              value={email}  
              onChange={(e) => { 
                setEmail(e.target.value); 
              }} 
              placeholder="Email address" 
            /> 
          </div> 
          </div>
          <div className="w-1/2 p-2">
          <div className="relative flex flex-col"> 
          <span id="error-phone"></span>
            <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
              value={Phone} 
              onChange={(e) => { 
                setPhone(e.target.value); 
              }} 
              placeholder="Phone Number" 
            /> 
          </div> 
          </div>
         </div>
         <div className="flex">
          <div className="w-1/2 p-2">
          <div className="relative flex flex-col"> 
           
            <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
              value={Address} 
              onChange={(e) => { 
                setAddress(e.target.value); 
              }} 
              placeholder="Address" 
            /> 
          </div> 
          </div>

          <div className="w-1/2 p-2">
          <div className="relative flex flex-col"> 
          <span id="error-phone"></span>
            <input className="rounded-xl w-30 h-10 bg-white  text-black placeholder-black p-5 border-2 border-indigo-500/75"
              value={drUsername}
              onChange={(e) => { 
                setDrUsername(e.target.value); 
              }} 
              placeholder="Username" 
            /> 
          </div> 
          </div>

         </div>
         <div className="flex">
            <div className="w-1/2">
            <div className="flex justify-center items-center ml-2">
              <input
                type="checkbox"
                id="drIsModerator"
                name="drIsModerator"
                value="drIsModerator"
                checked={drIsModerator === true}
                onChange={() => handleOptionChange(true)}
                className="cursor-pointer mr-1"
              />
              <label htmlFor="Moderator" className="cursor-pointer text-lg text-black hover:text-black hover:underline" >Moderator</label>
            </div>
            </div>
         <div className="w-1/2 flex justify-center"> 
          <button className= "w-50 h-20 rounded-xl bg-gray-500 bg-opacity-50 p-5 m-10 border-2 border-gray-500 text-center text-stone-900 font-bold" type="submit" 
          > 
            OnBoard Doctor
          </button>
          </div>
          </div>
      </form> 
     
    </div> 
    
    </div>
    
  ); 
 } 




export default DoctorOnboarding;
