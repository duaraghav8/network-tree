Retrieve Sitemaps in JSON format(s) compliant with your favourite Graph Visualization Library

#Usage
```network-tree``` abstracts away the complexity of organizing a sitemap into a json suitable for the visualization library you use. This allows you to focus on making pretty visualizations rather than worrying about structuring the data.

For example, here's a typical JSON that you have to pass to a D3 Tree Visualization:
```javascript
{
	"name": "Mike and Marcia",
	"children": [
		{
			"name": "Children",
			"children": [
				{ "name": "Mikael" }
			]
		},
		{
			"name": "Pets",
			"children": [
				{
					"name": "Dogs",
					"children": [
						{ "name": "Bleu" },
						{ "name": "Tagg" }
					]
				},
				{
					"name": "Cats",
					"children": [
						{ "name": "Bob" },
						{ "name": "Peanut" }
					]
				}
			]
		}
	]
}
```

If you want to create a visualization of a website's hierarchy, you will:

			1. Retrieve the sitemap XML
			2. Write a converter to convert the XML into JSON to be used for D3
			3. Inject the JSON to create art!
			
Now imagine you decide to port to sigma.js =(

To ease your day, network-tree handles Steps 1 & 2 for all the visualization libraries. Just plug in the domain name and your library, and get the appropriate JSON. Its THAT simple! :)

#Install
```bash
npm install network-tree
```

#API
```javascript
var networkTree = require ('network-tree');
```

Use the ```new networkTree ()``` method and supply the domain name for initial setup. For retrieving the sitemap, use the object's ```getSitemap ()``` method and pass an options object to specify which libraries you want the json for.

##Options
###Setup
```javascript
var tree = new networkTree ('example.com', {
	port: 80
});
```
If unspecified, port defaults to 80

###Retrieve Sitemap
```javascript
tree.getSitemap ({
	for: ['d3', 'sigma']
});
```
If unspecified, ```for``` defaults to []. So no json will be returned

#Example

###Express
```javascript
var networkTree = require ('network-tree'),
	app = require ('express') ();

var tree, domain = 'http://raghavdua.com/';

app
	.get ('/tree/:format', function (req, res) {
		if (req.params.format && req.params.format !== 'd3') return res.sendStatus (400);	//BAD REQUEST

		tree = new networkTree (domain);
		tree
			.getSitemap ({
				for: ['d3']
			})

			.then (function (jsons) {
				res.header ('Content-Type', 'text/plain');
				res.end (JSON.stringify (jsons ['d3'], null, 2));
			})

			.catch (function (err) {
				res.sendStatus (500);
			});
	})

	.listen (3000);
```

###Test:
```bash
curl http://localhost:8080/tree/d3
```

##Support
network-tree currently supports json format of only **D3.js**. Stay tuned!

#License
MIT