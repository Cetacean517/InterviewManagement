<template>
  <div class="container">
    <div v-for="(item,i) in form" :key="i" class="state">
      <el-descriptions :title="item.title">
        <el-descriptions-item :label="lablename.type">{{ item.type }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.workPlace">{{ item.workPlace }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.position">{{ item.position }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.salaries">{{ item.salaries }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.frequency">{{ item.frequency }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.period">{{ item.period }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.now_location">{{ item.now_location }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.education">{{ item.education }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.workExperience">{{ item.workExperience }}</el-descriptions-item>
        <template slot="extra">
          <el-tag>{{ item.state }}</el-tag>
        </template>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { getAllSend } from '@/api/employee'
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
        'selfIntroduction': '自我介绍',
        title: '标题',
        type: '招聘类型',
        position: '岗位',
        workPlace: '工作地点',
        salaries: '薪资',
        frequency: '工作频率',
        period: '工作时长',
        content: '具体介绍'
      },
      form: []
    }
  },
  created: function() {
    this.getAll()
  },
  methods: {
    getAll() {
      getAllSend().then(response => {
        // this.form = response.data
        console.log(response.data)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .container{
    margin:90px 80px 20px 80px;
  }

  .state{
    width: 95%;
    margin: 20px 50px 50px 25px;
  }
</style>
