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




## 特色功能

> 多题目靶机
>
> 随机flag及指定flag动态下发（flag值位于ctf_flag环境变量中）
>
> docker容器部署，即开即用



## 功能实现



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



