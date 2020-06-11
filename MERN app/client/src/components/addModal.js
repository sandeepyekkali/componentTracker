import React from 'react';
import M from 'materialize-css'
import { addList } from '../actions/types';
import {connect} from 'react-redux'
//import list from './list';


class AddListModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            
        }
    }

    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function () {
            var Modalelem = document.querySelector('.modal');
            M.Modal.init(Modalelem);
        });
    }
    

    handleChange=(e)=>{
       this.setState({
           name: e.target.value
       })
    }
    
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.addList(this.state.name)
    }

    render(){
        return(
            <div className='container'>
               { this.props.isAuthenticated &&
              <button data-target="modal1" className="waves-effect waves-light btn modal-trigger blue darken-2">ADD</button>}
              <div id="modal1" className="modal">
              <div className="modal-content">
              <h4>Add Item to List</h4>
               <div>
                 <form onSubmit={this.handleSubmit}>
                     <input type='text' onChange={this.handleChange} placeholder='Item here...'></input>
                     <button className='modal-close waves-effect waves-light btn blue darken-1 white-text' type='submit'>Submit</button>
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
        list: state.list.list,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        addList: (name)=>{dispatch(addList(name))}
    }

}

export default connect(mapStatetoProps,mapDispatchtoProps)(AddListModal);