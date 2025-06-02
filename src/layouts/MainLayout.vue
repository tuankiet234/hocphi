<template>
  <div v-if="isCheckingAuth">Loading...</div>
  <q-layout v-else-if="isLoggedIn" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>{{ user?.username }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
  <q-layout v-else>
    <div class="column flex-center" style="height: 100vh">
      <LoginCard @login="login"></LoginCard>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useUserStore } from 'stores/user-store';
import LoginCard from 'src/components/LoginCard.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Lớp học',
    icon: 'school',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const userStore = useUserStore();
const user = computed(() => userStore.user);
await userStore.checkAuthentication();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const isCheckingAuth = computed(() => userStore.isCheckingAuth);

const login = async (input: { username: string; password: string }) => await userStore.login(input);
</script>
