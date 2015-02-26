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
				console.clear();
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
		},
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
		}
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
		address: "109.234.76.150",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "NexonEU",
		address: "109.234.76.160",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "NexonEU SSL",
		address: "109.234.76.160",
		port: "443",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Forum",
		address: "109.234.76.170",
		port: "80",
		interval: 60000
	},
	{
		icon: "Nexon.png",
		name: "Support",
		address: "109.234.76.180",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "Admin",
		address: "109.234.76.200",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-globe",
		name: "API",
		address: "109.234.76.205",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-question",
		name: "Unknown 1",
		address: "109.234.76.204",
		port: "80",
		unknown: true
	}
	]
	)
},
{
	name: "External Sites",
	icons: [],
	content: new PingModel([
	{
		icon: "fa-external-link",
		name: "Download",
		sub: "MSE",
		address: "23.61.195.121",
		port: "80",
		interval: 60000
	},
	{
		icon: "fa-external-link",
		name: "Patch",
		sub: "NXEU",
		address: "23.61.195.128",
		port: "80",
		interval: 60000
	}
	]
	)
}
]
};

ko.applyBindings(checker);