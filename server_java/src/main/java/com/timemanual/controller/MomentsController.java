package com.timemanual.controller;


import com.timemanual.entity.Moments;
import com.timemanual.entity.ReqResult;
import com.timemanual.service.MomentsService;
import com.timemanual.vo.PaginationVo;
import com.timemanual.vo.PageParamVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/moments")
@Slf4j
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

    // http://localhost:8081/moments/query
    @RequestMapping("/query")
    public ReqResult<PaginationVo> queryMoments(@RequestBody PageParamVo pageParamVo){
        PaginationVo paginationVo = momentsService.queryMoments(pageParamVo.getCurrentPage(), pageParamVo.getPageSize());
        return new ReqResult<>(paginationVo);
    }
}
