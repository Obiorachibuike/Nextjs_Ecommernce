import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost', // Redis server hostname
  port: 6379,        // Redis server port
  db: 0,             // Default Redis DB
});

export default redis;
