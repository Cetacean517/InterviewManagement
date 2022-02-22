<template>
  <div class="container">
    <!-- 循环展示 -->
    <div v-for="(item,i) in form" :key="i" class="resume">
      <el-card class="resume_brief" shadow="hover" style="margin:'20rpx'">
        <el-descriptions>
          <template slot="title">
            <h3>简历{{ i+1 }}</h3>
          </template>
          <el-descriptions-item :label="lablename.name">{{ item.name }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.now_location">{{ item.now_location }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.phone">{{ item.phone }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.email">{{ item.email }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.education">{{ item.education }}</el-descriptions-item>
          <template slot="extra">
            <el-button type="primary" size="medium" @click="todoLink">查看</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lablename: { // 设置显示的标签
        'name': '姓名',
        'email': '邮箱',
        'phone': '手机',
        'now_location': '现居地',
        'education': '教育背景',
        'workExperience': '工作经历',
        'schoolExperience': '在校经历',
        'jobExperience': '职业经历',
        'selfIntroduction': '自我介绍'
      },
      form: []
    }
  },
  created: function() {
    this.init() // 生成简历的模拟信息
    console.log(this.form)
  },
  methods: {
    init() {
      var demoResume = {}
      demoResume = {
        'name': '马不世面',
        'email': 'e.nowuclti@qq.com',
        'phone': '18687242622',
        'now_location': 'pariatur officia est dolor anim',
        'education': 'id ipsum cupidatat dolore',
        'workExperience': 'labore eu et ea',
        'schoolExperience': 'eiusmod sunt consequat',
        'jobExperience': 'labore laboris Duis Excepteur sunt',
        'selfIntroduction': 'occaecat in fugiat officia'
      }
      for (let i = 0; i < 100; i++) {
        this.form.push(demoResume)
      }
    },
    todoLink() {
      this.$router.push({ name: 'UserResume' })
    }
  }
}

</script>
.container{
    .resume{
        // 待完善
    }
}

<style lang="scss" scoped>

  .container{
    margin:90px 80px 20px 80px;
  }

  .resume{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx;
    margin: 10px;
  }

  .el-card{
    width: 85%;
    padding: 50rpx;
  }

</style>
