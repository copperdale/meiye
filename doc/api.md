登录界面.html
品项管理.html
套餐.html
单品.html


## 登录：
### 上行
~~~JSON
{
"userName":"admin",	//用户名	
"password":"123456",	//密码
"identifyCode":"0000",	//验证码
"source":"web"//请求类型，web – 后台管理系统; app—门店APP; wechat—微信小程序
}
~~~
### 下行
> responseHeader:token Bearer  eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzM1NzA4MzMsInN1YiI6ImFkbWluIiwiY3JlYXRlZCI6MTUzMzU2OTAzMzY2M30.pUMroy3CaDIm9XI2SqsnfgvZ3gN0bjC760srRlxirwnoaNXGzeCQETlJyeCt69PYhgH5sP5MsdqqcyRz3HwLG

~~~json
{
    "statusCode": 200, //请求状态, 200-成功;403—授权失败;404—资源不存在;500—内部服务器错误
    "message": "用不存在", //业务消息
    "messageType": "error", // 消息类型 error—错误; warning –警告; info—提示; ignore—默认值，护绿message的内容
    "data": {
        "user": {
            "authorities": [
                {
                    "authority": "ROLE_Manager"
                },
                {
                    "authority": "ROLE_Skiller"
                }
            ],
                "username": "admin"
        },
        "token": "Bearer;eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyQm8iOnsiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfTWFuYWdlciJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9Ta2lsbGVyIn1dLCJkZXRhaWxzIjpudWxsLCJhdXRoZW50aWNhdGVkIjp0cnVlLCJwcmluY2lwYWwiOnsiaWQiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6bnVsbCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfTWFuYWdlciJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9Ta2lsbGVyIn1dLCJhY2NvdW50Tm9uRXhwaXJlZCI6ZmFsc2UsImFjY291bnROb25Mb2NrZWQiOmZhbHNlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOmZhbHNlLCJlbmFibGVkIjpmYWxzZSwiY3JlYXRvck5hbWUiOm51bGwsImNyZWF0b3JJZCI6bnVsbCwidXBkYXRvck5hbWUiOm51bGwsInVwZGF0b3JJZCI6bnVsbCwic2VydmVyQ3JlYXRlVGltZSI6bnVsbCwic2VydmVyVXBkYXRlVGltZSI6bnVsbCwic3RhdHVzRmxhZyI6bnVsbH0sImNyZWRlbnRpYWxzIjpudWxsLCJuYW1lIjoiYWRtaW4ifSwic3ViIjoiYWRtaW4iLCJleHAiOjE1MzQxNjg3Mjl9.4Vzp_a58iaySOAL2nWE1dzn9ECEs5tYvGcRBzhP_N5eFwZKeForbxauPTVuY7d8G90OTBSCTJDem5ZU1O3JwYg"
    }
}
~~~
## 查询分类
> 上行请求方式:POST / GET
### 上行(requestHeader里的token是登录接口返回的token值)
> requestHeader:token Bearer  eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzM1NzA4MzMsInN1YiI6ImFkbWluIiwiY3JlYXRlZCI6MTUzMzU2OTAzMzY2M30.pUMroy3CaDIm9XI2SqsnfgvZ3gN0bjC760srRlxirwnoaNXGzeCQETlJyeCt69PYhgH5sP5MsdqqcyRz3HwLG

### 下行
~~~json
{
    "statusCode"": 200, //请求状态, 200-成功;403—授权失败;404—资源不存在;500—内部服务器错误
    "message"": "", //业务消息
    "messageType"": "", // 消息类型 error—错误; warning –警告; info—提示; ignore—默认值，忽略message的内容
    "data"": {
        "brandTypes"": [{
            "id"": ""1"",	//分类ID
            "parentId": "", //创建二级分类时，需要带入一级分类的id
            "typeCode": "1000", //分类编码 
            "name": "护肤类", //分类名称
            "subBrandTypes"": [{
                "id"": ""2"",	//分类ID
                "parentId": "1", //创建二级分类时，需要带入一级分类的id
                "typeCode": "1000", //分类编码 
                "name": "护肤类", //分类名称
            }]
        }]
    }
}
~~~
## 新增/编辑分类（品项）
> 上行请求方式:POST
### 上行(requestHeader里的token是登录接口返回的token值)
> requestHeader:token Bearer  eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzM1NzA4MzMsInN1YiI6ImFkbWluIiwiY3JlYXRlZCI6MTUzMzU2OTAzMzY2M30.pUMroy3CaDIm9XI2SqsnfgvZ3gN0bjC760srRlxirwnoaNXGzeCQETlJyeCt69PYhgH5sP5MsdqqcyRz3HwLG
~~~json
{
    "id": "2", //品项id，编辑和停用时需要
    "parentId": "1", //创建二级分类时，需要带入一级分类的id
    "typeCode": "1000", //分类编码 
    "name": "护肤类", //分类名称
}
~~~
### 下行：
~~~json
{
    "statusCode": 200, //请求状态, 200-成功;403—授权失败;404—资源不存在;500—内部服务器错误
    "message": "用不存在", //业务消息
    "messageType": "error", // 消息类型 error—错误; warning –警告; info—提示; ignore—默认值，忽略message的内容
    "data": {
        "brandType": {
            "id": "2",	//分类ID
            "parentId": "1", //创建二级分类时，需要带入一级分类的id
            "typeCode": "1000", //分类编码 
            "name": "护肤类", //分类名称
        }
    }
}
~~~
## 停用分类
> 上行请求方式:Get URL包含id
### 上行(requestHeader里的token是登录接口返回的token值)
> requestHeader:token Bearer  eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzM1NzA4MzMsInN1YiI6ImFkbWluIiwiY3JlYXRlZCI6MTUzMzU2OTAzMzY2M30.pUMroy3CaDIm9XI2SqsnfgvZ3gN0bjC760srRlxirwnoaNXGzeCQETlJyeCt69PYhgH5sP5MsdqqcyRz3HwLG
### 下行：
~~~json
{
    "statusCode": 200, //请求状态, 200-成功;403—授权失败;404—资源不存在;500—内部服务器错误
    "message":"用不存在", //业务消息
    "messageType":"error", // 消息类型 error—错误; warning –警告; info—提示; ignore—默认值，护绿message的内容
    "data":{}
}
~~~