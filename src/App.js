import React, { Component } from 'react';
import { Route, Routes, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login'
import AddDoc from './pages/addDoc'
import Bulletin from './pages/bulletin'
import Header from './components/Header'
const Auth = () => {
  const user=localStorage.getItem('token')
  if (user) {
    return true;
  }
  return false;
}

function AuthRoute () {
  const auth = Auth()
  return auth ? <div> <Header/> <Outlet/> </div> : <Navigate to="/login"/>
}
function PublicRoute () {
  const auth = Auth()
  return auth ? <Navigate to="/Dashboard" /> : <Outlet/>
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            /** Wrap all route here **/ 
            <Route path="/*" element = {<AuthRoute/>}>
              <Route path="Bulletin" element={<Bulletin/>}>
                
              </Route>
              <Route path="addDoc" element = {<AddDoc/>}/>
            </Route>
            // login route
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<Login/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>



    )
  }
}

export default App;
