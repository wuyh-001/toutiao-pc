<template>
  <el-aside width="auto" class="aside-container">
    <el-row>
      <el-col>
        <el-menu
          :default-active="defaultIndex"
          @select="selectEvent"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="collapse"
        >
          <el-menu-item
            :index="nav.path"
            v-for="nav in navList"
            :key="nav.index"
          >
            <i :class="`el-icon-${nav.icon}`"></i>
            <span slot="title">{{ nav.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>
<script>
export default {
  name: "NavAside",
  props:{
    collapse:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      defaultIndex: "/",
      navList: [
        { title: "首页", index: "1", path: "/", icon: "s-home" },
        { title: "内容管理", index: "2", path: "/document", icon: "document" },
        {
          title: "素材管理",
          index: "3",
          path: "/picture",
          icon: "picture-outline",
        },
        {
          title: "发布文章",
          index: "4",
          path: "/publish",
          icon: "s-promotion",
        },
        { title: "评论管理", index: "5", path: "/comment", icon: "s-comment" },
        { title: "粉丝管理", index: "6", path: "/present", icon: "present" },
        { title: "个人设置", index: "7", path: "/my", icon: "setting" },
      ],
    };
  },
  methods: {
    selectEvent(index, path) {
      this.defaultIndex = index;
    },
  },
};
</script>
<style scoped lang="less">
.aside-container {
  background-color: #002033;
  .el-menu {
    // background-color: transparent;
    border-right:none;
  }
}
</style>