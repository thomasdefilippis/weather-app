import redis
import json
import time


redis_host = 'redis'
redis_port = 6379
redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)

class Redis_Service:
    @staticmethod
    def get_cache(key):
        cached_data = redis_client.get(key)
        if cached_data:
          cached_data = json.loads(cached_data)
        return cached_data

    @staticmethod
    def set_cache(key,value, ttl):
      time_to_expire = int(time.time() + ttl)
      return redis_client.set(key, json.dumps(value), ex=time_to_expire)

    @staticmethod
    def get_ttl(key):
      return redis_client.ttl(key)
