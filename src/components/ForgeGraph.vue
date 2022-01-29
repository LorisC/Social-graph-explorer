<template>
  <div id="graph" :style="{height: '100px', width: '100px'}"></div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import {watch} from "vue";

export default {
  name: "ForgeGraph",
  setup(props, context) {
    const graph = new ForceGraph3D({extraRenderers: [new CSS2DRenderer()]});
    graph.nodeThreeObject(node => {
      const nodeEl = document.createElement('div');
      nodeEl.textContent = node.id;
      nodeEl.style.color = node.color;
      nodeEl.className = 'node-label';
      return new CSS2DObject(nodeEl);
    })
    watch(
        () => [...props.nodes],
        (newNodes) => {
          const {nodes, links} = graph.graphData();
          graph.graphData({
            nodes: newNodes.map(node => {
              const oldNode = nodes.find(n => n.id === node.id);
              return oldNode || node;
            }),
            links
          })
        },
        {immediate: true}
    )
    watch(
        () => [...props.links],
        (newLinks) => {
          const {nodes, links} = graph.graphData();
          graph.graphData({
            links: newLinks.map(link => {
              const oldLink = links.find(l => l.target === link.target && l.source === link.source);
              return oldLink || link;
            }),
            nodes
          })
        },
        {immediate: true}
    )
    const links = graph.d3Force('link').distance(link => link.color === "white" ? 420 : 240)
    return {graph}
  },

  props: {
    nodes: {
      type: Array,
      default() {
        return []
      },
      validator(nodes) {
        return !nodes || !nodes.length
            || nodes.every(node => node.id !== undefined)
      }
    },
    links: {
      type: Array,
      default() {
        return []
      },
      validator(links) {
        return !links || !links.length
            || links.every(link => link.source !== undefined && link.target !== undefined)
      }
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.graph(this.$el)
          .enableNodeDrag(true)
          .onNodeClick(this.onNodeClick)
          .graphData({nodes: [], links: []});
    },
    onNodeClick(node) {
      this.$emit(node.id);
    },
  }

}
</script>

<style scoped lang="scss">

:deep(.node-label) {
  color: red;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 24px
}

</style>