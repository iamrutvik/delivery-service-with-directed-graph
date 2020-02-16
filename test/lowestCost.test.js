import {Graph} from "./../lib/Graph.js";
import chai from "chai"
let expect = chai.expect
let should = chai.should()
import 'mocha';

const createGraph = () => {
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

    return g;

}

describe('Graph: Cost of Cheapest Route', () => {

    it('Doesn\'t allow if any of the vertices\' datatype don\'t match', () => {
        const graph = createGraph();
        expect(() => graph.findPathWithDijkstra(1, 1)).throw('Data type mismatch, expects source, destination as string');
    });

    it('Doesn\'t allow if any of the vertices doesn\'t exists', () => {
        const graph = createGraph();
        expect(() => graph.findPathWithDijkstra('E', 'G')).throw('Invalid source or destination vertex');
    });

    it('Doesn\'t allow if any of the argument not passed', () => {
        const graph = createGraph();
        expect(() => graph.findPathWithDijkstra('A')).throw('Data type mismatch, expects source, destination as string');
    });

    it('Returns lowest cost between between two routes', () => {
        const graph = createGraph();
        const route = graph.findPathWithDijkstra('E', 'D');
        should.equal(route.cost, 9);
    });

    it('Returns lowest cost between between node and itself', () => {
        const graph = createGraph();
        const route = graph.findPathWithDijkstra('E', 'E');
        should.equal(route.cost, 6);
    });
});
