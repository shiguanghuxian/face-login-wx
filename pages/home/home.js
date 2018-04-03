// pages/home/home.js
const cfg = require('../../utils/config.js');
const moment = require('../../utils/moment.min.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCamera: false,
        src: '',
        userinfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.setData({
            isCamera: false,
            userinfo: null
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            isCamera: true
        });
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

    // 登录
    login(e) {
        wx.showLoading({
            title: '正在登录',
        })
        this.takePhoto();
    },

    // 请求登录
    requestLogin() {
        let that = this;
        wx.uploadFile({
            url: cfg.BaseURL + '/v1/login', //仅为示例，非真实的接口地址
            filePath: that.data.src,
            name: 'file',
            success: function (res) {
                console.log(res);
                var data = JSON.parse(res.data);
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    });
                    data.create_date = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss');
                    data.face_url = cfg.BaseURL + data.face_url;
                    that.setData({
                        userinfo: data
                    });
                } else {
                    wx.showToast({
                        title: data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            },
            fail: function () {
                wx.showToast({
                    title: '登录请求错误',
                    icon: 'none',
                    duration: 2000
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },

    // 重新登录
    relogin() {
        this.setData({
            isCamera: false
        })
    },

    // 拍照
    takePhoto() {
        let that = this;
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                that.setData({
                    src: res.tempImagePath,
                    isCamera: true
                })
                that.requestLogin();
            },
            fail: function (res) {
                wx.showToast({
                    title: '拍照错误',
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    },
    error(e) {
        wx.showToast({
            title: '请允许小程序使用摄像头',
            icon: 'none',
            duration: 2000
        });
    }


})