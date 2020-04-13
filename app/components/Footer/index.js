import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
<div style={{backgroundColor: "#F9FDFE",
             textAlign: "center", 
             padding:"6px",
             position: "fixed",
             left: "0",
             bottom: "0",
             width: "100%",
             color:"black",
             fontSize:"12px",
             zIndex:"1000"
  }}>
&copy; All rights reserved. Designed and devloped by blackreddish.
</div>
  );
}
export default Footer;
