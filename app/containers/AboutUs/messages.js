/*
 * AboutUs Messages
 *
 * This contains all the text for the AboutUs container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AboutUs';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AboutUs container!',
  },
});
