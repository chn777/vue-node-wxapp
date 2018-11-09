// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  el:"#app",
  data() {
    return {
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
})
