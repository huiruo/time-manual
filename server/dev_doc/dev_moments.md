# databases
```
time-manual
```

## moments 结构设计
```
id
content
share_url
img_url
time
```

```sql
CREATE TABLE `moments`  (
  `id` bigint(60) NOT NULL,
  `content` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `share_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` bigint(60) NULL DEFAULT NULL,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```

```
MySQL提供四种TEXT类型：TINYTEXT，TEXT，MEDIUMTEXT和LONGTEXT。

参考：
https://www.yiibai.com/mysql/text.html

TINYTEXT - 1个字节(255个字符)
需要少于255个字符的列应该使用TINYTEXT类型，长度不一致，不需要排序，例如：博文摘录，文章摘要等。
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    summary TINYTEXT
);

TEXT - 64KB(65,535个字符)
TEXT数据类型最多可容纳64KB，相当于65535(2 ^ 16 - 1)个字符。 TEXT还需要2字节开销。

MEDIUMTEXT - 16MB(16,777,215个字符)

LONGTEXT - 4GB(4,294,967,295个字符)
LONGTEXT可以存储高达4GB的文本数据，这是非常巨大的。 它需要4字节开销
```

## 搭建server
完成