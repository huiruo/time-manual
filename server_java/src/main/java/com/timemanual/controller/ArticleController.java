package com.timemanual.controller;

import com.timemanual.entity.Article;
import com.timemanual.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
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

}
