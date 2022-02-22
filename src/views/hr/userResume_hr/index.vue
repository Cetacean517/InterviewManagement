<template>
  <div class="InfoTable">
    <h1>简历详情</h1>
    <!-- 表单 :rules="rules" -->
    <!-- 第一行 姓名、性别、出生年月 -->
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ form.sex }}</el-descriptions-item>
        <el-descriptions-item label="出生年月" :span="2">{{ form.birthday }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <h2 />
    <!-- 第二行 邮箱、手机号、出生地 -->
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="邮箱">{{ form.email }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ form.phone }}</el-descriptions-item>
        <el-descriptions-item label="现居地" :span="2">{{ form.now_location }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 第三行 教育背景 -->
    <!-- <div class="form-flex">
        <el-form-item :label="lablename.education">
          <el-input v-model="ruleForm.education" placeholder="教育背景" />
        </el-form-item>
      </div> -->

    <!-- *** 学历学位 感觉 education 改成这个更好？ -->
    <!-- 全日制 -->
    <h3>全日制教育信息</h3>
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="全日制教育学历">{{ form.graduatedschool }}</el-descriptions-item>
        <el-descriptions-item label="毕业院校">{{ form.eduschool }}</el-descriptions-item>
        <el-descriptions-item label="专业" :span="2">{{ form.major }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 在职 -->
    <h3>在职教育信息</h3>
    <div class="form-flex">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="在职教育学历">{{ form.educatedschool }}</el-descriptions-item>
        <el-descriptions-item label="毕业院校">{{ form.eduschool }}</el-descriptions-item>
        <el-descriptions-item label="专业" :span="2">{{ form.major }}</el-descriptions-item>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        'name': '姓名',
        'sex': '性别',
        'birthday': '出生年月',
        'email': '邮箱',
        'phone': '手机号',
        'now_location': '现居地',
        'graduatedschool': '全日制教育学历',
        'educatedschool': '在职教育学历',
        'eduschool': '毕业院校',
        'major': '专业',
        // education: '教育背景',
        'workExperience': '工作经历',
        'schoolExperience': '在校经历',
        'jobExperience': '职业经历',
        'selfIntroduction': '自我介绍'
      }
    }
  },
  created: function() {
    // this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.InfoTable{
  padding: 30px;
  margin:80px 130px 80px 130px;
}

</style>
