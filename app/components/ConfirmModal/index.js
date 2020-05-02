/**
 *
 * ConfirmModal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ConfirmModal(props) {
  return (
    <div>
      <div className={props.showHideClassName}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="delete-modal-padding-r">
              <form method="post" action="/login">
                <p className="warning-msg-r">Are you sure want to delete ?</p>
                <div className="icon-margin-r">
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <span>
                      <p className="margin-0-r cross-r" onClick={() => { props.onClose() }} ><i className="fa fa-times"></i></p>
                    </span>
                  </div>
                  <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <span>
                      <p className="margin-0-r check-r" onClick={() => { props.onConfirm() }}><i className="fa fa-check"></i></p>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {};

export default ConfirmModal;
