package com.timemanual.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.timemanual.dao.ArticleDao;
import com.timemanual.entity.Article;
import com.timemanual.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class ArticleServiceImpl extends ServiceImpl<ArticleDao, Article> implements ArticleService {
}
