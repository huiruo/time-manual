package com.timemanual.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.timemanual.dao.UsersDao;
import com.timemanual.entity.Users;
import com.timemanual.service.UsersService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.Resource;
import java.util.List;

// （注意：在UserServiceImpl类，必须加上@Service注解，否则会报错 Field userService in com.xx.mybatisplus.controller.UserController required）
@Service
@Transactional
public class UsersServiceImpl extends ServiceImpl<UsersDao, Users> implements UsersService {
//public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements UsersService {

    @Resource
    private UsersDao usersDao;
    @Override
    public Users login(Users users) {
       Users userDb = usersDao.findByAccount(users.getAccount());
       if (userDb != null) {
            if (userDb.getPassword().equals(users.getPassword())) {
                return userDb;
            } else {
                throw new RuntimeException("密码错误");
            }
       } else {
            throw new RuntimeException("用户名不存在");
       }
    }

    @Override
    public Users register(Users users) {
        System.out.println("register"+users);

        Users userDb = usersDao.findByAccount(users.getAccount());
        System.out.println("register2:"+userDb);
        System.out.println("register3:"+userDb.getNickname());
        if (userDb == null) {
//            if (userDb.getNickname().equals(users.getNickname())) {
//                throw new RuntimeException("昵称被使用");
//            } else {
                System.out.println("可以注册");
                return userDb;
//            }
        } else {
            System.out.println("register3:");
            throw new RuntimeException("用户名被使用");
        }
    }

    @Override
    public List<Users> findAllUser() {
       return usersDao.findAllUser();
    }

    @Override
    public Users findByAccount(String account) {
        return usersDao.findByAccount(account);
    }
}
