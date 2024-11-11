import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  })


  const changeHandler = (event, field) => {
    let tempData = { ...data }
    tempData[field] = event.target.value
    setData(tempData)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3000/user/register", data)
      .then(res => {
        console.log(res.data)
        setData({
          username: "",
          email: "",
          phone: "",
          password: ""
        })
        alert("Regitered successfully")
        navigate("/login")
      })
      .catch(err => {
        console.log(err.response)
        alert("Something went wrong")
      })
  }

return (
  <form onSubmit={handleFormSubmit} >
    <input type="text" name="username" id="" placeholder='username' onChange={(event) => changeHandler(event, "username")} value={data.username} /> <br />
    <input type="email" name="email" id="" placeholder='email' onChange={(event) => changeHandler(event, "email")} value={data.email} /> <br />
    <input type="text" name="phone" id="" placeholder='Phone No.' onChange={(event) => changeHandler(event, "phone")} value={data.phone} /> <br />
    <input type="password" name="password" placeholder='password' onChange={(event) => changeHandler(event, "password")} value={data.password} /> <br />
    <input type="submit" value="Register" />
  </form>
)
}

export default Register