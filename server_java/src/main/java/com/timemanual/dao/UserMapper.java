package com.timemanual.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timemanual.pojo.User;
import com.timemanual.pojo.vo.ViewPerms;
import com.timemanual.pojo.vo.ViewRole;

import java.util.List;

public interface UserMapper extends BaseMapper<User> {

    //根据用户名查询所有角色
    List<ViewRole> findRolesByUsername(String username);

    //根据角色id查询权限集合
    List<ViewPerms> findPermsByRoleId(String name);
}