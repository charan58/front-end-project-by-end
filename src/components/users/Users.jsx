import React from 'react'
import './users.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
function Users() {
    let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();
    const [users,setUsers]=useState([])
    const [error,setError]=useState("")
    const [show,setShow]=useState(false)
    const [userToEdit,setUserToEdit]=useState({})
    const openModal=()=>setShow(true)
    const closeModal=()=>setShow(false)
    const editUser=(userObj)=>{
        openModal()
        setUserToEdit(userObj)
        // display user data to edit 
        setValue("name",userObj.name);
        setValue("email",userObj.email)
        setValue("dob",userObj.dob)
    }
    const saveModifiedUser=()=>{
        closeModal()
        let modifiedUser=getValues();
        // set id
        modifiedUser.id=userToEdit.id;
        //make http put request
        axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
        .then(res=>{
            if(res.status===200)
            {
                setUsers(res.data)
            }
        })
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
    useEffect(()=>{
        axios.get('http://localhost:4000/users')
        .then(res=>{
            if(res.status===200)
            {
                setUsers(res.data);
            }
        })
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
    },[])
  return (
    <div className='text-center'>
        <h1 className=''>Users</h1>
        {
            error.length!==0&&<p className='text-danger'>{error}</p>
        }
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            {
                users.map((userObj)=>
                <div className='col text-center' key={userObj.id}>
                    <div className='card'>
                        <div className='card-body'>
                            <p className='display-3 name'>{userObj.name}</p>
                            <p className='lead fs-4'>{userObj.email}</p>
                            <p className='lead'>DOB: {userObj.dob}</p>
                            <button className="btn btn-warning float-start" onClick={()=>editUser(userObj)}>Edit</button>
                            <button className="btn btn-danger float-end" onClick={saveModifiedUser}>Remove</button>
                        </div>   
                    </div>
                </div>)
            }
        </div>
        <Modal show={show} onHide={closeModal} backdrop='static' centered className='model'>
            <Modal.Header closeButton>
                Edit profile
            </Modal.Header>
            <Modal.Body>
                {/* user edit form */}
                <form className='' onSubmit={handleSubmit(saveModifiedUser)}>
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
                    <input id='dob' type='date' className='form-control' {...register("dob",{required:true})} disabled/>
                    {
                        errors.dob?.type==='required'&&<p className='text-danger'>*required</p>
                    }
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" type='submit'>Save changes</button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Users