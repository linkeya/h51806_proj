function RegisterModal() {
	this.createDom();
	this.addListener();
	this.genCode();

}

RegisterModal.ModalTemplate = `<div class="modal fade" id="regModal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">用户注册</h4>
			</div>
			
			<div class="register-error hidden alert alert-danger">用户注册失败，请稍后重试</div>
			
			
			<div class="modal-body">
				<form class="form-register">
					<div class="form-group">
						<label for="regUsername">用户名</label>
						<input type="text" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
					</div>
					<div class="username-error hidden alert alert-danger">用户名不能为空</div>
					
					<div class="form-group">
						<label for="regPassword">密码</label>
						<input type="password" name="password" class="form-control" id="regPassword" placeholder="请输入密码">
					</div>
					<div class="pwd-error hidden alert alert-danger">密码不能为空</div>

					<div class="form-group">
						<label for="regConfPassword">确认密码</label>
						<input type="password" class="form-control" id="regConfPassword" placeholder="请输入密码">
					</div>
					<div class="password-error hidden alert alert-danger">两次密码输入不一致,请重新输入</div>

					<div class="form-group">
						<label for="regEmail">Email</label>
						<input type="email" name="email" class="form-control" id="regEmail" placeholder="请输入Email">
					</div>
					<div class="email-error hidden alert alert-danger">邮箱不能为空</div>
					
					<div class="form-group">
						<label for="registerCode">验证码</label>
						<input type="text" class="form-control input-code" id="registerCode" placeholder="请输入验证码">
						<div class="code"></div>
					</div>
					<div class="code-error hidden alert alert-danger">验证码错误,请重新输入</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary btn-register">注册</button>
			</div>
		</div>
	</div>
</div>`;

$.extend(RegisterModal.prototype, {
	createDom() {
		$("body").append(RegisterModal.ModalTemplate);
	},
	addListener() {
		$(".btn-register").on("click", this.registerHandler);
		$(".code").on("click", this.genCode);
		$(".input-code").on("blur", this.codeHandler);
		$(".input-code").on("focus", this.removeCodeError);
		$("#regConfPassword").on("blur", this.passwordHandler);
		$("#regPassword,#regConfPassword").on("focus", this.removeErrorDiv);
		$(".form-register").on("blur", "input", $.proxy(this.formHandler, this));
	},
	registerHandler() {
		const data = $(".form-register").serialize();
		const url = "http://rap2api.taobao.org/app/mock/115310/api/register";
		$.post(url, data, (data) => {
			if(data.res_body.status === 1) {
				sessionStorage.username = data.res_body.data.username;
				location.reload();
			} else { //注册失败
				$(".register-error").removeClass("hidden");
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
	//判断两次密码输入是否一致
	passwordHandler() {
		const password = $("#regPassword").val(),
			confPassword = $("#regConfPassword").val();
		if(password !== confPassword) {
			$(".password-error").removeClass("hidden");
			//清空密码框
			$("#regConfPassword,#regPassword").val("");
		}
	},
	removeErrorDiv() {
		$(".password-error").addClass("hidden");
	},
	removeCodeError() {
		$(".code-error").addClass("hidden");
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
	}
});