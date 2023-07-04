import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Home from './Home';
const HomeContainer = (props) =>{

    


    return(
        <Home
        setIsLoggedIn={props.setIsLoggedIn}
           
        />
    )
}; 
export default HomeContainer;