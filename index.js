import {Graph} from "./lib/Graph.js";

let g = new Graph(6);
var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

// adding edges
g.addEdge('A', 'B',1);
g.addEdge('A', 'C',4);
g.addEdge('A', 'D',10);
g.addEdge('B', 'E',3);
g.addEdge('C', 'D',4);
g.addEdge('C', 'F',2);
g.addEdge('D', 'E',1);
g.addEdge('E', 'B',3);
g.addEdge('E', 'A',2);
g.addEdge('F', 'D',1);

console.log(g.printGraph());


console.log('Delivery cost for route A-B-E is', g.costOfRoute('A-B-E'));
console.log('Delivery cost for route A-D is', g.costOfRoute('A-D'));
console.log('Delivery cost for route E-A-C-F is', g.costOfRoute('E-A-C-F'));
console.log('Delivery cost for route A-B-F is', g.costOfRoute('A-D-F'));

console.log('Number of possible routes from E to D with a maximum of 4 stop without using the same route twice is', g.allPaths('E', 'D', {maxStop: 4}).length);

console.log('Number of possible routes from E to E without using the same route twice is', g.allPaths('E', 'E').length);

console.log('Number of possible routes from E to E such that delivery cost is less than 20 and same route can be used twice is', g.allPaths('E', 'E', {maxCost: 20, allowSameRoute: true}).length);

console.log('Cost of cheapest delivery route between E to D is', g.findPathWithDijkstra('E', 'D').cost)
console.log('Cost of cheapest delivery route between E to E is', g.findPathWithDijkstra('E', 'E').cost)
