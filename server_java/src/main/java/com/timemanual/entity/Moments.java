package com.timemanual.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName(value = "moments")
public class Moments implements Serializable {
    private Integer id;
    private String content;
    private String share_url;
    private String img_url;
    private Date update_time;
    private Date created_time;
}
