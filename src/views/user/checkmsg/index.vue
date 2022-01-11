<template>
  <div class="hr-container">
    <el-row>
      <el-col :span="15" :offset="4">
        <h1 class="text">USER： 查看招聘信息</h1>
      </el-col>
    </el-row>
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
            <el-button type="primary" size="small" @click="changeVisible = true">查看</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HRmModule',
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
      form: [{ // 从后端获取的数据放在这里
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月',
        content: '测试内容',
        workPlace: '上海'
      },
      {
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月',
        content: '测试内容',
        workPlace: '上海'
      },
      {
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月',
        content: '测试内容',
        workPlace: '上海'
      },
      {
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月',
        content: '测试内容',
        workPlace: '上海'
      }]
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
