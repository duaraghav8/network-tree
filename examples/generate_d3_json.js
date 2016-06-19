'use strict';

/**
 *	An example of network-tree's API
 */

var networkTree = require ('network-tree'),
	app = require ('express') ();
var tree, treeCache,
	domain = 'http://raghavdua.com/';

app
	.get ('/tree', function (req, res) {
		if (treeCache) return res.json (treeCache);

		tree = new networkTree (domain);
		tree
			.get ({
				format: 'd3'		//d3,sigma
			})
			.then (function (json) {
				treeCache = json;
				res.json (json);
			})
			.catch (function (err) {
				console.log (err);
				res.sendStatus (500);
			});
	})

	.listen (3000);