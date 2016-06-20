'use strict';

/*!
 * network-tree
 * Copyright(c) 2016 Raghav Dua
 * MIT Licensed
 */

function populate (obj, fields) {
	if (!fields.length) return obj;

	var name = fields.shift ();
	if (!obj.name) {
		obj.name = name
		obj.children = [];
	}

	for (var c in obj.children) {
		var curr = obj.children [c];
		if (curr.name === fields [0]) {
			child = curr;
			return populate (curr, fields);
		}
	}

	var child = Object.create (null);
	fields.length > 0 && obj.children.push (child);
	populate (child, fields);
}

 module.exports = function (links, cb) {
 	var json = Object.create (null);

 	links.forEach (function (u) {
 		u = u.slice (-1) === '/' ? u.slice (0, -1) : u;
 		populate (json, u.split ('/').slice (2));
 	});

 	console.log (JSON.stringify (json, null, 2));
 	cb (null, {hello:'world'});
 };