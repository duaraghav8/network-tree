'use strict';

/**
 *	An example of network-tree's API
 */

var networkTree = require ('network-tree'),
	app = require ('express') ();

var tree, domain = 'http://raghavdua.com/';

app
	.get ('/tree/:format', function (req, res) {
		tree = new networkTree (domain);
		tree
			.getSitemap ({
				for: ['d3']	//produce the sitemap json for d3.js
			})

			.then (function (jsons) {
				var requestedFormat = req.params.format;

				if (Object.keys (jsons).indexOf (requestedFormat) === -1) return res.sendStatus (404);
				res.header ('Content-Type', 'text/plain');
				res.end (JSON.stringify (jsons [requestedFormat], null, 2));
			})

			.catch (function (err) {
				res.sendStatus (500);
			});
	})

	.listen (3000);

/**
 *	tree = {
 *		"d3": {
 *			<SITEMAP JSON in d3.js format>
 *		},
 *	}
 */