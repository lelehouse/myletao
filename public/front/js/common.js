mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators:false
});

var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

var tools = {
  
  getsearch:function (){
    var str = location.search;
    var str = decodeURI(str,"UTF-8");
    str = str.slice(1);
    var arr = str.split('&');
    var obj = {};
    arr.forEach(function(ele){
       var key = ele.split('=')[0];
       var value = ele.split('=')[1];
       obj[key] = value;
    });
    return obj;
  },
  getsearchkey:function (key){
    return this.getsearch()[key];
  }

};
