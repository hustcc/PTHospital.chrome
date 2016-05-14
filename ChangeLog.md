# ChangeLog


## v1.1.4
1. 增加反屏蔽措施，检查提示节点的内容和位置，参考[issues/26](https://github.com/hustcc/PTHospital.chrome/issues/26)；
2. 针对“上海仁爱医院”的屏蔽做了相关措施；

## v1.1.3
1. 修改英文翻译问题；
2. 针对“上海远大心胸医院”的屏蔽做了反屏蔽措施；下面是该医院的屏蔽方法。

```js
// from http://www.yodak.net/templets/js/fkGoogle.js
function fkGoogle(){
  var arr = [];
  var result = [];
  var div = document.getElementsByTagName('div');
  for(var i = 0,len = div.length; i < len;  i++){
    if(div[i].id === undefined) continue;
    arr.push(div[i].id);
  }
  // console.log(arr)
  var ex = /(?:^(?:[A-Z]+\d{0,})+$)|(?:^(?:\d+[A-Z]{0,})+$)/;
  for(var i = 0,len = arr.length; i < len; i++){
    var str = ex.exec(arr[i]);
    if(str) result.push(str[0]);else continue;
  }
  // console.log(result);
  for(var i = 0,len = result.length; i < len; i++){
    var dom = document.getElementById(result[i]);
    dom.style.opacity = 0 ;
    dom.style.display = "none";
    // console.log(dom);
    //dom.parentNode.removeChild(dom);
  }
}
setInterval(function(){fkGoogle();},0.001);
```

## v1.1.2
1. 增加百度搜索结果的提示信息显示；

## v1.1.1
1. 修复某些网站没有描述信息的bug；

## v1.1.0
1. 增加使用网页名字和描述匹配，对于百度百科等介绍网站的页面也会进行提示；
2. 增加一些防止医院屏蔽的措施；
3. 增加莆田医院数据；

## v 1.0.8
1. 针对一些医院的屏蔽措施，加入一些防止屏蔽的代码；
2. 优化提示信息加载时间，无须等到网站加载完毕才提示；