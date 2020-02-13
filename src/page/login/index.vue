<template>
  <div class="day-login-page">
    <div class="day-login-box">
      <el-form
        class="day-login-content-box"
        status-icon
        ref="loginFormRef"
        label-width="0"
        :hide-required-asterisk="true"
        :model="loginForm"
        :rules="loginFormRules">
        <el-form-item>
          <div class="day-login-title">vue-admin-day</div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            @keyup.enter.native="clickLoginBtn"
            placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lollipop"
            show-password
            v-model="loginForm.password"
            @keyup.enter.native="clickLoginBtn"
            placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="day-login-btn"
            type="primary"
            @click="clickLoginBtn">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'Vincent',
        password: '123'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 3, message: '长度不能少于3位', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    clickLoginBtn () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('UserLogin', this.loginForm).then(res => {
            if (!res.success) {
              this.$message.error(res.message);
              return;
            }
            this.$router.push({ path: '/' }).catch(() => {});
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.day-login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  animation: animate-bg 20s linear infinite;
  background: url('../../assets/login_bg.png') 100% 100% no-repeat;
  .day-login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 7px;
    border: 3px solid #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 20%;
    height: 50%;
    .day-login-content-box {
      width: 90%;
      .day-login-title {
        text-align: center;
        font-size: 25px;
        font-weight: 500;
        color: #606266;
      }
      .day-login-btn {
        width: 100%;
      }
    }
  }
}
@keyframes animate-bg {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 0% 100%;
  }
}
@media screen and (max-width: 1200px) {
  .day-login-page {
    .day-login-box {
      width: 30%;
    }
  }
}
</style>
