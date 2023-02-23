import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const TangDescription = lazy(() => import(/* webpackChunkName: "TangDescription" */ './Routes/TangDescription/TangDescription'));
const OopsPage = lazy(() => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage'));
const NoPermissionsPage = lazy(() => import(/* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage'));

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/tang-description" component={TangDescription} />
      <Route path="/oops" component={OopsPage} />
      <Route path="/no-permissions" component={NoPermissionsPage} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <Redirect to="/tang-description" />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
