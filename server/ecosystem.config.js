module.exports = {
  apps: [{
    name: 'aerospace-server',
    script: 'server.js',
    cwd: '/Users/krol22/Library/Application Support/Übersicht/widgets/server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8234
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
