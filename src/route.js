import React from "react";
import {HashRouter, Route, Link, Switch} from "react-router-dom";
import Home from './pages/home';
import About from './pages/about';

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about/bus",
        component: Bus
      },
      {
        path: "/about/cart",
        component: Cart
      }
    ]
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    //   component={route.component}
    />
  );
}

function RouteConfig() {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route, i) => (
            <RouteWithSubRoutes exact key={i} {...route} />
        ))}
      </Switch>
    </HashRouter>
  );
}

export default RouteConfig;