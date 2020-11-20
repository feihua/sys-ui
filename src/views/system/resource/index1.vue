<template>
  <div class="app-container">
    <el-tree
      :data="list"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      default-expand-all
      :props="defaultProps">
    </el-tree>

    <!--    <div class="buttons">-->
    <!--      <el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
    <!--      <el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
    <!--      <el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
    <!--      <el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
    <!--      <el-button @click="resetChecked">清空</el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import { fetchList, fetchPv, createItem, updateItem, deleteItem } from '@/api/system/resource/resources'

  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes())
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys())
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }])
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3])
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },
      getList() {
        fetchList(this.listQuery).then(response => {
          this.list = response.data.list
          // this.total = response.data.total
          // Just to simulate the time of the request
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
        })
      }
    },
    created: function() {
      this.getList()
    },

    data() {
      return {
        list: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10000

        }
      }
    }
  }
</script>
