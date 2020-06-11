 const getErrors =({msg},status,id=null)=>{
    return{
        type:'getErrors',
        payload:{msg,status,id}
    }
}


 const clearErrors =()=>{
    return{
        type:'clearErrors'
    }
}

export {getErrors,clearErrors};

