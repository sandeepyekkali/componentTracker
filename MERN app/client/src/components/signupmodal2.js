import React from 'react';
import M from 'materialize-css'
//import { addList } from '../actions/types';
import {connect} from 'react-redux'
//import list from './list';
import Proptypes from 'prop-types'
import {Alert} from '@material-ui/lab'
import {register} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'

class SignUpModal2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email:'',
            password:'',
            errmsg:'',
            
        }
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

    static propTypes = {
        isAuthenticated: Proptypes.bool,
        error1: Proptypes.object.isRequired,
        register: Proptypes.func.isRequired
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.modal');
        var options = {inDuration:500,
        outDuration:400}
        M.Modal.init(elems, options);
    }
    

    handleChange=(e)=>{
       this.setState({[e.target.name]: e.target.value})
       console.log(this.state)
    }

    
    
    handleSubmit=(e)=>{
       /* console.log(e)
        this.setState({
            name: e.target.name,
            email:e.target.email,
            password:e.target.password
        })*/
        e.preventDefault()
        const {name,email,password} = this.state
        
        const newUser= {
            name,
            email,
            password
        }
        this.props.register(newUser)
    }

    render(){
        return(
            <div className='container black-text'>
              <a href="#modal2" className="waves-effect waves-light modal-trigger">Register</a>
              <div id="modal2" className="modal">
              
              <div className="modal-content">
              <h4>Sign Up</h4>
              {this.state.errmsg &&
              <Alert severity='warning'>{this.state.errmsg}</Alert>}
               <div>
                 <form onSubmit={this.handleSubmit}>
                     <h6>Name:</h6><input defaultValue='' type='text' onChange={this.handleChange} name='name' placeholder='Name...'></input><br></br>
                     <h6>Email:</h6><input type='text' name='email' onChange={this.handleChange} placeholder='Email...'></input><br></br>
                     <h6>Password:</h6><input type='password' name='password' onChange={this.handleChange} placeholder='Password...'></input>
                     <button className='waves-effect waves-light btn blue darken-1 white-text' type='submit' onSubmit={this.handleSubmit}>Sign Up</button>
                 </form>
               </div>    
               </div>
             </div>
            </div>
        )
    }
}


const mapStatetoProps=(state)=>{
    return{
        isAuthenticated: state.auth.isAuthenticated,
        error1: state.error
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
       register: (newUser)=>{dispatch(register(newUser))},
       clearErrors: ()=>{dispatch(clearErrors())}

    }

}

export default connect(mapStatetoProps,mapDispatchtoProps)(SignUpModal2);