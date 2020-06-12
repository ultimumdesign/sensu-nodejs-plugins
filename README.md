# sensu-nodejs-plugins
sensu plugins written in node

## usage
1. Use nvm to install and configure for:
```sh 
node --version > v10.0.0 
```
2. Create a personal access token.
3. Create new project through web and git clone to local.
4. In the new project directory, follow npm setup below:

### npm setup
* Relace ${NPM_TOKEN} with your new personal access token
* Run the following commands:
```sh
npm config set @ecm:registry "https://github.com/api/v4/packages/npm/"

npm config set '//github.com/api/v4/packages/npm/:_authToken' "${NPM_TOKEN}"
```

### no install
```sh
npx @ecm/sensu-nodejs-plugins
```

### local install
```sh
npm install @ecm/sensu-nodejs-plugins

node ./node_modules/@ecm/sensu-nodejs-plugins

or

npx @ecm/sensu-nodejs-plugins

```

