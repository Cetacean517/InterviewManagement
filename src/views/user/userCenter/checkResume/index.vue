<template>
  <div class="container">
    <h1 v-if="showTag">您目前暂时没有投递简历</h1>
    <el-card v-for="(item,i) in form" :key="i" class="state">
      <el-descriptions v-if="!showTag" :title="item.position">
        <el-descriptions-item :label="lablename.type">{{ item.type }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.workPlace">{{ item.workPlace }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.position">{{ item.position }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.salaries">{{ item.salaries }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.frequency">{{ item.frequency }}</el-descriptions-item>
        <el-descriptions-item :label="lablename.period">{{ item.period }}</el-descriptions-item>
        <template slot="extra">
          <el-tag v-if="item.status === 0">未审核</el-tag>
          <el-tag v-if="item.status === 1" type="success">通过</el-tag>
          <el-tag v-if="item.status === 2" type="danger">不通过</el-tag>
        </template>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { getAllSend } from '@/api/employee'
export default {
  data() {
    return {
      showTag: false,
      lablename: { // 设置显示的标签
        'name': '姓名',
        'email': '邮箱',
        'phone': '手机',
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
        this.form = response.data
        console.log('获取投递的招聘信息和结果')
        console.log(this.form)
        if (this.form.length === 0) {
          this.showTag = true
        }
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
