/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'user',
  },
  trader: {
    id: `${scope}.trader`,
    defaultMessage: 'trader',
  },
  userDetails: {
    id: `${scope}.userDetails`,
    defaultMessage: 'userDetails',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  dropdown: {
    id: `${scope}.dropdown`,
    defaultMessage: 'Dropdown',
  },
});
