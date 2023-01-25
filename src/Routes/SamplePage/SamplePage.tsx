import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

import  axios from "axios";

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
  const [totalReactPackages, setTotalReactPackages] = useState(null);
  const [advUrl, setAdvUrl] = useState("");
  const DEFAULT_PORT = 8000;
  // TODO: Specify token from outside
  const TOKEN = "YOUR_TOKEN_HERE";
  const BEARER_TOKEN = "Bearer " + TOKEN;
  // TODO: Specify namespace from outside
  const NAMESPACE= "YOUR_NAMESPACE_HERE";
  const API_PATH = "api/v1/namespaces/" + NAMESPACE + "/endpoints/tang-backend-tang";
  // TODO: specify host from outside
  const COMPLETE_URL = "https://api.c-rh-c-eph.8p0c.p1.openshiftapps.com:6443/" + API_PATH;

  useEffect(() => {
    insights?.chrome?.appAction?.('tang-adv-displayer');
    console.log("Process env:" + process.env);
    console.log("Process env NODE_ENV:" + process.env.NODE_ENV);
    console.log("Process env REACT_APP_CLIENT_TOKEN:" + process.env.REACT_APP_CLIENT_TOKEN);
    console.log("Process env PROXY:" + process.env.PROXY);
    console.log("Process env DEVELOPMENT TEST:" + process.env.REACT_APP_DEVELOPMENT_TEST);
    console.log("Process env  PRODUCTION TEST:" + process.env.REACT_APP_PRODUCTION_TEST);

    axios.get(COMPLETE_URL,
              {
                  headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': BEARER_TOKEN,
                  },
                  withCredentials: false,
              })
          .then(response => {
              setAdvUrl("http://" + response.data.subsets[0].addresses[0].ip + ":" + DEFAULT_PORT + "/adv");
          })
          .catch(() => {
              console.log('Axios error from:' + COMPLETE_URL)
          });
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
                <p>Advertisement URL: <a href={advUrl}>{advUrl}</a></p>
                <p>API URL:{COMPLETE_URL}</p>
                <p>TOKEN:{BEARER_TOKEN}</p>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default SamplePage;
