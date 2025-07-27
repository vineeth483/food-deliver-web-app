import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import "../screens/Signup.css";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name:"",
    email:"",
    password:"",
    geolocation:""
  });
  const navigate=useNavigate();

  const handleLocationClick = async (e) => {
    e.preventDefault();

    try {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = coords;
      console.log(latitude, longitude);

      const response = await fetch(
        "http://localhost:3000/api/auth/getlocation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latlong: { latitude, longitude } }),
        }
      );

      const { location } = await response.json();
      console.log(location);
      setCredentials({ ...credentials, geolocation: location });
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching location. Please try again.");
    }
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response =await fetch("http://localhost:4000/api/createuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(
        {name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}
      )
    });
    const json=await response.json()
    console.log(json)
    if(!json.success){
      alert("Enter valid credentials")
    }
    else{
      navigate("/login");
    }
  }
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label-first">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name = 'password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name = 'geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
          </div> 

          <button type="submit" className=" m-3 btn btn-success">Submit</button>
          <Link to ="/login" className=" m-3 btn btn-danger">Already a User</Link>
        </form>
      </div>
    </>
  );
}



