import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

import  axios from "axios";

import confdata from "../../confdata.json";

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
  const BEARER_TOKEN = "Bearer " + confdata.token;
  const NAMESPACE= confdata.namespace;
  const API_PATH = "api/v1/namespaces/" + NAMESPACE + "/endpoints/tang-backend-tang";
  const COMPLETE_URL = confdata.environment + "/" + API_PATH;

  const getPublicUrl = (jsondata: any) => {
      var i;
      for(i=0; i < jsondata.subsets[0].ports.length; i++) {
          if (jsondata.subsets[0].ports[i].name == "public") {
              console.log("CONSOLE Public port found:" + jsondata.subsets[0].ports[i].port);
              return "http://" + jsondata.subsets[0].addresses[0].ip + ":" + jsondata.subsets[0].ports[i].port + "/adv";
          }
      }
      return "http://" + jsondata.subsets[0].addresses[0].ip + ":" + DEFAULT_PORT + "/adv";
  };

  useEffect(() => {
    insights?.chrome?.appAction?.('tang-adv-displayer');
    console.log("CONSOLE Process env CONF DATA:" + confdata);
    console.log("CONSOLE Process env CONF DATA env:" + confdata.environment);
    console.log("CONSOLE Process env CONF DATA namespace:" + confdata.namespace);

    axios.get(COMPLETE_URL,
              {
                  headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Authorization': BEARER_TOKEN,
                  },
                  withCredentials: false,
              })
          .then(response => {
              setAdvUrl(getPublicUrl(response.data));
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
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default SamplePage;
