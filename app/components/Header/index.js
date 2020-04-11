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
        <NavBar>
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
        </NavBar>
      </div>
    );
  }
}

export default Header;
