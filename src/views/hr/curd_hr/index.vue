<template>
  <div class="hr-container">
    <h1 class="text">HR : 增删改查</h1>
    <div v-for="(item,i) in form" :key="i" class="hr-table" style="margin:50rpx">
      <el-card class="hr-card">
        <el-form ref="form" :model="item" label-width="80px" class="hr-form">
          <el-form-item label="标题"><div class="title">{{ item.title }}</div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="招聘类型">{{ item.type }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">{{ item.position }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工资">{{ item.salaries }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作频次">{{ item.frequency }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作时长">{{ item.period }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button>取消</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurdHR',
  data() {
    return {
      form: [{
        title: '招聘前端开发人员',
        type: '实习生',
        position: '前端开发',
        salaries: '200/天',
        frequency: '一周3次',
        period: '3个月'
      },
      {
        title: '標題2',
        content: '招聘信息'
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
   width:70%;
   padding: 50rpx;
  }
}

</style>
