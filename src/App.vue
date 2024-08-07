<template>
  <div>
    <Nav v-if="inApp">
      <RouterView class="w-full" />
    </Nav>

    <RouterView v-else class="w-full" />
  </div>

  <BaseSnackbar />
</template>

<script setup>
// components
import Nav from '@/components/Nav.vue';
import BaseSnackbar from '@/components/Base/BaseSnackbar.vue';

// vue utils
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';

// component state
const route = useRoute();

const inApp = computed(() => {
  return route.name === 'conversations';
});
</script>
