import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore(
  'snackbar',
  function () {
    // state
    const openSnackbar = ref(false);
    const snackbarType = ref(null);
    const snackbarTitle = ref(null);
    const snackbarDescription = ref(null);

    // methods
    async function showSnackbar(type, title, description) {
      if (openSnackbar.value) {
        //   if a snackbar is already open,
        //   hide it and then open a new one after 50ms
        //   so user sees the transition and instead of
        //   a static and the content is replace
        hideSnackbar();

        setTimeout(() => {
          openSnackbar.value = true;
          snackbarType.value = type;
          snackbarTitle.value = title;
          snackbarDescription.value = description;
        }, 50);
      } else {
        openSnackbar.value = true;
        snackbarType.value = type;
        snackbarTitle.value = title;
        snackbarDescription.value = description;
      }
    }

    function hideSnackbar() {
      openSnackbar.value = false;
      snackbarType.value = null;
      snackbarTitle.value = null;
      snackbarDescription.value = null;
    }

    return {
      openSnackbar,
      snackbarType,
      snackbarTitle,
      snackbarDescription,
      showSnackbar,
      hideSnackbar
    };
  }
);
