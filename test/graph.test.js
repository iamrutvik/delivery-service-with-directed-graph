import {Graph} from "./../lib/Graph.js";
import chai from "chai"
let expect = chai.expect
let should = chai.should()
import 'mocha';

describe('Graph: Add vertices & Edges', () => {
    it('Doesn\'t allow to add vertex with wrong type expect string', () => {
        const graph = new Graph(1);
        expect(() => graph.addVertex(1)).throw('Data type mismatch, expects vertex as string');
    });

    it('Doesn\'t allow to add Existing Vertex', () => {
        const graph = new Graph(1);
        graph.addVertex('A');
        expect(() => graph.addVertex('A')).throw('Vertex A already exists');
    });

    it('Add a new vertex', () => {
        const graph = new Graph(1);
        let vertex = graph.addVertex('A');
        should.equal(vertex.length, 0);
    });

    it('Doesn\'t allow to add edge with wrong data type', () => {
        const graph = new Graph(1);
        graph.addVertex('A');
        expect(() => graph.addEdge(1, 1,1)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    });

    it('Doesn\'t allow to add edge with negative weight', () => {
        const graph = new Graph(2);
        graph.addVertex('A');
        graph.addVertex('B');
        expect(() => graph.addEdge('A', 'B',-1)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    });

    it('Doesn\'t allow to add edge with zero weight', () => {
      const graph = new Graph(2);
      graph.addVertex('A');
      graph.addVertex('B');
      expect(() => graph.addEdge('A', 'B',0)).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    });

    it('Doesn\'t allow to add edge with string weight', () => {
      const graph = new Graph(2);
      graph.addVertex('A');
      graph.addVertex('B');
      expect(() => graph.addEdge('A', 'B','C')).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    });

    it('Doesn\'t allow to add duplicate edge', () => {
        const graph = new Graph(2);
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B',1);
        expect(() => graph.addEdge('A', 'B',1)).throw('Edge from A to B already exists');
    });

    it('Doesn\'t allow to add an edge without weight', () => {
      const graph = new Graph(2);
      graph.addVertex('A');
      graph.addVertex('B');
      expect(() => graph.addEdge('A', 'B')).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
    });

  it('Doesn\'t allow to add an edge without vertices and weight', () => {
    const graph = new Graph(2);
    graph.addVertex('A');
    graph.addVertex('B');
    expect(() => graph.addEdge()).throw('Data type mismatch, expects source, destination as string and cost as number greater than 1');
  });

    it('Add an edge', () => {
        const graph = new Graph(2);
        graph.addVertex('A');
        graph.addVertex('B');
        let edge = graph.addEdge('A', 'B',1);
        should.exist(edge, [{vertex:'B', cost: 1}]);
    });

});
