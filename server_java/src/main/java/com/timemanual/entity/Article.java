package com.timemanual.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName(value = "article")
public class Article implements Serializable {
    private Integer id;
    private String title;
    private String content;
    private String tag;
    private Date update_time;
    private Date created_time;
}
