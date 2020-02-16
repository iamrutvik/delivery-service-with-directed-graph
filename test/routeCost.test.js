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

describe('Graph: Cost of Route', () => {
    it('Doesn\'t allow null route', () => {
        const graph = createGraph();
        expect(() => graph.costOfRoute('')).throw('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"')
    });

    it('Doesn\'t allow wrong route argument', () => {
        const graph = createGraph();
        expect(() => graph.costOfRoute('ABC')).throw('Invalid route. Expects route with "-" between nodes. Ex: ​​"A-B-C-D"');
    });

    it('Returns route cost between two vertices', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('A-D'), 10);
    });

    it('Returns route cost between three vertices', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('A-B-E'), 4);
    });

    it('Returns route cost between four vertices', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('E-A-C-F'), 8);
    });

    it('Returns No Such Route if no direct route A-D-F', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('A-D-F'), 'No Such Route');
    });

    it('Returns No Such Route if first vertex in path doesn\'t exists', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('Z-A-B'),'No Such Route');
    });

    it('Returns No Such Route if no direct route A-E-C-G, with one of the vertex does not exists', () => {
        const graph = createGraph();
        should.equal(graph.costOfRoute('A-E-C-G'), 'No Such Route');
    });
});
