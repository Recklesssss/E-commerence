import React from 'react'
import "./Home.css"
import Header from './Header/Header'
import Main from './Main/Main'

function Home() {
  return (
    <div className='home'>
        <Header/>
        <Main/>
    </div>
  )
}

export default Home