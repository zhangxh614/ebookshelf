"use strict";

var handle = function handle(data) {
	ReactDOM.render(React.createElement(
		"ul",
		{ className: "post-list" },
		data['list'].map(function (item) {
			return React.createElement(
				"li",
				{ className: "col-xs-4 col-sm-3 col-md-2 col-lg-2" },
				React.createElement("img", { className: "other", src: item['img'] }),
				React.createElement(
					"a",
					{ className: "link", target: "_blank", href: item['link'] },
					item['name']
				)
			);
		})
	), document.getElementById('booklist'));
};

var test = {
	"list": [{
		"link": "https://book.douban.com/subject/27041539/",
		"img": "https://img3.doubanio.com/lpic/s29448565.jpg",
		"name": "上锁的房子"
	}, {
		"link": "https://book.douban.com/subject/27042830/",
		"img": "https://img3.doubanio.com/lpic/s29450044.jpg",
		"name": "幽灵"
	}, {
		"link": "https://book.douban.com/subject/26992417/",
		"img": "https://img3.doubanio.com/lpic/s29389226.jpg",
		"name": "少年台湾"
	}, {
		"link": "https://book.douban.com/subject/27073403/",
		"img": "https://img1.doubanio.com/lpic/s29489918.jpg",
		"name": "等你呼唤我的名字"
	}, {
		"link": "https://book.douban.com/subject/27044089/",
		"img": "https://img3.doubanio.com/lpic/s29453661.jpg",
		"name": "最后的精灵"
	}, {
		"link": "https://book.douban.com/subject/27041940/",
		"img": "https://img3.doubanio.com/lpic/s29447952.jpg",
		"name": "《冰火大明》"
	}, {
		"link": "https://book.douban.com/subject/27041945/",
		"img": "https://img1.doubanio.com/lpic/s29447959.jpg",
		"name": "《黑白大清》"
	}, {
		"link": "https://book.douban.com/subject/27044085/",
		"img": "https://img3.doubanio.com/lpic/s29458343.jpg",
		"name": "匠人精神II——追求极致的日式工作..."
	}, {
		"link": "https://book.douban.com/subject/26911951/",
		"img": "https://img3.doubanio.com/lpic/s29424104.jpg",
		"name": "霹雳钻"
	}, {
		"link": "https://book.douban.com/subject/26956486/",
		"img": "https://img3.doubanio.com/lpic/s29451465.jpg",
		"name": "无根之木"
	}]
};

handle(test);