package com.timemanual.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.timemanual.dao.ArticleDao;
import com.timemanual.entity.Article;
import com.timemanual.service.ArticleService;
import com.timemanual.vo.PaginationVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class ArticleServiceImpl extends ServiceImpl<ArticleDao, Article> implements ArticleService {

    @Autowired
    ArticleDao articleDao;

    @Override
    public PaginationVo queryArticle(Integer currentPage, Integer pageSize) {
        Page page = new Page(currentPage, pageSize);
        PaginationVo paginationVo = new PaginationVo();
        QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("created_time");
        IPage<Article> iPage = articleDao.selectPage(page, queryWrapper);

        paginationVo.setCurrent(currentPage);
        paginationVo.setSize(pageSize);
        paginationVo.setTotal(iPage.getTotal());
        paginationVo.setData(iPage.getRecords());

        return paginationVo;
    }
}
