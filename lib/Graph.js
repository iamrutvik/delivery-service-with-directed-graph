import _ from 'lodash'
import {PriorityQueue} from "./PriorityQueue.js";

//type checking functions
function isNumber(x) {
  return x && typeof x === "number";
}

function isString(x) {
  return x && typeof x === "string";
}

function isObject(x) {
  return x && typeof x === "object";
}

export class Graph {
  // defining vertex array and
  // adjacent list
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  /**
   * Add new Vertex to the Graph
   * @param vertex
   */
  addVertex(vertex) {

    if (!isString(vertex)) {
      throw new Error('Data type mismatch, expects vertex as string');
    }
    if(this.searchVertex(vertex)){
      throw new Error(`Vertex ${vertex} already exists`);
    }
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = [];
    return this.adjacencyList[vertex];
  }

  /**
   * Add edge from source to destination with cost
   * @param source
   * @param destination
   * @param cost
   */
  addEdge(source, destination, cost) {
    if (!isString(source) || !isString(destination) || !isNumber(cost) || cost < 1) {
      throw new Error('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    }
    if(this.searchEdge(source, destination).length > 0){
      throw new Error(`Edge from ${source} to ${destination} already exists`);
    }
    this.adjacencyList[source].push({vertex:destination, cost: cost});
    return this.adjacencyList[source];
  }

  /**
   * Returns Graph in human readable form
   * @returns {string}
   */
  printGraph()
  {
    let graph = '';
    for(let vertex in this.adjacencyList){
      for(let v of this.adjacencyList[vertex]){
        graph += vertex + ' => ' + v.vertex + ' (' + v.cost + ')\n';
      }
    }
    return graph;
  }

  /**
   * If exists, Search and returns vertex in the graph, else null
   * @param vertex
   * @returns {null|object}
   */
  searchVertex(vertex) {
    if(!this.adjacencyList.hasOwnProperty(vertex)){
      return null;
    }
    return this.adjacencyList[vertex];
  }

  /**
   * Search and returns if edge exists between source and destination vertices
   * @param source
   * @param destination
   * @returns {null|object}
   */
  searchEdge(source, destination){
    if(!this.searchVertex(source) && !this.searchVertex(destination)){
      return null;
    }
    return this.adjacencyList[source].filter((e) => e.vertex === destination);
  }

  /**
   * Find & returns neighbours of vertex
   * @param vertex
   * @returns {null|object}
   */
  getAdjacentVertices(vertex) {
    if(!this.searchVertex(vertex)){
      return null;
    }
    return this.adjacencyList[vertex];

  }

  /**
   * Calculate the cost of route from the given path, Path is string with vertices joined by `-`
   * If path does not exists, returns "No Such Route"
   * @param path
   * @returns {string|number}
   */
  costOfRoute(path){

    //variable declaration
    let paths = path.split('-'), cost = 0;

    //Data validation
    if (paths.length < 2 ) {
      throw new Error('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"')
    }

    //check if source vertex exists from the route
    let sourceVertex = this.searchVertex(paths[0]);
    if (!sourceVertex) {
      return 'No Such Route';
    }

    //loop through all the vertices in the path
    for(let i = 0; i<paths.length-1; i++){
      // find the neighbours
      let adjecentVertices = _.filter(this.getAdjacentVertices(paths[i]), {vertex: paths[i+1]});

      //add to the cost
      if(adjecentVertices.length > 0){
        cost += adjecentVertices[0].cost;
      } else {
        return "No Such Route";
      }
    }

    //return cost
    return cost;
  }

  /**
   * Returns all possible routes between source and destination against given conditions
   * @param source
   * @param destination
   * @param conditions
   * @returns {*|Array}
   */
  allPaths(source, destination, conditions = {}) {

    //Data validation check
    if (!isString(source) || !isString(destination) || (conditions && !isObject(conditions))) {
      throw new Error('Data type mismatch, expects source, destination as string and Conditions as JSON Object');
    }

    if(!this.searchVertex(source) || !this.searchVertex(destination)){
      throw new Error('Invalid source or destination vertex');
    }

    //variable declaration
    let path = [];
    let cost = 0;
    let feasibleRoutes = [];

    //update conditions
    conditions.maxStop = conditions && !conditions.hasOwnProperty('maxStop') ? 20: conditions.maxStop;
    conditions.maxCost = conditions && !conditions.hasOwnProperty('maxCost') ? 20 : conditions.maxCost;
    conditions.allowSameRoute = conditions && !conditions.hasOwnProperty('allowSameRoute') ? false: conditions.allowSameRoute;


    //start DFS traversal
    feasibleRoutes = this.dfs(source, destination, path, feasibleRoutes, cost, conditions);
    return feasibleRoutes
  }

  /**
   * DFS traversal Driver Function to find path between source and destination
   * @param source
   * @param destination
   * @param path
   * @param feasibleRoutes
   * @param cost
   * @param conditions
   * @returns {Array}
   */
  dfs(source, destination, path, feasibleRoutes, cost, conditions){

    //push the source node to the path and calculate the cos
    path.push(source);
    cost = path.length > 1 ? this.costOfRoute(path.join('-')) : 0;

    if(conditions.allowSameRoute){

      //if algorithm can explore same route again & again then keep exploring
      //and stop when cost reach to the max alloed cost
      if(source === destination && cost !== 0 && cost < conditions.maxCost){
        feasibleRoutes.push({path: path.join('-'), cost: cost})
      }
      this.traversal(source, destination, path, feasibleRoutes, cost, conditions);
    } else {
      //if algorithm is not allowed to explore same route again then stop when we reach to destination
      //else keep exploring
      if(source === destination && cost !== 0){
        feasibleRoutes.push({path: path.join('-'), cost: cost})
      } else {
        this.traversal(source, destination, path, feasibleRoutes, cost, conditions)
      }
    }
    path.pop();
    return feasibleRoutes
  }

  /**
   * Continue Looking for the new path using DFS
   * @param source
   * @param destination
   * @param path
   * @param feasibleRoutes
   * @param cost
   * @param conditions
   */
  traversal(source, destination, path, feasibleRoutes, cost, conditions){
    //find the neighbours and continue traversing from that node, keep exploring
    let neighbours = this.getAdjacentVertices(source);
    if(neighbours.length >= 1){
      if(conditions.maxStop && path.length <= conditions.maxStop){
        for (let i in neighbours) {
          let getElem = neighbours[i].vertex;
          this.dfs(getElem, destination, path, feasibleRoutes, cost, conditions);
        }
      }
    }
  }

  /**
   * Find Shortest path and it's cost between source & destination using Dijkstra Algorithm using Priority Queue
   * @param source
   * @param destination
   * @returns {{path: *[], cost: *}}
   */
  findPathWithDijkstra(source, destination) {

    //Data validation check
    if (!isString(source) || !isString(destination)) {
      throw new Error('Data type mismatch, expects source, destination as string');
    }

    if(!this.searchVertex(source) || !this.searchVertex(destination)){
      throw new Error('Invalid source or destination vertex');
    }

    //initialise variables and priority queue with time to reach source as 0
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[source] = 0;

    //assign time to reach rest of the vertices as Infinity
    this.vertices.forEach(vertex => {
      if (vertex !== source) {
        times[vertex] = Infinity
      }
    });

    //add source in priority queue to start with
    pq.enqueue([source, 0]);

    //Traverse priority queue until its empty
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];

      //find the neighbours and add their weight to the time it took to get to the source node
      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.cost;

        //check if the calculated time is less than the time we currently have on file for this neighbor
        if (time <= times[neighbor.vertex] || (times[neighbor.vertex] === 0 && neighbor.vertex === source)) {

          //update times, add this step to backtrace, and add the neighbor to priority queue
          times[neighbor.vertex] = time;
          backtrace[neighbor.vertex] = currentNode;
          pq.enqueue([neighbor.vertex, time]);
        }
      });
    }

    //Look through backtrace to find the path to reach to the destination
    let path = [destination];
    let lastStep = destination;
    if(source === destination){
      path.unshift(source, backtrace[source])
    } else {
      while(lastStep !== source) {
        path.unshift(backtrace[lastStep])
        lastStep = backtrace[lastStep]
      }
    }

    //return the shortest path and it's cost
    return {
      path: path,
      cost: times[destination]
    }
  }

}

