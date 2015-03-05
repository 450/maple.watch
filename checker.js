/* Copyright 2015, All Rights Reserved. */
var checkTimeout = 5000,
		checkDelay = 100,
		showIPPort = true,
		showConnection = true,
		clickToRefresh = false,
		fixPing = true,
		selected = "Main",
		subSelection = "",
		processing = 0,
		hash = window.location.hash.split('-'),
		alreadyProcessed = [],
		rendered = 0,
		loadingTimers = [];

if (hash.length) {
	switch (hash[0]) {
		case "#EMS":
		case "#GMS":
		/*case "#JMS":
		case "#KMS":
		case "#MSEA":
		case "#MS2":*/
			selected = hash[0].replace('#', '');
			break;
		default:
			break;
	}
}

if (hash.length > 1) {
	subSelection = hash[1];
}
else {
	subSelection = GetDefaultSubSelectionForVersion(selected);
}

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
					if (window.stop) { window.stop(); } else if (document.execCommand) { document.execCommand('Stop'); };
		};
		this.img.onerror = function (e, error, errorThrown) {
			if (_that.inUse) {
				window.clearInterval(_that.timer);
				_that.inUse = false;
				_that.callback('responded', +(new Date()) - _that.start, e);
				if (--processing == 0)
					if (window.stop) { window.stop(); } else if (document.execCommand) { document.execCommand('Stop'); };
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
					if (window.stop) { window.stop(); } else if (document.execCommand) { document.execCommand('Stop'); };
			}
		}, GetCheckTimeout());
	}
}

var PingModel = function (servers) {
	var addr = servers[0].address;

	// Hacky, for some reason the foreach binding fires twice.
	if (!(servers[0].name == 'Self') && alreadyProcessed.indexOf(addr) == -1) {
		alreadyProcessed.push(servers[0].address);
		return;
	}

	var serversArr = [];

	for (var i = 0; i < servers.length; i++)
		for (var j = 0; j < servers[i].length; j++)
				serversArr.push(servers[i][j]);

	var self = this;
	var myServers = [];
	var offset = 1;
	ko.utils.arrayForEach(serversArr, function (server) {
		if (!server.isMapleStoryGameServer || server.rel == subSelection || (server.rel == "Login" && selected != 'GMS')) {
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
		}
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
				if (s.name == "Self") {
					SetPingOffset(time);
				}
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
		name: "Game Servers",
		description: "These are the MapleStory " + version + " game servers.",
		selectedServers: ko.observable(null),
		icons: icons,
		content: function() { return new PingModel(servers) }
	}
}

var servers = {
	EMS: {
		Login: [{
						icon: "Mushroom.png",
						name: "Login",
						address: "109.234.77.11",
						port: "8484",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Login"
					}],
		Kradia: [{
						icon: "Kradia.png",
						name: "Channel 1",
						address: "109.234.77.20",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 2",
						address: "109.234.77.21",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 3",
						address: "109.234.77.21",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 4",
						address: "109.234.77.22",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 5",
						address: "109.234.77.22",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 6",
						address: "109.234.77.23",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 7",
						address: "109.234.77.23",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 8",
						address: "109.234.77.24",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 9",
						address: "109.234.77.24",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 10",
						address: "109.234.77.25",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 11",
						address: "109.234.77.25",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 12",
						address: "109.234.77.26",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 13",
						address: "109.234.77.26",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Channel 14",
						address: "109.234.77.27",
						port: "8587",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					},
					{
						icon: "Kradia.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8787",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Kradia"
					}],
		Demethos:[{
						icon: "Demethos.png",
						name: "Channel 1",
						address: "109.234.77.31",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 2",
						address: "109.234.77.32",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 3",
						address: "109.234.77.32",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 4",
						address: "109.234.77.33",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 5",
						address: "109.234.77.33",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 6",
						address: "109.234.77.34",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 7",
						address: "109.234.77.34",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 8",
						address: "109.234.77.35",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 9",
						address: "109.234.77.35",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 10",
						address: "109.234.77.36",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 11",
						address: "109.234.77.36",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 12",
						address: "109.234.77.37",
						port: "8585",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 13",
						address: "109.234.77.37",
						port: "8586",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Channel 14",
						address: "109.234.77.38",
						port: "8587",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					},
					{
						icon: "Demethos.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8788",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Demethos"
					}],
		Supreme:[{
						icon: "Supreme.png",
						name: "Channel 1",
						address: "109.234.77.38",
						port: "8597",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Supreme"
					},
					{
						icon: "Supreme.png",
						name: "Cash Shop",
						address: "109.234.77.13",
						port: "8791",
						interval: 5000,
						values: [],
						isMapleStoryGameServer: true,
						rel: "Supreme"
					}],
		InternalWebsites:[{
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
				}],
		ExternalWebsites:[{
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
					name: "CDN",
					sub: "MSE",
					address: "mapleeuropecdn.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
				},
				{
					icon: "fa-external-link",
					name: "CSD",
					sub: "MSE",
					address: "mapleeuropecsd.nexoneu.com",
					port: "80",
					interval: 60000,
					rel: "nexoneu.com"
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
				}]
	},
	GMS: {
		Login: [{
					icon: "Mushroom.png",
					name: "Login 1",
					address: "8.31.99.135",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 2",
					address: "8.31.99.136",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 3",
					address: "8.31.99.137",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 4",
					address: "8.31.99.138",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 5",
					address: "8.31.99.141",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 6",
					address: "8.31.99.142",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 7",
					address: "8.31.99.143",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 8",
					address: "8.31.99.200",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 9",
					address: "8.31.99.201",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "Mushroom.png",
					name: "Login 10",
					address: "8.31.99.244",
					port: "8484",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				}],
		StarPlanet:[
				{
					icon: "StarPlanet.png",
					name: "Star Planet 1",
					address: "8.31.99.241",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 2",
					address: "8.31.99.241",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 3",
					address: "8.31.99.241",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 4",
					address: "8.31.99.241",
					port: "8588",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 5",
					address: "8.31.99.242",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 6",
					address: "8.31.99.242",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 7",
					address: "8.31.99.242",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Star Planet 8",
					address: "8.31.99.242",
					port: "8588",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Mini Games 1",
					address: "8.31.99.243",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "StarPlanet.png",
					name: "Mini Games 2",
					address: "8.31.99.243",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				}],
		BossArena:[
				{
					icon: "BossArena.png",
					name: "Boss Arena 1",
					address: "8.31.99.132",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "BossArena.png",
					name: "Boss Arena 2",
					address: "8.31.99.132",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				},
				{
					icon: "BossArena.png",
					name: "Boss Arena 3",
					address: "8.31.99.132",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				}],
		CrossWorld:[
				{
					icon: "Generic.png",
					name: "Cross World",
					address: "8.31.99.133",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Login"
				}],
		Scania:[{
					icon: "Scania.png",
					name: "Channel 1",
					address: "8.31.99.211",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 2",
					address: "8.31.99.212",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 3",
					address: "8.31.99.212",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 4",
					address: "8.31.99.212",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 5",
					address: "8.31.99.213",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 6",
					address: "8.31.99.213",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 7",
					address: "8.31.99.213",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 8",
					address: "8.31.99.214",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 9",
					address: "8.31.99.214",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 10",
					address: "8.31.99.214",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 11",
					address: "8.31.99.215",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 12",
					address: "8.31.99.215",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 13",
					address: "8.31.99.215",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 14",
					address: "8.31.99.216",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 15",
					address: "8.31.99.216",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 16",
					address: "8.31.99.216",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 17",
					address: "8.31.99.217",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 18",
					address: "8.31.99.217",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 19",
					address: "8.31.99.217",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Channel 20",
					address: "8.31.99.211",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Cash Shop",
					address: "8.31.99.144",
					port: "8785",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Monster Life",
					address: "8.31.99.205",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				},
				{
					icon: "Scania.png",
					name: "Evolution Lab",
					address: "8.31.99.197",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Scania"
				}],
		Bera:[
				{
					icon: "Bera.png",
					name: "Channel 1",
					address: "8.31.99.218",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 2",
					address: "8.31.99.219",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 3",
					address: "8.31.99.219",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 4",
					address: "8.31.99.219",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 5",
					address: "8.31.99.220",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 6",
					address: "8.31.99.220",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 7",
					address: "8.31.99.220",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 8",
					address: "8.31.99.221",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 9",
					address: "8.31.99.221",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 10",
					address: "8.31.99.221",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 11",
					address: "8.31.99.222",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 12",
					address: "8.31.99.222",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 13",
					address: "8.31.99.222",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 14",
					address: "8.31.99.223",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 15",
					address: "8.31.99.223",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 16",
					address: "8.31.99.223",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 17",
					address: "8.31.99.224",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 18",
					address: "8.31.99.224",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 19",
					address: "8.31.99.224",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Channel 20",
					address: "8.31.99.218",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Cash Shop",
					address: "8.31.99.192",
					port: "8785",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Monster Life",
					address: "8.31.99.205",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				},
				{
					icon: "Bera.png",
					name: "Evolution Lab",
					address: "8.31.99.197",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Bera"
				}],
		Broa:[
				{
					icon: "Broa.png",
					name: "Channel 1",
					address: "8.31.99.154",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 2",
					address: "8.31.99.225",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 3",
					address: "8.31.99.225",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 4",
					address: "8.31.99.226",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 5",
					address: "8.31.99.226",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 6",
					address: "8.31.99.226",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 7",
					address: "8.31.99.239",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 8",
					address: "8.31.99.227",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 9",
					address: "8.31.99.227",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 10",
					address: "8.31.99.227",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 11",
					address: "8.31.99.228",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 12",
					address: "8.31.99.228",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 13",
					address: "8.31.99.228",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 14",
					address: "8.31.99.229",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 15",
					address: "8.31.99.229",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 16",
					address: "8.31.99.229",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 17",
					address: "8.31.99.230",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 18",
					address: "8.31.99.230",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 19",
					address: "8.31.99.230",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Channel 20",
					address: "8.31.99.239",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Cash Shop",
					address: "8.31.99.192",
					port: "8786",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Monster Life",
					address: "8.31.99.205",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				},
				{
					icon: "Broa.png",
					name: "Evolution Lab",
					address: "8.31.99.197",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: "Broa"
				}],
		// Some servers have shared IP addresses, like Bellocan and Nova
		Bellocan: function(name) {
			return [{
					icon: name + ".png",
					name: "Channel 1",
					address: "8.31.99.225",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 2",
					address: "8.31.99.154",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 3",
					address: "8.31.99.155",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 4",
					address: "8.31.99.155",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 5",
					address: "8.31.99.156",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 6",
					address: "8.31.99.156",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 7",
					address: "8.31.99.157",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 8",
					address: "8.31.99.157",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 9",
					address: "8.31.99.158",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 10",
					address: "8.31.99.158",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 11",
					address: "8.31.99.159",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 12",
					address: "8.31.99.159",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 13",
					address: "8.31.99.160",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 14",
					address: "8.31.99.160",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 15",
					address: "8.31.99.161",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 16",
					address: "8.31.99.161",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 7",
					address: "8.31.99.162",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 18",
					address: "8.31.99.162",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 19",
					address: "8.31.99.163",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 20",
					address: "8.31.99.163",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Cash Shop",
					address: "8.31.99.194",
					port: "8785",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Monster Life",
					address: "8.31.99.206",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Evolution Lab",
					address: "8.31.99.198",
					port: "8587",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				}]
		},
		Khaini:[{
				icon: "Khaini.png",
				name: "Channel 1",
				address: "8.31.99.145",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 2",
				address: "8.31.99.145",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 3",
				address: "8.31.99.146",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 4",
				address: "8.31.99.146",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 5",
				address: "8.31.99.147",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 6",
				address: "8.31.99.147",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 7",
				address: "8.31.99.148",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 8",
				address: "8.31.99.148",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 9",
				address: "8.31.99.149",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 10",
				address: "8.31.99.149",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 11",
				address: "8.31.99.150",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 12",
				address: "8.31.99.150",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 13",
				address: "8.31.99.151",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 14",
				address: "8.31.99.151",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 15",
				address: "8.31.99.152",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 16",
				address: "8.31.99.152",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 17",
				address: "8.31.99.152",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 18",
				address: "8.31.99.153",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 19",
				address: "8.31.99.153",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Channel 20",
				address: "8.31.99.153",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Cash Shop",
				address: "8.31.99.193",
				port: "8786",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Monster Life",
				address: "8.31.99.206",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			},
			{
				icon: "Khaini.png",
				name: "Evolution Lab",
				address: "8.31.99.198",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Khaini"
			}],
		Mardia: function(name) {
			return [{
				icon: name + ".png",
				name: "Channel 1",
				address: "8.31.99.164",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 2",
				address: "8.31.99.164",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 3",
				address: "8.31.99.165",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 4",
				address: "8.31.99.165",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 5",
				address: "8.31.99.166",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 6",
				address: "8.31.99.166",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 7",
				address: "8.31.99.167",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 8",
				address: "8.31.99.167",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 9",
				address: "8.31.99.168",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 10",
				address: "8.31.99.168",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 11",
				address: "8.31.99.169",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 12",
				address: "8.31.99.169",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 13",
				address: "8.31.99.170",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 14",
				address: "8.31.99.170",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 15",
				address: "8.31.99.171",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 16",
				address: "8.31.99.171",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 17",
				address: "8.31.99.172",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 18",
				address: "8.31.99.172",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 19",
				address: "8.31.99.173",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Channel 20",
				address: "8.31.99.173",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Cash Shop",
				address: "8.31.99.194",
				port: "8786",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Monster Life",
				address: "8.31.99.207",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			},
			{
				icon: name + ".png",
				name: "Evolution Lab",
				address: "8.31.99.199",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: name
			}]
		},
		Demethos: function(name) {
			return [
				{
					icon: name + ".png",
					name: "Channel 1",
					address: "8.31.99.174",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 2",
					address: "8.31.99.174",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 3",
					address: "8.31.99.175",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 4",
					address: "8.31.99.175",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 5",
					address: "8.31.99.176",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 6",
					address: "8.31.99.176",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 7",
					address: "8.31.99.177",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 8",
					address: "8.31.99.177",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 9",
					address: "8.31.99.178",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 10",
					address: "8.31.99.178",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 11",
					address: "8.31.99.179",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 12",
					address: "8.31.99.179",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 13",
					address: "8.31.99.180",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 14",
					address: "8.31.99.180",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 15",
					address: "8.31.99.181",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 16",
					address: "8.31.99.181",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 17",
					address: "8.31.99.182",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 18",
					address: "8.31.99.182",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 19",
					address: "8.31.99.183",
					port: "8585",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Channel 20",
					address: "8.31.99.183",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Cash Shop",
					address: "8.31.99.195",
					port: "8785",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Monster Life",
					address: "8.31.99.207",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				},
				{
					icon: name + ".png",
					name: "Evolution Lab",
					address: "8.31.99.199",
					port: "8586",
					interval: 5000,
					values: [],
					isMapleStoryGameServer: true,
					rel: name
				}
			]
		},
		Renegades: [
			{
				icon: "Renegades.png",
				name: "Channel 1",
				address: "8.31.99.184",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 2",
				address: "8.31.99.184",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 3",
				address: "8.31.99.185",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 4",
				address: "8.31.99.185",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 5",
				address: "8.31.99.186",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 6",
				address: "8.31.99.186",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 7",
				address: "8.31.99.187",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 8",
				address: "8.31.99.187",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 9",
				address: "8.31.99.188",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 10",
				address: "8.31.99.188",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 11",
				address: "8.31.99.188",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 12",
				address: "8.31.99.189",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 13",
				address: "8.31.99.189",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 14",
				address: "8.31.99.189",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 15",
				address: "8.31.99.190",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 16",
				address: "8.31.99.190",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 17",
				address: "8.31.99.190",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 18",
				address: "8.31.99.191",
				port: "8585",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 19",
				address: "8.31.99.191",
				port: "8586",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Channel 20",
				address: "8.31.99.191",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Cash Shop",
				address: "8.31.99.195",
				port: "8786",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Monster Life",
				address: "8.31.99.207",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			},
			{
				icon: "Renegades.png",
				name: "Evolution Lab",
				address: "8.31.99.199",
				port: "8587",
				interval: 5000,
				values: [],
				isMapleStoryGameServer: true,
				rel: "Renegades"
			}
		],
		Websites:[
			{
				icon: "Mushroom.png",
				name: "MapleStory",
				sub: "",
				address: "maplestory.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Mushroom.png",
				name: "Tespia",
				sub: "www",
				address: "maplestoryt.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Nexon",
				sub: "www",
				address: "nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Nexon",
				sub: "SSL",
				address: "nexon.net",
				port: "443",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Forum",
				sub: "",
				address: "forum2.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Support",
				sub: "",
				address: "support.maplestory.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Download",
				sub: "",
				address: "download2.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "Nexon.png",
				name: "Press",
				sub: "",
				address: "press.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "Avatars",
				sub: "NXA",
				address: "msavatar1.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "Images",
				sub: "NXA",
				address: "nxcache.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "Admin",
				sub: "NXA",
				address: "admin.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "Event",
				sub: "NXA",
				address: "event.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "API",
				sub: "NXA",
				address: "api.nexon.net",
				port: "80",
				rel: "nexon.net"
			},
			{
				icon: "fa-globe",
				name: "Guard",
				sub: "NXA",
				address: "guard.nexon.net",
				port: "80",
				rel: "nexon.net"
			}
		]
	}
}

var checker = {
	isMainPage: ko.observable(selected == "Main"),
	selected: ko.observable(selected),
	subSelection: ko.observable(subSelection),
	getDefaultSubSelectionForVersion: GetDefaultSubSelectionForVersion,
	modifySettings: ModifySettings,
	defaultSettings: DefaultSettings,
	getServersCountForApplication: GetServersCountForApplication,
	versions: [
	{
		abbr: "EMS",
		name: "MapleStory Europe",
		available: true,
		complete: true,
		icon: "Kradia.png",
		short: "EUROPE",
		serverCount: [
			4,
			1,
			1
		],
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
					servers.EMS.Login,
					servers.EMS.Kradia,
					servers.EMS.Demethos,
					servers.EMS.Supreme
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
				servers.EMS.InternalWebsites
			])
		},
		selectedServers: ko.observable(null)
	},
	{
		name: "External Sites",
		description: "These are pages which are hosted on external servers.",
		selectedServers: ko.observable(null),
		icons: [],
		content: function() {
			return new PingModel([
				servers.EMS.ExternalWebsites
			])
		}
	}
	]
},
{
	abbr: "GMS",
	name: "MapleStory North America <small>(Global)</small>",
	available: true,
	complete: true,
	icon: "Scania.png",
	short: "North America (Global)",
	serverCount: [
		17
	],
	applications: [
		GameServer("Global", [
				{
					icon: "Mushroom.png",
					name: "Login",
					sub: ""
				},
				{
					icon: "Scania.png",
					name: "Scania",
					sub: "World"
				},
				{
					icon: "Bera.png",
					name: "Bera",
					sub: "World"
				},
				{
					icon: "Broa.png",
					name: "Broa",
					sub: "World"
				},
				{
					icon: "Bellocan.png",
					name: "Bellocan",
					sub: "World"
				},
				{
					icon: "Khaini.png",
					name: "Khaini",
					sub: "World"
				},
				{
					icon: "Mardia.png",
					name: "Mardia",
					sub: "World"
				},
				{
					icon: "Kradia.png",
					name: "Kradia",
					sub: "World"
				},
				{
					icon: "Yellonde.png",
					name: "Yellonde",
					sub: "World"
				},
				{
					icon: "Demethos.png",
					name: "Demethos",
					sub: "World"
				},
				{
					icon: "Galicia.png",
					name: "Galicia",
					sub: "World"
				},
				{
					icon: "El Nido.png",
					name: "El Nido",
					sub: "World"
				},
				{
					icon: "Zenith.png",
					name: "Zenith",
					sub: "World"
				},
				{
					icon: "Arcania.png",
					name: "Arcania",
					sub: "World"
				},
				{
					icon: "Chaos.png",
					name: "Chaos",
					sub: "World"
				},
				{
					icon: "Nova.png",
					name: "Nova",
					sub: "World"
				},
				{
					icon: "Renegades.png",
					name: "Renegades",
					sub: "World"
				}
			],
			[
				servers.GMS.Login,
				servers.GMS.StarPlanet,
				servers.GMS.BossArena,
				servers.GMS.CrossWorld,
				servers.GMS.Scania,
				servers.GMS.Bera,
				servers.GMS.Broa,
				servers.GMS.Bellocan('Bellocan'),
				servers.GMS.Khaini,
				servers.GMS.Mardia('Mardia'),
				servers.GMS.Mardia('Kradia'),
				servers.GMS.Mardia('Yellonde'),
				servers.GMS.Demethos('Demethos'),
				servers.GMS.Demethos('Galicia'),
				servers.GMS.Demethos('El Nido'),
				servers.GMS.Demethos('Zenith'),
				servers.GMS.Demethos('Arcania'),
				servers.GMS.Mardia('Chaos'),
				servers.GMS.Bellocan('Nova'),
				servers.GMS.Renegades
			]
		),
	{
		name: "Websites",
		description: "These are pages related to Nexon America's internal and external servers.",
		selectedServers: ko.observable(null),
		icons: [
			{
				icon: "Nexon.png",
				name: "nexon.net",
				sub: "World"
			}
		],
		content: function() {
			return new PingModel([
				servers.GMS.Websites
			])
		}
	}
	]
},
	{
		abbr: "JMS",
		name: "MapleStory Japan <small>日本</small>",
		available: false,
		complete: false,
		icon: "Galicia.png",
		short: "日本 | Japan",
		applications: [
		]
	},
	{
		abbr: "KMS",
		name: "MapleStory Korea <small>(한국)</small>",
		available: false,
		complete: false,
		icon: "Mushroom.png",
		short: "한국 | Korea",
		applications: [
		]
	},
	{
		abbr: "MSEA",
		name: "MapleStory SEA <small>(SG / MY)</small>",
		available: false,
		complete: false,
		icon: "Aquila.png",
		short: "Maple SEA SG / MY",
		applications: [
		]
	},
	{
		abbr: "MS2",
		name: "MapleStory 2 CBT <small>(메이플스토리2)</small>",
		available: false,
		complete: false,
		icon: "MS2Scania.png",
		short: "MapleStory 2 CBT",
		applications: [
		]
	}
],
updateSelectedServers: UpdateSelectedServers,
settings: {
	pingOffset: ko.observable(0),
	delay: ko.observable(readCookie("Delay") ? readCookie("Delay") : 100),
	clickToRefresh: ko.observable(readCookie("ClickToRefresh") == "false" ? false : false),
	fixPing: ko.observable(readCookie("FixPing") == "false" ? false : true),
	showConnection: ko.observable(readCookie("ShowConnection") == "false" ? false : true),
	showIPPort: ko.observable(readCookie("ShowIPPort") == "false" ? false : true),
	timeout: ko.observable(readCookie("Timeout") ? readCookie("Timeout") : 5000),
	showControls: ko.observable(false)
}
};

if (selected != 'Main') {
	GetPingOffset();
}

ko.applyBindings(checker);

function UpdateSelectedServers(parent, index, name) {
	console.log(parent, index, name);
	var name = name || checker.subSelection();

	if (loadingTimers.length > index) {
		window.clearInterval(loadingTimers[index]);
	}

	parent.selectedServers([{ loading: true, unknown: true }]);
	window.location.hash = '#' + checker.selected() + '-' + name;
	subSelection = name;
	checker.subSelection(name);

	loadingTimers.push(setTimeout(function() {
		var content = parent.content();
		parent.selectedServers(parent.content().servers());
	}, 300));
}

function GetCheckTimeout() {
	return checker.settings.timeout();
}

function GetPingOffset() {
	return new PingModel([
					{
						icon: "Mushroom.png",
						name: "Self",
						address: "127.0.0.1",
						port: "80",
						interval: 5000,
						values: [],
						unknown: true,
						rel: "Self"
					}]);
}

function GetDefaultSubSelectionForVersion(version) {
	switch (version) {
		case 'EMS':
			return 'Kradia';
		case 'GMS':
			return 'Login';
		default:
			return;
	}
}

function SetPingOffset(offset) {
	checker.settings.pingOffset(offset);
}

function ModifySettings() {
	var delay = checker.settings.delay(),
			timeout = checker.settings.timeout();

	createCookie("Delay", delay > 10000 ? 10000 : (delay < 50 ? 50 : delay), 3650);
	createCookie("Timeout", timeout > 60000 ? 60000 : (timeout < 500 ? 500 : timeout), 3650);
	createCookie("ShowIPPort", checker.settings.showIPPort(), 3650);
	createCookie("ShowConnection", checker.settings.showConnection(), 3650);
	createCookie("ClickToRefresh", checker.settings.clickToRefresh(), 3650);
	createCookie("FixPing", checker.settings.fixPing(), 3650);

	window.location.reload();
}

function DefaultSettings() {
	checker.settings.delay(checkDelay);
	checker.settings.timeout(checkTimeout);
	checker.settings.showIPPort(showIPPort);
	checker.settings.showConnection(showConnection);
	checker.settings.clickToRefresh(clickToRefresh);
	checker.settings.fixPing(fixPing);
}

function GetServersCountForApplication(version, name) {
	var v = false;
	for (var i = 0; i < checker.versions.length; i++) {
		if (checker.versions[i].name == version) {
			v = checker.versions[i];
			break;
		}
	}

	if (v == false) {
		return 0;
	}

	for (var j = 0; j < v.applications.length; j++) {
		if (v.applications[j].name == name) {
			return v.serverCount[j];
		}
	}

	return 0;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}