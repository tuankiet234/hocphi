<template>
  <q-card>
    <q-card-section class="text-h5 text-center"> ĐĂNG NHẬP </q-card-section>
    <q-card-section>
      <q-form @submit="emit('login', input)" class="q-gutter-md" style="width: 300px" autofocus>
        <q-input
          v-model="input.username"
          label="Username *"
          :rules="[(val) => (val && val.length > 0) || 'Vui lòng không để trống']"
        />

        <q-input
          type="password"
          v-model="input.password"
          label="Password *"
          :rules="[(val) => (val && val.length > 0) || 'Vui lòng không để trống']"
        />

        <div class="text-center">
          <q-btn label="Đăng nhập" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ login: [input: { username: string; password: string }] }>();

const input = ref({
  username: '',
  password: '',
});
</script>
