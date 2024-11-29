import React from 'react';
import Home from './Home/Home';
import About from './about us/About';
import ContactUs from './contact/Contact';
import SignupSignin from './signup/SignupSignin';
import Cart from './cart/Cart';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sales from './sales/Sales';
import Rents from './rents/Rents';
import Notification from './Notification/Notification';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
        path='/Notifications'
        element = {
          <>
          <Notification/>
          </>
        }
        />
        <Route
        path='/rents'
        element = {
          <>
          <Rents/>
          </>
        }
        />
        <Route
        path='/sales'
        element = {
          <>
          <Sales/>
          </>
        }
        />
        <Route
        path='/Orders'
        element = {
          <>
          <Cart/>
          </>
        }
        />
        <Route
        path='/About us'
        element = {
          <>
          <About/>
          </>
        }
        />
        <Route
        path='/Contact us'
        element = {
          <>
          <ContactUs/>
          </>
        }
        />
        <Route
        path='/SignupSignin'
        element = {
          <>
          <SignupSignin/>
          </>
        }
        />
          <Route
            path='/'
            element={
              <>
                <Home/>
              </>
            }
          />
        </Routes>
      
      </Router>

    </div>
  );
}

export default App;
