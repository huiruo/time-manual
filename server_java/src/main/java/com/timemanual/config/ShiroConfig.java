package com.timemanual.config;

//import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import com.timemanual.shiro.realm.CustomerRealm;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    //让页面shiro标签生效
    //    @Bean
    //    public ShiroDialect shiroDialect(){
    //        return new ShiroDialect();

    //1、创建shiroFilter   负责拦截所有请求
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean factoryBean = new ShiroFilterFactoryBean();
        //给filter设置安全管理
        factoryBean.setSecurityManager(defaultWebSecurityManager);
        //配置系统的受限资源
        //配置系统公共资源
        Map<String,String> map = new HashMap<>();
        map.put("/main","authc");//请求这个资源需要认证和授权
        map.put("/admin","roles[admin]");
        map.put("/manage","perms[user:*:*]");
        map.put("/article","perms[user:*:*]");
        //更改默认的认证界面路径
        factoryBean.setLoginUrl("/login");
        //未授权页面
        factoryBean.setUnauthorizedUrl("/unAuth");
        factoryBean.setFilterChainDefinitionMap(map);
        return factoryBean;
    }
    //2、创建安全管理器
    @Bean
    public DefaultWebSecurityManager defaultWebSecurityManager(@Qualifier("getRealm") Realm realm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //给安全管理器设置
        securityManager.setRealm(realm);
        return securityManager;
    }
    //3、创建自定义realm
    @Bean
    public Realm getRealm(){
        CustomerRealm customerRealm = new CustomerRealm();
        //修改凭证校验匹配器
        HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
        //设置加密算法为md5
        credentialsMatcher.setHashAlgorithmName("MD5");
        //设置散列次数
        credentialsMatcher.setHashIterations(1024);
        customerRealm.setCredentialsMatcher(credentialsMatcher);

        //开启缓存管理
        customerRealm.setCacheManager(new EhCacheManager()); //默认缓存
        //customerRealm.setCacheManager(new RedisCacheManager()); //redis缓存

        //开启全局缓存
        customerRealm.setCachingEnabled(true);
        //开启认证缓存
        customerRealm.setAuthenticationCachingEnabled(true);
        customerRealm.setAuthenticationCacheName("authenticationCache");
        //开启权限缓存
        customerRealm.setAuthorizationCachingEnabled(true);
        customerRealm.setAuthorizationCacheName("authorizationCache");
        return customerRealm;
    }
}
