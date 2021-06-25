<template>
  <el-container class="layout-container">
    <nav-aside class="aside-menu" :collapse="collapse" />
    <el-container>
      <el-header class="header">
        <div class="title">
          <i
            :class="`el-icon-s-${this.collapse ? 'fold' : 'unfold'}`"
            @click="foldEvent"
          ></i>
          <span>今日头条-管理系统</span>
        </div>
        <el-dropdown class="dorp-menu">
          <div>
            <img :src="user.photo" />
            <span class="dropdown-link">
              {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">
              个人设置
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logoutEvent">
              退出登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main-container">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import NavAside from "./Aside";
import { getUserProfile } from "@/api/user";
export default {
  name: "Layout",
  components: {
    NavAside,
  },
  data() {
    return {
      user: {},
      collapse: false,
    };
  },
  methods: {
    foldEvent() {
      this.collapse = !this.collapse;
    },
    logoutEvent() {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 把用户的登录状态清除
          window.localStorage.removeItem("user");

          // 跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  async created() {
    const result = await getUserProfile();
    this.user = result.data.data;
  },
};
</script>
<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .aside-menu {
    height: 100%;
  }
  .header {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #409eff;
    .title {
      height: 30px;
      line-height: 30px;
      color: white;
      i {
        cursor: pointer;
        margin-right: 8px;
        float: left;
        margin-top: 7px;
      }
      span {
        float: left;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .dorp-menu {
      img {
        width: 30px;
        height: 30px;
        position: relative;
        top: 4px;
        border-radius: 50%;
      }
      .dropdown-link {
        position: relative;
        top: -5px;
        color: white;
      }
    }
  }
  .main-container{
    background-color: #f4f4f5;
  }
}
</style>