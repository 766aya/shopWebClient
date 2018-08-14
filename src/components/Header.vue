<template>
    <div id="header" class="fixed">
        <div id="logo">
            <a href="/">LOGO</a>
        </div>
        <div id="header-control-group">
            <div class="header-box" v-if="login == false">
                <a class="text" @click="loginShow = !loginShow">用户登陆</a>
            </div>
            <div class="header-box" v-if="login == true">
                <span v-text="username"></span>
            </div>
            <i class="header-box" style="cursor: default;">|</i>
            <div class="header-box" v-if="login == false">
                <router-link class="text" :to="{name: 'User', params: { type: 'register' }}">免费注册</router-link>
            </div>
            <div class="header-box" v-if="login == true">
                <a class="text" @click="exit">退出</a>
            </div>
            <div class="header-box shopping-car">
                <router-link :to="{path: '/shopcar'}">
                    <a class="text iconfont icon-gouwuche">
                        <div v-if="count != 0" class="shop-count">{{count}}</div>
                    </a>
                </router-link>
            </div>
        </div>
        <el-dialog title="用户登录" :visible.sync="loginShow" width="500px" center>
            <el-form :model="form" ref="form" label-width="80px" class="form-group">
                <el-form-item label="用户名: " prop="username">
                    <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码: " prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer-btn">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="loginShow = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    setItemSession,
    getItemSession,
    delItemSession,
    delAllItemSession,
    setItemLocal,
    getItemLocal,
    delItemLocal,
    delAllItemLocal
} from "@/components/localstrong";
import { mapState } from "vuex";
export default {
    name: "Header",
    data() {
        return {
            login: false,
            loginShow: false,
            form: {
                username: "",
                password: ""
            },
            username: ""
        };
    },
    computed: mapState({
        count: state => state.goods.goods.length
    }),
    created() {
        let usernameLocal = getItemLocal("username");
        let usernameSession = getItemSession("username");
        if (usernameLocal && usernameSession) {
            delItemLocal("username");
            this.login = true;
            this.username = usernameSession;
        } else if (usernameSession) {
            this.login = true;
            this.username = usernameSession;
        } else if (usernameLocal) {
            this.login = true;
            this.username = usernameLocal;
        } else {
            this.login = false;
        }
    },
    methods: {
        submitForm() {
            let self = this;
            if (this.form.username != "" && this.form.password != "") {
                this.Axios.post("/users/login", {
                    Username: this.form.username,
                    Password: this.form.password
                })
                    .then(res => {
                        if (res.status == 200 && res.data.status == 0) {
                            self.msg_success("登录成功！", res.data.msg);
                            self.loginShow = false;
                            self.username = self.form.username;
                            this.login = true;
                            setItemSession("username", self.username);
                            self.form.username = "";
                            self.form.password = "";
                        } else {
                            self.msg_error("登录失败！", res.data.msg);
                            self.loginShow = false;
                            self.form.username = "";
                            self.form.password = "";
                        }
                    })
                    .catch(err => {
                        self.loginShow = false;
                        self.msg_error("登录失败！", "err: " + err);
                        self.form.username = "";
                        self.form.password = "";
                    });
            } else {
                this.msg_error("用户名或密码不能为空！");
            }
        },
        exit() {
            this.Axios.post("/users/logout", {})
                .then(res => {
                    if (res.status == 200 && res.data.status == 0) {
                        delAllItemLocal();
                        delAllItemSession();
                        this.login = false;
                        this.msg_success("退出成功！");
                    } else {
                        delAllItemLocal();
                        delAllItemSession();
                        this.login = false;
                        this.msg_warring("并未完全退出！");
                    }
                })
                .catch(err => {
                    this.login = false;
                    this.msg_warring("完全未退出！", err);
                });
        }
    }
};
</script>

<style lang="scss" type="text/css">
$background: #fdfdfd;
$text-color: #333333;
$text-hover-color: #ff670d;
$navbar-height: 60px;
$animation-time: 0.3s;

@media (min-width: 1200px) {
    #header {
        width: 100%;
        #header-control-group {
            margin-right: 20px;
            .shopping-car {
                position: relative;
                width: 55px;
                .shop-count {
                    position: absolute;
                    top: 12px;
                    right: 14px;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    padding: 2px;
                    background-color: #e53935;
                    color: #ffffff;
                    font-size: 12px;
                    border-radius: 50%;
                }
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .fixed {
        position: fixed;
        top: 0;
        background-color: #fdfdfd;
        z-index: 9999;
    }
    #header {
        width: 100%;
        #header-control-group {
            .shopping-car {
                width: 55px;
            }
        }
    }
}

#logo {
    float: left;
    margin-left: 20px;
    height: $navbar-height;
    width: 70px;
    text-align: center;
    line-height: $navbar-height;
    font-weight: bold;
    cursor: pointer;
    transition: $animation-time;
    &:hover {
        color: $text-hover-color;
    }
    a {
        display: block;
        color: inherit;
        text-decoration: none;
    }
}
#header {
    height: $navbar-height;
    background-color: $background;
    #header-control-group {
        float: right;
        .text {
            color: $text-color;
        }
        a {
            display: block;
            font-size: 1rem;
            text-decoration: none;
            transition: $animation-time;
            cursor: pointer;
            &:hover {
                color: $text-hover-color;
            }
        }
        .header-box {
            height: $navbar-height;
            padding: 0px 5px;
            float: left;
            line-height: $navbar-height;
        }
        .shopping-car {
            text-align: center;
            a {
                height: $navbar-height;
                width: 50px;
                font-size: 30px;
            }
        }
    }
}
.form-group {
    text-align: center;
}
.footer-btn {
    width: 100%;
    text-align: right;
}
</style>
