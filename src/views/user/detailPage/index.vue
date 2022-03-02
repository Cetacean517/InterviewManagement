<template>
  <div class="container">
    <!-- PART 1 信息名片 -->
    <el-card class="intro" style="margin-top:4rem">
      <h1 v-if="!shwButton" class="shbutton">快投！！！！急招！！！！！</h1>
      <!-- 第一部分 岗位的信息 -->
      <!-- 1. 标题，薪资信息 -->
      <el-row class="headline">
        <el-col :span="18" :offset="1">
          <h1 class="title">{{ submitform.title }}</h1>
        </el-col>
        <el-col :span="3">
          <h1 class="salary">{{ submitform.salaries }}</h1>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="23" :offset="1">
          <!-- 类型 -->
          <span class="tag">{{ lablename.type }}  : </span>
          <el-tag class="my-tag item">{{ submitform.type }}</el-tag>
          <!-- 职位 -->
          <span class="tag">{{ lablename.position }}  : </span>
          <span class="item">{{ submitform.position }}</span>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="23" :offset="1">
          <!-- 工作地点 -->
          <span class="tag">{{ lablename.workPlace }}  : </span>
          <span class="item">{{ submitform.workPlace }}</span>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="23" :offset="1">
          <!-- 工作频率 -->
          <span class="tag">{{ lablename.frequency }}  : </span>
          <span class="item">{{ submitform.frequency }}</span>
          <!-- 工作周期 -->
          <span class="tag">{{ lablename.period }}  : </span>
          <span class="item">{{ submitform.period }}</span>
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="23" :offset="1">
          <el-alert title="公告声明：本站禁止发布刷单、刷钻、优惠券推广类信息，求职者因从事此类工作造成经济损失，本站不承担任何责任！" type="warning" show-icon style="width:95%; font-weight:bold;" />
        </el-col>
      </el-row>
    </el-card>
    <!-- PART 2 岗位信息介绍 -->
    <el-card class="intro">
      <!-- 第二部分 岗位的介绍 -->
      <el-row class="el-row font">
        <!-- 具体介绍 标题 -->
        <el-col :span="23" :offset="1">
          <h3>{{ lablename.content }} </h3>
        </el-col>
        <!-- 具体介绍内容 -->
        <el-col :span="23" :offset="1">
          <span>{{ submitform.content }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="18">
          <el-button v-if="shwButton" class="font" type="warning" size="large" round style="padding:1.5rem 3rem; border-radius: 30px; margin-top:4rem" @click="todoLink">{{ buttonName }}</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getJobInformation } from '@/api/hr'
import { getJobInformation_USR } from '@/api/employee'
export default {
  name: 'DetailPage',
  data() {
    return {
      shwButton: true,
      buttonName: '',
      index: '',
      id: '', // 查看的招聘信息的编号
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
      submitform: { // 从后端获取的数据放在这里
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月',
        content: '负责公司海外或中国区域年度/半年度不动产交易规划；基于公司业务发展战略和用户需求，制定并实施专业化的不动产供应方案；负责区域不动产交易能力建设，提升不动产交易专业能力。',
        workPlace: '上海'
      }
    }
  },
  created: function() {
    // 在Html页面出现之前渲染
    // 测试网页之间的变量传递
    this.buttonName = this.$route.params.name
    if (typeof this.buttonName === 'undefined') this.shwButton = false
    this.id = this.$route.params.id
  },
  mounted: function() {
    if (this.buttonName === '我要查看') {
      this.getJobInfo_HR()
    } else {
      this.getJobInfo_USER()
    }
  },
  methods: {
    getJobInfo_HR() {
      getJobInformation().then(response => {
        this.index = response.data[this.id].id
        this.submitform = response.data[this.id]
        this.submitform.title = '招聘' + this.submitform.position
      })
    },
    getJobInfo_USER() {
      getJobInformation_USR().then(response => {
        this.index = response.data[this.id].id
        this.submitform = response.data[this.id]
        this.submitform.title = '招聘' + this.submitform.position
      })
    },
    todoLink() {
      if (this.buttonName === '我要查看') {
        this.$router.push({ name: 'ResumeBrief', params: { name: '我要查看', id: this.index }})
      } else if (this.buttonName === '我要投递') {
        this.$router.push({ name: 'DoResume', params: { name: '我要投递', id: this.index }})
      }
    }
  }
}
</script>

<style lang="scss">
.el-row{
    margin-bottom:2rem
}
.el-tag{    // 修改el-tag的一些原生样式
    height: inherit;
    padding: auto;
    line-height: inherit;
    font-size: inherit;
}
.el-alert__title{
    font-size:20px;
}
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .font{  // 设置介绍部分的字体大小
    font-size: 1.2rem;
}
    .intro{
        font-size: 1.2rem;
        width: 80%;
        margin: 20px;
        .headline{
            margin-top: 50px;
            margin-left: 20px;
            .salary{
                color:rgb(199, 84, 39);
            }
        }
        .shbutton{
          width:90%;
          margin: 5px 5px 0px 40px;
        }
        .tag{
            font-weight:500;
            font-style: italic;
        }
        .item{
            margin-right: 10rem;
            font-weight: bold;
            padding: 10px;
        }
}
}
</style>
