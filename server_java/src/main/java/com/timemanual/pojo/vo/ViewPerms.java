package com.timemanual.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
//权限集合
public class ViewPerms implements Serializable {
    private String rName;
    private String pName;
    private String url;
}
