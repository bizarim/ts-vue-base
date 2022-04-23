<template>
  <el-container class="pg-sample">
    <ctm-header />
    <el-container>
      <ctm-aside />
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import CtmHeader from "@/components/CtmHeader.vue";
import CtmAside from "@/components/CtmAside.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CtmHeader,
    CtmAside
  }
});
</script>
<style lang="scss">
.pg-sample {
  display: flex;
  flex-direction: column;
}
</style>
