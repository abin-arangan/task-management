import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Body from './Body';
// import homeOperations from '../state/features/Home/operations';
// import {selectors as homeSelectors} from '../state/features/Home';

const BodyContainer = () =>{

        const [isMovies, setIsMovies] = useState(false);
        const [isBooks, setIsBooks] = useState(false);


        const onSelectBooks = () =>{
            setIsBooks(true);
            setIsMovies(false);
        }

        const onSelectMovies = () =>{
            setIsBooks(false);
            setIsMovies(true);
        }


    return(
        <Body
            onSelectBooks = {onSelectBooks}
            onSelectMovies = {onSelectMovies}
            isMovies = {isMovies}
            isBooks = {isBooks}
        />
    )
}; 
export default BodyContainer;