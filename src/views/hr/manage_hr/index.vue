<template>
  <div>
    <el-row>
      <el-col :span="15" :offset="4">
        <h1 class="text">HR : 管理简历招聘 入口 发布的简历信息</h1>
      </el-col>
    </el-row>
    <GetMsg />
  </div>

</template>

<script>
import GetMsg from '@/components/getMsg/GetMsg'
export default {
  name: 'HRmModule',
  components: {
    GetMsg
  },
  data() {
    return {
      formLabelWidth: '120px',
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
  }
}
</script>

<style lang="scss" scoped>
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
