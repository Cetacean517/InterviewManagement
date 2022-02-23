<template>
  <div class="InfoTable">
    <h1>简历详情</h1>
    <!-- 表单 :rules="rules" -->
    <!-- 第一行 姓名、性别、出生年月 -->
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <h2 />
    <!-- 第二行 邮箱、手机号、出生地 -->
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="邮箱">{{ form.email }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ form.phone }}</el-descriptions-item>
        <el-descriptions-item label="现居地" :span="2">{{ form.nowLocation }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- *** 学历学位 感觉 education 改成这个更好？ -->
    <!-- 全日制 -->
    <h3>全日制教育信息</h3>
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="全日制教育学历">{{ fullTimeDegree }}</el-descriptions-item>
        <el-descriptions-item label="毕业院校">{{ fullTimeSchool }}</el-descriptions-item>
        <el-descriptions-item label="专业" :span="2">{{ fullTimeMajor }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 第四行 工作、在校、职业经历 -->
    <!-- 设置了prop 但没有写验证 可选填 -->
    <h4 />
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="工作经历">{{ form.workExperience }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <h4 />
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="在校经历">{{ form.schoolExperience }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <h4 />
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="职业经历">{{ form.jobExperience }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <h4 />
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="自我介绍">{{ form.selfIntroduction }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="margin-top:20px; display: flex;justify-content: flex-end">
      <el-button type="primary" size="large" @click="Pass">通过</el-button>
      <el-button type="alarm" size="large" @click="Fail">不通过</el-button>
    </div>
  </div>
</template>

<script>
import { getAllResume, passResume } from '@/api/hr'
export default {
  data() {
    return {
      row: '', // 记录第几个简历
      id: '', // 记录那个招聘信息的简历
      fullTimeDegree: '',
      fullTimeSchool: '',
      fullTimeMajor: '',
      form: {
        id: '',
        'name': '姓名',
        'sex': '性别',
        'birthday': '出生年月',
        'email': '邮箱',
        'phone': '手机号',
        'now_location': '现居地',
        'major': '专业',
        'education': '教育背景',
        'workExperience': '工作经历',
        'schoolExperience': '在校经历',
        'jobExperience': '职业经历',
        'selfIntroduction': '自我介绍'
      }
    }
  },
  created: function() {
    this.row = this.$route.params.row
    this.id = this.$route.params.id
    this.getAll()
  },
  methods: {
    getAll() {
      getAllResume(this.id).then(response => {
        this.form = response.data[this.row]
        var eduList = response.data[this.row].education.split('-')
        this.fullTimeDegree = eduList[0]
        this.fullTimeSchool = eduList[1]
        this.fullTimeMajor = eduList[2]
      })
    },
    Pass() {
      const pass = { status: 1 }
      passResume(this.form.id, pass).then(response => {
        console.log('简历投递成功')
      })
    },
    Fail() {
      const fail = { status: 0 }
      passResume(this.form.id, fail).then(response => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.InfoTable{
  padding: 30px;
  margin:80px 130px 80px 130px;
}

</style>
