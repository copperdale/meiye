{ 
  'type': 1,//1套餐,0单品 
  'dishTypeId': 1,//品项ID 
  'name':'美容套餐一',//套餐名字 
  'dishCode':'SKU0002',//套餐商品编码 
  'marketPrice':15.2,//价格 
  'unitName':'套',//单位 
  'dishQty':100,//库存 
  'dishSetmealGroupBos': [ 
    { 
      'name':'经济套餐', 
      'orderMin':0, 
      'orderMax':5, 
      'dishSetmealBos':[
        { 
          'childDishId':11,//商品ID 
          'price':122, 'isReplace':1,// 1必选, 2非必选 
          'isDefault':1,// 1默认选中，2默认不选 
          'isMulti':1,//1可复选，2不可以 
          'leastCellNum':1 
        }
      ] 
    }, { 
      'name':'商务套餐', 
      'orderMin':0, 
      'orderMax':5, 
      'dishSetmealBos':[
        { 
          'childDishId':11,//商品ID 
          'price':122, 
          'isReplace':1,// 1必选, 2非必选 
          'isDefault':1,// 1默认选中，2默认不选 
          'isMulti':1,//1可复选，2不可以 
          'leastCellNum':1 
        }
      ] 
    }
  ] 
}