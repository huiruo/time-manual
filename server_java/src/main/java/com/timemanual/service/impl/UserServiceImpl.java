package com.timemanual.service.impl;

import com.timemanual.entity.User;
import com.timemanual.mapper.UserMapper;
import com.timemanual.service.UserService;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
// （注意：在UserServiceImpl类，必须加上@Service注解，否则会报错 Field userService in com.liyh.mybatisplus.controller.UserController required）
@Service
@Transactional
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}