# 人脸识别登录微信小程序

本示例程序实现了，添加用户、删除用户、用户列表、和用户登录功能。

服务端：[https://github.com/shiguanghuxian/face-login](https://github.com/shiguanghuxian/face-login)

## 建议使用流程

人脸识别登录建议流程：

1. 用户登录
2. 用户设置开启人脸登录，开启时需要绑定微信openid，因为如果不绑定微信openid可能出现用图片非法登录，绑定openid后意味着用户需要先登录微信再人脸识别登录小程序，这样安全度比较高。
3. 登录界面给出两个登录选项，人脸登录或用户名密码，如果使用人脸识别，服务端需要判断openid是否是绑定的用户微信openid，切已经开启人脸登录(可以是后台管理功能也可以是用户自己控制)。



微信小程序demo
![](wxapp.jpg)