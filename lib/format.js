'use strict';

/*!
 * network-tree
 * Copyright(c) 2016 Raghav Dua
 * MIT Licensed
 */

var Promise = require ('es6-promise').Promise,
	async = require ('async');

module.exports = function (xml, formats) {
	return new Promise (function (resolve, reject) {
		var middlewares = loadMiddleware (formats, xml, reject);
		
		async.parallel (middlewares, function (err, jsons) {
			err ? reject (err) : resolve (jsons);
		});
	});
};

/**
 *	V8 doesn't optimize blocks containing try..catch, so we'll isolate this piece of code =)
 */
function loadMiddleware (formats, xml, reject) {
	var mw = {};
	
	formats.forEach (function (f) {
		try {
			mw [f] = require ('./formats/' + f).bind (null, xml);
		}
		catch (e) reject (e);
	});
	return mw;
}