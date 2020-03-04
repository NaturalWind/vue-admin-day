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
          <div class="line">OR</div>
          <el-button
            class="day-registered-btn"
            type="primary"
            @click="registeredDialogVisible = true">注册
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 注册 -->
      <el-dialog
        title="注册"
        :visible.sync="registeredDialogVisible"
        width="30%">
        <el-form
          status-icon
          ref="registeredFormRef"
          label-width="0"
          :hide-required-asterisk="true"
          :model="registeredForm"
          :rules="registeredFormRules">
          <el-form-item prop="account">
            <el-input
              prefix-icon="el-icon-user"
              v-model="registeredForm.account"
              @keyup.enter.native="clickRegisteredBtn"
              placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lollipop"
              show-password
              v-model="registeredForm.password"
              @keyup.enter.native="clickRegisteredBtn"
              placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%;"
              type="primary"
              @click="clickRegisteredBtn">注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { userRegisteredApi } from '@/api/user/userInfo';

export default {
  data () {
    return {
      registeredDialogVisible: false,
      registeredForm: {
        account: '',
        password: '',
        type: 1
      },
      registeredFormRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 3, message: '长度不能少于3位', trigger: 'blur'}
        ]
      },
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
    clickRegisteredBtn () {
      this.$refs.registeredFormRef.validate(valid => {
        if (valid) {
          userRegisteredApi(this.registeredForm).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
              this.registeredDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
        } else {
          return false;
        }
      })
    },
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
      .day-login-btn, .day-registered-btn {
        width: 100%;
      }
      .line {
        position: relative;
        text-align: center;
        font-weight: 500;
        color: #606266;
        width: 100%;
      }
      .line::after, .line::before {
        position: absolute;
        top: 50%;
        content: '';
        width: 40%;
        height: 1px;
        background: #DCDFE6;
      }
      .line::after {
        right: 10px;
      }
      .line::before {
        left: 10px;
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
