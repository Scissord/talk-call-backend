import redis from 'redis';

// Создайте клиент Redis
const redisClient = redis.createClient({
  url: process.env.NODE_ENV === 'development'
    ? 'redis://localhost:6379'
    : `redis://${process.env.SERVER_IP}:6379`
});

// Обработчик ошибок подключения
redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Подключение к Redis серверу
redisClient.connect().catch(err => {
  console.error('Failed to connect to Redis:', err);
});

export default redisClient;
