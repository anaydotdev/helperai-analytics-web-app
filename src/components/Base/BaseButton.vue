<template>
  <div>
    <button
      v-bind="$attrs"
      @click="click()"
      class="rounded-lg outline-none hover:opacity-80 focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-2"
      :class="[
        color === 'primary' ? 'bg-hmaroon text-white' : '',
        color === 'secondary'
          ? 'text-hmaroon border-hmaroon hover:bg-hyellow border-[1px] bg-white '
          : '',

        shadow === 'medium' ? 'shadow-md' : '',
        size === 'small' ? 'px-4 py-1.5 text-xs' : '',
        size === 'medium' ? 'h-9 px-5 py-2 text-sm' : '',
        disabled ? 'pointer-events-none  opacity-50' : '',
        isLoading || sneakDisabled
          ? 'pointer-events-none'
          : ''
      ]"
    >
      <!-- loading spinner -->
      <div
        v-if="isLoading"
        class="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        :class="[
          size === 'small' ? 'text-sm' : '',
          size === 'medium' ? 'text-base' : '',
          color === 'quarternary'
            ? 'text-slate-900'
            : 'text-white'
        ]"
        role="status"
        aria-label="loading"
      />
      <span v-else>
        {{ label }}
      </span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    required: false
  },
  color: {
    type: String,
    default: 'primary',
    required: false
  },
  label: {
    type: String,
    default: null,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false,
    required: false
  },
  shadow: {
    type: String,
    required: false,
    default: ''
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  // button is disabled but in an active style state
  sneakDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

function click(event) {
  if (props.disabled || props.sneakDisabled) {
    return;
  }
  emit('click', event);
}
</script>
