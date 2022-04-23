<template>
  <div class="about">
    <h1>This is an edit page</h1>
    <el-container class="pg-quill">
      <QuillEditor theme="snow" ref="myQuillEditor" />
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QuillEditor } from "@vueup/vue-quill";

export default defineComponent({
  name: "about",
  components: {
    QuillEditor
  }
});
</script>
<style lang="scss">
.about {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.pg-quill {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}
</style>
