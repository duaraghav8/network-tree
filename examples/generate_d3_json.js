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
				for: ['d3', 'sigma']	//produce the sitemap json for both d3.js tree and sigma.js tree
			})

			.then (function (jsons) {
				var requestedFormat = req.params.format;

				if (Object.keys (jsons).indexOf (requestedFormat) === -1) return res.sendStatus (404);
				res.json (jsons [requestedFormat]);
			})

			.catch (function (err) {
				console.log (err);
				res.sendStatus (500);
			});
	})

	.listen (3000);

/**
 *	Output = {
 *		"d3": {
 			<SITEMAP JSON in d3.js format>
 		},
 *		"sigma": {
 			<SITEMAP JSON in sigma.js format>
 		}
 *	}
 */