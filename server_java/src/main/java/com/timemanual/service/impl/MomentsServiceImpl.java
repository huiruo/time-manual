package com.timemanual.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.timemanual.dao.MomentsDao;
import com.timemanual.entity.Moments;
import com.timemanual.service.MomentsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@Slf4j
public class MomentsServiceImpl  extends ServiceImpl<MomentsDao, Moments> implements MomentsService {
}
