<template>
  <el-card class="InfoTable">
    <h1>我的简历</h1>
    <!-- 表单 :rules="rules" -->
    <el-form ref="ruleForm" status-icon label-position="right" :model="ruleForm">
      <!-- 第一行 姓名、性别、出生年月 -->
      <div class="form-flex">
        <el-form-item :label="lablename.name" prop="name">
          <el-input v-model="ruleForm.name" placeholder="姓名" autocomplete="on" @input="change($event)" />
        </el-form-item>
        <el-form-item :label="lablename.sex" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择您的性别" style="width:185px">
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-form-item :label="lablename.birthday" required>
          <el-form-item prop="birthday">
            <el-date-picker v-model="ruleForm.birthday" type="month" placeholder="选择年份" style="width: 100%" value-format="yyyy年MM月dd日" />
          </el-form-item>
        </el-form-item>
      </div>
      <!-- 第二行 邮箱、手机号、出生地 -->
      <div class="form-flex">
        <el-form-item :label="lablename.email" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="on" placeholder="邮箱" />
        </el-form-item>
        <el-form-item :label="lablename.phone" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="on" placeholder="手机号" />
        </el-form-item>
        <el-form-item :label="lablename.now_location" prop="now_location">
          <el-input v-model="ruleForm.now_location" autocomplete="on" placeholder="现居地" />
        </el-form-item>
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
        <el-form-item label="全日制教育学历">
          <el-input v-model="fullTimeDegree" placeholder="全日制学历" />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="fullTimeSchool" placeholder="毕业院校" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="fullTimeMajor" placeholder="专业" />
        </el-form-item>
      </div>
      <!-- 在职 -->
      <h3>在职教育信息</h3>
      <div class="form-flex">
        <el-form-item label="在职教育学历">
          <el-input v-model="jobDegree" placeholder="在职教育学历" />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="jobSchool" placeholder="毕业院校" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="jobMajor" placeholder="专业" />
        </el-form-item>
      </div>
      <el-alert title="若无该经历，无需填写" type="info" close-text="知道了" />

      <!-- 第四行 工作、在校、职业经历 -->
      <!-- 设置了prop 但没有写验证 可选填 -->
      <el-form-item :label="lablename.workExperience" prop="workExperience">
        <el-input v-model="ruleForm.workExperience" :autosize="{ minRows: 4}" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item :label="lablename.schoolExperience" prop="schoolExperience">
        <el-input v-model="ruleForm.schoolExperience" :autosize="{ minRows: 4}" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item :label="lablename.jobExperience" prop="jobExperience">
        <el-input v-model="ruleForm.jobExperience" :autosize="{ minRows: 4}" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item :label="lablename.selfIntroduction" prop="selfIntroduction">
        <el-input v-model="ruleForm.selfIntroduction" :autosize="{ minRows: 4}" type="textarea" :rows="4" />
      </el-form-item>

      <!--提交  -->
      <el-row style="display:flex; justify-content:flex-end;margin-right:100px">
        <el-button class="buttonline" type="primary" plain @click="submitForm('ruleForm')">提交</el-button>
        <el-button class="buttonline" type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
        <!-- <el-button class="buttonline" type="success" plain @click="$router.push('/entrance/menu')">完成</el-button> -->
      </el-row>

    </el-form>
  </el-card>
</template>

<script>
// import { getInfoData, sendInfoData } from '@/api/Info'
export default {
  name: 'DoResume',
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }

    return {
      iconFormVisible: false,
      dialogTitle: '增加',
      rowIndex: null,
      userInfo: {},
      // 教育信息（未拼接）
      fullTimeDegree: '',
      fullTimeSchool: '',
      fullTimeMajor: '',
      jobDegree: '',
      jobSchool: '',
      jobMajor: '',
      lablename: { // 设置显示的标签
        name: '姓名',
        sex: '性别',
        birthday: '出生年月',
        email: '邮箱',
        phone: '手机号',
        now_location: '现居地',
        // education: '教育背景',
        workExperience: '工作经历',
        schoolExperience: '在校经历',
        jobExperience: '职业经历',
        selfIntroduction: '自我介绍'
      },
      ruleForm: {
        // imageUrl: '', // 照片
        name: '',
        sex: '',
        birthday: null,
        email: '',
        phone: '',
        now_location: '',
        education: '',
        workExperience: '',
        schoolExperience: '',
        jobExperience: '',
        selfIntroduction: ''
      },
      // 设置表单验证，props 绑定表单对应项，每一个数组是一条验证规则
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择您的性别', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        email: [
          { type: 'string', required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        now_location: [{ required: true, message: '请输入您的现居地', trigger: 'blur' }]
      }
    }
  },
  created: function() {
    // this.getInfo()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 1. 先更新简历
          this.ruleForm.education = this.fullTimeDegree + '-' + this.fullTimeSchool + '-' + this.fullTimeMajor
          console.log(this.ruleForm)
          // sendInfoData(this.ruleForm).then(response => {
          // }).alert('submit!')
          // 完成后跳转;
          console.log(this.$route.params.name)
          if (!this.$route.params.name) {
            // 如果直接从侧边栏进入，则跳转到CheckMSG;
            this.$router.push({ name: 'CheckMSG' })
          } else {
            // 如果是从简历投递进入，先投递，后跳转到CheckResume
            // 需要调投递的接口
            this.$router.push({ name: 'CheckResume', params: { name: '我要投递' }})
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    change(e) {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.InfoTable{
  padding: 30px;
  padding-left: 50px;
  margin:100px 150px 100px 150px;
}
.buttonline{
  margin-right: 10px;
}
.title {
  font-size: 1rem;
  padding-left: 1.4rem;
  margin-bottom: 1.5rem;
  color: #606266;
  font-weight: bold;
}
/* 设置图片上传 */
.img{
  position: relative;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* width: 178px; */
  /* height: 178px; */
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.form-flex {
  width:70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
