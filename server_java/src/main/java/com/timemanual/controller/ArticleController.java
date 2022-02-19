package com.timemanual.controller;

import com.timemanual.entity.Article;
import com.timemanual.entity.ReqResult;
import com.timemanual.service.ArticleService;
import com.timemanual.vo.PaginationVo;
import com.timemanual.vo.PageParamVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    /**
     * 查询所有信息
     * @return
     */
    // http://localhost:8081/article/getArticleList
    @RequestMapping("/getArticleList")
    public List<Article> getArticleList(){
        return articleService.list();
    }

    @RequestMapping("/query")
    public ReqResult<PaginationVo> queryMomonts(@RequestBody PageParamVo pageParamVo){

        PaginationVo paginationVo = articleService.queryArticle(pageParamVo.getCurrentPage(), pageParamVo.getPageSize());
        return new ReqResult<>(paginationVo);
    }
}
