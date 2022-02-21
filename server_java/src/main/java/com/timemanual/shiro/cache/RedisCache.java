package com.timemanual.shiro.cache;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;

import java.util.Collection;
import java.util.Set;

//自定义redis缓存的实现
//public class RedisCache<k,v> implements Cache<k,v> {
public class RedisCache {

//    @Resource
//    private RedisTemplate redisTemplate;

//    private String cacheName;
//
//    public RedisCache(String cacheName) {
//        this.cacheName = cacheName;
//    }
//
//    public RedisCache() {
//    }
//
//    @Override
//    public v get(k k) throws CacheException {
//        return (v) getRedisTemplate().opsForHash().get(this.cacheName,k.toString());
//    }
//
//    @Override
//    public v put(k k, v v) throws CacheException {
//        getRedisTemplate().opsForHash().put(this.cacheName,k.toString(),v);
//        return null;
//    }
//
//    @Override
//    public v remove(k k) throws CacheException {
//        return (v) getRedisTemplate().opsForHash().delete(this.cacheName,k.toString());
//    }
//
//    @Override
//    public void clear() throws CacheException {
//        getRedisTemplate().delete(this.cacheName);
//    }
//
//    @Override
//    public int size() {
//        return getRedisTemplate().opsForHash().size(this.cacheName).intValue();
//    }
//
//    @Override
//    public Set<k> keys() {
//        return getRedisTemplate().opsForHash().keys(this.cacheName);
//    }
//
//    @Override
//    public Collection<v> values() {
//        return getRedisTemplate().opsForHash().values(this.cacheName);
//    }
//
//    public RedisTemplate getRedisTemplate(){
//        RedisTemplate redisTemplate = (RedisTemplate) ApplicationContextUtils.getBean("redisTemplate");
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
//        return redisTemplate;
//    }
}
