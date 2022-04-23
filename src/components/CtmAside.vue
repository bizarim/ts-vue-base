<template>
  <el-aside width="200px">
    <el-menu :router="true">
      <el-menu-item index="/empty">
        <el-icon></el-icon>
        <span>Empty page</span>
      </el-menu-item>
      <el-menu-item index="/edit">
        <el-icon></el-icon>
        <span>Edit page</span>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <el-icon></el-icon>
        <span>disable</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {}
});
</script>
<style scoped lang="scss">
.el-aside {
  background-color: white;
}
.el-menu {
  height: 100%;
}
</style>
