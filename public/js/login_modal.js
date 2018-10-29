function LoginModal() {
	this.createDom();
	this.addListener();
	this.genCode();
}

LoginModal.ModalTemplate = `<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">用户登录</h4>
			</div>
			
			<div class="alert alert-danger hidden login-error">用户名或密码错误</div>
			
			<div class="modal-body">
				<form class="form-login">
					<div class="form-group">
						<label for="loginUsername">用户名</label>
						<input type="text" class="form-control" name="username" id="loginUsername" placeholder="请输入用户名">
					</div>
					<div class="username-error hidden alert alert-danger">用户名错误,请重新输入</div>
					
					<div class="form-group">
						<label for="loginPassword">密码</label>
						<input type="password" class="form-control" name="password" id="loginPassword" placeholder="请输入密码">
					</div>
					<div class="password-error hidden alert alert-danger">密码错误,请重新输入</div>
					
					<div class="form-group">
						<label for="loginCode">验证码</label>
						<input type="text" class="form-control input-code" id="loginCode" placeholder="请输入验证码">
						<div class="code"></div>
					</div>
					<div class="code-error hidden alert alert-danger">验证码输入有误</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary btn-login">登录</button>
			</div>
		</div>
	</div>
</div>`;

$.extend(LoginModal.prototype, {
	createDom() {
		$("body").append(LoginModal.ModalTemplate);
	},
	addListener() {
		$(".btn-login").on("click", this.loginHandler);
		$(".code").on("click", this.genCode);
		$(".input-code").on("blur", this.codeHandler);
		$(".form-login").on("blur", "input", $.proxy(this.formHandler, this));
	},
	loginHandler() {
		const data = $(".form-login").serialize();
		const url = "/api/users/login";
		$.post(url, data, (data) => {
			if(data.res_body.status === 1) {
				//				$.cookie("username", data.res_body.data.username);
				sessionStorage.setItem("username", data.res_body.data.username);
				//刷新页面
				location.reload();
			} else { //登录失败
				$(".login-error").removeClass("hidden");
			}
		}, "json");
	},
	//生成验证码
	genCode() {
		$.getJSON("/api/captcha", (data) => {
			$(".code").html(data.res_body.data);
		});
	},
	//校验验证码
	codeHandler(event) {
		//输入的值
		const code = $(event.target).val();
		//ajax
		$.getJSON("/api/captcha/verify", {
			code
		}, (data) => {
			if(!data.res_body.valid) {
				$(".code-error").removeClass("hidden");
				$(".input-code").val("");
			}
		});
	},
	//检测表单是否为空
	formHandler(event) {
		const src = event.target;
		$(src).on("blur", function() {
			if($(src).val() === "")
				$(src).parent().next("div").removeClass("hidden");
		});
		$(src).on("focus", function() {
			$(src).parent().next("div").addClass("hidden");
		});
		/*if($(src).id === "loginUsername"){
			if($(src).val()==="")
				$("#loginPassword").prop("disabled","disabled");
		}*/

	}
});