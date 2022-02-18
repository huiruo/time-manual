package com.timemanual.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.timemanual.entity.Users;

public interface UsersService extends IService<Users> {
    Users login(Users users);
    void register(Users users);
}
