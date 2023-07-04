import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Body from './Body';

const BodyContainer = (props) =>{



    return(
        <Body
        setIsLoggedIn={props.setIsLoggedIn}
            
        />
    )
}; 
export default BodyContainer;