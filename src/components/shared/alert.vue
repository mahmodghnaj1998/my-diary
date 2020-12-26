<template>
  <div>
    <v-alert type="error" dismissible border="left" dark @input="onClose">
      {{ text }}
    </v-alert>
  </div>
</template>
<script>
export default {
  methods: {
    onClose() {
      this.$emit("dismissible");
    },
  },
  props: ["text"],
};
</script>>