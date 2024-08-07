<template>
  <div>
    <div class="body-font p-8" v-if="!selectedMessage">
      No message selected.
    </div>
    <div
      v-else
      class="body-font flex h-screen w-full flex-col"
    >
      <div
        class="w-full border-b-[1px] border-gray-300 p-4"
      >
        <h3 class="font-semibold">anonymous@gmail.com</h3>
        <p>Testing Helper AI</p>
      </div>

      <div class="flex-grow p-4">
        <div class="flex flex-row items-center gap-1">
          <EnvelopeIcon class="h-3 w-3" />
          <span class="text-xs">
            anonymous@gmail.com • {{
              formattedDateTime(selectedMessage.created_at)
            }}
          </span>
        </div>
        <p class="bg-hgray mt-1 rounded-lg p-4">
          {{ selectedMessage.message }}
        </p>
      </div>

      <div
        class="bg-hgray h-64 w-full border-t-[1px] border-gray-300 p-4"
      >
        <span>Add CC or BCC</span>
        <div
          class="mt-2 h-36 rounded-md border-[1px] border-gray-300 bg-white"
        >
          <div
            class="flex h-8 w-full items-center justify-start gap-4 border-b-[1px] border-gray-300 px-2"
          >
            <BoldIcon class="h-4 w-4" />
            <ItalicIcon class="h-4 w-4" />
            <UnderlineIcon class="h-4 w-4" />
          </div>
          <p class="p-3 text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illo numquam harum quas
            aperiam mollitia?
          </p>
        </div>

        <div
          class="mt-3 flex flex-row items-center justify-between"
        >
          <BaseButton color="secondary" label="Reopen" />
          <BaseButton color="primary" label="Reply" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  EnvelopeIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/Base/BaseButton.vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const selectedMessage = computed(
  () => userStore.selectedMessage
);

function formattedDateTime(_datetime) {
  const date = new Date(_datetime);
  const options = {
    month: 'short', // Abbreviated month name
    day: 'numeric', // Numeric day of the month
    year: 'numeric',
    hour: 'numeric', // Numeric hour
    minute: 'numeric', // Numeric minutes
    hour12: true, // 12-hour format,
    second: 'numeric' // Numeric seconds
  };

  return date.toLocaleString('en-US', options);
}
</script>
