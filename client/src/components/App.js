import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductIndex from "./products/ProductsIndex";
import ProductDetail from "./products/ProductDetail";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <Nav />
      <Switch>
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route exact path="/" component={ProductIndex} />
        <Route exact path="/products/:productId" component={ProductDetail} />
      </Switch>
    </div>
  );
};
export default App;