module.exports = {
  apps : [{
    name: 'KeyPoint',
    script: 'bin/secure-server.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
	NODE_ENV: 'production',
	PORT:3004,
	MONGO_URI_PROD:'mongodb+srv://jap:jap@cluster0-cpwjc.gcp.mongodb.net/KeyPoint?retryWrites=true&w=majority',
	JWT_SECRET:'terserah'
	}
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
