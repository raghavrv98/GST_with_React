/**
 *
 * AboutUs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAboutUs from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AboutUs</title>
          <meta name="description" content="Description of AboutUs" />
        </Helmet>
        <div className="container">
          <div className="aboutUs-form-r">
            <p className="aboutUs-title-r">About Us</p>
            {/* <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        </div> */}
            <div className="container">
              <div className="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="aboutUsTitle1-r">
                  Who we are ?
          </p>
                <p className="subHeading-1-r">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde possimus velit in cupiditate iusto expedita nemo voluptates aliquam necessitatibus mollitia laborum, non sequi illum illo tempora animi beatae! Maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde possimus velit in cupiditate iusto expedita nemo voluptates aliquam necessitatibus mollitia laborum, non sequi illum illo tempora animi beatae! Maiores?</p>
              </div>
            </div>
            <div className="container">
              <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <p className="aboutUsTitle1-r">
                  Who we are ?
          </p>
                <p className="subHeading-1-r">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde possimus velit in cupiditate iusto expedita nemo voluptates aliquam necessitatibus mollitia laborum, non sequi illum illo tempora animi beatae! Maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut unde possimus velit in cupiditate iusto expedita nemo voluptates aliquam necessitatibus mollitia laborum, non sequi illum illo tempora animi beatae! Maiores?</p>
              </div>
              <div className="col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="aboutus-img1-r"><img className="img-1" src={require('../../assets/img/aboutUs1.jpg')} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutUs.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aboutUs: makeSelectAboutUs(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'aboutUs', reducer });
const withSaga = injectSaga({ key: 'aboutUs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AboutUs);
