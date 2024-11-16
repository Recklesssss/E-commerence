import React from 'react';
import Home from './Home/Home';
import About from './about us/About';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
        path='/About us'
        element = {
          <>
          <About/>
          </>
        }
        />
        <Route
        path='/addrestaurant'
        element = {
          <>
          </>
        }
        />
        <Route
        path='/addUser'
        element = {
          <>
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
