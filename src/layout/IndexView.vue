<script setup lang="ts">
import AppmainViewVue from './components/AppmainView.vue';
import NavbarView from './components/NavbarView.vue';

</script>

<template>
  <div class="relative">
  <NavbarView class="fixed top-0 left-0 w-screen h-16"></NavbarView>
  
  <AppmainViewVue class="w-screen h-screen pt-16 bg-cover bg-homeImgae"></AppmainViewVue>
  </div>
</template>

<style scoped>

</style>