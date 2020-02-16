# Delivery service using Graph
Computes the delivery cost of a certain route, the number of possible delivery route between two towns, and the cost of cheapest delivery route between two towns.

## Prerequisites 
- Node
- NPM

## Get Started 
1. Clone the repo: `https://github.com/iamrutvik/delivery-service-with-directed-graph`
2. Go to the project folder
3. Run `npm i`
4. Run `npm start`

#### Notes
- `npm start` will run `npm test` first.

## How to use?
Import the library, create a new object for graph and add vertices to get started.

Example:
```javascript
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

//cost of route
g.costOfRoute('A-B-E');

//all paths from source vertex to destination vertex
g.allPaths('E', 'D');

//specify conditions to find path between source and destination
//check 'Methods' section for more conditions
g.allPaths('E', 'D', {maxStop: 4});

//Find shortest path and its cost with Dijkstra
g.findPathWithDijkstra('E', 'D')

```

## Methods

1. printGraph()
    - Prints Graph on console with vertices, edge from each vertex and cost of edge

2. addVertex(source: string, destination: string, cost: number)
    - Adds vertex to the graph Adjacency List with an empty array as a value
    - Returns newly added vertex with an empty array
    
3. addEdge(source: string, destination: string, cost:number)
    - Add edge to the `destination` from the `source` with `cost`
    - Returns `source` vertex with edges and its cost
   
4. searchVertex(name: string)
    - Search vertex by name
    - Returns vertex and its edges, if exists
    
5. searchEdge(source: string, destination: string)
    - Search edge between `source` and `destination` vertices
    - Returns edge object
        ```javascript
        { vertex: string; cost: number; }
        ```
  
6. getAdjacentVertices(vertex)
    - Search for neighbour vertices
    - Returns edges to the neighbour vertices with cost
   
6. costOfRoute(path: string)
    - Takes route as `-` separated sting
    - Example: "A-B-C-E"
    - Returns cost of specified route as Number
    
7. allPaths(source: string, destination: string, conditions ?: object)
    - Takes `source`, `destination` and `conditions`
    - Mandatory Parameters:  `source` and `destination`. Conditions are optional.
    - `conditions` specifies the special conditions to be used while finding routes
        ```javascript
        {
           maxStop?: number //maximum allowed stops between routes
           maxCost?: number; // maximum allowed cost for entire route 
           allowSameRoute?: boolean // should allow using the same route between 2 vertices again or not
        }
        ```  
    - Returns array of possible routes
    
8. findPathWithDijkstra(source: string, destination: string)
    - Finds lowest cost path between `source` and `destination` using Dijkstra Algorithm
    - Returns object with possible cheapest route and it's cost
    ```javascript
       {
           path: string, //comma separated
           cost: number
       }
    ```      