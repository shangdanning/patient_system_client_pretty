<template>
  <el-row class="navMenu">
    <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose"
        background-color="#F2F2F2"
        text-color="#7D7D7D"
        active-text-color="#0083FF"
      >
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
          <template slot="title">
            <!-- <icon :name="item.icon"></icon> -->
            <span v-text="item.name" class="marginLeft36"></span>
          </template>
          <el-menu-item-group
            class="over-hide"
            v-for="sub in item.sub"
            :key="sub.componentName"
          >
            <el-menu-item
              :index="sub.componentName"
              v-text="sub.name"
              :class="{ rowSelected: sub.selected }"
              @click="clickMenuItem(sub)"
            >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.over-hide {
  overflow: hidden;
}
</style>

<script>
import { mapState } from "vuex";
import {
  MU_SICK_USERID,
  MU_ADDPAGE_WHOLESTATUS,
  MU_SICK_EPISODES
} from "@/common/business/constants";
export default {
  data() {
    return {
      lastSub: {}
    };
  },
  computed: {
    ...mapState({
      menu: state => state.system.sysMenu
    })
  },
  methods: {
    handleOpen() {
      // key, keyPath
      // console.log(key, keyPath);
    },
    handleClose() {
      // key, keyPath
      // console.log(key, keyPath);
    },
    clickMenuItem(sub) {
      this.lastSub.selected && (this.lastSub.selected = false);
      sub.selected = true;
      this.lastSub = sub;
      if (sub.componentName.indexOf("SickEnceAdd") !== -1) {
        // 点击新增患者时，将userid置0，新增页全局状态置edit
        this.$store.commit(MU_SICK_USERID, {
          id: 0,
          age: 0,
          user: {}
        });
        this.$store.commit(MU_ADDPAGE_WHOLESTATUS, "edit");
        this.$store.commit(MU_SICK_EPISODES, "");
      }
    }
  }
};
</script>
<style lang="less">
.el-submenu .el-menu-item {
  text-align: center;
  border-left: 6px solid rgb(242, 242, 242) !important;
  &:hover,
  &:focus {
    border-left: 6px solid rgb(64, 158, 255) !important;
    background-color: #dcdcdc !important;
  }
}

.el-submenu__title {
  height: 55px !important;
  border-bottom: 1px solid #ffffff !important;
  &:hover,
  &:focus {
    background-color: #dcdcdc !important;
  }
}
.el-submenu {
  .el-menu {
    .el-menu-item-group {
      border-bottom: 1px solid #fff;
      .el-menu-item-group__title {
        padding: 0px !important;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.navMenu {
  .rowSelected {
    border-left: 6px solid rgb(64, 158, 255) !important;
    background-color: #dcdcdc !important;
    font-weight: bold;
    color: rgb(125, 125, 125) !important;
  }
  .marginLeft36 {
    margin-left: 36px;
  }
}
</style>
