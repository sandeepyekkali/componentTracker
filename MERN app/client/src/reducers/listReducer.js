//import uuid from 'uuid'
//import {getList,addList,deleteList} from '../actions/types' 
const stateInit ={
    list:[],
    isloading: false//{"_id":"5e4efee6b0398a2e5c168d13","date":"2020-02-20T21:49:26.922Z",name:"Red","__v":0},{"_id":"5e4efe8eb28c0e1644160191","date":"2020-02-20T21:47:58.416Z",'name':"Groceries","__v":0}]
}
  

const listReducer=(state=stateInit,actions)=>{
   switch (actions.type) {
       case 'getList':
           return{
               ...state,
               list: actions.payload,
               isloading: false
           }
       case 'deleteList':
           return{
               ...state,
               list: state.list.filter(list1=>{return actions.payload !== list1._id})
           }
        case 'addList':
            return{
                ...state,
                list: [...state.list,actions.payload]
            }
        case 'loading':
            return{
                ...state,
                isloading: true
            }
       default:
           return state;
   }
   

}

export default listReducer