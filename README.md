# limuctf开发计划(本项目尚未完成，功能等尚未全部实现 || 开发4天了，正在努力)

## 开发环境

> golang 1.17.5
>
> gin
>
> redis
>
> mysql
>
> auxi前端框架
>
> jquery
>
> （计划使用nginx做负载均衡）
>
> （计划使用docker-compose一键部署）



## 存在问题（未解决）

- [x] 管理用户鉴权
- [x] 定时清理容器
- [x] 用户容器冲突
- [ ] 部分js回调问题
- [ ] 用户邮箱注册验证
- [ ] flag爆破检验
- [ ] 排行榜
- [ ] 监控面板
- [ ] docker部署问题
- [ ] 管理用户创建问题


## 特色功能

> 多题目靶机
>
> 随机flag及指定flag动态下发（flag值位于ctf_flag环境变量中）
>
> docker容器部署，即开即用



#### 用户

> 首页
>
> 用户注册，登录，用户信息
>
> 用户flag提交，wp提交
>
> 公告
>
> 用户排行榜


#### 后台管理

> 首页管理
>
> 监控面板
>
> 用户管理
>
> 题目管理
>
> 公告管理
>
> 主机管理
>
> 容器管理
>
> webhook（计划）

#### 作者及联系方式

如果在使用过程中出现问题，欢迎联系QQ：1600623321 或者 Mail：1600623321@qq.com.



#### 协议与许可
limu.ltd

本项目使用 APACHE LICENSE VERSION 2.0 进行许可。

若您使用 limuctf 及其相关软件、文档，即表示您已充分阅读、理解并同意接受本协议。

我们接受并允许各大高校、安全团队、技术爱好者使用 limuctf 作为比赛训练平台或举办内部训练赛。

不允许在未经许可授权的情况下，使用 limuctf 的代码、文档、相关软件等开展商业培训、商业比赛、产品销售等任何营利性行为。禁止恶意更换、去除 limuctf 及其相关软件、文档版权信息。

一经发现，严肃处理。limu.ltd 保留追究其法律责任的权力。