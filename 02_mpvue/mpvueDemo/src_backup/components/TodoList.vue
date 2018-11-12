<template>
    <div>
        <input @keyup.enter="handleClick" type="text" v-model="newLesson" />
        <button @click="handleClick()">add</button>

        <ul>
            <li v-bind:key="id" v-bind:class="{ss:list.done}" v-on:click="change(id)" v-for="(list,id) in lists">
            {{ list.name }}
            </li>
        </ul>
        <div>{{cremain}}</div>
    </div>
</template>

<script>



export default
{
    data()
        {

            return {
                title:"hello VUE",
                "lists": [
                {name:'python',done:false},
                {name:'nodejs',done:false},
                {name:'vue',done:false}
                ],
                newLesson:"",
            }
        },
        methods: {
        handleClick() {
            this.lists.push({name:this.newLesson,done:false});
        },
        change(id) {
            this.lists[id].done = !this.lists[id].done;
        },

    },
    computed: {
        lineThrow() {
            return {
            "text-decoration": "line-through"
            }
        },
        cremain() {
        return this.lists.filter(v=>{return v.done===false}).length;
        }
    }
}
</script>

<style scoped>
    .ss{
        text-decoration: line-through;
        color : red
      }
</style>
