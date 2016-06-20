'use strict';

/*!
 * network-tree
 * Copyright(c) 2016 Raghav Dua
 * MIT Licensed
 */

var Promise = require ('es6-promise').Promise,
	async = require ('async'),
	extractLinks = require ('./utils/extract-links');

module.exports = function (xml, formats) {
	return new Promise (function (resolve, reject) {
		var links = extractLinks (xml);
		var middlewares = loadMiddleware (formats, links);

		if (!middlewares) return reject (new Error ('One or more Specified modules do not exist'));
		async.parallel (middlewares, function (err, jsons) {
			err ? reject (err) : resolve (jsons);
		});
	});
};

/**
 *	V8 doesn't optimize blocks containing try..catch, so we'll isolate this piece of code =)
 */
function loadMiddleware (formats, links) {
	var mw = Object.create (null);
	
	for (var i = 0; i < formats.length; i++) {
		var f = formats [i];
		try {
			mw [f] = require ('./formats/' + f).bind (null, links);	//exception raised ONLY if no such module exists
		}
		catch (e) {
			return;
		}
	}
	return mw;
}