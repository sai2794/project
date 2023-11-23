// import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style= {{backgroundImage : "linear-gradient(#797609,#0095ff,rgba(121,118,9,.100))"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1>Login Success Page</h1>
        <Link to='/login' className="btn btn-light my-5">Logout</Link>
    </div>
  )
}

export default Home