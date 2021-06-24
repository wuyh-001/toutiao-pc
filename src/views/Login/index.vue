<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">今日头条-管理系统</div>
      <el-form class="login-form" ref="form" :model="user" :rules="rules">
        <el-form-item prop="mobile">
          <el-input
            prefix-icon="el-icon-phone"
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="user.checked">
            我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :disabled="isDisabled"
            @click="onLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";
import {setItem} from '@/utils/localStorage'
export default {
  name: "Login",
  data() {
    return {
      user: {
        // mobile: "13911111111",
        mobile: "17090086870",
        code: "246810",
        checked: true, // 是否同意协议的选中状态
      },
      isDisabled: false,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的手机号码格式",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checked: [
          {
            validator: (rule, val, cb) => {
              if (val) {
                cb();
              } else {
                cb(new Error("未勾选用户协议"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          console.log("error submit!!");
          return;
        };
        this.isDisabled = true;
        try {
          const result = await login(this.user);
          const token=result.data.data
          setItem('user-token',token)

          this.isDisabled = false;
          this.$message({
            message: "successful",
            type: "success",
          });
          // 跳转到首页
          this.$router.push({
            path:'/'
          })
        } catch (e) {
          console.log(e);
          this.isDisabled = false;
          this.$message({
            message: "failed",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      width: 300px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>