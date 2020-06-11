import React from 'react';
import Navbar from './components/navbar'
import List from './components/list'
import AddListModal from './components/addModal'
import {loadUser} from './actions/authActions'
import store from './store'
//import SignUpModal2 from './components/signupmodal2'
//import {BrowserRouter,Route} from 'react-router-dom'

class App extends React.Component{

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
  return (
    <div>
      
      <Navbar></Navbar>
      
      <List></List>
      <AddListModal></AddListModal>
      

      
     </div> 
  );}
}

export default App;
