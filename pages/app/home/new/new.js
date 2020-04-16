// pages/home/new/new.js
//新建规则
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
    * 页面的初始数据
    */
  data: {
    msgList: [{
      type: 1,
      msg: "I can help you make new rules!",
      key: (new Date()).valueOf
    }],
    userName: "",
    avatarUrl: "",
    scrolltop: '',
    searchinput: ""
  },

  
  created:function(){
    console.log("created");
  },
  attached: function () {  
    this.getUser()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight-92
        });
      }
    });},
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
  /**
   * 获取用户信息
   */
  getUser: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },
  /**
   * 判断发送信息是否为空
   */
  isEmpty: function (e) {
    if (e.length === 0) {
      return false
    } else {
      return true
    }
  },
  //点击发送
  send: function (e) {
    var msg = e.detail.value.msg
    this.setData({
      searchinput: '',
    })
    if (!this.isEmpty(msg)) {
      wx.showToast({
        title: 'please say something~',
        icon: 'none'
      })
      return
    }
    var msgList = this.data.msgList
    msgList.push({
      type: 0,
      msg: msg,
      key: (new Date()).valueOf
    })
    var charlenght = msgList.length;
    this.setData({
      msgList: msgList,
      scrolltop: "scroll" + charlenght,
    })
    this.getReply(msg)
  },
  //回复消息
  editorMsg: function (data, msgList, charlenght) {

    msgList.push({
      type: 1,
      msg: "hello",
      key: (new Date()).valueOf
    })
    console.log(data)
    this.setData({
      msgList: msgList,
      scrolltop: "scroll" + msgList.length,
    })




  },
  //将收到的信息发送给服务器并得到回答
  getReply: function (sendMsg) {
    var that = this
    var timestamp = new Date().getTime()

    wx.request({
      url: 'https://a1.cnblogs.com/group/T2',
      method: "get",
      data: {
        timestamp: timestamp
      },
      header: {
        header: { 'content-type': 'application/json' },
      },
      success: function (res) {
        console.log(res)
        var msgList = that.data.msgList
        var charlenght = 0
        that.editorMsg(res.data, msgList, charlenght)
        // that.setData({
        //   msgList: msgList,
        // })
      },
      fail: function (res) {
        var msgList = that.data.msgList
        msgList.push({
          type: 1,
          msg: "error!",
          key: (new Date()).valueOf
        })
        that.setData({

        })
      }
    })
  }
  }
})
