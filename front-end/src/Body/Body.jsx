
import React from 'react';
import './body.scss';
import TaskDetails from '../TaskDetails';
import Header from '../Header';
import Footer from '../Footer';

const Body = (props) => {
    return (
        <div>
          
          <Header title={props.title ?? 'TITLE'} />
          {
            (!props.isMovies && !props.isBooks ) &&
            < TaskDetails
            /> 
          }
          
          <Footer />
        </div>
      );
};

export default Body;
