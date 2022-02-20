

## 1.根据id删除
```
  /**
     * 根据id删除
     * @param id
     * @return sum
     */
    @RequestMapping("deleteById")
    @ResponseBody
    public int deleteById(long id){
        int sum = userMapper.deleteById(id);
        return sum;
    }


    控制台打印sql = DELETE FROM user WHERE id=1260510510135164930
```

## 根据id批量删除
```
/**
 * 根据id批量删除
 * @param ids
 * @return sum
 */
@RequestMapping("deleteBatchIds")
@ResponseBody
public int deleteBatchIds(@RequestParam  List<String> ids){
    int sum = userMapper.deleteBatchIds(ids);
    return sum;
}



访问实例:http://localhost:8888/deleteBatchIds?ids=1260601936403582978,1260601938051944449,1260601939255709698
用list进行封装,多个id用逗号隔开即可
控制台打印sql = DELETE FROM user WHERE id IN (1260601936403582978,1260601938051944449 ,1260601939255709698)
```

## 3.根据条件查询删除
```
/**
 * 简单的条件查询删除 map封装
 */
@RequestMapping("deleteCondition")
@ResponseBody
public int deleteCondition(User user){
    HashMap<String,Object> map = new HashMap<>();
    map.put("name",user.getName());
    map.put("email",user.getEmail());

    int sum = userMapper.deleteByMap(map);
    return sum;
}

控制台打印sql = DELETE FROM user WHERE name = xxx AND email = blog.com
```

## 4.逻辑删除
物理删除：真实删除，将对应数据从数据库中删除，之后查询不到此条被删除数据
逻辑删除：假删除，将对应数据中代表是否被删除字段状态修改为“被删除状态”，之后在数据库中仍旧能看到此条数据记录

（1）数据库中添加 deleted字段

```
（2）实体类添加deleted 字段
并加上@TableLogic注解 和 @TableField(fill = FieldFill.INSERT) 注解 @TableLogic这个是做逻辑删除注解


@TableLogic//逻辑删除注解
@TableField(fill = FieldFill.INSERT) //自动填充,新增数据时生效
private Integer deleted;
```

（3）在MyMetaObjectHandler实现implements MetaObjectHandler类元对象处理器接口添加deleted的insert默认值
```
@Override
public void insertFill(MetaObject metaObject) {
    ......
    //添加上这段代码,设置添加数据时deleted自动默认值为1
    this.setFieldValByName("deleted", 0, metaObject);
}
```

（4）application.properties 加入配置

此为默认值，如果你的默认值和mp默认的一样,该配置可无

mybatis-plus.global-config.db-config.logic-delete-value=1
mybatis-plus.global-config.db-config.logic-not-delete-value=o

```
配置说明
1代表正常数据 0代表已逻辑删除,添加了逻辑删除框架以后每次查询会带上where deleted = 0这个条件进行查询,无法查询出where deleted = 1的,可以使用mybatis自己写语句去查
```