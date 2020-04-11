/*
 * Trader Messages
 *
 * This contains all the text for the Trader container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Trader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Trader container!',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
});
