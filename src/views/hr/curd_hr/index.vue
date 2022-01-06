<template>
  <div class="hr-container">
    <el-row>
      <el-col :span="15" :offset="4">
        <h1 class="text">HR : 查看需要发布的招聘信息</h1>
      </el-col>
      <el-col :span="4">
        <div class="top">
          <el-button type="primary" size="small" style="margin:30px" @click="addVisible = true">新增</el-button>
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
            <el-button type="primary" size="small">修改</el-button>
          </template>
        </el-descriptions>
      </el-card>
    </div>

    <!-- 第二级页面1 增加招聘信息 -->
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
        <el-button @click="addVisible = false">取 消</el-button>
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
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="success" @click="addVisible = false">发 布</el-button>
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
      submitform: {
        title: '',
        type: '',
        position: '',
        salaries: '',
        frequency: '',
        period: '',
        content: '',
        workPlace: ''
      },
      form: [{
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
        period: '3个月'
      },
      {
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月'
      },
      {
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月'
      }]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
   width:70%;
   padding: 50rpx;
  }
}

</style>
