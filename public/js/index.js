//引入以来的配置文件模块
require(["config"], function() {
	//引入依赖模块
	require(["jquery", "template", "header", "cookie"], function($, template) {
		function Index() {
			this.loadUsername();
		}
		$.extend(Index.prototype, {
			loadUsername: function() {
			}
		});

		new Index();
	});
});