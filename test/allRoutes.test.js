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

describe('Graph: All Routes Between Vertices', () => {

    it('Should not find route without any data', () => {
        const graph = createGraph();
        expect(() => graph.allPaths()).throw('Data type mismatch, expects source, destination as string and Conditions as JSON Object')
    });

    it('Should not find route without source or destination', () => {
        const graph = createGraph();
        expect(() => graph.allPaths(9)).throw('Data type mismatch, expects source, destination as string and Conditions as JSON Object')
    });

    it('Should not find route with incorrect data', () => {
        const graph = createGraph();
        expect(() => graph.allPaths(1,2,1)).throw('Data type mismatch, expects source, destination as string and Conditions as JSON Object')
    });

    it('Doesn\'t allow if any of the vertices doesn\'t exists', () => {
        const graph = createGraph();
        expect(() => graph.allPaths('E', 'G')).throw('Invalid source or destination vertex')
    });

    it('Returns number of possible routes between two nodes', () => {
        const graph = createGraph();
        let routes = graph.allPaths('E', 'D', {allowSameRoute: false});
        should.equal(routes.length, 613);
    });

    it('Returns number of possible routes with a maximum of 4 stop without using the same route twice', () => {
        const graph = createGraph();
        let routes = graph.allPaths('E', 'D', { maxStop: 4 });
        should.equal(routes.length, 4);
    });

    it('Returns number of possible routes without using same route twice from node to itself', () => {
        const graph = createGraph();
        let routes = graph.allPaths('E', 'E');
        should.equal(routes.length, 5);
    });

    it('Returns number of possible routes that delivery cost is less than 20 and same route can be used twice', () => {
        const graph = createGraph();
        let routes = graph.allPaths('E', 'E', { maxCost: 20, allowSameRoute: true });
        should.equal(routes.length, 29);
    });
});
