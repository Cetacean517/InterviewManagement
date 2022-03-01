<template>
  <div class="hr-container">
    <!-- 没有数据情况 -->
    <div v-if="isShow" class="nodata">
      <img src="./image/nodata.png" style="width:20rem">
      <h1>目前未发布招聘信息</h1>
    </div>
    <!-- 第一级页面 招聘信息展示 -->
    <div v-for="(item,i) in form" :key="i" class="hr-table">
      <el-card class="hr-card" shadow="hover" style="margin:'20rpx'">
        <el-descriptions :title="item.title" :model="item">
          <el-descriptions-item :label="lablename.type">
            <el-tag size="small">{{ item.type }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="lablename.position">{{ item.position }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.salaries">{{ item.salaries }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.frequency">{{ item.frequency }}</el-descriptions-item>
          <el-descriptions-item :label="lablename.period">{{ item.period }}</el-descriptions-item>
          <template slot="extra">
            <el-button type="primary" size="small" @click="changeVisible = true; gotoLink(i)">查看</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>

  </div></template>

<script>
import { getJobInformation } from '@/api/hr'
export default {
  name: 'GetMsg',
  data() {
    return {
      buttonName: '我要查看',
      formLabelWidth: '120px',
      isShow: false,
      lablename: { // 设置显示的标签
        title: '标题',
        type: '招聘类型',
        position: '岗位',
        workPlace: '工作地点',
        salaries: '薪资',
        frequency: '工作频率',
        period: '工作时长',
        content: '具体介绍'
      },
      submitform: { // 用于提交的表单；新增直接添加数据，保存内容写在里面；修改，先把数组中的内容填入，再修改
        title: '',
        type: '',
        position: '',
        salaries: '',
        frequency: '',
        period: '',
        content: '',
        workPlace: ''
      },
      form: []
    }
  },
  created: function() {
    this.getJobInfo()
  },
  methods: {
    getJobInfo() {
      getJobInformation().then(response => {
        this.form = response.data
        if (this.form.length === 0) {
          this.isShow = true
        }
      })
    },
    gotoLink(row) {
      // 传递的是这个列表中的第几行，后面调取具体内容，是调取所有的接口，然后再取第row项
      this.$router.push({
        name: 'DetailPage', params: { name: '我要查看', id: row }})
    }
  }
}
</script>

<style lang="scss" scoped>
  .nodata{
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hr {
  &-container {
    margin: 70px;
  }
  &-table{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx;
  }
  &-card{
   width:85%;
   padding: 50rpx;
  }
}
</style>
