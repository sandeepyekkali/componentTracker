import axios from 'axios'

import {configToken} from './authActions'
import {getErrors} from './errorActions'


const getList=()=>dispatch=>{
    dispatch({type:'loading'})
    axios.get('api/items')
    .then(res=>dispatch({
        type: 'getList',
        payload: res.data
    }))
}


const addList=(name)=>(dispatch,getState)=>{
   axios.post('api/items',{name},configToken(getState))
   .then(res=>
    dispatch({
        type:'addList',
        payload:res.data
    })).catch(err=>{
        dispatch(getErrors(err.response.data,err.response.status,'registerFail'))
    })
}

const deleteList=(id)=>(dispatch,getState)=>{
    axios.delete('api/items/'+id,configToken(getState))
    .then(res=>dispatch(
    {
        type:'deleteList',
        payload: id
    })).catch(err=>{
        dispatch(getErrors(err.response.data,err.response.status,'registerFail'))
    })
};

export {deleteList,addList,getList};
