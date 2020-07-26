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
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import ForbiddenPage from 'containers/ForbiddenPage/Loadable'
import ManagePasswordRequests from 'containers/ManagePasswordRequests/Loadable'
import ResetPassword from 'containers/ResetPassword/Loadable'
import UserNotifications from 'containers/UserNotifications/Loadable'
import AccountantNotifications from 'containers/AccountantNotifications/Loadable'
import AdminNotifications from 'containers/AdminNotifications/Loadable'
import UpdateUserAccountant from 'containers/UpdateUserAccountant/Loadable'

export default function App() {
  return (
    <div>
      {/* <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet> */}
      <Header />
      <Switch>
        <Route exact path="/" render={props => <LoginPage {...props} />} />
        <Route exact path="/user" render={props => <User {...props} />} />
        <Route exact path="/userDetails/:id/:month/:year" render={props => <UserDetails {...props} />} />
        <Route exact path="/contact" render={props => <Contact {...props} />} />
        <Route exact path="/aboutUs" render={props => <AboutUs {...props} />} />
        <Route exact path="/addOrEditUser/:id?" render={props => <AddOrEditUser {...props} />} /> 
        <Route exact path="/addOrEditAccountant/:id?" render={props => <AddOrEditAccountant {...props} />} />
        <Route exact path="/manageAccountant" render={props => <ManageAccountant {...props} />} />
        <Route exact path="/manageUser/:id?" render={props => <ManageUser {...props} />} />
        <Route exact path="/admin" render={props => <Admin {...props} />} />
        <Route exact path="/manageUserReports/:month/:year" render={props => <ManageUserReports {...props} />} />
        <Route exact path="/userDetails/:id/manageAccountantReports/:report/:month/:year/:date?" render={props => <ManageAccountantReports {...props} />} />
        <Route exact path="/userDetails/:id/userBillDetails/:bill/:month/:year/:date" render={props => <UserBillDetails {...props} />} />
        <Route exact path="/error403" render={props => <ForbiddenPage {...props} />} />
        <Route exact path="/managePasswordRequests" render={props => <ManagePasswordRequests {...props} />} />
        <Route exact path="/resetPassword" render={props => <ResetPassword {...props} />} />
        <Route exact path="/userNotifications" render={props => <UserNotifications {...props} />} />
        <Route exact path="/accountantNotifications" render={props => <AccountantNotifications {...props} />} />
        <Route exact path="/adminNotifications" render={props => <AdminNotifications {...props} />} />
        <Route exact path="/updateUserAccountant" render={props => <UpdateUserAccountant {...props} />} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
