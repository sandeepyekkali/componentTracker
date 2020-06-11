import React, { Component } from 'react'
//import uuid from 'uuid'
import {connect} from 'react-redux'
import {deleteList,getList} from '../actions/types'
import {Alert} from '@material-ui/lab'
import { clearErrors } from '../actions/errorActions'

class List extends Component{
    constructor(props){
        super(props)
        this.state={
            errmsg:null
        }
    }
    
    componentDidMount(){
      
       this.props.getList()
       //console.log(this.props+"   props")
    }

    

    componentDidUpdate(prevProps){
        
        const {error1} = this.props
        if(error1 !== prevProps.error1){
            if(error1.id==='registerFail'){
                this.setState({
                    errmsg:error1.msg
                })
            }else{
                this.setState({errmsg:null})
            }
        }
    }

    handleDeleteClick=(e)=>{
       this.props.deleteList(e.target.value)
    }

    render(){

       // const {list}= this.state;
       const divstyle ={
           margin: '2px auto'
       }
       
       // const {list} = this.props
        console.log(this.props.list)
        const listr=this.props.list.map((list)=>{
            return(
                <div className='container' key={list._id}>
                    
                    
                    <button type='button' value={list._id} onClick={this.handleDeleteClick}
                     style={divstyle} className="waves-effect waves-light btn-small red darken-3">-</button>{' '}
                    <span className='title'>{list.name}</span>
                   
                </div>
            )
        })
        return(
            <div className='container'>
                
                <h4 className='container red-text'>Welcome to Manufacture List</h4><br></br>
                {(!this.props.isAuthenticated && this.state.errmsg) &&
                    <Alert severity='error'>Login To Delete Items</Alert>}
                <ul>{listr}</ul><br></br>
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return{
    list: state.list.list,
    error1: state.error,
    isAuthenticated:state.auth.isAuthenticated
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        deleteList: (id) =>{dispatch(deleteList(id))},
        getList: ()=>{dispatch(getList())},
        clearErrors:()=>{dispatch(clearErrors())}
        
    }

}

export default  connect(mapStatetoProps,mapDispatchtoProps)(List);