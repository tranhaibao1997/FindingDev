import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {login,loadUser} from '../../actions/auth'



const Login = ({login,isAuthenticated,setAuthToken}) => {
const [formData,setformData]=useState({
    email:"",password:""
})
const {email,password}=formData;
const onChange=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
}
const onSubmit=(e)=>{
    e.preventDefault();
    login(email,password)
    
    
}

//Redireact if authenticated
if(isAuthenticated)
{
    return <Redirect to='/dashboard'></Redirect>
}


    return (
        <>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
                <form className="form" onSubmit={e=>onSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={e=>onChange(e)} />
                    </div>
                    <input type="submit" className="btn btn-primary" defaultValue="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </>
    )
}
const mapStatetoProps=state =>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStatetoProps,{login})(Login)