/**
 *
 * Asynchronously loads the component for Trader
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
