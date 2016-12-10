### backend API设计
---

### 1. GET规范

* 请求规范

	```javascript
	req = {
		current: 1,
		pageSize: 10,
		isPage: 1
		children: 0 
	}
	```
* 响应规范

	```javascript
	resp = {
		code: 0,
		message: string,
		content: {
			total: 1,
			current: 1,
			pageSize: 10,
			data: [] || {}
		}
	}
	```
	
### 2. POST规范
* 请求规范

	```
	body = JSON.stringify()
	
	```
* 响应规范

	```javascript
	resp = {
		code,
		message: 'ok',
		content: number
	}
	
	```
	
### 3. PUT规范
* 请求规范

	```
	ulr = url/:id
	body = JSON.stringify()
	
	```
* 响应规范

	```javascript
	resp = {
		code,
		message: 'ok'
	}
	```
	
### 4.DELETE规范

* 请求规范

	```
	url = url/:id	
	```

* 响应规范

	```javascript
	resp = {
		code,
		message: 'ok'
	}
	```	
	
### 5. 相应状态码
```
code 解析码

{
    code: 0, //正常
    code: 1, //API 异常
    code: 2, //参数错误
}
```

###6. API 请求路径
	
*  navgation 导航

	```javascript
	// 获取所有
	{
		method: GET,
		endpoint: '/navgations'
		response: {}
	}
	
	// 获取单个
	{
		method: GET,
		endpoint: '/navgation/:id'
		response: {}
	}
	
	// 更新数据
	{
		method: PUT,
		endpoint: '/navgation/:id'
		response: {}
	}
	```
	
*  classify 分类

	```javascript
	// 获取所有
	{
		method: GET,
		endpoint: '/classifys'
		response: {}
	}
	
	// 获取单个
	{
		method: GET,
		endpoint: '/classify/:id'
		response: {}
	}
	// 插入数据
	{
		method: POST,
		endpoint: '/classify'
		response: {}
	}
	
	// 更新某个
	{
		method: PUT,
		endpoint: '/classify/:id'
		response: {}
	}
	// 删除数据
	{
		method: DELETE,
		endpoint: '/classify/:id'
		response: {}
	}
	```
	
*  aritle 分类

	```javascript
	// 获取所有
	{
		method: GET,
		endpoint: '/aritles'
		response: {}
	}
	
	// 获取单个
	{
		method: GET,
		endpoint: '/aritle/:id'
		response: {}
	}
	// 插入数据
	{
		method: POST,
		endpoint: '/aritle'
		response: {}
	}
	
	// 更新某个
	{
		method: PUT,
		endpoint: '/aritle/:id'
		response: {}
	}
	// 删除数据
	{
		method: DELETE,
		endpoint: '/aritle/:id'
		response: {}
	}
	```
	
*  carousel 轮播

	```javascript
	// 获取所有
	{
		method: GET,
		endpoint: '/carousels'
		response: {}
	}
	
	// 获取单个
	{
		method: GET,
		endpoint: '/carousel/:id'
		response: {}
	}
	// 插入数据
	{
		method: POST,
		endpoint: '/carousel'
		response: {}
	}
	
	// 更新某个
	{
		method: PUT,
		endpoint: '/carousel/:id'
		response: {}
	}
	// 删除数据
	{
		method: DELETE,
		endpoint: '/carousel/:id'
		response: {}
	}
	```
* 上传文件

```javascript
	{
		method: POST
		endpoint: '/upload',
		body: {
			multipart/form-data
		},
		response: { "返回文件服务的URL"}
	}
```
