<template>
  <div>
    <book-info :info="info"></book-info>
    <div class="comment">
      <textarea v-model='comment'
                class="textarea"
                :maxlength="100"
                placeholder="评论区"
      ></textarea>
      <div class="location">
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import my_util from '@/my_util'
  import BookInfo from "@/components/BookInfo"
  export default {
    name: "index",
    components:{BookInfo},
    data() {
      return {
        book:"",
        info:{},
        location:"",
        phone:""
      }
    },
    computed:{
      sysInfo() {
        return wx.getSystemInfoSync();
      }

    },
    methods:{
      async getDetailInfo() {
        this.info = await my_util.get('/weapp/bookdetail',{id:this.book});
        console.log('detailInfo',info);
        wx.setNavigationBarTitle({title: this.info.title});

        return info;
      },
      getGeo(e) {
        //文档http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
        const baiduApiToken = "5G0SlM2Ntpa6uH7oLpTkN44VrlNAwYpe";
        const url = `http://api.map.baidu.com/geocoder/v2/`;
        if(e.target.value){
          wx.getLocation({
            type: 'wgs84',
            success : async (res) =>{
              this.location = res.latitude+','+res.longitude;
              wx.request({
                url,
                data:{
                  location:this.location,
                  output:'json',
                  ak:baiduApiToken
                },
                success: (res) =>
                {
                  this.location = res.data.result.addressComponent.city;
                  // console.log(res.data.result.addressComponent)
                }
              })

            }
          })
        }
        else{
          this.location = "";
        }

      },
      getPhone(e) {
        if(e.target.value){
          this.phone = this.sysInfo.model
        }
        else{
          this.phone = "";
        }

      }
    },
    mounted() {
      const queryObj = this.$root.$mp.query;
      console.log(queryObj);
      this.book = queryObj.id;
      this.getDetailInfo();
    }
  };
</script>

<style scoped lang='scss'>
.comment{
  margin-top:10px;
  .textarea{
    width:100%;
    height:200rpx;
    background:#eee;
    padding:10rpx;
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;
  }
}

</style>
