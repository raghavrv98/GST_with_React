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

import Header from 'components/Header';
import Footer from 'components/Footer';
import User from 'containers/User/Loadable'
import UserDetails from 'containers/UserDetails/Loadable'
import Contact from 'containers/Contact/Loadable'
import AboutUs from 'containers/AboutUs/Loadable'
import AddOrEditUser from 'containers/AddOrEditUser/Loadable'
import AddOrEditAccountant from 'containers/AddOrEditAccountant/Loadable'
import ManageUser from 'containers/ManageUser/Loadable'
import Admin from 'containers/Admin/Loadable'
import LoginPage from 'containers/LoginPage/Loadable'
import ManageUserReports from 'containers/ManageUserReports/Loadable'
import ManageAccountantReports from 'containers/ManageAccountantReports/Loadable'
import UserBillDetails from 'containers/UserBillDetails/Loadable'
import ManageAccountant from 'containers/ManageAccountant/Loadable'

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
      <Route exact path="/" component={LoginPage} />
        <Route exact path="/user" component={User} />
        <Route exact path="/userDetails/:id?" component={UserDetails} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/aboutUs" component={AboutUs} />
        <Route exact path="/addOrEditUser/:id?" component={AddOrEditUser} />
        <Route exact path="/addOrEditAccountant/:id?" component={AddOrEditAccountant} />
        <Route exact path="/manageAccountant" component={ManageAccountant} />
        <Route exact path="/manageUser/:id?" component={ManageUser} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/manageUserReports" component={ManageUserReports} />
        <Route exact path="/userDetails/:id/manageAccountantReports/:report" component={ManageAccountantReports} />
        <Route exact path="/userDetails/:id/userBillDetails/:bill" component={UserBillDetails} />

        {/* <Route path="" component={NotFoundPage} /> */}
      </Switch>
      <Footer />
    </div>
  );
}
