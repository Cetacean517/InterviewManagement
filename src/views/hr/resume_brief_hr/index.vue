<template>
  <div class="container">
    <!-- 循环展示 -->
    <h1 v-if="showTag">目前暂时没有简历投递</h1>
    <div v-for="(item,i) in form" :key="i" class="resume">
      <el-card class="resume_brief" shadow="hover" style="margin:'20rpx'">
        <el-descriptions>
          <template slot="title">
            <h3>简历{{ i+1 }}</h3>
          </template>
          <el-descriptions-item :label="lablename.name">{{ item.name }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.nowLocation">{{ item.nowLocation }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.phone">{{ item.phone }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.email">{{ item.email }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.education">{{ item.education }}</el-descriptions-item>
          <template slot="extra">
            <el-button type="primary" size="medium" @click="todoLink(i)">查看</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAllResume } from '@/api/hr'
export default {
  data() {
    return {
      id: '',
      showTag: false,
      lablename: { // 设置显示的标签
        'name': '姓名',
        'email': '邮箱',
        'phone': '手机',
        'nowLocation': '现居地',
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
    this.id = this.$route.params.id
    this.getAll()
  },
  methods: {
    getAll() {
      getAllResume(this.id).then(response => {
        this.form = response.data
        if (this.form.length === 0) {
          this.showTag = true
        }
      })
    },
    todoLink(i) {
      this.$router.push({ name: 'UserResume', params: { id: this.id, row: i }})
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
