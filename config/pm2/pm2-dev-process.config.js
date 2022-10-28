module.exports = {
  apps: [
    {
      ...require('./pm2.config'),
      env: {
        'PORT': 7030,
        'NODE_ENV': 'development'
      }
    }
  ]
};

