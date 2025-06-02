import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: {
      success: (message: string) => void;
      error: (message: string) => void;
      warning: (message: string) => void;
      info: (message: string) => void;
    };
  }
}

const toast = {
  success: (message: string) => {
    Notify.create({
      type: 'positive',
      message,
      classes: 'q-mb-xl',
    });
  },
  error: (message: string) => {
    Notify.create({
      type: 'negative',
      message,
      classes: 'q-mb-xl',
    });
  },
  warning: (message: string) => {
    Notify.create({
      type: 'warning',
      message,
      classes: 'q-mb-xl',
    });
  },
  info: (message: string) => {
    Notify.create({
      type: 'info',
      message,
      classes: 'q-mb-xl',
    });
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$toast = toast;
});

export { toast };
