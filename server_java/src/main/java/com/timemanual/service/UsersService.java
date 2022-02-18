package com.timemanual.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.timemanual.entity.Users;

import java.util.List;

public interface UsersService extends IService<Users> {
    Users login(Users users);
    Users register(Users users);
    public List<Users> findAllUser();
    //查询用户
    public Users findByAccount(String account);
}
