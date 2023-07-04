
import React from 'react';
import {Layout} from 'antd';
import './home.scss';

import Body from '../Body';

const { Content } = Layout;

const Home = (props) => {
  return (
    <Layout className="overall">
      <Content className="content">
        <Body setIsLoggedIn={props.setIsLoggedIn}/>
      </Content>
      
    </Layout>
  );
};

export default Home;
