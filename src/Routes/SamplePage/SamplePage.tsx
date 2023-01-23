import React, { Suspense, lazy, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

const SampleComponent = lazy(() => import('../../Components/SampleComponent/sample-component'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const SamplePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Tang Advertisement Displayer Insights App" />
        <p> This application is a simple application to show tang advertising URL </p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h2" size="3xl">
                  {' '}
                  Tang Advertisement URL{' '}
                </Title>
              </StackItem>
              <StackItem>
                <Link to="https://here-the-link/oops"> Here a link to tang adv URL </Link>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default SamplePage;
