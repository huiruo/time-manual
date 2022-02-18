package com.timemanual.controller;

import com.timemanual.entity.ReqResult;
import com.timemanual.entity.Users;
import com.timemanual.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    UsersService usersService;

    /**
     * 根据用户id查询用户信息
     * @param userId
     * @return
     */
    // http://localhost:8081/users/getInfo?userId=1
    @RequestMapping("/getInfo")
    public Users getInfo(String userId){
        Users users = usersService.getById(userId);
        System.out.println(users.getAccount());
        return users;
    }

    /**
     * 查询所有信息
     * @return
     */
    // http://localhost:8081/users/getUserList
    @RequestMapping("/getUserList")
    public List<Users> getUserList(){
        return usersService.list();
    }

    /**
     * 新增用户信息
     */
    // http://localhost:8081/users/saveInfo
    @RequestMapping("/saveInfo")
    public void saveInfo(){
        Users users = new Users();
        users.setAccount("Account_test");
        users.setPassword("apple");
        users.setNickname("nickname");
        usersService.save(users);
    }

    /*
    * 登录
    * */
    @PostMapping("/login")
    // public List<Users> login(@RequestBody Users user, HttpServletRequest request){
    public ReqResult<Users> login(@RequestBody Users user, HttpServletRequest request){
        Users users = new Users();
        users.setAccount(user.getAccount());
        users.setPassword(user.getPassword());
        try{
            Users userDb = usersService.login(users);
            return new ReqResult<>(userDb);
        }catch (Exception e){
            return new ReqResult<>(4, e.getMessage());
        }
    }

    /*
     * 注册
     * */
    @PostMapping("/register")
    public ReqResult<Users> register(@RequestBody Users user){
        Users users = new Users();
        users.setAccount(user.getAccount());
        users.setNickname(user.getNickname());
        users.setPassword(user.getPassword());
        try{
            Users userDb = usersService.register(users);
            return new ReqResult<>(userDb);
        }catch (Exception e){
            return new ReqResult<>(4, e.getMessage());
        }
    }
}
