'use strict';

/*!
 * network-tree
 * Copyright(c) 2016 Raghav Dua
 * MIT Licensed
 */

var Promise = require ('es6-promise').Promise,
	SMG = require ('sitemap-generator');
var format = require ('./format');

function networkTree (domain, opts) {
	if (!(this instanceof networkTree)) return new networkTree (domain, opts);
	if (typeof opts !== 'object') opts = Object.create (null);

	this.g = new SMG (domain, {
		port: opts.port || 80,
		stripQuerystring: true
	});
}

networkTree.prototype.getSitemap = function (options) {
	var g = this.g;

	return new Promise (function (resolve, reject) {
		g.start ();

		g.on ('done', function (xml) {
			format (xml, options.for || [])
				.then (function (data) {
					resolve (data);
				})
				.catch (function (err) {
					reject (err);
				});
		});

		g.on ('clienterror', function (err, data) {
			reject (err);
		});
	});
};

module.exports = networkTree;