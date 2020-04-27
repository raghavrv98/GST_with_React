/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../containers/HomePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import User from 'containers/User/Loadable'
import Trader from 'containers/Trader/Loadable'
import UserDetails from 'containers/UserDetails/Loadable'
import Contact from 'containers/Contact/Loadable'
import Services from 'containers/Services/Loadable'
import AboutUs from 'containers/AboutUs/Loadable'
import AddOrEditUser from 'containers/AddOrEditUser/Loadable'
export default function App() {
  return (
    <div>
      {/* <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet> */}
      <Header/>
      <Switch>
      <Route exact path="/" component={HomePage} />
        <Route exact path="/user" component={User} />
        <Route exact path="/trader" component={Trader} />
        <Route exact path="/userDetails/:id?" component={UserDetails} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/aboutUs" component={AboutUs} />
        <Route exact path="/addOrEditUser/:id?" component={AddOrEditUser} />
        {/* <Route path="" component={NotFoundPage} /> */}
      </Switch>
      <Footer />
    </div>
  );
}
