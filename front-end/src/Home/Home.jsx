
import React from 'react';
import {Layout} from 'antd';
import './home.scss';

import Body from '../Body';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="overall">
      <Content className="content">
        <Body />
      </Content>
      
    </Layout>
  );
};

export default Home;
