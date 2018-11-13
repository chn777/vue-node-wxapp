<template>
	<div>
    <ul>
      <li v-for="item of list" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  import my_util from '@/my_util'
	export default {
		name: "index",
    data() {
		  return {
		    list:[]
      }
    },
    methods:{
      async getBookList() {
        try
        {
          const res = await my_util.get('/weapp/booklist');
          console.log(res);
          this.list = res.list;

        }
        catch (e) {
          console.log(e);
        }

      },
    },
    created(){
		  this.getBookList()
    }
	}
</script>

<style scoped>

</style>
