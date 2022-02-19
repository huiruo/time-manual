package com.timemanual.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.timemanual.entity.Moments;
import com.timemanual.vo.PaginationVo;

public interface MomentsService extends IService<Moments> {
   PaginationVo queryMoments(Integer currentPage, Integer pageSize);
}
