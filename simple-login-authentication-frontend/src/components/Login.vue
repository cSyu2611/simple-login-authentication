<template>
  <div>
    <p v-if="sharedState.loginResult != true" class="radiobutton">
      <label for="login">ログイン</label>
      <input
        id="login"
        name="login"
        type="radio"
        value="login"
        v-model="LorR"
      />
    </p>
    <div
      v-if="sharedState.loginResult != true && this.LorR == 'login'"
      class="login-container"
    >
      <table>
        <tbody>
          <tr>
            <th>ユーザ名</th>
            <td>
              <input id="username" type="text" v-model="userName" />
              <p v-if="this.existence == false" class="danger login-elem">
                ユーザが存在しません
              </p>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>パスワード</th>
            <td>
              <input id="password" type="password" v-model="passWord" />
              <p
                v-if="sharedState.loginResult == false"
                class="danger login-elem"
              >
                パスワードが違います
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="this.existence == true" class="login-elem">
        <button id="button" @click="tryLogin" class="buttons">ログイン</button>
      </p>
    </div>
    <p v-if="sharedState.loginResult != true" class="radiobutton">
      <label for="register">新規登録</label>
      <input
        id="register"
        name="login"
        type="radio"
        value="register"
        v-model="LorR"
      />
    </p>
    <div
      v-if="sharedState.loginResult != true && this.LorR == 'register'"
      class="login-container"
    >
      <table>
        <tbody>
          <tr>
            <th>
              ユーザ名
            </th>
            <td>
              <input type="text" v-model="newUserName" />
              <p v-if="this.newExistence == true" class="danger">
                すでに使われています
              </p>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              パスワード
            </th>
            <td>
              <input type="password" v-model="newPassWord" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              性別
            </th>
            <td>
              <label for="man">男</label>
              <input
                id="man"
                name="sex"
                type="radio"
                value="男"
                v-model="newSex"
                checked
              />
              <label for="woman">女</label>
              <input
                id="woman"
                name="sex"
                type="radio"
                value="女"
                v-model="newSex"
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              年齢
            </th>
            <td>
              <input type="number" v-model="newAge" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              国籍
            </th>
            <td>
              <input type="text" v-model="newNationality" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              出身
            </th>
            <td>
              <input type="text" v-model="newLocal" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              メール
            </th>
            <td>
              <input type="text" v-model="newEmail" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              電話番号
            </th>
            <td>
              <input type="number" v-model="newTel" />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="button" @click="newRegister" class="buttons">新規登録</button>
    </div>
    <div v-if="loginResult == true" class="login-container">
      <h2 class="success">ログイン成功</h2>
      <table>
        <tbody>
          <tr>
            <th>
              ユーザ名
            </th>
            <td>
              {{ this.sharedState.userInfo.username }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              性別
            </th>
            <td>
              {{ this.sharedState.userInfo.sex }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              年齢
            </th>
            <td>
              {{ this.sharedState.userInfo.age }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              国籍
            </th>
            <td>
              {{ this.sharedState.userInfo.nationality }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              出身
            </th>
            <td>
              {{ this.sharedState.userInfo.local }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              メール
            </th>
            <td>
              {{ this.sharedState.userInfo.email }}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              電話番号
            </th>
            <td>
              {{ this.sharedState.userInfo.tel }}
            </td>
          </tr>
        </tbody>
      </table>
      <button id="button" @click="logout" class="buttons">ログアウト</button>
      <button id="button2" @click="deleteUser" class="buttons">退会する</button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "Login",
  data() {
    return {
      LorR: "login",
      userName: "",
      existence: "init",
      passWord: "",
      loginResult: false,
      storedPassWord: "initpass",
      newUserName: "",
      newExistence: "init",
      newPassWord: "",
      newSex: "",
      newAge: "",
      newNationality: "",
      newLocal: "",
      newEmail: "",
      newTel: ""
    };
  },
  computed: {
    sharedState: function() {
      return this.$store.state;
    },
    createObj: function() {
      var obj = {};
      obj.username = this.newUserName;
      obj.password = this.newPassWord;
      obj.sex = this.newSex;
      obj.age = this.newAge;
      obj.nationality = this.newNationality;
      obj.local = this.newLocal;
      obj.email = this.newEmail;
      obj.tel = this.newTel;
      return obj;
    }
  },
  methods: {
    tryLogin: function() {
      Promise.all([
        this.$store.dispatch("getPassWord", {
          username: this.userName,
          password: this.passWord
        })
      ]).then(() => {
        this.loginResult = this.sharedState.loginResult;
      });
    },
    fetchData: function() {
      this.$store.dispatch("fetchData", this.userName);
    },
    logout: function() {
      swal("ログアウトしてもよろしいですか？", {
        buttons: {
          cancel: true,
          confirm: true
        }
      }).then(willDelete => {
        if (willDelete) {
          this.userName = "";
          this.existence = "init";
          this.passWord = "";
          this.loginResult = false;
          this.storedPassWord = "initpass";
          this.$store.commit("setLoginResult", "init");
          this.$store.commit("setUserInfo", {});
        }
      });
    },

    newRegister: function() {
      if (
        this.newUserName != "" &&
        this.newExistence == false &&
        this.newPassWord != "" &&
        this.newSex != "" &&
        this.newAge != "" &&
        this.newNationality != "" &&
        this.newLocal != "" &&
        this.newEmail != "" &&
        this.newTel != ""
      ) {
        swal("この内容で登録してもよろしいですか？", {
          buttons: {
            cancel: true,
            confirm: true
          }
        }).then(willDelete => {
          if (willDelete) {
            var obj = this.createObj;
            this.$store.dispatch("newRegister", obj);
            this.newUserName = "";
            this.newExistence = "init";
            this.newPassWord = "";
            this.newSex = "";
            this.newAge = "";
            this.newNationality = "";
            this.newLocal = "";
            this.newEmail = "";
            this.newTel = "";
            this.LorR = "login";
            swal("登録が完了しました。", {
              buttons: {
                cancel: false,
                confirm: true
              },
              icon: "success"
            });
          }
        });
      } else {
        swal("フォームを全て入力してください", {
          buttons: {
            cancel: false,
            confirm: true
          },
          dangerMode: true
        });
      }
    },
    deleteUser: function() {
      swal("アカウントを削除してもよろしいですか？", {
        buttons: {
          cancel: true,
          confirm: true
        },
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteUser", this.userName);
          this.userName = "";
          this.existence = "init";
          this.passWord = "";
          this.loginResult = false;
          this.storedPassWord = "initpass";
          this.$store.commit("setLoginResult", "init");
          this.$store.commit("setUserInfo", {});
          swal("アカウントを削除しました。", {
            buttons: {
              cancel: false,
              confirm: true
            },
            icon: "success"
          });
        }
      });
    }
  },
  watch: {
    userName: function(newval) {
      if (newval != "") {
        this.$store.dispatch("getUserList");
        if (this.sharedState.userList.indexOf(newval) >= 0) {
          this.existence = true;
        } else {
          this.existence = false;
        }
      }
    },
    loginResult: function(newval) {
      if (newval == true) {
        this.storedPassWord = this.passWord;
        this.fetchData();
      }
    },
    newUserName: function(newval) {
      if (newval != "") {
        this.$store.dispatch("getUserList");
        if (this.sharedState.userList.indexOf(newval) >= 0) {
          this.newExistence = true;
        } else {
          this.newExistence = false;
        }
      }
    }
  }
};
</script>

<style>
.danger {
  color: red;
}
.login-container {
  width: 30%;
  border: double;
  margin: auto;
  padding: auto;
}
.login-elem {
  margin: 10px;
  font-size: 20px;
}
#password #username {
  height: 50px;
}
.success {
  color: lightgreen;
  margin: auto auto;
  width: 100%;
}

.radiobutton {
  margin: auto auto;
  width: 30%;
}

.buttons {
  margin: auto;
  padding: auto;
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
}

table tr {
  border-bottom: solid 2px white;
}

table tr:last-child {
  border-bottom: none;
}

table th {
  position: relative;
  text-align: left;
  width: 30%;
  background-color: #52c2d0;
  color: white;
  text-align: center;
  padding: 10px 0;
}

table th:after {
  display: block;
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  top: calc(50% - 10px);
  right: -10px;
  border-left: 10px solid #52c2d0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

table td {
  text-align: left;
  width: 70%;
  text-align: center;
  background-color: #eee;
  padding: 10px 0;
}
</style>
