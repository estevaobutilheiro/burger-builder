import {Switch ,Route} from 'react-router-dom';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
      return (
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" exact component={Orders}></Route>
              <Route path="/" exact component={BurgerBuilder}></Route>
            </Switch>
            {/* <Checkout/> */}
          </Layout>
        </div>
      );
    }
  }

export default App;
