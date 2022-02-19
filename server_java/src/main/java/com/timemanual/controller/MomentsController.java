package com.timemanual.controller;


import com.timemanual.entity.Moments;
import com.timemanual.service.MomentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/moments")
public class MomentsController {
    @Autowired
    MomentsService momentsService;

    /**
     * 查询所有信息
     * @return
     */
    // http://localhost:8081/moments/getMomentsList
    @RequestMapping("/getMomentsList")
    public List<Moments> getMomentsList(){
        return momentsService.list();
    }
}
