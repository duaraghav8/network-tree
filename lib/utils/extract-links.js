'use strict';

/*!
 * network-tree
 * Copyright(c) 2016 Raghav Dua
 * MIT Licensed
 */

 var whitespace = /\s*/g,
 	url = /https?:\/\/[^<]*/g;

 module.exports = function (xml) {
 	return xml
 		.replace (whitespace, '')
 		.match (url)
 		.slice (1);
 };