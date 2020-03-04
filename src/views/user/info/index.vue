<template>
  <div class="user-info">
    <day-base-container>
      <el-tabs v-model="currentTab">
        <el-tab-pane label="用户信息" name="userInfo">
          <day-form
            :ref="userInfoForm.props.ref"
            style="width: 350px;"
            :formData="userInfoForm">
          </day-form>
        </el-tab-pane>
        <el-tab-pane label="更改密码" name="userPwd">
          <day-form
            :ref="userPwdForm.props.ref"
            style="width: 350px;"
            :formData="userPwdForm">
          </day-form>
        </el-tab-pane>
      </el-tabs>
    </day-base-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { switchTime } from '@/util/util';
import { updateUserInfoApi, updateUserPwdApi } from '@/api/user/userInfo';
import { fileUrl } from '@/config/env';

export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.userPwdForm.model.confirmPassword !== '' &&
            this.userPwdForm.model.confirmPassword !== null &&
            this.userPwdForm.model.confirmPassword !== undefined) {
          this.$refs.userPwdForm.form.validateField('confirmPassword');
        }
        callback();
      }
    };
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.userPwdForm.model.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      imageUrl: null,
      currentTab: 'userInfo',
      userInfoForm: {
        model: {},
        props: {
          ref: 'userInfoForm',
          statusIcon: true,
          rules: {
            name: [
              { required: true, message: '请输入昵称', trigger: 'blur' },
              { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
            ]
          }
        },
        formItemProps: {
          labelWidth: '70px'
        },
        column: [
          {
            formItemProps: {
              label: '昵称',
              prop: 'name'
            },
            component: 'el-input',
            model: 'name',
            props: {
              placeholder: '昵称'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '性别',
              prop: 'sex'
            },
            render: () => {
              return (
                <el-radio-group v-model={this.userInfoForm.model.sex}>
                  <el-radio label={0}>男</el-radio>
                  <el-radio label={1}>女</el-radio>
                </el-radio-group>
              )
            },
            props: {},
            events: {}
          },
          {
            formItemProps: {
              label: '头像',
              prop: 'avatar'
            },
            render: (h, data) => {
              return (
                <el-upload class="avatar-uploader" props={{...data.props, ...data.events}}>
                  {
                    this.userInfoForm.model.avatar ?
                    <img class="avatar" src={this.userInfoForm.model.avatar}></img> :
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  }
                </el-upload>
              )
            },
            props: {
              action: '/api/file/upload',
              headers: {
                Authorization: null
              },
              showFileList: false
            },
            events: {
              'on-success': (res, file) => {
                if (res.success) {
                  this.imageUrl = res.content.url;
                  this.userInfoForm.model.avatar = URL.createObjectURL(file.raw);
                  window.setTimeout(function () {
                    window.URL.revokeObjectURL(file.raw);
                  }, 0)
                }
              },
              'before-upload': (file) => {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                  this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                  return false;
                }
                if ((file.size / 1024) > (2 * 1024)) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                  return false;
                }
              }
            }
          },
          {
            formItemProps: {
              label: '手机号',
              prop: 'phone'
            },
            component: 'el-input',
            model: 'phone',
            props: {
              placeholder: '手机号'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '微信号',
              prop: 'wechat'
            },
            component: 'el-input',
            model: 'wechat',
            props: {
              placeholder: '微信号'
            },
            events: {}
          },
          {
            formItemProps: {
              label: 'QQ号',
              prop: 'qq'
            },
            component: 'el-input',
            model: 'qq',
            props: {
              placeholder: 'QQ号'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '邮箱',
              prop: 'email'
            },
            component: 'el-input',
            model: 'email',
            props: {
              placeholder: '邮箱'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '描述',
              prop: 'desc'
            },
            component: 'el-input',
            model: 'desc',
            props: {
              type: 'textarea',
              autosize: true,
              placeholder: '描述'
            },
            events: {}
          },
          {
            render: (h, data) => {
              return (
                <div>
                  <el-button props={data.props} onClick={data.events.clickSaveBtn}>保存</el-button>
                  <el-button onClick={data.events.clickCancelBtn}>取消</el-button>
                </div>
              )
            },
            props: {
              type: 'primary'
            },
            events: {
              clickSaveBtn: () => {
                this.clickSaveBtn(1);
              },
              clickCancelBtn: () => {
                this.clickCancelBtn(1);
              }
            }
          }
        ]
      },
      userPwdForm: {
        model: {
          account: undefined,
          password: undefined,
          newPassword: undefined,
          confirmPassword: undefined
        },
        props: {
          ref: 'userPwdForm',
          statusIcon: true,
          rules: {
            password: [
              { required: true, message: '请输入原密码', trigger: 'blur' }
            ],
            newPassword: [
              { required: true, validator: validatePass, trigger: 'blur' }
            ],
            confirmPassword: [
              { required: true, validator: validatePass1, trigger: 'blur' }
            ]
          }
        },
        formItemProps: {
          labelWidth: '90px'
        },
        column: [
          {
            formItemProps: {
              label: '原密码',
              prop: 'password'
            },
            component: 'el-input',
            model: 'password',
            props: {
              type: 'password',
              showPassword: true,
              placeholder: '原密码'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '新密码',
              prop: 'newPassword'
            },
            component: 'el-input',
            model: 'newPassword',
            props: {
              type: 'password',
              showPassword: true,
              placeholder: '新密码'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '确认密码',
              prop: 'confirmPassword'
            },
            component: 'el-input',
            model: 'confirmPassword',
            props: {
              type: 'password',
              showPassword: true,
              placeholder: '确认密码'
            },
            events: {}
          },
          {
            render: (h, data) => {
              return (
                <div>
                  <el-button props={data.props} onClick={data.events.clickSaveBtn}>更新</el-button>
                  <el-button onClick={data.events.clickCancelBtn}>取消</el-button>
                </div>
              )
            },
            props: {
              type: 'primary'
            },
            events: {
              clickSaveBtn: () => {
                this.clickSaveBtn(2);
              },
              clickCancelBtn: () => {
                this.clickCancelBtn(2);
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'userInfo'
    ])
  },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      this.userInfoForm.model = JSON.parse(JSON.stringify(this.userInfo));
      this.userInfoForm.model.avatar = this.userInfoForm.model.avatar ? `${fileUrl}${this.userInfoForm.model.avatar}` : this.userInfoForm.model.avatar;
      for (let i = 0; i < this.userInfoForm.column.length; i++) {
        let item = this.userInfoForm.column[i];
        if (item.formItemProps.prop === 'avatar') {
          item.props.headers.Authorization = this.token;
          break;
        }
      }
    },
    clickSaveBtn (type) {
      if (type === 1) {
        this.$refs.userInfoForm.form.validate((valid) => {
          if (valid) {
            let parameter = JSON.parse(JSON.stringify(this.userInfoForm.model));
            parameter.avatar = this.imageUrl;
            parameter.updateUser = parameter.id;
            parameter.updateTime = switchTime(new Date(), 'YYYY-MM-DD hh:mm:ss');
            delete parameter.createTime;
            updateUserInfoApi(parameter).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.$store.dispatch('GetUserInfo').then(() => {
                  this.userInfoForm.model = JSON.parse(JSON.stringify(this.userInfo));
                });
              } else {
                this.$message.error(res.message);
              }
            })
          } else {
            return false;
          }
        });
      } else {
        this.$refs.userPwdForm.form.validate((valid) => {
          if (valid) {
            let parameter = JSON.parse(JSON.stringify(this.userPwdForm.model));
            parameter.account = this.userInfo.account;
            delete parameter.confirmPassword;
            updateUserPwdApi(parameter).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.resetFormModel(2);
              } else {
                this.$message.error(res.message);
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    clickCancelBtn (type) {
      if (type === 1) {
        this.resetFormModel(1);
      } else {
        this.resetFormModel(2);
      }
    },
    resetFormModel (type) {
      if (type === 1) {
        this.$refs.userInfoForm.form.resetFields();
      } else {
        this.$refs.userPwdForm.form.resetFields();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  position: relative;
  padding: 10px 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}
</style>

<style lang="scss">
.user-info {
  .avatar-uploader
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>
