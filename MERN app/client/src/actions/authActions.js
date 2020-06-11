import axios from 'axios'
import {getErrors} from './errorActions'

const loadUser=()=>(dispatch,getState)=>{
    dispatch({type: 'userLoading'})
    
    const token=getState().auth.token

    
    //Set headers
    const config={
        headers:{
        "Content-type":"application/json"
    }}
    if(token){
      config.headers['x-auth-token']=token
    }
    
    
    axios.get('/api/auth/user',configToken(getState))
    .then(res=>dispatch({
        type:'userLoaded',
        payload:res.data
    })).catch(err=>{
        dispatch(getErrors(err.response.data,err.response.status))
        dispatch({type:'authError'})
    })
}


const login=({email,password})=>dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body= JSON.stringify({email,password})
    console.log(body)
    axios.post('api/auth',body,config)
    .then(res=>dispatch({
        type:'loginSuccess',
        payload: res.data
    })).catch(err=>{
        console.log(err.response)
        dispatch(getErrors(err.response.data,err.response.status,'registerFail'))
        dispatch({type: 'loginFail'})})
}

const logout=()=>dispatch=>{
    dispatch({
        type:'logoutSuccess'
    })
    dispatch({
        type:'clearErrors'
    })
}

const register=({name,email,password})=>dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body= JSON.stringify({name,email,password})
    console.log(body)
    axios.post('api/users',body,config)
    .then(res=>dispatch({
        type:'registerSuccess',
        payload: res.data
    })).catch(err=>{
        console.log(err.response)
        dispatch(getErrors(err.response.data,err.response.status,'registerFail'))
        dispatch({type: 'registerFail'})})
}

const configToken=(getState)=>{
    const token=getState().auth.token

    
    //Set headers
    const config={
        headers:{
        "Content-type":"application/json"
    }}
    if(token){
      config.headers['x-auth-token']=token
    }

    return config;
}

export {loadUser,register,login,configToken,logout};