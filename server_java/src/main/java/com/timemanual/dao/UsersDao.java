package com.timemanual.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timemanual.entity.Users;

public interface UsersDao extends BaseMapper<Users> {
    //查询用户
    Users findByAccount(String account);
    //注册
    void register(Users user);
}
