require(["config"], function() {
	require(["jquery", "template","ejs", "header"], function($, template,ejs) {
		function Position() {
			this.addListener();
		}

		Position.PositionRowTemplate = `
				<tr>
						<td><%= _id %></td>
						<td><%= posName %></td>
						<td><%= experience %></td>
						
						<td><%= posType %></td>
						<td><%= workPlace %></td>
						<td><%= salary %></td>
						<td><a href="#">修改</a> <a href="#">删除</a></td>
					</tr>
				`;

		$.extend(Position.prototype, {
			addListener() {
				$(".btn-add-pos").on("click", this.addPosHandler);
			},
			//添加职位处理
			addPosHandler() {
				//获取表单数据
				const data = new FormData($(".form-add-pos").get(0));
				//url
				const url = "/api/positions/add";
				$.ajax({
					type: "post",
					url: url,
					data: data,
					dataType: "json",
					processData: false,
					contentType: false,
					success(data) {
						if(data.res_body.status === 1) { //添加成功
							console.log(data)
							//使用ejs模板渲染
							const html = ejs.render(Position.PositionRowTemplate, data.res_body.data);
							//显示
							$(".table-position tbody").prepend(html);
							//关闭模态框
							$("#addPosmodal").modal('hide');
						} else { //添加失败
							$(".add-pos-error").removeClass("hidden");
						}
					}
				});
			}

			//加载表格数据
			/*loadData() {
				$.ajax("http://rap2api.taobao.org/app/mock/115310/api/positions")
					.done((data) => {
						console.log(data)
						var data = {
							list: data.res_body.list
						}
						var html = template("table_data", data);
						$("tbody").html(html);
					});
			}*/
		});
		new Position();
	});
});