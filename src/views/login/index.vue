<template>
  <div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        <el-button type="primary" style="width:100%;margin-bottom:30px; margin-left:0px" @click="showRegister = true">注册</el-button>

      </el-form>
    </div>

    <el-dialog
      title="用户注册"
      :visible.sync="showRegister"
      width="30%"
    >
      <div class="Register">
        <el-form ref="submitForm" :model="submitForm" :rules="loginRules" class="register-form" auto-complete="off" label-position="left">
          <el-form-item label="用户名" prop="username" label-width="80px">
            <el-input v-model="submitForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email" label-width="80px">
            <el-input v-model="submitForm.email" autocomplete="off" placeholder="邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="80px">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="submitForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" label-width="80px">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="submitForm.checkPass"
              :type="passwordType"
              placeholder="确认密码"
              name="password"
              tabindex="2"
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item label="身份" prop="type" label-width="80px">
            <el-select v-model="submitForm.type" placeholder="请选择您的身份">
              <el-option label="HR" value="1" />
              <el-option label="求职者" value="0" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="success" @click="getRegister(); showRegister = false">注 册</el-button>
        </span>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.submitForm.checkPass !== '') {
        this.$refs.submitForm.validateField('checkPass')
      } else if (value.length < 6 || value.length > 14) {
        callback(new Error('密码长度不符，请重新输入'))
      } else {
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else
      if (value !== this.submitForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      showRegister: false, // 控制注册的部分
      formLabelWidth: '120px',
      loginForm: {
        username: '3q',
        password: '123456'
      },
      submitForm: {
        username: '',
        email: '',
        password: '',
        checkPass: '',
        type: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择您的身份', trigger: 'change' }
        ]
      },
      loading: false, // 控制 “加载” 状态（动画样式）
      passwordType: 'password', // 控制password的可见性
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      // 控制密码是否显示
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 控制登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // this.$store.dispatch的方法触发store中action（更新但是异步）的异步分法
            // if (this.$store.getters.roles.indexOf('ROLE_EMPLOYER')) {
            //   console.log(this.$store.getters.roles)
            //   this.$router.push({ path: this.redirect || '/' })
            // }
            this.$router.push({ path: '/Magic' })

            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册
    cancelAdd(done) {
      // 按取消按钮后，重置表单内保存的内容
      this.$confirm('是否终止注册？确认取消? ')
        .then(_ => {
          // 关闭窗口
          this.showRegister = false
          // 清空表格
          const that = this.submitForm
          that.username = ''
          that.type = ''
          that.email = ''
          that.password = ''
        })
        .catch(_ => {})
    },
    // 注册接口
    getRegister() {
      console.log('注册表：')
      console.log(this.submitForm)
      const list = {
        username: this.submitForm.username,
        type: this.submitForm.type,
        email: this.submitForm.email,
        password: this.submitForm.password
      }
      register(list).then(response => {
        this.$message.success('注册成功')
        const that = this.submitForm
        that.username = ''
        that.type = ''
        that.email = ''
        that.password = ''
        this.submitForm.checkPass = ''
      }).catch(err => {
        console.log(err)
        this.$message.warning('注册失败')
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.Register{
  height: 22rem;
  .dialog-footer{
    width: 100%;
    display: flex;
    justify-content: center;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 62.2225rem;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  button, input, optgroup, select, textarea {
    font-family: sans-serif;
    font-size: 125%;
    line-height: 1.15;
    margin: 0px;
  }

}
</style>
