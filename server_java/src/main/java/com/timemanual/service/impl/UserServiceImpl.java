package com.timemanual.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timemanual.dao.UserMapper;
import com.timemanual.pojo.User;
import com.timemanual.pojo.vo.ViewPerms;
import com.timemanual.pojo.vo.ViewRole;
import com.timemanual.service.UserService;
import com.timemanual.utils.SaltUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public boolean register(User user) {
        //明文密码进行MD5 + salt + hash散列
        //生成随机盐
        String salt = SaltUtils.getSalt(8);
        user.setSalt(salt);
        Md5Hash md5Hash = new Md5Hash(user.getPassword(),salt,1024);
        //设置加密后的密码
        user.setPassword(md5Hash.toHex());
        return userMapper.insert(user) > 0;
    }

    @Override
    public User findByUsername(String username) {
        return userMapper.selectOne(new QueryWrapper<User>()
                .eq("username",username));
    }

    @Override
    public List<ViewRole> findRolesByUsername(String username) {
        return userMapper.findRolesByUsername(username);
    }

    @Override
    public List<ViewPerms> findPermsByRoleId(String name) {
        return userMapper.findPermsByRoleId(name);
    }
}