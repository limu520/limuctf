package controller

import (
	"fmt"
	"html/template"
	"limuctf/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

//用户管理
func User_mgr(c *gin.Context) {
	if Getsessiona(c, "user_id").(string) != "1" {
		c.Redirect(http.StatusFound, "/")
	}
	db := model.LinkDb()
	var user []model.User
	db.Find(&user)
	back_btn := `&nbsp;&nbsp;<a id="form11" class="ax-btn ax-danger">删除用户</a>&nbsp;
    <a id="form12" class="ax-btn ax-success">修改密码</a>
    <br><br>`
	data := ""
	for _, value := range user {
		data = data + fmt.Sprintf("<tr><td>%d</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%d</td></tr>", value.ID, value.Username, value.QQ, value.Sign_time.String(), value.Email, value.Stores)
		//fmt.Println(data)
	}
	broad_data1 := `<table id="train">
	<thead>
		<tr>
			<th>ID</td>
			<th>用户名</th>
			<th>QQ</td>
			<th>注册时间</th>
			<th>邮箱</th>
			<th>当前积分</th>
		</tr>
	</thead>
	<tbody>`

	form_win := `<!-- 删除用户 -->
<div class="ax-window" data-mask="true" id="user_form01">
	<form>
		<div class="ax-window-overlay"></div>
		<div class="ax-window-contain">
			<a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
			<div class="ax-window-title">删除用户</div>
			<div class="ax-break-line"></div>
			<div class="ax-window-content">
				<div class="ax-padding ax-outer-tel">

					<div class="ax-form-group">
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input">
									<div class="ax-flex-row ax-form-origin">
										<div class="ax-flex-block ax-title">请输入要删除的用户名</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input"><input id="username" name="username" type="text">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="ax-break-line"></div>
			<div class="ax-padding ax-window-operate">
				<div class="ax-row">
					<div class="ax-btns">
						<a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
						<a id="user_form_del" class="ax-btn ax-primary">确定</a>
					</div>
				</div>
			</div>

		</div>
	</form>
</div>



<!-- 更改密码 -->
<div class="ax-window" data-mask="true" id="user_form02">
	<form>
		<div class="ax-window-overlay"></div>
		<div class="ax-window-contain">
			<a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
			<div class="ax-window-title">更改用户密码</div>
			<div class="ax-break-line"></div>
			<div class="ax-window-content">
				<div class="ax-padding ax-outer-tel">

					<div class="ax-form-group">
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input">
									<div class="ax-flex-row ax-form-origin">
										<div class="ax-flex-block ax-title">请输入要更改的用户名:</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input"><input id="usernames" name="username" type="text">
								</div>
							</div>
						</div>
					</div>

					<div class="ax-form-group">
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input">
									<div class="ax-flex-row ax-form-origin">
										<div class="ax-flex-block ax-title">请输入要修改成的密码:</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input"><input id="passwd" name="passwd" type="text">
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>

			<div class="ax-break-line"></div>
			<div class="ax-padding ax-window-operate">
				<div class="ax-row">
					<div class="ax-btns">
						<a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
						<a id="user_form_change" class="ax-btn ax-primary">确定</a>
					</div>
				</div>
			</div>

		</div>
	</form>
</div>`

	js_data := `//删除用户
	$("#form11").click(function () {
		$("#user_form01").addClass("ax-window-show");
	});
	$("#user_form_del").click(function () {
		var username = document.getElementById('username').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/deluser', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("username=" + username);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("用户删除成功")
				}
			}
		}
		return false;
	});

	//修改密码
	$("#form12").click(function () {
		$("#user_form02").addClass("ax-window-show");
	});
	$("#user_form_change").click(function () {
		var username = document.getElementById('usernames').value
		var password = document.getElementById('passwd').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/chpasswd', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("username=" + username + "&password=" + password);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("用户密码更改成功")
				}
			}
		}
		return false;
	});`
	broad_data2 := `</tbody>`
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "backgroud.html", gin.H{
		"broad_data":  template.HTML(back_btn + broad_data1 + data + broad_data2),
		"hidden_html": template.HTML(form_win),
		"js_data":     template.JS(js_data),
	})
}

//公告管理
func Ann_mgr(c *gin.Context) {
	if Getsessiona(c, "user_id").(string) != "1" {
		c.Redirect(http.StatusFound, "/")
	}
	db := model.LinkDb()
	var ann []model.Announcement
	db.Find(&ann)
	back_btn := `&nbsp;&nbsp;<a id="form11" class="ax-btn ax-danger">删除公告</a>&nbsp;
    <a id="form12" class="ax-btn ax-success">新增公告</a>
    <br><br>`
	data := ""
	for _, value := range ann {
		data = data + fmt.Sprintf("<tr><td>%d</td><td>%s</td><td>%s</td><td>%s</td></tr>", value.ID, value.Title, value.Content, value.Update_time.String())
	}
	broad_data1 := `<table id="train">
	<thead>
		<tr>
			<th>ID</td>
			<th>标题</th>
			<th>内容</td>
			<th>时间</th>
		</tr>
	</thead>
	<tbody>`

	broad_data2 := "</tbody>"

	form_win := `    <!-- 删除公告 -->
    <div class="ax-window" data-mask="true" id="ann_form01">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">删除公告</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">请输入要删除公告的ID：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="ann_id" name="ann_id" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="ann_del" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>



    <!-- 新增公告 -->
    <div class="ax-window" data-mask="true" id="ann_form02">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">新增公告</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">公告标题：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="title" name="title" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">公告内容：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="context" name="context" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="new_ann" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>`

	js_data := `//删除公告
	$("#form11").click(function () {
		$("#ann_form01").addClass("ax-window-show");
	});
	$("#ann_del").click(function () {
		var ann_id = document.getElementById('ann_id').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/delann', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("ann_id=" + ann_id);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("公告删除成功")
				}
			}
		}
		return false;
	});

	//新增公告
	$("#form12").click(function () {
		$("#ann_form02").addClass("ax-window-show");
	});
	$("#new_ann").click(function () {
		var title = document.getElementById('title').value
		var context = document.getElementById('context').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/newann', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("title=" + title + "&context=" + context);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("新增公告成功")
				}
			}
		}
		return false;
	});`
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "backgroud.html", gin.H{
		"broad_data":  template.HTML(back_btn + broad_data1 + data + broad_data2),
		"hidden_html": template.HTML(form_win),
		"js_data":     template.JS(js_data),
	})
}

//容器管理
func Con_mgr(c *gin.Context) {
	if Getsessiona(c, "user_id").(string) != "1" {
		c.Redirect(http.StatusFound, "/")
	}
	db := model.LinkDb()
	var con []model.Flags
	db.Find(&con)
	data := ""
	for _, value := range con {
		data = data + fmt.Sprintf("<tr><td>%d</td><td>%s</td><td>%d</td><td>%s</td><td>%d</td><td>%d</td><td>%s</td><td>%s</td></tr>", value.ID, value.Username, value.Topic_id, value.Container_id, value.Mechine_id, value.Port, value.Flag, value.Create_time.String())
	}
	back_btn := `&nbsp;&nbsp;<a id="form11" class="ax-btn ax-danger">删除容器</a>&nbsp;<br><br>`
	broad_data1 := `<table id="train">
	<thead>
		<tr>
			<th>ID</td>
			<th>拥有者</th>
			<th>题目ID</td>
			<th>容器ID</td>
			<th>主机ID</td>
			<th>开放端口</th>
			<th>Flag</th>
			<th>创建时间</th>
		</tr>
	</thead>
	<tbody>`

	broad_data2 := "</tbody>"

	form_win := `    <!-- 删除容器 -->
    <div class="ax-window" data-mask="true" id="con_form01">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">删除容器</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">请输入要删除容器的ID：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="con_id" name="con_id" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="con_del" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>`

	js_data := `//删除容器
	$("#form11").click(function () {
		$("#con_form01").addClass("ax-window-show");
	});
	$("#con_del").click(function () {
		var con_id = document.getElementById('con_id').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/delcon', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("con_id=" + con_id);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("容器删除成功")
				}
			}
		}
		return false;
	});`
	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "backgroud.html", gin.H{
		"broad_data":  template.HTML(back_btn + broad_data1 + data + broad_data2),
		"hidden_html": template.HTML(form_win),
		"js_data":     template.JS(js_data),
	})
}

//主机管理
func Mechine_mgr(c *gin.Context) {
	if Getsessiona(c, "user_id").(string) != "1" {
		c.Redirect(http.StatusFound, "/")
	}
	db := model.LinkDb()
	var mechine []model.Mechine
	db.Find(&mechine)
	data := ""
	for _, value := range mechine {
		data = data + fmt.Sprintf("<tr><td>%d</td><td>%s</td><td>%s</td><td>%d</td><td>%d</td></tr>", value.ID, value.Username, value.Url, value.Min_port, value.Max_port)
	}
	back_btn := `&nbsp;&nbsp;<a id="form11" class="ax-btn ax-danger">删除主机</a>&nbsp;&nbsp<a id="form12" class="ax-btn ax-success">新增主机</a>&nbsp;<br><br>`
	broad_data1 := `<table id="train">
	<thead>
		<tr>
			<th>ID</td>
			<th>主机名</th>
			<th>主机地址</td>
			<th>最小端口</th>
			<th>最大端口</th>
		</tr>
	</thead>
	<tbody>`

	broad_data2 := "</tbody>"

	form_win := `    <!-- 删除主机 -->
    <div class="ax-window" data-mask="true" id="mechine_form01">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">删除主机</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">请输入要删除主机的ID：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="mechine_id" name="mechine_id" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="mechine_del" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>

	<!-- 新增主机 -->
    <div class="ax-window" data-mask="true" id="mechine_form02">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">新增主机</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">主机名：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="mechine_name" name="mechine_name" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">主机地址：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="mechine_url" name="mechine_url" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>

						<div class="ax-form-group">
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input">
									<div class="ax-flex-row ax-form-origin">
										<div class="ax-flex-block ax-title">最小端口：</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ax-flex-row">
							<div class="ax-form-con">
								<div class="ax-form-input"><input id="mechine_minport" name="mechine_minport" type="text">
								</div>
							</div>
						</div>
					</div>

					<div class="ax-form-group">
					<div class="ax-flex-row">
						<div class="ax-form-con">
							<div class="ax-form-input">
								<div class="ax-flex-row ax-form-origin">
									<div class="ax-flex-block ax-title">最大端口：</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ax-flex-row">
						<div class="ax-form-con">
							<div class="ax-form-input"><input id="mechine_maxport" name="mechine_maxport" type="text">
							</div>
						</div>
					</div>
				</div>

                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="new_mechine" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>`

	js_data := `//删除主机
	$("#form11").click(function () {
		$("#mechine_form01").addClass("ax-window-show");
	});
	$("#mechine_del").click(function () {
		var mechine_id = document.getElementById('mechine_id').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/delmechine', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("mechine_id=" + mechine_id);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("主机删除成功")
				}
			}
		}
		return false;
	});
	
	//新增主机
	$("#form12").click(function () {
		$("#mechine_form02").addClass("ax-window-show");
	});
	$("#new_mechine").click(function () {
		var mechine_name = document.getElementById('mechine_name').value
		var mechine_url = document.getElementById('mechine_url').value
		var mechine_minport = document.getElementById('mechine_minport').value
		var mechine_maxport = document.getElementById('mechine_maxport').value

		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/newmechine', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("mechine_name="+mechine_name+"&mechine_url="+mechine_url+"&mechine_minport="+mechine_minport+"&mechine_maxport="+mechine_maxport);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("新增主机成功")
				}
			}
		}
		return false;
	});`

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "backgroud.html", gin.H{
		"broad_data":  template.HTML(back_btn + broad_data1 + data + broad_data2),
		"hidden_html": template.HTML(form_win),
		"js_data":     template.JS(js_data),
	})
}

//题目管理
func Topic_mgr(c *gin.Context) {
	if Getsessiona(c, "user_id").(string) != "1" {
		c.Redirect(http.StatusFound, "/")
	}
	db := model.LinkDb()
	var topic []model.Topics
	db.Find(&topic)
	data := ""
	dynamic := ""
	for _, value := range topic {
		if value.Dynamic == "0" {
			dynamic = "否"
		} else {
			dynamic = "是"
		}
		data = data + fmt.Sprintf("<tr><td>%d</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%d</td><td>%s</td></tr>", value.ID, value.Name, value.Image_name, value.Mechine_id, value.Private_port, value.Type, value.Content, value.Attachment, value.Flag, value.Score, dynamic)
	}
	back_btn := `&nbsp;&nbsp;<a id="form11" class="ax-btn ax-danger">删除题目</a>&nbsp;&nbsp<a id="form12" class="ax-btn ax-success">新增题目</a>&nbsp;<br><br>`
	broad_data1 := `<table id="train">
	<thead>
		<tr>
			<th>ID</td>
			<th>题目名称</td>
			<th>镜像名称</td>
			<th>主机ID</td>
			<th>镜像开放端口</td>
			<th>题目类型</td>
			<th>题目描述</td>
			<th>题目附件地址</td>
			<th>Flag</td>
			<th>分数</td>
			<th>是否为动态靶场</td>
		</tr>
	</thead>
	<tbody>`

	broad_data2 := "</tbody>"

	form_win := `<!-- 删除主机 -->
    <div class="ax-window" data-mask="true" id="del_topic">
        <form>
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">删除主机</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-flex-row ax-form-origin">
                                            <div class="ax-flex-block ax-title">请输入要删除题目的ID：</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ax-flex-row">
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input id="topic_id" name="topic_id" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a id="topic_del" class="ax-btn ax-primary">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>  
	
	<!--新增题目-->
    <div class="ax-window" data-mask="true" id="new_topic">
        <form action="/api/upload" method="post">
            <div class="ax-window-overlay"></div>
            <div class="ax-window-contain">
                <a href="###" class="ax-window-close"><i class="ax-iconfont ax-icon-close"></i></a>
                <div class="ax-window-title">新增题目</div>
                <div class="ax-break-line"></div>
                <div class="ax-window-content">
                    <div class="ax-padding ax-outer-tel">

                        <div class="ax-form-group">
                            <div class="ax-flex-row">
                                题目名称：
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input type="text" id="name"></div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                题目类型：
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <select class="ax-select" id="topictype">
                                            <option value="">请选择..</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Web">Web</option>
                                            <option value="Pwn">Pwn</option>
                                            <option value="Crypto">Crypto</option>
                                            <option value="Reverse">Reverse</option>
                                            <option value="Misc">Misc</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                靶场类型：
                                <div class="ax-flex-block">
                                    <div class="ax-row">
                                        <div class="ax-col ax-col-8"><label class="ax-chera ax-lg"><input name="fix-egg"
                                                    value="1" checked="" id="nodynamic"
                                                    type="radio"><span>静态靶场</span></label></div>
                                        <span class="ax-gutter-md"></span>
                                        <div class="ax-col ax-col-8"><label class="ax-chera ax-lg"><input name="fix-egg"
                                                    value="0" id="dynamic" type="radio"><span>动态靶场</span></label></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                主机选择：
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <select class="ax-select" id="mechine" disabled="">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                容器选择：
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <select class="ax-select" id="container" disabled="">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                开放端口：
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input type="text" id="port" disabled=""></div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                静态Flag：
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input type="text" id="flag"></div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                题目分数：
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><input type="text" id="score"></div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                题目附件：
                                <div class="ax-form-con">
                                    <div class="ax-form-input">
                                        <div class="ax-file" data-text="选择文件">
                                            <input type="file" id="attachement" name="attachement">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ax-form-group" style="margin-top: 10px;">
                            <div class="ax-flex-row">
                                题目描述：
                                <div class="ax-form-con">
                                    <div class="ax-form-input"><textarea placeholder="题目描述" id="text"></textarea></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="ax-break-line"></div>
                <div class="ax-padding ax-window-operate">
                    <div class="ax-row">
                        <div class="ax-btns">
                            <a class="ax-btn ax-text ax-ignore ax-window-close">取消</a>
                            <a class="ax-btn ax-primary" id="topic_new">确定</a>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>`

	js_data := `//删除题目
	$("#form11").click(function () {
		$("#del_topic").addClass("ax-window-show");
	});
	$("#topic_del").click(function () {
		var topic_id = document.getElementById('topic_id').value
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('POST', '/api/deltopic', true);
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//注：post方式必须设置请求头
		httpRequest.send("topic_id=" + topic_id);
		/**
		 * 获取数据后的处理程序
		 */
		httpRequest.onreadystatechange = function () {//请求后的回调接口
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
				var text = httpRequest.responseText;//获取到服务端返回的数据
				if (text != "success") {
					alert(text)
				}
				else {
					alert("主机删除成功")
				}
			}
		}
		return false;
	});
	
	//新增题目
	$("#form12").click((event) => {
		$("#new_topic").addClass("ax-window-show");
	});


	$("#dynamic").click(function () {
		$.post("/api/getmechine", function (data, status) {
			$("#mechine").html("<option value=''>请选择..</option>" + data.data);
		});
		$("#flag").attr("disabled", true);
		$("#mechine").attr("disabled", false);
		$("#container").attr("disabled", true);
		$("#port").attr("disabled", true);
		$("#dynamic").attr("value", 1)
		$("#nodynamic").attr("value", 0)
	});
	$("#nodynamic").click(function () {
		$("#flag").attr("disabled", false);
		$("#mechine").attr("disabled", true);
		$("#container").attr("disabled", true);
		$("#port").attr("disabled", true);
		$("#dynamic").attr("value", 0)
		$("#nodynamic").attr("value", 1)
	});
	$("#mechine").change(function () {
		var selected = $(this).children('option:selected').val()
		$("#container").attr("disabled", false);
		$("#port").attr("disabled", false);
		$.post("/api/gettopic", { mechine_id: selected }, function (data, status) {
			$("#container").html("<option value=''>请选择..</option>" + data.data)
		});
	});
	//提交文件
	$("#topic_new").click(function () {
		var topicname = document.getElementById("name").value
		var topictype = document.getElementById("topictype").value
		var text = document.getElementById("text").value
		var score = document.getElementById("score").value
		var files = $('#attachement').prop('files');
		var data = new FormData();
		data.append('name', topicname);
		data.append('type', topictype);
		data.append('text', text);
		data.append('score',score);
		data.append('uploadfile', files[0]);
		if (document.getElementById("dynamic").value == 1) {
			var mechine = document.getElementById("mechine").value
			var container = document.getElementById("container").value
			var port = document.getElementById("port").value
			data.append('ctype', "1");
			data.append('mechine', mechine);
			data.append('container', container);
			data.append('port', port);
		} else {
			var flag = document.getElementById("flag").value
			data.append('ctype', "0");
			data.append('flag', flag);
		}
		$.ajax({
			url: '/api/newtopic',
			type: 'POST',
			data: data,
			cache: false,
			processData: false,
			contentType: false	
		});

	});`

	sqlDb, _ := db.DB()
	defer sqlDb.Close()
	c.HTML(http.StatusOK, "backgroud.html", gin.H{
		"broad_data":  template.HTML(back_btn + broad_data1 + data + broad_data2),
		"hidden_html": template.HTML(form_win),
		"js_data":     template.JS(js_data),
	})
}
