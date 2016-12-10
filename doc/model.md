## 数据库设计
### 1. 用户表结构

> 表名称：user

| 字段		 |   数据类型  | 	字段含义 	  |	特殊      |
| :------: |  :------: | 	:------: 	  | :------: |
| id 		 | integer 	| 	Primary key |  自增     |
| name		 | string	   | 	用户名 		  |  not null |
| password | string	   | 	密码		  |  not null |
| createdAt| datetime	| 	创建时间 	  |  not null |
| updatedAt| datetime	 | 	更新时间 	  |  not null |


### 2. 导航分类

> 表名称：navigation


| 字段		 |   数据类型  | 	字段含义 	  |	特殊      |
| :------: |  :------: | 	:------: 	  | :------:  |
| id 		 | integer 	| 	Primary key |  自增      |
| name		 | string	   | 	导航名称	  |  not null |
| createdAt| datetime	| 	创建时间 	  |  not null |
| updatedAt| datetime	 | 	更新时间 	  |  not null |

### 3. 二级菜单分类

> 表名称 classify

| 字段		 |   数据类型  | 	字段含义 	  |	特殊      |
| :------: |  :------: | 	:------: 	  | :------:  |
| id 		 | integer 	| 	Primary key |  自增      |
| name		 | string	   | 	菜单名字     |  not null |
| nav_id   | integer	| 	Foreign key |  not null |
| createdAt| datetime	| 	创建时间 	  |  not null |
| updatedAt| datetime	| 	更新时间 	  |  not null |


### 3. 文章表

> 表名称 articles

| 字段		 |   数据类型  | 	字段含义 	 |	特殊      |
| :------: |  :------: | 	:------: 	 | :------:  |
| id 		 | integer 	| 	Primary key|  自增      |
| title	 | string	   | 	标题       |  not null |
| content   | integer	| 	内容	    |  not null |
| classify_id| integer	| 	Foreign key|  not null |
| createdAt| datetime	| 	创建时间 	 |  not null |
| updatedAt| datetime	 | 	更新时间 	 |  not null |