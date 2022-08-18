<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">


        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item  hidden label="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item hidden label="编号">
            <el-input v-model="form.num" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="短标题">
            <el-input v-model="form.sortTitle" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.count" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="form.unitPrice" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="总价">
            <el-input v-model="form.totalPrice" style="width: 370px;" />
          </el-form-item>
          <el-form-item hidden label="图片ids">
            <el-input v-model="form.imagesIds" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="form.updateTime" style="width: 370px;" />
          </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="companyName" label="企业名称" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="sortTitle" label="短标题" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="shareCount" label="分享数量" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="totalPrice" label="总价" />
        <el-table-column prop="jobStatus" label="任务状态" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="share" label="是否是分享" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column v-if="checkPer(['admin','job:edit','job:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudJob from '@/api/business/job/'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, num: null, title: null, sortTitle: null, pidId: null, ids: null, companyId: null, companyName: null, count: null, shareCount: null, unitPrice: null, totalPrice: null, imagesIds: null, remark: null, disabledStatus: null, del: null, jobStatus: null, share: null, createTime: null, updateTime: null }
export default {
  name: 'Job',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'job', url: 'api/business/job/', idField: 'id', sort: 'id,desc', crudMethod: { ...crudJob }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'job:add'],
        edit: ['admin', 'job:edit'],
        del: ['admin', 'job:del']
      },
      rules: {
        share: [
          { required: true, message: '是否是分享不能为空', trigger: 'blur' }
        ]
      }    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
