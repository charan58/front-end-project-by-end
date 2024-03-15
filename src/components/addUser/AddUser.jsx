import React from 'react'
import './addUser.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios';
function AddUser() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    const [error,setError]=useState("")
    const navigate=useNavigate();
    function addNewUser(userObj)
    {
        // http post req to save the users into local api
        axios.post('http://localhost:4000/users',userObj)
        .then(res=>{
            if(res.status===201)
            {
                navigate('/users')
            }
            console.log("response object is ",res)})
        .catch(err=>{
            if(err.response)//client has given error response
            {
                setError(err.message)
            }
            else if(!err.response)//network error ne response from server
            {
                setError(err.message)
            }
            else
            {
                setError(err.message)
            }
        })
    }
  return (
    <div className='row'>
        <div className='col-11 col-sm-8 col-md-4 mx-auto bg-dark m-3 p-2'>
            {
                error.length!==0&&<p className='text-danger'>{error}</p>
            }
            <form onSubmit={handleSubmit(addNewUser)} className=''>
                <div className='mb-3'>
                    <label htmlFor='name' className='bg-light'>Name</label>
                    <input id='name' type='text' className='form-control' {...register("name",{required:true})}/>
                    {
                        errors.name?.type==='required'&&<p className='text-danger'>*required</p>
                    }
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'className='bg-light'>E-mail</label>
                    <input id='email' type='email' className='form-control' {...register("email",{required:true})}/>
                    {
                        errors.email?.type==='required'&&<p className='text-danger'>*required</p>
                    }
                </div>
                <div className='mb-3'>
                    <label htmlFor='dob' className='bg-light'>Date of Birth</label>
                    <input id='dob' type='date' className='form-control' {...register("dob",{required:true})}/>
                    {
                        errors.dob?.type==='required'&&<p className='text-danger'>*required</p>
                    }
                </div>
                <div>
                    <button type='submit' className='btn btn-primary'>Add user</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser