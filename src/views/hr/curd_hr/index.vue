<template>
  <div class="hr-container">
    <el-row>
      <el-col :span="18" :offset="2">
        <h1 class="text">HR : 查看需要发布的招聘信息</h1>
      </el-col>
      <el-col :span="4">
        <div class="top">
          <el-button type="primary" size="large" style="margin:30px" @click="addVisible = true">新增</el-button>
        </div>
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
            <el-button type="primary" size="small" @click="changeVisible = true;changeItem(i)">修改</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>

    <!-- 第二级页面1 增加招聘信息 -->
    <!-- /**
    提交对象：submitform; 取消前绑定cancelAdd 在取消之前先显示提示窗口。如果确认关闭窗口，并且重置表格。
    */ -->
    <el-dialog
      title="新增招聘信息"
      :visible.sync="addVisible"
      width="65%"
      :before-close="handleClose"
    >
      <el-form :model="submitform">
        <el-form-item :label="lablename.title" :label-width="formLabelWidth">
          <el-input v-model="submitform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.type" :label-width="formLabelWidth">
          <el-select v-model="submitform.type" placeholder="请选择招聘岗位类型">
            <el-option label="实习生" value="intern" />
            <el-option label="校招" value="offer" />
          </el-select>
        </el-form-item>
        <el-form-item :label="lablename.position" :label-width="formLabelWidth">
          <el-input v-model="submitform.position" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.workPlace" :label-width="formLabelWidth">
          <el-input v-model="submitform.workPlace" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.salaries" :label-width="formLabelWidth">
          <el-input v-model="submitform.salaries" autocomplete="off" />
        </el-form-item>
        <!-- 需要对频率设置选择框和数字类型填写框 -->
        <el-form-item :label="lablename.frequency" :label-width="formLabelWidth">
          <el-input v-model="submitform.frequency" type="number" autocomplete="off" />
          <!-- <el-select v-model="submitform.frequency" placeholder="天">
                <el-option label="天" value="day" />
                <el-option label="月" value="month" />
                <el-option label="年" value="year" />
              </el-select>
              <el-input v-model="submitform.frequency" type="number" autocomplete="off" />次 -->
        </el-form-item>
        <el-form-item :label="lablename.period" :label-width="formLabelWidth">
          <el-input v-model="submitform.period" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.content" :label-width="formLabelWidth">
          <el-input v-model="submitform.content" type="textarea" maxlength="150" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button @click="addVisible = false">保 存</el-button>
        <el-button type="success" @click="addVisible = false">发 布</el-button>
      </span>
    </el-dialog>

    <!-- 第二级页面2 修改招聘信息 -->
    <el-dialog
      title="修改招聘信息"
      :visible.sync="changeVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="submitform">
        <el-form-item :label="lablename.title" :label-width="formLabelWidth">
          <el-input v-model="submitform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.type" :label-width="formLabelWidth">
          <el-select v-model="submitform.type" placeholder="请选择招聘岗位类型">
            <el-option label="实习生" value="intern" />
            <el-option label="校招" value="offer" />
          </el-select>
        </el-form-item>
        <el-form-item :label="lablename.position" :label-width="formLabelWidth">
          <el-input v-model="submitform.position" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.workPlace" :label-width="formLabelWidth">
          <el-input v-model="submitform.workPlace" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.salaries" :label-width="formLabelWidth">
          <el-input v-model="submitform.salaries" autocomplete="off" />
        </el-form-item>
        <!-- 需要对频率设置选择框和数字类型填写框 -->
        <el-form-item :label="lablename.frequency" :label-width="formLabelWidth">
          <el-input v-model="submitform.frequency" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.period" :label-width="formLabelWidth">
          <el-input v-model="submitform.period" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="lablename.content" :label-width="formLabelWidth">
          <el-input v-model="submitform.content" type="textarea" maxlength="150" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="success" @click="changeVisible = false">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CurdHR',
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
      addVisible: false, // 用于设置对话框的可见性（新增）
      changeVisible: false, // （修改）
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
  },
  methods: {
    cancelAdd(done) {
      // 按取消按钮后，重置表单内保存的内容
      this.$confirm('取消后，当前数据清空。确认取消? ')
        .then(_ => {
          // 关闭窗口
          this.addVisible = false
          this.changeVisible = false
          // 清空表格
          const that = this.submitform
          that.title = ''
          that.type = ''
          that.position = ''
          that.salaries = ''
          that.frequency = ''
          that.period = ''
          that.content = ''
          that.workPlace = ''
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    changeItem(e) {
      const f = this.form[e] // 获取改行的数据
      console.log(e)
      console.log(f)

      const that = this.submitform
      that.title = f.title
      that.type = f.type
      that.position = f.position
      that.salaries = f.salaries
      that.frequency = f.frequency
      that.period = f.period
      that.content = f.content
      that.workPlace = f.workPlace
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
