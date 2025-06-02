import { defineStore, acceptHMRUpdate } from 'pinia';
import { api, executeList } from 'src/boot/axios';
import { loading } from 'src/boot/loading';
import { toast } from 'src/boot/toast';
import { decodeJWTPayload } from 'src/helpers/jwt-helper';

export const useUserStore = defineStore('user', {
  state: (): { user: { username: string | null } | null } => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null && state.user.username !== null,
    isCheckingAuth: (state) => state.user === null,
  },

  actions: {
    async login(input: { username: string; password: string }) {
      loading.show('login');
      const res = await api
        .post('login', { username: input.username, password: input.password })
        .catch((error) => {
          throw new Error(error.response.data.message || 'Login failed');
        })
        .finally(() => loading.hide('login'));

      if (res.data === 0) {
        toast.error('Tài khoản và mật khẩu không đúng!');
        return;
      }

      if (res.data.token) {
        this.user = { username: input.username };
        localStorage.setItem('qlhp_token', res.data.token);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('qlhp_token');
    },

    async checkAuthentication() {
      loading.show('checkAuth');
      try {
        await executeList('select 1 from my_user');

        const token = localStorage.getItem('qlhp_token');
        const payload = decodeJWTPayload(token || '');
        this.user = {
          username: payload?.unique_name || null,
        };
      } catch {
        // If the request fails, we assume the user is not authenticated
        this.user = { username: null };
      } finally {
        loading.hide('checkAuth');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
