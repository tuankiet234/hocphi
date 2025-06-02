import { boot } from 'quasar/wrappers';
import { Loading, QSpinnerGears } from 'quasar';
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: {
      show: () => void;
      hide: () => void;
    };
  }
}

const loading = {
  show: (group?: string) => {
    Loading.show({
      spinnerColor: 'white',
      spinner: QSpinnerGears,
      boxClass: 'bg-primary text-white',
      message: 'Loading...',
      group: group || '',
    });
  },
  hide: (group?: string) => {
    Loading.hide(group);
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$loading = loading;
});

export { loading };
