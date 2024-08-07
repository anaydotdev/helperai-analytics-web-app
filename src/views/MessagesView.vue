<template>
  <div class="mx-auto mt-16 max-w-lg">
    <div
      v-if="isLoading"
      class="bg-hgray h-64 w-full animate-pulse"
    ></div>
    <div v-else>
      <h1 class="text-htext font-primary text-2xl">
        Send a dummy message
      </h1>
      <p class="body-font">
        Once you send a dummy message, it'll show up in
        Helper AI and analytics will run.
      </p>
      <form
        @submit.prevent="sendMessage()"
        class="bg-hgray body-font mt-4 w-full rounded-xl border-[1px] border-gray-300 p-6 shadow-sm"
      >
        <div>
          <label for="from" class="font-semibold"
            >From</label
          >
          <p id="from" class="text-base">
            anonymous@gmail.com
          </p>
        </div>

        <div class="mt-8">
          <label for="to" class="font-semibold">To</label>
          <p id="to" class="text-base">shl@gumroad.com</p>
        </div>

        <div class="mt-8">
          <label for="subject" class="font-semibold">
            Subject
          </label>
          <p class="text-base" id="subject">
            Testing Helper AI
          </p>
        </div>

        <div class="mt-8">
          <label
            for="message"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Message</label
          >
          <div class="mt-2">
            <textarea
              rows="8"
              name="message"
              id="message"
              v-model="message"
              class="focus:ring-hmaroon block w-full resize-none rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <BaseButton
            color="primary"
            label="Submit"
            type="submit"
            :disabled="isMessageEmpty"
            :sneak-disabled="isSubmitting"
            :is-loading="isSubmitting"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/Base/BaseButton.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, ref, computed } from 'vue';

const userStore = useUserStore();
const message = ref(null);
const isLoading = ref(true);
const isSubmitting = ref(false);

const isMessageEmpty = computed(() => {
  return (
    message.value === null || message.value?.length === 0
  );
});

// lifecycle hooks
onMounted(async () => {
  if (!userStore.isAuthenticated) {
    await userStore.setupUser();
  }
  isLoading.value = false;
});

async function sendMessage() {
  isSubmitting.value = true;
  await userStore.sendMessage(message.value);
  isSubmitting.value = false;
  message.value = null;
}
</script>
