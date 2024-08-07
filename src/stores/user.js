import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/services/supabase';
import { useSnackbarStore } from '@/stores/snackbar';

export const useUserStore = defineStore(
  'user',
  function () {
    // state
    const userHash = ref(null);
    const selectedMessage = ref(null);
    const snackbarStore = useSnackbarStore();

    // computed
    const isAuthenticated = computed(() => {
      return userHash.value !== null;
    });

    async function setupUser() {
      try {
        const hash = self.crypto.randomUUID();

        const { error } = await supabase.functions.invoke(
          'create-user-tables',
          {
            body: JSON.stringify({ hash: `${hash}` })
          }
        );

        if (error) {
          throw error;
        }
        userHash.value = hash;
        console.log('user is good to go!');
      } catch (error) {
        snackbarStore.showSnackbar(
          'error',
          'Error loading demo'
        );
      }
    }

    async function sendMessage(message) {
      try {
        const { error } = await supabase.functions.invoke(
          'send-message',
          {
            body: JSON.stringify({
              hash: `${userHash.value}`,
              message: `${message}`
            })
          }
        );

        if (error) {
          throw error;
        }

        snackbarStore.showSnackbar(
          'success',
          'Message sent. Go to Helper AI in a new tab.'
        );
      } catch (error) {
        snackbarStore.showSnackbar(
          'error',
          'Error sending message'
        );
      }
    }

    async function setSelectedMessage(message) {
      selectedMessage.value = message;
    }

    return {
      // state
      userHash,
      selectedMessage,
      isAuthenticated,

      setupUser,
      sendMessage,
      setSelectedMessage
    };
  },
  { persist: true }
);
