import React from 'react';
import Home from './pages/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Profile from './pages/profile/Profile';
import {BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
    const {user} = useContext(AuthContext)
    return (<Router>
        <Switch>
            <Route exact path="/">
                {user ? <Home/> : <Register/>}
            </Route>
            <Route path="/login">
                {user ? <Redirect to="/" /> : <Login/>}
            </Route>
            <Route path="/register">
            {user ? <Redirect to="/" /> : <Register/>}

            </Route>
            <Route path="/profile/:username">
                <Profile/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    </Router> )
    
}
 
export default App;