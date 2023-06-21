# tang-adv-displayer
[![shellcheck](https://github.com/dee-hms/tang-adv-displayer/actions/workflows/shellcheck.yaml/badge.svg)](https://github.com/dee-hms/tang-adv-displayer/actions/workflows/shellcheck.yaml)\
[![spellcheck](https://github.com/dee-hms/tang-adv-displayer/actions/workflows/spellcheck.yaml/badge.svg)](https://github.com/dee-hms/tang-adv-displayer/actions/workflows/spellcheck.yaml)

## Initial etc/hosts setup

In order to access URL `https://[env].foo.redhat.com` in your browser, you have to add entries to your `/etc/hosts` file. This is a **one-time** setup that has to be done only once (unless you modify hosts) on each machine.

To setup the hosts file run following command:
```bash
npm run patch:hosts
```

If this command throws an error run it as a `sudo`:
```bash
sudo npm run patch:hosts
```

## Deployment

1. For application to run correctly and be able to retrieve Tang backend information, it is required to configure `./src/confdata.json` with next information:
```
{
  "environment": "ENVIRONMENT_TO_CONNECT",
  "namespace":  "THE_NAMESPACE_IN_EPHEMERAL_ENVIRONMENTS",
  "token": "EPHEMERAL_ENVIRONMENT_ACCESS_TOKEN"
}
```
NOTE: The environment to connect should contain prefix `https://`

2. ```npm install```

3. ```npm run start```. On its execution, you will be able to select the kind of deployment(prod/stage) and the kind of distribution(beta/stable).

4. Open browser in URL listed in the terminal output. The URL will be something of the type:
```https://prod.foo.redhat.com:1337/beta/staging/tang-adv-displayer/```
URL will vary considering the kind of deployment and distribution selected.

## Testing

`npm run verify` will run `npm run lint` (eslint) and `npm test` (jest)
