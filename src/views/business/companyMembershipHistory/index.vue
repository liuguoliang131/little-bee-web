<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">是否有效</label>
        <el-input v-model="query.disabledStatus" clearable placeholder="是否有效" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">企业名称</label>
        <el-input v-model="query.companyName" clearable placeholder="企业名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.createTime"
          start-placeholder="createTimeStart"
          end-placeholder="createTimeStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户openId">
            <el-input v-model="form.userOpenId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input v-model="form.orderNum" style="width: 370px;" />
          </el-form-item>
          <!--          <el-form-item label="请求流水编号">-->
          <!--            <el-input v-model="form.requestNum" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="单价">-->
          <!--            <el-input v-model="form.unitPrice" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="实付金额">-->
          <!--            <el-input v-model="form.amount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label=" INIT ：待支付 ，SUCCESS：支付成功 ，FAIL ：失败 ，CANCEL ：已取消 ，REFUND ：已退款 ，REFUNDING ：退款中 ，REFUNDFAIL：退款失败">-->
          <!--            <el-input v-model="form.status" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="收益金额">-->
          <!--            <el-input v-model="form.incomeAmount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="企业ID">-->
          <!--            <el-input v-model="form.companyId" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="会员ID">-->
          <!--            <el-input v-model="form.membershipId" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="用户数量">-->
          <!--            <el-input v-model="form.userCount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="任务数量">-->
          <!--            <el-input v-model="form.jobCount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="开通天数">-->
          <!--            <el-input v-model="form.openCount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="剩余天数">-->
          <!--            <el-input v-model="form.remainingDayCount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="代扣金额">-->
          <!--            <el-input v-model="form.withholdingAmount" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="开通时间">-->
          <!--            <el-input v-model="form.openTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="到期时间">-->
          <!--            <el-input v-model="form.maturityTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="是否升级">-->
          <!--            <el-input v-model="form.disabledUpgrade" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="升级pid">-->
          <!--            <el-input v-model="form.upgradePid" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="id路径">-->
          <!--            <el-input v-model="form.ids" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="是否有效">-->
          <!--            <el-input v-model="form.disabledStatus" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="是否使用">-->
          <!--            <el-input v-model="form.useStatus" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="del">-->
          <!--            <el-input v-model="form.del" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="创建时间">-->
          <!--            <el-input v-model="form.createTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="修改时间">-->
          <!--            <el-input v-model="form.updateTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="备注">-->
          <!--            <el-input v-model="form.remake" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="企业名称">-->
          <!--            <el-input v-model="form.companyName" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="套餐名称">-->
          <!--            <el-input v-model="form.membershipName" style="width: 370px;" />-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="orderNum" label="订单编号" />
        <el-table-column prop="amount" label="实付金额" />
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            {{ dict.label.pay_status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column prop="disabledStatus" label="是否有效">
          <template slot-scope="scope">
            {{ dict.label.disabled_status[scope.row.disabledStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="companyName" label="企业名称" />
        <el-table-column prop="membershipName" label="套餐名称" />
        <el-table-column v-if="checkPer(['admin','companyMembershipHistory:edit','companyMembershipHistory:del'])" label="操作" width="150px" align="center">
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
import crudCompanyMembershipHistory from '@/api/business/companyMembershipHistory/'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, userOpenId: null, orderNum: null, requestNum: null, unitPrice: null, amount: null, status: null, incomeAmount: null, companyId: null, membershipId: null, userCount: null, jobCount: null, openCount: null, remainingDayCount: null, withholdingAmount: null, openTime: null, maturityTime: null, disabledUpgrade: null, upgradePid: null, ids: null, disabledStatus: null, useStatus: null, del: null, createTime: null, updateTime: null, remake: null, companyName: null, membershipName: null }
export default {
  name: 'CompanyMembershipHistory',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['pay_status', 'disabled_status'],
  cruds() {
    return CRUD({ title: 'order', url: 'api/business/companyMembershipHistory/', idField: 'id', sort: 'id,desc', crudMethod: { ...crudCompanyMembershipHistory }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'companyMembershipHistory:add'],
        edit: ['admin', 'companyMembershipHistory:edit'],
        del: ['admin', 'companyMembershipHistory:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'disabledStatus', display_name: '是否有效' },
        { key: 'companyName', display_name: '企业名称' }
      ]
    }
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
