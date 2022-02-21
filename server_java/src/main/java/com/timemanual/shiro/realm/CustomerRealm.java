package com.timemanual.shiro.realm;

import com.timemanual.pojo.User;
import com.timemanual.pojo.vo.ViewPerms;
import com.timemanual.pojo.vo.ViewRole;
import com.timemanual.service.UserService;
import com.timemanual.shiro.salt.MyByteSource;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;

//自定义realm
public class CustomerRealm extends AuthorizingRealm {

    @Resource
    private UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取身份信息
        String primaryPrincipal = (String)principalCollection.getPrimaryPrincipal();
        //根据主身份信息获取角色 和 权限信息
        List<ViewRole> roles = userService.findRolesByUsername(primaryPrincipal);
        if (!CollectionUtils.isEmpty(roles)){
            SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
            roles.forEach(viewRole -> {
                simpleAuthorizationInfo.addRole(viewRole.getName());
                //权限信息
                List<ViewPerms> perms = userService.findPermsByRoleId(viewRole.getName());
                if (!CollectionUtils.isEmpty(perms)){
                    perms.forEach(viewPerms -> {
                        simpleAuthorizationInfo.addStringPermission(viewPerms.getPName());
                    });
                }
            });
            return simpleAuthorizationInfo;
        }
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //根据身份信息
        String principal = (String) authenticationToken.getPrincipal();
        System.out.println(principal);
        //在工厂中获取Service对象
        //UserService userService = (UserService) ApplicationContextUtils.getBean("userService");
        User user = userService.findByUsername(principal);
        if (!ObjectUtils.isEmpty(user)){
            //ByteSource.Util.bytes(user.getSalt()) 通过这个工具将盐传入
            return new SimpleAuthenticationInfo(user.getUsername(),user.getPassword(),new MyByteSource(user.getSalt()),this.getName());
        }
        return null;
    }
}