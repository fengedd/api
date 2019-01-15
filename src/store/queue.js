const redis = require('../redis');
const Queue = require('bull');

const conn_info = process.env.REDIS_URL;
console.log(conn_info);
console.log('here');

const someQueue = new Queue('some queue', conn_info);
// someQueue.process(job => console.log('yolo'));

someQueue.process(job => {
  // console.log(job);
  job.progress(42);
  console.log(job.data);
  // return true;
  return Promise.reject(new Error('Fusk'));
});

someQueue.add({ data: 'something' });

/*
const options = {
  port: conn_info.port || 6379,
  host: conn_info.hostname,
  options: conn_info.query,
};

function getQueue(type) {
  return bull(type, options.port, options.host);
}
*/
/*
function runQueue(queueName, parallelism, processor) {
  function processOneJob() {
    redis.blpop(queueName, '0', (err, job) => {
      if (err) {
        throw err;
      }

      const jobData = JSON.parse(job[1]);
      processor(jobData, err => {
        if (err) {
          console.error(err);
        }
        process.nextTick();
      });
    });
  }

  for (let i = 0; i < parallelism; i += 1) {
    async.forever

  }
}
*/
