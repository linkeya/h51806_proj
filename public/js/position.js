require(["config"], function() {
	require(["jquery", "template", "header"], function($, template) {
		function Position() {
			this.loadData();
		}

		$.extend(Position.prototype, {
			//加载表格数据
			loadData() {
				$.ajax("http://rap2api.taobao.org/app/mock/115310/api/positions")
					.done((data) => {
						console.log(data)
						var data = {
							list: data.res_body.list
						}
						var html = template("table_data", data);
						$("tbody").html(html);
					});
			}
		});

		new Position();
	});
});