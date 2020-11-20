<template>
  <div class="app-container" style="margin-left: 50px">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px;">
      <el-form-item label="内容类目" prop="name">
        <el-button type="primary" @click="handleCreate">选择内容类目</el-button>
        {{catname}}
      </el-form-item>
      <el-form-item label="标题" prop="age">
        <el-input v-model="temp.title"/>
      </el-form-item>
      <el-form-item label="子标题" prop="phone">
        <el-input v-model="temp.subTitle"/>
      </el-form-item>
      <el-form-item label="标题描述" prop="email">
        <el-input v-model="temp.titleDesc"/>
      </el-form-item>
      <el-form-item label="url" prop="email">
        <el-input v-model="temp.url"/>
      </el-form-item>
      <el-form-item label="图片" prop="email">
        <el-upload
          class="upload-demo"
          action="/dev-api/ftp/uploadFile"
          :on-success="onSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"
                  placeholder="Please input"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-left: 200px">
      <el-button @click="dialogFormVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="updateData()">
        确认
      </el-button>
    </div>
    <el-dialog title="内容类目" :visible.sync="dialogFormVisible">
      <el-tree
        :data="list"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        highlight-current
        check-on-click-node
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="getCheckedKeys">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import { fetchList, fetchPv, createItem, updateItem,deleteItem } from '@/api/item'
  // import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { fetchList, fetchContentCategory } from '@/api/content/contentcategory/contentcategory'
  import { createContent, fetchContent, updateContent } from '@/api/content/content/content'

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    // directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      },
      TIME: function(val) {
        return parseTime(val)
      }
    },
    data() {
      return {
        tableKey: 0,
        total: 0,
        catid: [],
        catname: '',
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10000,
          name: '',
          phone: '',
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          categoryId: 1,
          remarks: '',
          timestamp: new Date(),
          title: '',
          subTitle: '',
          titleDesc: '',
          url: '',
          pic: '',
          content: '',
          sellPoint: 0,
          price: 0,
          num: 0,
          barcode: '',
          cid: 0,
          image: '',
          status: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        list: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        downloadLoading: false,
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        fileList: [],
        options: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '下架'
        }, {
          value: '3',
          label: '删除'
        }]
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)

      this.getList()
    },
    methods: {
      fetchData(id) {
        fetchContent(id).then(response => {
          this.temp = response.data
        }).catch(err => {
          console.log(err)
        })

      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
          // Just to simulate the time of the request
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          age: '',
          phone: '',
          email: '',
          createTime: new Date(),
          remarks: ''
        }
      },
      handleCreate() {
        // this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.id = parseInt(Math.random() * 10000000) + 1024 // mock a id
            this.temp.categoryId = this.catid
            var images = ''
            this.fileList.forEach(function(item) {
              images = images + item.url
            })

            this.temp.pic = images
            createContent(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'

              })
              this.$router.push({ path: this.redirect || '/content/list' })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateContent(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
                // duration: 2000
              })
              this.$router.push({ path: this.redirect || '/content/list' })
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteItem(row.id).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
      getCheckedKeys() {
        // console.log(this.$refs.tree.getCheckedKeys())
        this.catid = this.$refs.tree.getCheckedKeys()

        fetchContentCategory(this.catid[this.catid.length - 1]).then(response => {
          this.catname = response.data.name
          this.catid = response.data.id
          this.dialogFormVisible = false
        })

      },
      onSuccess(response, file, fileList) {

        // console.log('response.data')
        // console.log(response.data)
        this.fileList = response.data

        // console.log(this.fileList)

      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
