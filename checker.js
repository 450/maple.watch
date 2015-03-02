/* Copyright 2015, All Rights Reserved. */
var checkTimeout = 5000,
		checkDelay = 100,
		showIPPort = true,
		showConnection = true,
		enableHighlight = true,
		selected = "EMS",
		processing = 0;

switch (window.location.hash) {
	case "#EMS":
	case "#GMS":
	case "#MSEA":
		selected = window.location.hash.replace('#', '');
		break;
	default:
		break;
}

console.log(window.location.hash);

function ping(ip, callback) {
	if (!this.inUse) {
		this.status = 'unchecked';
		this.inUse = true;
		this.callback = callback;
		this.ip = ip;
		this.start = 0;
		var _that = this;
		this.img = new Image();
		this.img.onload = function (e) {
			window.clearInterval(_that.timer);
			_that.inUse = false;
			_that.callback('responded', +(new Date()) - _that.start);
				if (--processing == 0)
					window.stop();
		};
		this.img.onerror = function (e, error, errorThrown) {
			if (_that.inUse) {
				window.clearInterval(_that.timer);
				_that.inUse = false;
				_that.callback('responded', +(new Date()) - _that.start, e);
				if (--processing == 0)
					window.stop();
				return true;
			}
		};
		this.start = +(new Date());
		this.img.src = "http://" + ip + "/?cachebreaker="+(+(new Date()));
		this.timer = setTimeout(function () {
			if (_that.inUse) {
				_that.inUse = false;
				_that.callback('timeout', false);
				if (--processing == 0)
					window.stop();
			}
		}, GetCheckTimeout());
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
			values: ko.observableArray(),
			rel: server.rel
		});
	});
	self.servers = ko.observableArray(myServers);
	processing += self.servers().length;
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
		}, checkDelay * offset++)
	});
};

var GameServer = function(version, icons, servers) {
	return {
		name: "MapleStory Game Servers",
		description: "These are the MapleStory Europe game servers: the login server and each world's channel and cash shop servers.",
		icons: icons,
		content: function() { return new PingModel(servers) }
	}
}

var checker = {
	selected: ko.observable(selected),
	versions: [
	{
		abbr: "EMS",
		name: "MapleStory Europe",
		icon: "Kradia.png",
		short: "EUROPE",
		applications: [
			GameServer("Europe", [
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
				[
					{
						icon: "Mushroom.png",
						name: "Login",
						address: "109.234.77.11",
						port: "8484",
						interval: 5000,
						values: [],
						rel: "Login"
					},
					{
						icon: "Kradia.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8787",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Demethos.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8788",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Supreme.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8791",
						interval: 5000,
						values: [],
						rel: "Supreme"
					},
					{
						icon: "Kradia.png",
						name: "Channel 1",
						address: "109.234.77.20",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 2",
						address: "109.234.77.21",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 3",
						address: "109.234.77.21",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 4",
						address: "109.234.77.22",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 5",
						address: "109.234.77.22",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 6",
						address: "109.234.77.23",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 7",
						address: "109.234.77.23",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 8",
						address: "109.234.77.24",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 9",
						address: "109.234.77.24",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 10",
						address: "109.234.77.25",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 11",
						address: "109.234.77.25",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 12",
						address: "109.234.77.26",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 13",
						address: "109.234.77.26",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 14",
						address: "109.234.77.27",
						port: "8587",
						interval: 5000,
						values: [],
						rel: "Kradia"
					},
					{
						icon: "Demethos.png",
						name: "Channel 1",
						address: "109.234.77.31",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 2",
						address: "109.234.77.32",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 3",
						address: "109.234.77.32",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 4",
						address: "109.234.77.33",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 5",
						address: "109.234.77.33",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 6",
						address: "109.234.77.34",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 7",
						address: "109.234.77.34",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 8",
						address: "109.234.77.35",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 9",
						address: "109.234.77.35",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 10",
						address: "109.234.77.36",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 11",
						address: "109.234.77.36",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 12",
						address: "109.234.77.37",
						port: "8585",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 13",
						address: "109.234.77.37",
						port: "8586",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 14",
						address: "109.234.77.38",
						port: "8587",
						interval: 5000,
						values: [],
						rel: "Demethos"
					},
					{
						icon: "Supreme.png",
						name: "Channel 1",
						address: "109.234.77.38",
						port: "8597",
						interval: 5000,
						values: [],
						rel: "Supreme"
					}
				]
		),
	{
		name: "Internal Sites",
		description: "These are pages which are hosted on Nexon Europe's own 109.234.73.* servers.",
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
		content: function() {
			return new PingModel([
				{
					icon: "Mushroom.png",
					name: "MapleEurope",
					address: "mapleeurope.com",
					port: "80",
					interval: 60000,
					rel: "mapleeu.com"
				},
				{
					icon: "Nexon.png",
					name: "NexonEU",
					sub: "www",
					address: "nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "Nexon.png",
					name: "Billing",
					address: "billing.nexoneu.com",
					port: "443",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "Nexon.png",
					name: "Passport",
					address: "passport.nexoneu.com",
					port: "443",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "Nexon.png",
					name: "Company",
					address: "company.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "Nexon.png",
					name: "Forums",
					address: "forum.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "Nexon.png",
					name: "Support",
					address: "support.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "Avatars",
					sub: "MSE",
					address: "avatar1.mapleeurope.com",
					port: "80",
					rel: "mapleeu.com"
				},
				{
					icon: "fa-globe",
					name: "Images",
					sub: "NXEU",
					address: "msimage.nexoneu.com",
					port: "80",
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "Cache",
					sub: "NXEU",
					address: "cache.nexoneu.com",
					port: "443",
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "Admin",
					sub: "NXEU",
					address: "admin.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "Event",
					sub: "NXEU",
					address: "event.nexoneu.com",
					port: "80",
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "API",
					sub: "NXEU",
					address: "api.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "fa-globe",
					name: "Auth02",
					sub: "NXEU",
					address: "auth02.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				}
			])
		}
	},
	{
		name: "External Sites",
		description: "These are pages which are hosted on external servers.",
		icons: [],
		content: function() {
			return new PingModel([
				{
					icon: "fa-external-link",
					name: "Download",
					sub: "MSE",
					address: "download.mapleeurope.com",
					port: "80",
					interval: 60000,
					rel: "mapleeu.com"
				},
				{
					icon: "fa-external-link",
					name: "Download",
					address: "download.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "fa-external-link",
					name: "Patch",
					address: "patch.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				}
			])
		}
	}
	]
},
{
	abbr: "GMS",
	name: "MapleStory North America <small>(Global)</small>",
	icon: "Scania.png",
	short: "North America (Global)",
	applications: [
		GameServer("Europe", [
				{
					icon: "Mushroom.png",
					name: "Login",
					sub: ""
				},
				{
					icon: "Scania.png",
					name: "Scania",
					sub: "World"
				}
			],
			[
				{
					icon: "Mushroom.png",
					name: "Login 1",
					address: "8.31.99.135",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 2",
					address: "8.31.99.136",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 3",
					address: "8.31.99.137",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 4",
					address: "8.31.99.138",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 5",
					address: "8.31.99.141",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 6",
					address: "8.31.99.142",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 7",
					address: "8.31.99.143",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 8",
					address: "8.31.99.200",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 9",
					address: "8.31.99.201",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 10",
					address: "8.31.99.244",
					port: "8484",
					interval: 5000,
					values: [],
					rel: "Login"
				},
				{
					icon: "Scania.png",
					name: "Cash Shop",
					address: "8.31.99.144",
					port: "8785",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Monster Life",
					address: "8.31.99.205",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Evolution Lab",
					address: "8.31.99.197",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 1",
					address: "8.31.99.211",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 2",
					address: "8.31.99.212",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 3",
					address: "8.31.99.212",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 4",
					address: "8.31.99.212",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 5",
					address: "8.31.99.213",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 6",
					address: "8.31.99.213",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 7",
					address: "8.31.99.213",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 8",
					address: "8.31.99.214",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 9",
					address: "8.31.99.214",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 10",
					address: "8.31.99.214",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 11",
					address: "8.31.99.215",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 12",
					address: "8.31.99.215",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 13",
					address: "8.31.99.215",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 14",
					address: "8.31.99.216",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 15",
					address: "8.31.99.216",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 16",
					address: "8.31.99.216",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 17",
					address: "8.31.99.217",
					port: "8585",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 18",
					address: "8.31.99.217",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 19",
					address: "8.31.99.217",
					port: "8587",
					interval: 5000,
					values: [],
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 20",
					address: "8.31.99.211",
					port: "8586",
					interval: 5000,
					values: [],
					rel: "Scania"
				}
			]
		)
	]
},
	{
		abbr: "MSEA",
		name: "MapleStory SEA <small>(SG / MY)</small>",
		icon: "Aquila.png",
		short: "Maple SEA SG / MY",
		applications: [
		]
	},
	{
		abbr: "KMS",
		name: "MapleStory Korea <small>(한국)</small>",
		icon: "Mushroom.png",
		short: "한국 | Korea",
		applications: [
		]
	}
],
settings: {
	delay: ko.observable(100),
	enableHighlight: ko.observable(true),
	showConnection: ko.observable(true),
	showIPPort: ko.observable(true),
	timeout: ko.observable(5000)
}
};

ko.applyBindings(checker);

function GetCheckTimeout() {
	return checker.settings.timeout();
}

$(function() {
	$('body').on('mouseenter', '[data-rel], [data-for]', function() {
		$('.revealed').removeClass('revealed');

		var rel = $(this).attr('data-rel') || $(this).attr('data-for'),
		isRel = !!$(this).attr('data-rel');

		if (isRel) {
			$('[data-for="' + rel + '"]').addClass('revealed');
			$(this).addClass('revealed');
		}
		else
			$('[data-for="' + rel + '"], [data-rel="' + rel + '"]').addClass('revealed');
	}).on('mouseleave',  'li, div.servers', function() {
		$('.revealed').removeClass('revealed');
	});
})