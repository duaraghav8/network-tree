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
 		resolve ({
	 		"d3": {message: 'holaaa'},
 			"sigma": {message: 'holaaagma'},
 		});
 	});
 };