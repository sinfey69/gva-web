<template>
  <el-container class="layout-cont">
    <el-container :class="[isSider?'openside':'hideside',isMobile ? 'mobile': '']">
      <el-row :class="[isShadowBg?'shadowBg':'']" @click="changeShadow()" />
      <el-aside class="main-cont main-left">
        <div class="tilte" :style="{background: backgroundColor}">
          <img alt class="logoimg" :src="$CFG.appLogo">
          <h2 v-if="isSider" class="tit-text" :style="{color:textColor}">{{ $CFG.appName }}</h2>
        </div>
        <Aside class="aside" />
      </el-aside>
      <!-- 分块滑动功能 -->
      <el-main class="main-cont main-right">
        <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
          <div
            :style="{width: `calc(100% - ${isMobile?'0px':isCollapse?'54px':'220px'})`}"
            class="topfix"
          >
            <el-header class="header-cont">
              <el-row>
                <el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1">
                  <div class="menu-total" @click="totalCollapse">
                    <el-icon v-if="isCollapse">
                      <Expand />
                    </el-icon>
                    <el-icon v-else>
                      <Fold />
                    </el-icon>
                  </div>
                </el-col>
                <el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14">
                  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item
                      v-for="item in matched.slice(1,matched.length)"
                      :key="item.path"
                    >{{ item.meta.title }}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9">
                  <div class="fl-right right-box">
                    <Search />
                    <Screenfull class="screenfull" :style="{cursor:'pointer'}" />
                    <el-dropdown>
                      <span class="header-avatar" style="cursor: pointer">
                        <CustomPic />
                        <span style="margin-left: 5px">{{ userInfo.nickName }}</span>
                        <el-icon><ArrowDown /></el-icon>
                      </span>
                      <template v-slot:dropdown>
                        <el-dropdown-menu class="dropdown-group">
                          <el-dropdown-item>
                            <span style="font-weight: 600;">
                              当前角色：{{ userInfo.authority.authorityName }}
                            </span>
                          </el-dropdown-item>
                          <template v-if="userInfo.authorities">
                            <el-dropdown-item v-for="item in userInfo.authorities.filter(i=>i.authorityId!==userInfo.authorityId)" :key="item.authorityId" @click="changeUserAuth(item.authorityId)">
                              <span>
                                切换为：{{ item.authorityName }}
                              </span>
                            </el-dropdown-item>
                          </template>
                          <el-dropdown-item @click="toPerson"><el-icon><Avatar /></el-icon>个人信息</el-dropdown-item>
                          <el-dropdown-item @click="LoginOut"><el-icon><Close /></el-icon>登 出</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </el-col>
              </el-row>
            </el-header>
            <!-- 当前面包屑用路由自动生成可根据需求修改 -->
            <!--
            :to="{ path: item.path }" 暂时注释不用-->
            <HistoryComponent />
          </div>
        </transition>
        <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive && reloadFlag" v-loading="loadingFlag" element-loading-text="正在加载中" class="admin-box" >
          <transition mode="out-in" name="el-fade-in-linear">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <router-view v-slot="{ Component }" v-if="!$route.meta.keepAlive && reloadFlag" v-loading="loadingFlag" element-loading-text="正在加载中" class="admin-box">
          <transition mode="out-in" name="el-fade-in-linear">
              <component :is="Component" />
          </transition>
        </router-view>
        <BottomInfo />
        <setting />
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Aside from '@/view/layout/aside'
import HistoryComponent from '@/view/layout/aside/historyComponent/history'
import Screenfull from '@/view/layout/screenfull'
import Search from '@/view/layout/search/search'
import BottomInfo from '@/view/layout/bottomInfo/bottomInfo'
import { mapGetters, mapActions } from 'vuex'
import CustomPic from '@/components/customPic'
import Setting from './setting'
import { setUserAuthority } from '@/api/user'
export default {
  name: 'Layout',
  components: {
    Aside,
    HistoryComponent,
    Screenfull,
    Search,
    BottomInfo,
    CustomPic,
    Setting
  },
  data() {
    return {
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag: false,
      reloadFlag: true,
      value: ''
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'sideMode', 'baseColor']),
    textColor() {
      if (this.$store.getters['user/sideMode'] === 'dark') {
        return '#fff'
      } else if (this.$store.getters['user/sideMode'] === 'light') {
        return '#191a23'
      } else {
        return this.baseColor
      }
    },
    backgroundColor() {
      if (this.sideMode === 'dark') {
        return '#191a23'
      } else if (this.sideMode === 'light') {
        return '#fff'
      } else {
        return this.sideMode
      }
    },
    title() {
      return this.$route.meta.title || '当前页面'
    },
    matched() {
      return this.$route.matched
    }
  },
  mounted() {
    const screenWidth = document.body.clientWidth
    if (screenWidth < 1000) {
      this.isMobile = true
      this.isSider = false
      this.isCollapse = true
    } else if (screenWidth >= 1000 && screenWidth < 1200) {
      this.isMobile = false
      this.isSider = false
      this.isCollapse = true
    } else {
      this.isMobile = false
      this.isSider = true
      this.isCollapse = false
    }
    this.$bus.emit('collapse', this.isCollapse)
    this.$bus.emit('mobile', this.isMobile)
    this.$bus.on('reload', this.reload)
    this.$bus.on('showLoading', () => {
      this.loadingFlag = true
    })
    this.$bus.on('closeLoading', () => {
      this.loadingFlag = false
    })
    window.onresize = () => {
      return (() => {
        const screenWidth = document.body.clientWidth
        if (screenWidth < 1000) {
          this.isMobile = true
          this.isSider = false
          this.isCollapse = true
        } else if (screenWidth >= 1000 && screenWidth < 1200) {
          this.isMobile = false
          this.isSider = false
          this.isCollapse = true
        } else {
          this.isMobile = false
          this.isSider = true
          this.isCollapse = false
        }
        this.$bus.emit('collapse', this.isCollapse)
        this.$bus.emit('mobile', this.isMobile)
      })()
    }
  },
  methods: {
    ...mapActions('user', ['LoginOut', 'GetUserInfo']),
    async changeUserAuth(id) {
      const res = await setUserAuthority({
        authorityId: id
      })
      if (res.code === 0) {
        window.location.reload()
      }
    },
    reload() {
      this.reloadFlag = false
      this.$nextTick(() => {
        this.reloadFlag = true
      })
    },
    totalCollapse() {
      this.isCollapse = !this.isCollapse
      this.isSider = !this.isCollapse
      this.isShadowBg = !this.isCollapse
      this.$bus.emit('collapse', this.isCollapse)
    },
    toPerson() {
      this.$router.push({ name: 'person' })
    },
    changeShadow() {
      this.isShadowBg = !this.isShadowBg
      this.isSider = !!this.isCollapse
      this.totalCollapse()
    }
  }
}
</script>

<style lang="scss">
@use '@/style/mobile.scss';

.dark{
  background-color: #191a23 !important;
  color: #fff !important;
}
.light{
  background-color: #fff !important;
  color: #000 !important;
}
</style>
