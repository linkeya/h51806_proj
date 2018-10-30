require(["config"], function() {
	require(["jquery", "template", "ejs", "header"], function($, template, ejs) {
		function Position() {
			this.addListener();
			this.loadData(1);
		}

		Position.PositionRowTemplate = `
					<tr>
						<td class="id"><%= _id %></td>
						<td><img src="<%= logo %>"/></td>
						<td><%= posName %></td>
						<td><%= experience %></td>
						<td><%= company %></td>
						<td><%= posType %></td>
						<td><%= workPlace %></td>
						<td><%= salary %></td>
						<td><a href="#">修改</a> <a href="#">删除</a></td>
					</tr>
				`;

		$.extend(Position.prototype, {
			addListener() {
				$(".btn-add-pos").on("click", this.addPosHandler);
				$(".pagination").on("click", "a", $.proxy(this.loadDataHandler, this));
				//删除数据
				$(".table_data").on("click", $.proxy(this.deleteHandler, this));
			},
			deleteHandler(event) {
				const $src = $(event.target);
				const _tr = $src.parents("tr");
				const _id = _tr.find(".id").text();
				const url = "/api/positions/delete?id=" + _id;
				//执行删除请求
				$.getJSON(url, (data) => {
					console.log(data);
					if(data.res_code === 1) {

					}
				});
			},
			loadDataHandler(event) {
				const $src = $(event.target);
				const page = Number($src.text());
				this.loadData(page);
				//标签使用类名处理
				$src.parent("li").addClass("active").siblings("li").removeClass("active");
			},
			//分页加载数据处理
			loadData(page) {
				//默认查询第1页的数据
				page = page || 1;
				const url = "/api/positions/find_by_page?page=" + page;
				//get请求
				$.getJSON(url, (data) => {
					if(data.res_code === 1) {
						let html = "";
						data.res_body.list.forEach((curr) => {
							html += ejs.render(Position.PositionRowTemplate, curr);
						});
						$(".table-position tbody").html(html);
					}
				});
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
			},

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