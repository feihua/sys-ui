<!--<template>-->
<!--  <div class="app-container">-->
<!--    <div class="filter-container">-->
<!--      <el-input v-model="listQuery.name" placeholder="权限名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
<!--      <el-input v-model="listQuery.createBy" placeholder="创建者" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
<!--&lt;!&ndash;      <el-select v-model="listQuery.importance" :placeholder="重要性" clearable style="width: 90px" class="filter-item">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />&ndash;&gt;-->
<!--&lt;!&ndash;      </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-select v-model="listQuery.type" :placeholder="类型" clearable class="filter-item" style="width: 130px">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />&ndash;&gt;-->
<!--&lt;!&ndash;      </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />&ndash;&gt;-->
<!--&lt;!&ndash;      </el-select>&ndash;&gt;-->
<!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
<!--        查询-->
<!--      </el-button>-->
<!--      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
<!--        添加-->
<!--      </el-button>-->
<!--&lt;!&ndash;      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">&ndash;&gt;-->
<!--&lt;!&ndash;        {{ $t('table.export') }}&ndash;&gt;-->
<!--&lt;!&ndash;      </el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">&ndash;&gt;-->
<!--&lt;!&ndash;        显示&ndash;&gt;-->
<!--&lt;!&ndash;      </el-checkbox>&ndash;&gt;-->
<!--    </div>-->

<!--    <el-table-->
<!--      v-loading="listLoading"-->
<!--      :data="list"-->
<!--      element-loading-text="Loading"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--    >-->
<!--      <el-table-column align="center" label="ID" width="95">-->
<!--        <template slot-scope="scope">-->
<!--&lt;!&ndash;          {{ scope.$index }}&ndash;&gt;-->
<!--          {{ scope.row.id }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="权限名">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.name }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="权限路径">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.url }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="父id">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.pid }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="创建者">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.createBy }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注" >-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.remarks }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="创建时间" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.createTime | TIME}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--&lt;!&ndash;      <el-table-column label="更新时间" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;          <span>{{ scope.row.updateT | TIME}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->
<!--      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
<!--            编辑-->
<!--          </el-button>-->
<!--          <el-button size="mini" type="danger" @click="handleDelete(row)">-->
<!--            删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />-->

<!--    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
<!--      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">-->
<!--        <el-form-item label="角色名" prop="name">-->
<!--            <el-input v-model="temp.name" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="创建者" prop="name">-->
<!--          <el-input v-model="temp.createBy" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="备注">-->
<!--          <el-input v-model="temp.remarks" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="创建时间" prop="createTime">-->
<!--          <el-date-picker v-model="temp.createTime" type="datetime" placeholder="Please pick a date" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">-->
<!--          取消-->
<!--        </el-button>-->
<!--        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
<!--          确认-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

<!--    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">-->
<!--      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
<!--        <el-table-column prop="key" label="Channel" />-->
<!--        <el-table-column prop="pv" label="Pv" />-->
<!--      </el-table>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dialogPvVisible = false">确认</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import { fetchList, fetchPv, createResources, updateResources,deleteResources } from '@/api/resources'-->
<!--  // import waves from '@/directive/waves' // waves directive-->
<!--  import { parseTime } from '@/utils'-->
<!--  import Pagination from '@/components/Pagination' // secondary package based on el-pagination-->

<!--  const calendarTypeOptions = [-->
<!--    { key: 'CN', display_name: 'China' },-->
<!--    { key: 'US', display_name: 'USA' },-->
<!--    { key: 'JP', display_name: 'Japan' },-->
<!--    { key: 'EU', display_name: 'Eurozone' }-->
<!--  ]-->

<!--  // arr to obj, such as { CN : "China", US : "USA" }-->
<!--  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {-->
<!--    acc[cur.key] = cur.display_name-->
<!--    return acc-->
<!--  }, {})-->

<!--  export default {-->
<!--    name: 'ComplexTable',-->
<!--    components: { Pagination },-->
<!--    // directives: { waves },-->
<!--    filters: {-->
<!--      statusFilter(status) {-->
<!--        const statusMap = {-->
<!--          published: 'success',-->
<!--          draft: 'info',-->
<!--          deleted: 'danger'-->
<!--        }-->
<!--        return statusMap[status]-->
<!--      },-->
<!--      typeFilter(type) {-->
<!--        return calendarTypeKeyValue[type]-->
<!--      },-->
<!--      TIME: function(val) {-->
<!--        return parseTime(val)-->
<!--      }-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        tableKey: 0,-->
<!--        list: null,-->
<!--        total: 0,-->
<!--        listLoading: true,-->
<!--        listQuery: {-->
<!--          pageNum: 1,-->
<!--          pageSize: 10,-->
<!--          name: '',-->
<!--          createBy: '',-->
<!--          importance: undefined,-->
<!--          title: undefined,-->
<!--          type: undefined,-->
<!--          sort: '+id'-->
<!--        },-->
<!--        importanceOptions: [1, 2, 3],-->
<!--        calendarTypeOptions,-->
<!--        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],-->
<!--        statusOptions: ['published', 'draft', 'deleted'],-->
<!--        showReviewer: false,-->
<!--        temp: {-->
<!--          id: undefined,-->
<!--          importance: 1,-->
<!--          remarks: '',-->
<!--          timestamp: new Date(),-->
<!--          title: '',-->
<!--          type: '',-->
<!--          status: 'published'-->
<!--        },-->
<!--        dialogFormVisible: false,-->
<!--        dialogStatus: '',-->
<!--        textMap: {-->
<!--          update: 'Edit',-->
<!--          create: 'Create'-->
<!--        },-->
<!--        dialogPvVisible: false,-->
<!--        pvData: [],-->
<!--        rules: {-->
<!--          type: [{ required: true, message: 'type is required', trigger: 'change' }],-->
<!--          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],-->
<!--          title: [{ required: true, message: 'title is required', trigger: 'blur' }]-->
<!--        },-->
<!--        downloadLoading: false-->
<!--      }-->
<!--    },-->
<!--    created() {-->
<!--      this.getList()-->
<!--    },-->
<!--    methods: {-->
<!--      getList() {-->
<!--        this.listLoading = true-->
<!--        fetchList(this.listQuery).then(response => {-->
<!--          this.list = response.data.list-->
<!--          this.total = response.data.total-->
<!--          this.listLoading = false-->
<!--          // Just to simulate the time of the request-->
<!--          // setTimeout(() => {-->
<!--          //   this.listLoading = false-->
<!--          // }, 1.5 * 1000)-->
<!--        })-->
<!--      },-->
<!--      handleFilter() {-->
<!--        this.listQuery.pageNum = 1-->
<!--        this.getList()-->
<!--      },-->
<!--      handleModifyStatus(row, status) {-->
<!--        this.$message({-->
<!--          message: '操作成功',-->
<!--          type: 'success'-->
<!--        })-->
<!--        row.status = status-->
<!--      },-->
<!--      sortChange(data) {-->
<!--        const { prop, order } = data-->
<!--        if (prop === 'id') {-->
<!--          this.sortByID(order)-->
<!--        }-->
<!--      },-->
<!--      sortByID(order) {-->
<!--        if (order === 'ascending') {-->
<!--          this.listQuery.sort = '+id'-->
<!--        } else {-->
<!--          this.listQuery.sort = '-id'-->
<!--        }-->
<!--        this.handleFilter()-->
<!--      },-->
<!--      resetTemp() {-->
<!--        this.temp = {-->
<!--          id: undefined,-->
<!--          name: '',-->
<!--          age: '',-->
<!--          phone: '',-->
<!--          email: '',-->
<!--          createTime: new Date(),-->
<!--          remarks: '',-->
<!--        }-->
<!--      },-->
<!--      handleCreate() {-->
<!--        this.resetTemp()-->
<!--        this.dialogStatus = 'create'-->
<!--        this.dialogFormVisible = true-->
<!--        this.$nextTick(() => {-->
<!--          this.$refs['dataForm'].clearValidate()-->
<!--        })-->
<!--      },-->
<!--      createData() {-->
<!--        this.$refs['dataForm'].validate((valid) => {-->
<!--          if (valid) {-->
<!--            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id-->
<!--            this.temp.author = 'vue-element-admin'-->
<!--            createResources(this.temp).then(() => {-->
<!--              this.list.unshift(this.temp)-->
<!--              this.dialogFormVisible = false-->
<!--              this.$notify({-->
<!--                title: '成功',-->
<!--                message: '创建成功',-->
<!--                type: 'success',-->
<!--                // duration: 2000-->
<!--              })-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      handleUpdate(row) {-->
<!--        this.temp = Object.assign({}, row) // copy obj-->
<!--        this.temp.timestamp = new Date(this.temp.timestamp)-->
<!--        this.dialogStatus = 'update'-->
<!--        this.dialogFormVisible = true-->
<!--        this.$nextTick(() => {-->
<!--          this.$refs['dataForm'].clearValidate()-->
<!--        })-->
<!--      },-->
<!--      updateData() {-->
<!--        this.$refs['dataForm'].validate((valid) => {-->
<!--          if (valid) {-->
<!--            const tempData = Object.assign({}, this.temp)-->
<!--            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464-->
<!--            updateResources(tempData).then(() => {-->
<!--              for (const v of this.list) {-->
<!--                if (v.id === this.temp.id) {-->
<!--                  const index = this.list.indexOf(v)-->
<!--                  this.list.splice(index, 1, this.temp)-->
<!--                  break-->
<!--                }-->
<!--              }-->
<!--              this.dialogFormVisible = false-->
<!--              this.$notify({-->
<!--                title: '成功',-->
<!--                message: '更新成功',-->
<!--                type: 'success',-->
<!--                // duration: 2000-->
<!--              })-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      handleDelete(row) {-->
<!--        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {-->
<!--          confirmButtonText: '确定',-->
<!--          cancelButtonText: '取消',-->
<!--          type: 'error'-->
<!--        }).then(() => {-->
<!--          deleteResources(row.id).then(response => {-->
<!--            this.getList()-->
<!--            this.$message({-->
<!--              type: 'success',-->
<!--              message: '删除成功!'-->
<!--            });-->
<!--          })-->
<!--        }).catch(() => {-->
<!--          this.$message({-->
<!--            type: 'info',-->
<!--            message: '已取消删除'-->
<!--          });-->
<!--        });-->
<!--      },-->
<!--      handleFetchPv(pv) {-->
<!--        fetchPv(pv).then(response => {-->
<!--          this.pvData = response.data.pvData-->
<!--          this.dialogPvVisible = true-->
<!--        })-->
<!--      },-->
<!--      // handleDownload() {-->
<!--      //   this.downloadLoading = true-->
<!--      //   import('@/vendor/Export2Excel').then(excel => {-->
<!--      //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']-->
<!--      //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']-->
<!--      //     const data = this.formatJson(filterVal, this.list)-->
<!--      //     excel.export_json_to_excel({-->
<!--      //       header: tHeader,-->
<!--      //       data,-->
<!--      //       filename: 'table-list'-->
<!--      //     })-->
<!--      //     this.downloadLoading = false-->
<!--      //   })-->
<!--      // },-->
<!--      formatJson(filterVal, jsonData) {-->
<!--        return jsonData.map(v => filterVal.map(j => {-->
<!--          if (j === 'timestamp') {-->
<!--            return parseTime(v[j])-->
<!--          } else {-->
<!--            return v[j]-->
<!--          }-->
<!--        }))-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
