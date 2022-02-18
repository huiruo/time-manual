package com.timemanual.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
//import com.timemanual.dao.UsersDao;
import com.timemanual.entity.Users;
import com.timemanual.mapper.UsersMapper;
import com.timemanual.service.UsersService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// （注意：在UserServiceImpl类，必须加上@Service注解，否则会报错 Field userService in com.xx.mybatisplus.controller.UserController required）
@Service
@Transactional
 public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements UsersService {
//public class UsersServiceImpl extends ServiceImpl<UsersDao, Users> implements UsersService {
    @Override
    public Users login(Users users) {
        return null;
    }

    @Override
    public void register(Users users) {

    }
}
