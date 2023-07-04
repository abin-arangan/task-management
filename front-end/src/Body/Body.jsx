
import React from 'react';
import './body.scss';
import TaskDetails from '../TaskDetails';
import Header from '../Header';
// import Footer from '../Footer';

const Body = (props) => {
    return (
        <div>
          
          <Header title={'TASK MANAGEMENT'} setIsLoggedIn={props.setIsLoggedIn} />
          {
            
            < TaskDetails
            /> 
          }
          
          {/* <Footer /> */}
        </div>
      );
};

export default Body;
