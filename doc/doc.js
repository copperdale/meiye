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