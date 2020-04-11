/**
 *
 * Asynchronously loads the component for User
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
