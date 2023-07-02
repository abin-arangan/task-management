
import React from 'react';
import './body.scss';
import TaskDetails from '../TaskDetails';
import Header from '../Header';
// import Footer from '../Footer';

const Body = () => {
    return (
        <div>
          
          <Header title={'TASK MANAGEMENT'} />
          {
            
            < TaskDetails
            /> 
          }
          
          {/* <Footer /> */}
        </div>
      );
};

export default Body;
