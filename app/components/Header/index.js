import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        {/* <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/user">
            <FormattedMessage {...messages.user} />
          </HeaderLink>
          <HeaderLink to="/trader">
            <FormattedMessage {...messages.trader} />
          </HeaderLink>
          <HeaderLink to="/userDetails">
            <FormattedMessage {...messages.userDetails} />
          </HeaderLink>
        </NavBar> */}

<nav class="navbar navbar-default">
  <div class="container-fluid">
    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a style={{marginLeft: "44px"}} class="navbar-brand" href="#">Brand</a>
    </div>

    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav navbar-right">
                <HeaderLink to="/">
                  <FormattedMessage {...messages.home} />
                </HeaderLink>
                <HeaderLink to="/user">
                  <FormattedMessage {...messages.user} />
                </HeaderLink>
                <HeaderLink to="/trader">
                  <FormattedMessage {...messages.trader} />
                </HeaderLink>
                <HeaderLink to="/userDetails">
                  <FormattedMessage {...messages.userDetails} />
                </HeaderLink>
                <HeaderLink to="/userDetails">
                  <FormattedMessage {...messages.login} />
                </HeaderLink>
                <HeaderLink to="/userDetails">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li class="dropdown-header">Nav header</li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
                </HeaderLink>
            </ul>
    </div>
  </div>
</nav>
      </div>
    );
  }
}

export default Header;
