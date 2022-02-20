<template>
  <el-card class="InfoTable">
    <h1>我的简历</h1>
    <!-- 表单 :rules="rules" -->
    <el-form ref="ruleForm" status-icon label-position="right" :model="ruleForm">
      <!-- 第一行 出生年月 -->
      <!-- <div class="form-flex1">
         <el-form-item :label="lablename.birthday" required style="margin-left: 100px">
          <el-form-item prop="birthday">
            <el-date-picker v-model="ruleForm.birthday" type="month" placeholder="选择年份" style="width: 100%;margin-left: 100px" value-format="yyyy年MM月dd日" />
          </el-form-item>
        </el-form-item>
      </div> -->
      <!-- 第二行 姓名邮箱、手机号、出生地 -->
      <div class="form-flex" style="width:90%">
        <el-form-item :label="lablename.name" prop="name">
          <el-input v-model="ruleForm.name" placeholder="姓名" autocomplete="on" @input="change($event)" />
        </el-form-item>
        <el-form-item :label="lablename.email" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="on" placeholder="邮箱" />
        </el-form-item>
        <el-form-item :label="lablename.phone" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="on" placeholder="手机号" />
        </el-form-item>
        <el-form-item :label="lablename.nowLocation" prop="nowLocation">
          <el-input v-model="ruleForm.nowLocation" autocomplete="on" placeholder="现居地" />
        </el-form-item>
      </div>

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
        <el-button v-if="isNull" class="buttonline" type="primary" plain @click="submitForm_One('ruleForm')">提交</el-button>
        <el-button v-if="!isNull" class="buttonline" type="primary" plain @click="submitForm_Two('ruleForm')">提交</el-button>
        <el-button class="buttonline" type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
        <!-- <el-button class="buttonline" type="success" plain @click="$router.push('/entrance/menu')">完成</el-button> -->
      </el-row>

    </el-form>
  </el-card>
</template>

<script>
import { addResume, getResume, fixResume } from '@/api/employee'
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
      isNull: true,
      userInfo: {},
      // 教育信息（未拼接）
      fullTimeDegree: '',
      fullTimeSchool: '',
      fullTimeMajor: '',
      lablename: { // 设置显示的标签
        name: '姓名',
        // birthday: '出生年月',
        email: '邮箱',
        phone: '手机号',
        nowLocation: '现居地',
        workExperience: '工作经历',
        schoolExperience: '在校经历',
        jobExperience: '职业经历',
        selfIntroduction: '自我介绍'
      },
      ruleForm: {
        name: '',
        email: '',
        phone: '',
        nowLocation: '',
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
        // sex: [{ required: true, message: '请选择您的性别', trigger: 'change' }],
        // birthday: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        email: [
          { type: 'string', required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        nowLocation: [{ required: true, message: '请输入您的现居地', trigger: 'blur' }]
      }
    }
  },
  created: function() {
    this.getResume_USR()
  },
  methods: {
    getResume_USR() {
      getResume().then(response => {
        // 更新建立的内容
        console.log(response.data)
        this.ruleForm = response.data
        var eduList = response.data.education.split('-')
        this.fullTimeDegree = eduList[0]
        this.fullTimeSchool = eduList[1]
        this.fullTimeMajor = eduList[2]
        // 判断是第一次填写，还是新增。
        // 第一次填写，调用addResume接口 isNull = true
        // 第二次填写，调用fixResume接口 isNull = false
        const dataList = Object.values(response.data)
        this.isNull = true
        for (var i = 0; i < dataList.length; i++) {
          if (dataList[i] !== null) {
            this.isNull = false
          }
        }
      })
    },
    submitForm_One(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 1. 先更新简历
          this.ruleForm.education = this.fullTimeDegree + '-' + this.fullTimeSchool + '-' + this.fullTimeMajor
          console.log(this.ruleForm)
          addResume(this.ruleForm).then(response => {
            console.log('Resume submit first done.')
            console.log(response.data)
          })
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
    submitForm_Two(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 1. 先更新简历
          this.ruleForm.education = this.fullTimeDegree + '-' + this.fullTimeSchool + '-' + this.fullTimeMajor
          console.log(this.ruleForm)
          fixResume(this.ruleForm).then(response => {
            console.log('Resume submit second done.')
            console.log(response.data)
          })
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
      this.fullTimeDegree = ''
      this.fullTimeSchool = ''
      this.fullTimeMajor = ''
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
.form-flex1 {
  width:70%;
  display: flex;
  flex-direction: row;
}
</style>
