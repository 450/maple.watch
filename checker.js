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
		this.img.onload = function (e) {
			console.log("Loaded", e);
			window.clearInterval(_that.timer);
			_that.inUse = false;
			_that.callback('responded', +(new Date()) - _that.start);
		};
		this.img.onerror = function (e, error, errorThrown) {
				console.log("Errored", e, error, errorThrown);
			if (_that.inUse) {
				window.clearInterval(_that.timer);
				_that.inUse = false;
				_that.callback('responded', +(new Date()) - _that.start, e);
				return true;
			}
		};
		this.start = +(new Date());
		try {
		this.img.src = "http://" + ip + "/?cachebreaker="+(+(new Date()));
		}
		catch (e) {
			console.log("Exception", e);
		}
		this.timer = setTimeout(function () {
			console.log("Timed out");
			if (_that.inUse) {
				_that.inUse = false;
				_that.callback('timeout', false);
			}
		}, 10000);
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
		description: "These are the MapleStory Europe game servers: the login server and each world's channel and cash shop servers.",
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
			address: "109.234.77.31",
			port: "8585",
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
			port: "8587",
			interval: 5000,
			values: [],
			rel: "Supreme"
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
	content: new PingModel([
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
		interval: 60000,
		rel: "nexoneu.com"
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
	description: "These are pages which are hosted on external servers.",
	icons: [],
	content: new PingModel([
	{
		icon: "fa-external-link",
		name: "Download",
		sub: "MSE",
		address: "12.34.56.78",
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
	]
	)
}
]
};

ko.applyBindings(checker);

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

$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
    console.log("AJAX Error", jqxhr);
});