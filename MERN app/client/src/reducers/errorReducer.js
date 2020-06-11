//import {getErrors,clearErrors}

const stateInit={
    msg:{},
    status:null,
    id:null
}

const errorReducer=(state=stateInit,actions)=>{
    if(actions.type==='getErrors'){
        return{
            msg:actions.payload.msg,
            status:actions.payload.status,
            id:actions.payload.id
        }
    }
    if(actions.type==='clearErrors'){
        return{
            msg:{},
            status:null,
            id:null
        }
    }
    return state
}

export default errorReducer