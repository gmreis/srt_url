const numCPUs = require('os').cpus().length;

if(numCPUs > 1) {

  const cluster = require('cluster');

  if (cluster.isMaster) {
    console.log('Master process is running');

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else {

    const server = require('./config/server')
    require('./config/database')
    require('./config/routes')(server)

  }

} else {

  const server = require('./config/server')
  require('./config/database')
  require('./config/routes')(server)

}
