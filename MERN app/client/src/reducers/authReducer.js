const stateInit={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user:null
}

const authReducer=(state=stateInit,actions)=>{
    if(actions.type==='userLoading'){
        return{
            ...state,
            isLoading: true
        }}
    if(actions.type==='userLoaded'){
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user:actions.payload
            }}
    if(actions.type==='registerSuccess'||actions.type==='loginSuccess'){
        localStorage.setItem('token',actions.payload.token)    
        return{
                    ...state,
                    ...actions.payload,
                    isAuthenticated: true,
                    isLoading: false,
                }}
    if(actions.type==='logoutSuccess'||actions.type==='loginFail'||
    actions.type==='authError'||actions.type==='registerFail'){
         
        localStorage.removeItem('token')
        
        return{
              ...state,
              token:null,
              isAuthenticated: false,
              isLoading: false,
              user:null,
              }} 
    
     return state;
    
}

export default authReducer