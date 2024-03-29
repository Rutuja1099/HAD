
// import '../styles/Doctor.css';
// import {useState} from "react"; 
// import Carousel from 'react-bootstrap/Carousel';
// import { CarouselItem } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
 


// const PasswordErrorMessage = () => { 
//   return ( 
//     <p className="FieldError">Password should have at least 8 characters</p> 
//   ); 
//  }; 

  
//   function DoctorOnboarding() {
//   const [fullName, setfullName] = useState(""); 
//   const [email, setEmail] = useState(""); 
//   const [Phone, setPhone] = useState(""); 
//   const [Degree, setDegree] = useState(""); 
//   const [Specialization, setSpecialization] = useState(""); 
//   const [Address, setAddress] = useState(""); 
//   const [Experience, setExperience] = useState(""); 
//   const [RegNo, setRegNo] = useState(""); 

//   const getIsFormValid = () => { 
//     return ( 
//       fullName && 
//       email && Phone && Degree && Specialization && RegNo && Experience
//     ); 
//   }; 
  
//   const clearForm = () => { 
//     setfullName("");  
//     setEmail(""); 
//     setRegNo("");
//     setAddress("");
//     setDegree("");
//     setSpecialization("");
//     setPhone("");
//     setExperience("");
//   }; 
//     const [index, setIndex] = useState(0);

  
  
//     const handleSelect = (selectedIndex) => {
//       setIndex(selectedIndex);
//     };

//     const handleSubmit = (e) => { 
//       e.preventDefault(); 
//       alert("Account created!"); 
//       clearForm(); 
//     }; 

//     const directionButtons = (direction) => {
//       return (
//         <span
//           aria-hidden="true"
//           className={direction === "Next" ? "button-next" : "button-prev"}
//           style={{color:'black'}}
//         >
//           {direction}
//         </span>
//       );
//     };
    

//   return ( 
  

//     <Container>
//     <form onSubmit={handleSubmit} className='d-inline-flex'> 
//     <Row>
//     <Col>
//     <p class="text-center fs-1 fw-bold fst-italic font-family">Register Doctor</p>
//       <img src="https://reachhealth.in/public/images/patient/online-doctor.png" alt="" ></img>
//     </Col>
//     <Col>
    
//     <div className="p-10">
      
//     <Carousel activeIndex={index} variant="dark" onSelect={handleSelect} autoPlay={false}>
//       <CarouselItem><div class="new_html_code">
//             <div className="Field"> 
//               <label> 
//                 First name <sup>*</sup> 
//               </label> 
//               <input 
//                 value={fullName} 
//                 onChange={(e) => { 
//                   setfullName(e.target.value); 
//                 }} 
//                 placeholder="First name" 
//               /> 
//               </div>
//               <div className="Field"> 
//                 <label> 
//                   Registration Number <sup>*</sup> 
//                 </label> 
//                 <input 
//                   value={RegNo} 
//                   onChange={(e) => { 
//                     setRegNo(e.target.value); 
//                   }} 
//                   placeholder="Registration Number" 
//                 /> 
//               </div> 
//               <div className="Field"> 
//               <label> 
//                 Experience <sup>*</sup> 
//               </label> 
//               <input 
//                 value={Experience} 
//                 onChange={(e) => { 
//                   setExperience(e.target.value); 
//                 }} 
//                 placeholder="Experience" 
//               /> 
//               </div>  
            
            
        
//       </div></CarouselItem>
//       <CarouselItem><div class="new_html_code">
//             <div className="Field"> 
//               <label> 
//                 Highest Degree <sup>*</sup> 
//               </label> 
//               <input 
//                 value={Degree} 
//                 onChange={(e) => { 
//                   setDegree(e.target.value); 
//                 }} 
//                 placeholder="Degree" 
//               /> 
//               </div> 
//               <div> 
//             <label> 
//               Specilizations <sup>*</sup> 
//             </label> <br></br>
//             <select value={Specialization} onChange={(e) => setSpecialization(e.target.value)}  name="Specialization" > 
//               <option value="Family_Counselor">Family Counselor</option> 
//               <option value="School_Counsellor">School Counselor</option> 
//               <option value="Substance_misuse_Counselor">Substance misuse Counselor</option> 
//               <option value="Trauma_Counselor">Trauma Counselor</option> 
//               <option value="Rehabiitation_Counselor">Rehabiitation Counselor</option> 
//             </select> 
//           </div> 
//           </div>      
//       </CarouselItem>
//       <CarouselItem><div class="new_html_code">
//           <div className="Field"> 
//             <label> 
//               Email address <sup>*</sup> 
//             </label> 
//             <input 
//               value={email} 
//               onChange={(e) => { 
//                 setEmail(e.target.value); 
//               }} 
//               placeholder="Email address" 
//             /> 
//           </div> 
//           <div className="Field"> 
//             <label> 
//               Phone Number <sup>*</sup> 
//             </label> 
//             <input 
//               value={Phone} 
//               onChange={(e) => { 
//                 setPhone(e.target.value); 
//               }} 
//               placeholder="Phone Number" 
//             /> 
//           </div> 
//           <div className="Field"> 
//             <label> 
//               Address
//             </label> 
//             <input 
//               value={Address} 
//               onChange={(e) => { 
//                 setAddress(e.target.value); 
//               }} 
//               placeholder="Address" 
//             /> 
//           </div> 
//           <button type="submit" disabled={!getIsFormValid()}> 
//             OnBoard Doctor
//         </button>
//         </div>
        
//       </CarouselItem>
      
//     </Carousel>
//     </div>
//     </Col>
    
  
//     </Row>
//     </form>

   
//     </Container>
//       ); 
//  } 
 



// export default DoctorOnboarding;
