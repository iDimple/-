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
      msg: "可以随便问我问题哦!",
      key: (new Date()).valueOf
    }],
    userName: "",
    avatarUrl: "",
    scrolltop: '',
    searchinput: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser()
    var that = this
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

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
        title: '不能发送空信息',
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
    msgList = []
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
      url: 'http://202.120.40.28:4460/$/stats/ifttt',
      method: "get",
      data: {
        timestamp: timestamp
      },
      header: {
        header: { 'content-type': 'application/json' },
      },
      success: function (res) {
        console.log(res)
        var msgList = that.cookies
        var charlenght = 0
        that.editorMsg(res.data, msgList, charlenght)
        that.setData({
          msgList: msgList,
        })
      },
      fail: function (res) {
        var msgList = that.data.msgList
        msgList.push({
          type: 1,
          msg: "出错了!",
          key: (new Date()).valueOf
        })
        that.setData({

        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
