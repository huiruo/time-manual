package com.timemanual.service;

import com.timemanual.pojo.User;
import com.timemanual.pojo.vo.ViewPerms;
import com.timemanual.pojo.vo.ViewRole;

import java.util.List;

public interface UserService {
    public boolean register(User user);

    public User findByUsername(String username);

    List<ViewRole> findRolesByUsername(String username);

    List<ViewPerms> findPermsByRoleId(String name);
}
