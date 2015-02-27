/* Copyright 2015, All Rights Reserved. */
function ping(ip, callback) {
	if (!this.inUse) {
		this.status = 'unchecked';
		this.inUse = true;
		this.callback = callback;
		this.ip = ip;
		this.start = 0;
		var _that = this;
		this.img = new Image();
		this.img.onload = function () {
			window.clearInterval(_that.timer);
			_that.inUse = false;
			_that.callback('responded', +(new Date()) - _that.start);
		};
		this.img.onerror = function (e) {
			if (_that.inUse) {
				window.clearInterval(_that.timer);
				_that.inUse = false;
				_that.callback('responded', +(new Date()) - _that.start, e);
				return true;
			}
		};
		this.start = +(new Date());
		this.img.src = "http://" + ip + "/?cachebreaker="+(+(new Date()));
		this.timer = setTimeout(function () {
			if (_that.inUse) {
				_that.inUse = false;
				_that.callback('timeout', false);
			}
		}, 30000);
	}
}

var PingModel = function (servers) {
	var self = this;
	var myServers = [];
	var offset = 1;
	ko.utils.arrayForEach(servers, function (server) {
		myServers.push({
			icon: server.icon,
			name: server.name,
			sub: server.sub || false,
			interval: server.interval || false,
			address: server.address,
			port: server.port,
			unknown: server.unknown || false,
			status: ko.observable('unchecked'),
			time: ko.observable(""),
			values: ko.observableArray()
		});
	});
	self.servers = ko.observableArray(myServers);
	ko.utils.arrayForEach(self.servers(), function (s) {
		s.status('checking');
		function doPing() {
			new ping(s.address + ":" + s.port, function (status, time, e) {
				s.status(status);
				s.time(time);
				s.values.push(time);
				//console.clear();
				/*if (s.interval) {
					setTimeout(doPing, s.interval);
				}*/
			});
		}
		setTimeout(function() {
			doPing();
		}, 100 * offset++)
	});
};

var checker = {
	applications: [
	{
		name: "MapleStory Game Servers",
		icons: [
		{
			icon: "Mushroom.png",
			name: "Login",
			sub: ""
		},
		{
			icon: "Kradia.png",
			name: "Kradia",
			sub: "World"
		},
		{
			icon: "Demethos.png",
			name: "Demethos",
			sub: "World"
		},
		{
			icon: "Supreme.png",
			name: "Supreme",
			sub: "World"
		}
		],
		content: new PingModel([
		{
			icon: "Kradia.png",
			name: "Channel 1",
			address: "109.234.77.20",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 2",
			address: "109.234.77.21",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 3",
			address: "109.234.77.21",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 4",
			address: "109.234.77.22",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 5",
			address: "109.234.77.22",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 6",
			address: "109.234.77.23",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 7",
			address: "109.234.77.23",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 8",
			address: "109.234.77.24",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 9",
			address: "109.234.77.24",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 10",
			address: "109.234.77.25",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 11",
			address: "109.234.77.25",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 12",
			address: "109.234.77.26",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 13",
			address: "109.234.77.26",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Channel 14",
			address: "109.234.77.27",
			port: "8587",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 1",
			address: "109.234.77.31",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 2",
			address: "109.234.77.32",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 3",
			address: "109.234.77.32",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 4",
			address: "109.234.77.33",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 5",
			address: "109.234.77.33",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 6",
			address: "109.234.77.34",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 7",
			address: "109.234.77.34",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 8",
			address: "109.234.77.35",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 9",
			address: "109.234.77.35",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 10",
			address: "109.234.77.36",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 11",
			address: "109.234.77.36",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 12",
			address: "109.234.77.37",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 13",
			address: "109.234.77.37",
			port: "8586",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Channel 14",
			address: "109.234.77.38",
			port: "8587",
			interval: 5000,
			values: []
		},
		{
			icon: "Supreme.png",
			name: "Channel 1",
			address: "109.234.77.38",
			port: "8587",
			interval: 5000,
			values: []
		},
		{
			icon: "Mushroom.png",
			name: "Login",
			address: "109.234.77.11",
			port: "8484",
			interval: 5000,
			values: []
		},
		{
			icon: "Kradia.png",
			name: "Cash Shop",
			address: "109.234.77.13",
			port: "8787",
			interval: 5000,
			values: []
		},
		{
			icon: "Demethos.png",
			name: "Cash Shop",
			address: "109.234.77.31",
			port: "8585",
			interval: 5000,
			values: []
		},
		{
			icon: "Supreme.png",
			name: "Cash Shop",
			address: "109.234.77.13",
			port: "8791",
			interval: 5000,
			values: [],
		}/*,
		{
			icon: "fa-question",
			name: "Unknown 1",
			address: "109.234.73.44",
			port: "8585",
			unknown: true
		},
		{
			icon: "fa-question",
			name: "Unknown 2",
			address: "109.234.73.44",
			port: "8586",
			unknown: true
		}*/
		]
		)
},
{
	name: "Internal Sites",
	icons: [
	{
		icon: "Mushroom.png",
		name: "mapleeu.com",
		sub: ""
	},
	{
		icon: "Nexon.png",
		name: "nexoneu.com",
		sub: "World"
	}
	],
	content: new PingModel([
	{
		icon: "Mushroom.png",
		name: "MapleEurope",
		address: "mapleeurope.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "NexonEU",
		sub: "www",
		address: "nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Billing",
		address: "billing.nexoneu.com",
		port: "443",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Passport",
		address: "passport.nexoneu.com",
		port: "443",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Company",
		address: "company.nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Forums",
		address: "forum.nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Support",
		address: "support.nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Avatars",
		sub: "MSE",
		address: "avatar1.mapleeurope.com",
		port: "80"
	},
	{
		icon: "fa-globe",
		name: "Images",
		sub: "NXEU",
		address: "msimage.nexoneu.com",
		port: "80"
	},
	{
		icon: "fa-globe",
		name: "Cache",
		sub: "NXEU",
		address: "cache.nexoneu.com",
		port: "443"
	},
	{
		icon: "fa-globe",
		name: "Admin",
		sub: "NXEU",
		address: "admin.nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Event",
		sub: "NXEU",
		address: "event.nexoneu.com",
		port: "80"
	},
	{
		icon: "fa-globe",
		name: "API",
		sub: "NXEU",
		address: "api.nexoneu.com",
		port: "80",
		interval: 60000
	},
	/*{
		icon: "fa-globe",
		name: "Auth01",
		sub: "NXEU",
		address: "109.234.76.81",
		port: "80",
		interval: 60000
	},*/
	{
		icon: "fa-globe",
		name: "Auth02",
		sub: "NXEU",
		address: "auth02.nexoneu.com",
		port: "80",
		interval: 60000
	}/*,
	{
		icon: "fa-globe",
		name: "Auth03",
		sub: "NXEU",
		address: "109.234.76.83",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Auth04",
		sub: "NXEU",
		address: "109.234.76.84",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Auth05",
		sub: "NXEU",
		address: "109.234.76.85",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Auth06",
		sub: "NXEU",
		address: "109.234.76.86",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-question",
		name: "Auth ?",
		address: "109.234.76.87",
		port: "80",
		interval: 60000
	}*/
	]
	)
},
{
	name: "External Sites",
	icons: [],
	content: new PingModel([
	{
		icon: "Mushroom.png",
		name: "Download",
		address: "download.mapleeurope.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Download",
		address: "download.nexoneu.com",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Patch",
		address: "patch.nexoneu.com",
		port: "80",
		interval: 60000
	}
	]
	)
}
]
};

ko.applyBindings(checker);