// pages/user/user.js
const cfg = require('../../utils/config.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [], // 用户列表
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
        this.getList();
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
        this.getList();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
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

    // 删除用户
    delUser(e) {
        let that = this;


        wx.showModal({
            title: '警告',
            content: '确定删除此用户？',
            confirmText: "删除",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    wx.request({
                        url: cfg.BaseURL + '/v1/user?id=' + e.currentTarget.dataset.id,
                        method: 'DELETE',
                        success: function (res) {
                            if (res.statusCode != 200) {
                                wx.showToast({
                                    title: res.data || '删除用户失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            } else {
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.getList();
                            }
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: '删除用户请求错误',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    })
                } else {
                }
            }
        });


    },

    // 添加用户
    addUser(e) {
        // 跳转到登录页
        wx.navigateTo({
            url: '/pages/add/add'
        })
    },

    // 获取列表
    getList() {
        let that = this;
        wx.request({
            url: cfg.BaseURL + '/v1/user',
            success: function (res) {
                if (res.statusCode != 200) {
                    wx.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                } else {
                    res.data.forEach(val => {
                        val.face_url = cfg.BaseURL + val.face_url;
                    });
                    that.setData({
                        list: res.data
                    });
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '请求用户列表错误',
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    }
})