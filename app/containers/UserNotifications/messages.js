/*
 * UserNotifications Messages
 *
 * This contains all the text for the UserNotifications container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserNotifications';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserNotifications container!',
  },
});
