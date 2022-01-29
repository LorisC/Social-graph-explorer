<script setup>
import {ref, toRefs, reactive, watch} from 'vue'
import ForgeGraph from "./ForgeGraph.vue";
import ADDRESS_FOLLOW_RELATION from '../graphql/addressFollowRelation.query.gql'
import {useQuery} from "@vue/apollo-composable";

defineProps({
  msg: String
})

const links = ref([]);
const nodes = ref([]);


const {result} = useQuery(
    ADDRESS_FOLLOW_RELATION,
    {
      address: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"
    }
);

nodes.value.push({id: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"})
watch(
    () => result,
    (newResult) => {
      if (newResult.value?.identity) {
        const followers = newResult.value.identity.followers.list.map(it => it.address);
        const followings = newResult.value.identity.followings.list.map(it => it.address);
        console.log(newResult.value.identity)
        nodes.value.push(
            ...followers.map(address=> ({id: address, color: "white"})),
            ...followings.map(address=> ({id: address, color: 'blue'}))
        )
        links.value.push(
            ...followers.map(address => ({
              source: address,
              target: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E",
              color: "white"
            })),
            ...followings.map(address => ({
              target: address,
              source: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E",
              color: 'blue'
            }))
        )
      }
    },
    {immediate: true, deep: true}
)


/*setInterval(() => {
  const id = nodes.value.length;
  nodes.value.push({id});
  links.value.push({source: id, target: Math.round(Math.random() * (id - 1))});
}, 1000)*/
</script>

<template>
  <forge-graph :links="links" :nodes="nodes"></forge-graph>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
