<template>
  <el-card class="InfoTable">
    <h1>我的简历</h1>
    <!-- 表单  -->
    <el-form ref="ruleForm" :rules="rules" label-position="right" :model="ruleForm">
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
      <div class="form-flex" style="width:70%">
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
        <el-button v-if="isNull" class="buttonline" type="primary" plain @click="submitForm_One('ruleForm')">创建简历</el-button>
        <el-button v-if="!isNull&&!isSend" class="buttonline" type="primary" plain @click="submitForm_Two('ruleForm')">修改</el-button>
        <el-button v-if="isSend&&!isNull" class="buttonline" type="primary" plain @click="sendForm('ruleForm')">投递</el-button>
        <el-button class="buttonline" type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
        <!-- <el-button class="buttonline" type="success" plain @click="$router.push('/entrance/menu')">完成</el-button> -->
      </el-row>

    </el-form>
  </el-card>
</template>

<script>
import { addResume, getResume, fixResume, postResume } from '@/api/employee'
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
      isSend: false,
      isNull: true,
      isSecond: false,
      userInfo: {},
      id: '', // 投递简历的id
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
    this.id = this.$route.params.id
    if (this.$route.params.name) {
      this.isSend = true
    }
  },
  methods: {
    getResume_USR() {
      getResume().then(response => {
        // 更新建立的内容
        console.log('获取建立内容：')
        console.log(response.data)
        // 判断是第一次填写，还是新增。
        // 第一次填写，调用addResume接口 isNull = true
        // 第二次填写，调用fixResume接口 isNull = false
        const dataList = Object.values(response.data)
        this.isNull = true
        for (var i = 0; i < dataList.length; i++) {
          if (dataList[i] !== null) {
            this.isNull = false
            this.isSecond = true
          }
        }
        // 如果建立不是全空，则新增数据
        if (!this.isNull) {
          this.ruleForm.name = response.data.name
          this.ruleForm.email = response.data.email
          this.ruleForm.phone = response.data.phone
          this.ruleForm.nowLocation = response.data.nowLocation
          this.ruleForm.education = response.data.education
          this.ruleForm.workExperience = response.data.workExperience
          this.ruleForm.schoolExperience = response.data.schoolExperience
          this.ruleForm.jobExperience = response.data.jobExperience
          this.ruleForm.selfIntroduction = response.data.selfIntroduction
          var eduList = response.data.education.split('-')
          this.fullTimeDegree = eduList[0]
          this.fullTimeSchool = eduList[1]
          this.fullTimeMajor = eduList[2]
        } else {
          this.$message('请先建立您的个性化简历模板')
        }
        // if (this.isSend) {
        //   this.isNull = false
        //   this.isSecond = false
        // }
      })
    },
    submitForm_One(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 1. 先更新简历
          this.ruleForm.education = this.fullTimeDegree + '-' + this.fullTimeSchool + '-' + this.fullTimeMajor
          console.log('创建简历')
          console.log(this.ruleForm)
          addResume(this.ruleForm).then(response => {
            console.log('Resume submit first done.')
            this.$message.success('简历创建成功')
          })
          // 2. 创建完，刷新简历界面
          this.getResume_USR()
        } else {
          this.$message.error('简历创建失败！')
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
    sendForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 1. 先更新简历
          this.ruleForm.education = this.fullTimeDegree + '-' + this.fullTimeSchool + '-' + this.fullTimeMajor
          console.log(this.ruleForm)
          fixResume(this.ruleForm).then(response => {
            console.log('Resume fix second done.')
          })
          postResume(this.id, this.ruleForm).then(_ => {
            console.log('Resume submit second done.')
            this.$message('投递成功')
          }).catch(err => {
            this.$message.error(err.response.data.msg)
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
