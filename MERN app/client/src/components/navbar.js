import React,{Component} from 'react'
import M from 'materialize-css'
//import ReactDOM from 'react-dom'
import SignUpModal2 from './signupmodal2'
import LoginModal from './loginmodal'
import {connect} from 'react-redux'
import {logout} from '../actions/authActions'

//import {Link} from 'react-router-dom'


class Navbar extends Component{
   
  componentDidMount(){
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }
  

  handleLogout=()=>{
     this.props.logout();
  }


    render(){
        
      return(
        <nav className='nav-wrapper red darken-2'>
        <div className='container'>
        <a href='/' className='center brand-logo'>Components List</a>
        
          {(!this.props.isAuthenticated)?
            (<ul className='right'><li><SignUpModal2></SignUpModal2></li> 
            <li><LoginModal></LoginModal></li></ul>):
            <ul><li><a href="/" onClick={this.handleLogout} className="waves-effect waves-light">LogOut</a></li></ul>}          
        </div>
        </nav>

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
    logout: ()=>{dispatch(logout())}
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Navbar);