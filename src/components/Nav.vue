<template>
  <div>
    <nav
      class="mx-auto w-full flex-row items-center justify-between md:flex"
    >
      <div class="flex flex-grow">
        <!-- Static sidebar for desktop -->
        <div
          class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[510px] lg:flex-col"
        >
          <div class="flex grow flex-row">
            <div
              class="bg-hmaroon flex w-48 flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-4 text-white"
            >
              <div class="flex h-16 shrink-0 items-center">
                <div
                  class="flex flex-row items-center gap-2"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="bg-hgold border-hgray flex h-4 w-4 items-center justify-center rounded-full border-2 p-2 text-center"
                    >
                      <span
                        class="text-hmaroon font-primary text-[10px] font-bold"
                      >
                        SL
                      </span>
                    </div>
                    <p class="font-primary text-lg">
                      Inbox
                    </p>
                  </div>
                </div>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul
                  role="list"
                  class="flex flex-1 flex-col gap-y-7"
                >
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li
                        v-for="item in navigation"
                        :key="item.name"
                      >
                        <RouterLink
                          :to="item.href"
                          :class="[
                            item.current
                              ? 'rounded-lg bg-[#511A1A]'
                              : 'text-secondary hover:rounded-lg hover:bg-[#511A1A]',
                            'group flex gap-x-3 rounded-md p-2 font-primary text-sm leading-6'
                          ]"
                        >
                          {{ item.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </li>

                  <li class="mt-auto">
                    <RouterLink
                      to="/"
                      class="group -mx-2 flex items-center gap-x-2 rounded-md p-2 font-primary text-sm leading-6 hover:rounded-lg hover:bg-[#511A1A]"
                    >
                      <Cog6ToothIcon
                        class="h-4 w-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      Settings
                    </RouterLink>
                    <RouterLink
                      to="/"
                      class="group -mx-2 flex items-center gap-x-2 rounded-md p-2 font-primary text-sm leading-6 hover:rounded-lg hover:bg-[#511A1A]"
                    >
                      <img
                        class="h-4 w-4 scale-x-[-1] transform"
                        src="/src/assets/logo_icon_white.svg"
                        alt="logo"
                      />

                      Sign out
                    </RouterLink>

                    <div
                      class="group -mx-2 flex items-center gap-x-2 rounded-md p-2 font-primary text-sm leading-6"
                    >
                      <div
                        class="bg-hgold border-hgray flex h-4 w-4 items-center justify-center rounded-full border-2 p-2 text-center"
                      >
                        <span
                          class="text-hmaroon font-primary text-[10px] font-bold"
                          >SL</span
                        >
                      </div>
                      <p>Sahil</p>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              class="grow border-r-[1px] border-gray-300"
            >
              <div class="flex h-screen flex-col">
                <div
                  class="body-font flex justify-between border-b-[1px] border-gray-300 p-4"
                >
                  <span>Open</span>
                  <span>Newest</span>
                </div>
                <div
                  class="flex flex-col overflow-y-scroll"
                >
                  <div
                    v-for="message in messages"
                    :key="message.id"
                  >
                    <div
                      class="body-font hover:bg-hyellow flex cursor-pointer flex-row justify-between border-b-[1px] border-gray-300 p-4"
                      @click="selectMessage(message)"
                    >
                      <div>
                        <h2 class="font-semibold">
                          anonymous@gmail.com
                        </h2>
                        <div class="">
                          <p class="mb-2">
                            Testing Helper AI
                          </p>

                          <div
                            @click="
                              goToLink(
                                message.analytics_bucket
                                  .bucket
                              )
                            "
                            :class="[
                              isLinked(
                                message.analytics_bucket
                                  .bucket
                              )
                                ? 'cursor-pointer hover:bg-opacity-50'
                                : ''
                            ]"
                            class="bg-hmaroon flex select-none items-center gap-1 rounded-md bg-opacity-80 px-2 py-1 text-xs text-white"
                          >
                            <ArrowTopRightOnSquareIcon
                              v-if="
                                isLinked(
                                  message.analytics_bucket
                                    .bucket
                                )
                              "
                              class="h-3 w-3 text-white"
                            />
                            <p>
                              {{
                                formattedBucket(
                                  message.analytics_bucket
                                    .bucket
                                )
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <p class="text-xs">
                          {{
                            formattedDate(
                              message.created_at
                            )
                          }}
                        </p>
                        <p class="text-xs">
                          {{
                            formattedTime(
                              message.created_at
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-grow"></div>

                <div
                  class="h-96 border-t-[1px] border-gray-300 p-4"
                >
                  <div class="rounded-xl p-4">
                    <h2 class="font-primary font-semibold">
                      Analytics
                    </h2>
                    <div class="">
                      <Chart
                        type="pie"
                        :data="chartData"
                        :options="chartOptions"
                        class=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main class="h-full w-full grow lg:pl-[510px]">
          <!-- <ConversationView /> -->
          <!-- Your content -->
          <slot></slot>
        </main>
      </div>
    </nav>
  </div>
</template>

<script setup>
// utils
import { RouterLink } from 'vue-router';
import {
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';
import { supabase } from '@/services/supabase';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import Chart from 'primevue/chart';

const userStore = useUserStore();

const navigation = [
  {
    name: 'All',
    href: '/',
    current: true
  },
  {
    name: 'Assigned to me',
    href: '/',
    current: false
  },
  {
    name: 'Escalated',
    href: '/',
    current: false
  }
];

const messages = ref([]);
const helpLinks = ref({
  'Creator - Open an account':
    'https://help.gumroad.com/category/316-open-an-account',
  'Creator - Add a product':
    'https://help.gumroad.com/category/318-add-a-product',
  'Creator - Start selling':
    'https://help.gumroad.com/category/319-start-selling',
  'Creator - Market your work':
    'https://help.gumroad.com/category/328-market-your-work',
  'Creator - Get paid':
    'https://help.gumroad.com/category/320-get-paid',
  'Creator - Advanced':
    'https://help.gumroad.com/category/321-advanced',
  'Creator - Contact Gumroad':
    'https://help.gumroad.com/category/322-contact-gumroad',
  'Customer - Before you buy':
    'https://customers.gumroad.com/category/220-before-you-buy',
  'Customer - Accessing your purchase':
    'https://customers.gumroad.com/category/219-after-your-purchase',
  'Customer - Receipts and refunds':
    'https://customers.gumroad.com/category/337-receipts-and-refunds',
  'Customer - Issues with your purchase':
    'https://customers.gumroad.com/category/338-issues-with-your-purchase'
});

const pieChartValues = computed(() => {
  const counts = {
    'Creator - Open an account': 0,
    'Creator - Add a product': 0,
    'Creator - Start selling': 0,
    'Creator - Market your work': 0,
    'Creator - Get paid': 0,
    'Creator - Advanced': 0,
    'Creator - Contact Gumroad': 0,
    'Customer - Before you buy': 0,
    'Customer - Accessing your purchase': 0,
    'Customer - Receipts and refunds': 0,
    'Customer - Issues with your purchase': 0,
    'Customer - Feature Requests': 0,
    'Seller - Feature Requests': 0
  };

  for (const message of messages.value) {
    const bucket = message.analytics_bucket.bucket;
    if (
      Object.prototype.hasOwnProperty.call(counts, bucket)
    ) {
      counts[bucket] += 1;
    }
  }

  return [
    counts['Creator - Open an account'],
    counts['Creator - Add a product'],
    counts['Creator - Start selling'],
    counts['Creator - Market your work'],
    counts['Creator - Get paid'],
    counts['Creator - Advanced'],
    counts['Creator - Contact Gumroad'],
    counts['Customer - Before you buy'],
    counts['Customer - Accessing your purchase'],
    counts['Customer - Receipts and refunds'],
    counts['Customer - Issues with your purchase'],
    counts['Customer - Feature Requests'],
    counts['Seller - Feature Requests']
  ];
});

const chartData = ref(null);
function updateChartData() {
  chartData.value = {
    labels: [
      'Creator - Open an account',
      'Creator - Add a product',
      'Creator - Start selling',
      'Creator - Market your work',
      'Creator - Get paid',
      'Creator - Advanced',
      'Creator - Contact Gumroad',
      'Customer - Before you buy',
      'Customer - Accessing your purchase',
      'Customer - Receipts and refunds',
      'Customer - Issues with your purchase',
      'Customer - Feature Requests',
      'Seller - Feature Requests'
    ],
    datasets: [
      {
        data: pieChartValues.value,
        backgroundColor: [
          'blue',
          'red',
          'orange',
          'yellow',
          'purple',
          'black',
          'gray',
          'teal',
          'pink',
          'brown',
          'violet'
        ],
        hoverBackgroundColor: []
      }
    ]
  };
}

const chartOptions = {
  plugins: {
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        color: 'green'
      }
    }
  }
};

supabase
  .channel('message-inserts')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: `messages_${userStore.userHash}`
    },
    (payload) => {
      messages.value.unshift({
        id: payload.new.id,
        message: payload.new.message,
        analytics_bucket: payload.new.analytics_bucket,
        created_at: payload.new.created_at
      });

      updateChartData();
    }
  )
  .subscribe();

onMounted(() => {
  selectMessage(null);
});

function isLinked(bucket) {
  if (helpLinks.value[bucket]) {
    return true;
  }
  return false;
}

function goToLink(bucket) {
  if (helpLinks.value[bucket]) {
    window.open(helpLinks.value[bucket], '_blank');
  }
}

function formattedDate(_date) {
  const date = new Date(_date);
  const options = {
    month: 'short', // Abbreviated month name
    day: 'numeric', // Numeric day of the month
    year: 'numeric'
  };

  return date.toLocaleString('en-US', options);
}

function formattedTime(_date) {
  const date = new Date(_date);
  const options = {
    hour: 'numeric', // Numeric hour
    minute: 'numeric', // Numeric minutes
    hour12: true, // 12-hour format,
    second: 'numeric' // Numeric seconds
  };

  return date.toLocaleString('en-US', options);
}

function formattedBucket(_bucket) {
  if (_bucket.length > 15) {
    return _bucket.substring(0, 35) + '...';
  }
  return _bucket;
}

function selectMessage(message) {
  userStore.setSelectedMessage(message);
}
</script>
