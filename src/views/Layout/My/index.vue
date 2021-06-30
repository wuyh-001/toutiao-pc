<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户头像">
        <img
          width="100"
          class="avatar"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.peise.net%2F2019%2F9%2F11%2F39999b09-c752-4234-879f-b8dbcca05760.jpg&refer=http%3A%2F%2Fi-1.peise.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627461181&t=7f94f5256e83e50e391e1627157a0bfb"
        />
        <label for="file">
          请选择图片
          <input
            id="file"
            ref="file"
            hidden
            type="file"
            @change="changeEvent"
          />
        </label>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
    >
      <div class="img-wrap">
        <img width="100" class="avatar" :src="previewImage" />
      </div>
      <div>
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AccountIndex",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      previewImage: "",
      dialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmit() {
      console.log("保存");
    },
    changeEvent(e) {
      const blobData = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.previewImage = blobData;
      this.$refs.file.value = "";
      this.dialogVisible = true;
    },
    handleClose() {},
  },
};
</script>

<style scoped lang="less">
.img-wrap{
    img{
        display: block;
        max-width: 100%;
    }
}
</style>