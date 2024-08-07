import { createRouter, createWebHistory } from 'vue-router';
// import { useUserStore } from '@/stores/user';
// import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessagesView.vue'),
      meta: {
        title: 'Send a Message',
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'conversations',
      component: () =>
        import('@/views/ConversationsView.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

// Route guard for auth routes
router.beforeEach(function (to, from, next) {
  next();
});
export default router;
