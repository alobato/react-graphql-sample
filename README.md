## Clone
```
$ cd ~/projects
$ git clone https://github.com/alobato/react-graphql-sample.git
````

## Server
```
$ cd ~/projects/react-graphql-sample/server
$ yarn install
$ node_modules/.bin/sequelize db:create
$ node_modules/.bin/sequelize db:migrate
$ node_modules/.bin/sequelize db:seed:all
$ echo 'SECRET=YourSecret' > .env
$ yarn start
```
## Client
```
$ cd ~/projects/react-graphql-sample/client
$ yarn install
$ yarn start
```
## Server Deploy
ecosystem.config.js
```
const appName = 'react-graphql-sample'
module.exports = {
  apps : [{
    name: appName,
    script: 'app.js',
    env: { NODE_ENV: 'development' },
    env_production : { NODE_ENV: 'production' }
  }],
  deploy : {
    production : {
      user : 'deployer',
      host : 'api.DOMAIN.com',
      ref  : 'origin/master',
      repo : `git@bitbucket.org:USERNAME/${appName}.git`,
      path : `/home/deployer/apps/${appName}`,
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production && /home/deployer/apps/${appName}/current/node_modules/.bin/sequelize db:migrate --env production'
    }
  }
}
```
`$ pm2 deploy production setup`

`$ pm2 deploy production`

### on server
`$ pm2 startup`

`$ pm2 save`

## Client Deploy

```
$ cd ~/projects/react-graphql-sample

$ yarn build && \
cd build/ && \
cp index.html 200.html && \
surge -d APPNAME.surge.sh -p . && \
cd ..
```
