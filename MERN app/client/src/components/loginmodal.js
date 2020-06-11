import React from 'react';
import M from 'materialize-css'
//import { addList } from '../actions/types';
import {connect} from 'react-redux'
//import list from './list';
import Proptypes from 'prop-types'
import {Alert} from '@material-ui/lab'
import {login} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'

class LoginModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            errmsg:null
        }
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.modal');
        var options = {inDuration:500,
        outDuration:400}
        M.Modal.init(elems, options);
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
        login: Proptypes.func.isRequired
    }

    handleChange=(e)=>{
        
       this.setState({[e.target.name]:e.target.value})
       
    }

    handleSubmit=(e)=>{
       
         e.preventDefault()
         const {email,password} = this.state
         
         const user= {
             email,
             password
         }
         this.props.login(user)
     }



    render(){
        return(
            <div className='container black-text'>
              <a href="#modal3" className="waves-effect waves-light modal-trigger">SignIn</a>
              <div id="modal3" className="modal">
              
              <div className="modal-content">
              <h4>Sign Up</h4>
              {this.state.errmsg &&
              <Alert severity='warning'>{this.state.errmsg}</Alert>}
               <div>
                 <form onSubmit={this.handleSubmit}>
                     <h6>Email:</h6><input type='text' name='email' onChange={this.handleChange} placeholder='Email...'></input><br></br>
                     <h6>Password:</h6><input type='password' name='password' onChange={this.handleChange} placeholder='Password...'></input>
                     <button className='waves-effect waves-light btn blue darken-1 white-text' type='submit' onSubmit={this.handleSubmit}>Sign In</button>
                 </form>
               </div>    
               </div>
             </div>
            </div>

        )
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
       login: (user)=>{dispatch(login(user))},
       clearErrors: ()=>{dispatch(clearErrors())}

    }

}

const mapStatetoProps=(state)=>{
    return{
        isAuthenticated: state.auth.isAuthenticated,
        error1: state.error
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(LoginModal);