#Under Construction

Node Module to generate a Network's sitemap in json formats compliant with various graph visualization libraries.
Currently, the 'network' refers to websites, but will be expanded in future to generate sitemaps of all kinds of networks (social (like FB, Linkedin, Github), Affiliations, etc.)

Initial functionality plan:
User inputs a Website name and format ('d3', 'sigma', etc.) and out is the json in the specified format.

#Motivation
Allow the user to simply call a function to generate sitemap in the desired json format, which they can then directly inject into their Graph Visualization Library to create a visualization of the heirarchy