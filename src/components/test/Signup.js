import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
  let navigate = useNavigate(); 
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    
    const {name,email,password}=credentials;
    const response = await fetch("https://fintrackbackend-production-89dd.up.railway.app/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        navigate("/dashboard");

    }
    else{
        alert("User with this email id already exist");
    }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="container mt-3">
    <h1 className="my-2">SignUp</h1>
      <form onSubmit={handleSubmit}> 
      <div className="mb-3 my-3">
    <label htmlFor="name" className="form-label" >Username</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={3}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}  value={credentials.email} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} required  onChange={onChange} placeholder="password should have minimum length of 5 characters"/>
  </div>
  {/* <div className="mb-3">
    <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange}/>
  </div> */}

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup