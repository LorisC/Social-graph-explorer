class GraphManager {
    constructor(start) {
        this.nodes = [];
        this.links = [];
    }

    addNode(node) {
        if (this.nodeExist(node)) return;
        this.nodes.push(nodes);
    }

    addLink(links) {
        if (this.linkExist(links)) return;
        this.links.push(links);
    }

    nodeExist(node) {
        return this.nodes.findIndex(n => n.id === node.id) !== -1;
    }

    linkExist(link) {
        return this.links.findIndex(l => l.id === link);
    }

    createLink(source, target, type, trx) {
        let id = `${source}_${target}_${type}`;
        if (trx) id += `_${trx}`
        return {
            source,
            target,
            type,
            id
        }
    }
}