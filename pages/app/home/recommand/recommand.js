// pages/home/recommand/recommand.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '',
    res: [{
    id:"1",
    name:"email me missed phone calls",
    triggerchannel:"android phone",
    triggerimg:"https://assets.ifttt.com/images/channels/405156688/icons/monochrome_large.png",
    trigger:"miss_a_phone_call",
    action:"Send me an email",
    actionimg:"https://assets.ifttt.com/images/channels/6/icons/monochrome_large.png",
    actionchannel:"email"
    },{
      id:"2",
      name:"Get an email with your current location",
      triggerchannel:"android phone",
      trigger:"miss_a_phone_call",
      triggerimg:"https://assets.ifttt.com/images/channels/6/icons/monochrome_large.png",
      actionimg:"https://assets.ifttt.com/images/channels/405156688/icons/monochrome_large.png",
      actionchannel:"Send me an email",
      action:"email"
      },{
        id:"3",
        name:"Get an email when there's breaking NASA news",
        triggerchannel:"android phone",
        trigger:"miss_a_phone_call",
        triggerimg:"https://assets.ifttt.com/images/channels/6/icons/monochrome_large.png",
      actionimg:"https://assets.ifttt.com/images/channels/1829340444/icons/monochrome_large.png",
        actionchannel:"Send me an email",
        action:"email"
        },{
          id:"4",
          name:"Get an email with the latest IFTTT updates",
          triggerchannel:"android phone",
          trigger:"miss_a_phone_call",
          actionchannel:"Send me an email",
          action:"email",
          triggerimg:"https://assets.ifttt.com/images/channels/6/icons/monochrome_large.png",
          actionimg:"https://assets.ifttt.com/images/channels/1240189002/icons/monochrome_large.png"
          },{
            id:"5",
            name:"SMS to Email",
            triggerchannel:"android phone",
            trigger:"miss_a_phone_call",
            actionchannel:"Send me an email",
            action:"email",
            triggerimg:"https://assets.ifttt.com/images/channels/1322033008/icons/monochrome_large.png",
          actionimg:"https://assets.ifttt.com/images/channels/33/icons/monochrome_large.png"
            }]
  },
  created:function(){
    console.log("created");
  },
  attached: function () {  
    console.log("attached");
    wx.getSystemInfo({
    success: (res) => {
      console.log(res.windowHeight);
      this.setData({
        //92是下面tab选项的高度
        height: res.windowHeight-92
      })
    }
  })},
  ready:function(){
    console.log("ready");
  },
  moved: function () {console.log("moved"); },
  detached: function () { console.log("detached");},
  error:function(){
    console.log("error");
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    connect(){
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: 'Connected!',
        icon: 'success',
        duration: 1000
      });
      return false;
    },

    lower() {
      console.log("haha");
      var result = this.data.res;
  
      var resArr = [];
      for (let i = 0; i < 20; i++) {
        var temp ={
          id:"mpWkinCL",
          name:"email me missed phone calls",
          triggerchannel:"android phone",
          trigger:"miss_a_phone_call",
          actionchannel:"Send me an email",
          action:"email"
          };
        resArr.push(temp);
      };
      var cont = result.concat(resArr);
      console.log(resArr.length);
      if (cont.length >= 20) {
        wx.showToast({ //如果全部加载完成了也弹一个框
          title: 'That"s all~',
          icon: 'success',
          duration: 1000
        });
        return false;
      } else {
        wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
          title: 'Loading~',
          icon: 'loading',
        });
        setTimeout(() => {
          this.setData({
            res: cont
          });
          wx.hideLoading();
        }, 1500)
      }
    },
 

  }
})
