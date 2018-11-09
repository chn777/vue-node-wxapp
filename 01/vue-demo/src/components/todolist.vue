<template>
    <div>
    <input @keyup.enter="handleClick" type="text" v-model="newLesson" />
      <button @click="handleClick()">add</button>

      <ul>
        <li :class="{ss:list.done}" @click="change(id)" v-for="(list,id) in lists">
          {{ list.name }}
        </li>
      </ul>
      <div>{{cremain}}</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>