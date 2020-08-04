<template>
  <div class="control-container">
    <div class="button-area">
      <el-button @click="dialogShow">导入</el-button>
      <el-button @click="addPloygon">添加</el-button>
      <el-button @click="exported" type="primary">导出</el-button>
      <el-button @click="mergeArea" type="success">合并</el-button>
    </div>
    <div class="table-area">
      <el-table
        :data="getAreaList"
        @selection-change="handleSelectionChange"
        highlight-current-row
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="区域颜色">
          <template slot-scope="scope">
            <div :style="{backgroundColor: scope.row.fillColor}" class="color-div"></div>
          </template>
        </el-table-column>
        <el-table-column label="区域名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="configHandler(scope.$index)"
              circle
              icon="el-icon-setting"
              size="mini"
              type="primary"
            ></el-button>
            <el-button
              @click="delHandler(scope.$index)"
              circle
              icon="el-icon-delete"
              size="mini"
              type="danger"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 导入 -->
    <el-dialog :visible.sync="dialogFormVisible" title="导入区域">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="区域名称">
          <el-input autocomplete="off" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="区域坐标">
          <el-input autocomplete="off" type="textarea" v-model="form.area"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="clickHandler" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="dialogVisible" title="修改区域">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="区域名称">
          <el-input autocomplete="off" v-model="currentArea.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="config" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 合并 -->
    <el-dialog :visible.sync="mergeVisible" title="合并">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="合并后区域名称">
          <el-input autocomplete="off" v-model="mergeName"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="mergeVisible = false">取 消</el-button>
        <el-button @click="merge" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 导出 -->
    <el-dialog :visible.sync="exportVisible" title="导出结果">
      <el-form>
        <el-form-item
          :key="index"
          :label="item.name"
          :label-width="formLabelWidth"
          v-for="(item,index) in exportList"
        >
          <el-input :value="item.list" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="exportVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { transposePolyrect, color16, exportPolyrect } from '@/assets/utils.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      mergeVisible: false,
      exportVisible: false,
      form: {
        name: '',
        area: '',
      },
      formLabelWidth: '120px',

      multipleSelection: [],
      exportList: [],
      currentArea: {},
      currentIndex: undefined,
      mergeName: '',
    }
  },
  computed: {
    ...mapGetters(['getAreaList', 'getPointIndex']),
    name() {
      return '新建区域' + (this.getAreaList.length + 1)
    },
  },
  methods: {
    ...mapMutations([
      'setAreaList',
      'setAddFlag',
      'configAreaList',
      'delAreaList',
      'mergeAreaList',
    ]),
    addPloygon() {
      this.setAddFlag(true)
    },
    dialogShow() {
      this.dialogFormVisible = true
      this.form.name = this.name
    },
    clickHandler() {
      this.dialogFormVisible = false
      let obj = {
        name: this.form.name,
        list: transposePolyrect(this.form.area),
        strokeColor: color16(),
        fillColor: color16(),
      }
      this.setAreaList(obj)
      this.form = {}
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    configHandler(index) {
      this.currentIndex = index
      this.currentArea = Object.assign({}, this.getAreaList[index])
      this.dialogVisible = true
    },
    config() {
      this.configAreaList({ index: this.currentIndex, obj: this.currentArea })
      this.dialogVisible = false
    },
    delHandler(index) {
      this.delAreaList(index)
    },
    mergeArea() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择需要合并的区域')
        return
      }
      this.mergeName = this.multipleSelection[0].name
      this.mergeVisible = true
    },
    merge() {
      let indexList = []
      for (let item of this.multipleSelection) {
        this.getAreaList.map((i, index) => {
          if (item.list == i.list) {
            indexList.push(index)
          }
        })
      }
      let list = []
      this.multipleSelection.map((item) => {
        list = list.concat(item.list)
      })
      let obj = {
        name: this.mergeName,
        list,
        strokeColor: this.multipleSelection[0].strokeColor,
        fillColor: this.multipleSelection[0].fillColor,
      }
      this.mergeAreaList({ indexList, obj })
      this.mergeVisible = false
    },
    exported() {
      this.exportList = exportPolyrect(this.multipleSelection)
      this.exportVisible = true
    },
  },
  watch: {
    getPointIndex(val) {
      this.$refs.multipleTable.setCurrentRow(this.getAreaList[val])
    },
  },
}
</script>

<style lang="scss" scoped>
.control-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .button-area {
    width: 100%;
    height: 100px;
  }
  .table-area {
    width: 100%;
    height: 1px;
    flex-grow: 1;
  }
}
.color-div {
  width: 20px;
  height: 20px;
}
</style>