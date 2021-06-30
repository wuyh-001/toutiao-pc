<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="action-btn">
        <el-radio-group v-model="collect" size="mini" @change="changeEvent">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="showDialogEvent"
          >上传素材</el-button
        >
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          class="mark-wrap"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image>
          <div class="img-mark">
            <i class="el-icon-delete"></i>
            <i :class="`el-icon-star-${img.is_collected?'on':'off'}`"></i>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUpload"
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        name="image"
        :headers="uploadHeaders"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from "@/api/image.js";
import { getItem } from "@/utils/localStorage";
const user = getItem("user-token");
export default {
  name: "ImageIndex",
  components: {},
  props: {},
  data() {
    return {
      images: [],
      collect: false,
      dialogUpload: false,
      imageUrl: "",
      uploadHeaders: `Bearer ${user.token}`,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getImageList(false);
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    showDialogEvent() {
      this.dialogUpload = true;
    },
    changeEvent(value) {
      this.getImageList(value);
    },
    getImageList(collect) {
      let images = [
        {
          id: 1,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
        {
          id: 2,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 3,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 4,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
        {
          id: 11,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
        {
          id: 12,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 13,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 14,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
        {
          id: 21,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
        {
          id: 22,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 23,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: false,
        },
        {
          id: 24,
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          is_collected: true,
        },
      ];
      this.images = [...images];
      //   getImages({ collect })
      //     .then((res) => {
      //       console.log(res);
      //       this.images = res.data.data.result;
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    },
  },
};
</script>

<style scoped lang="less">
.image-container {
  .action-btn {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .mark-wrap {
    position: relative;
    .img-mark {
      height: 40px;
      background-color: rgba(204, 204, 204, 0.5);
      position: absolute;
      bottom: 4px;
      left: 5px;
      right: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i{
          cursor: pointer;
      }
    }
  }
}
</style>