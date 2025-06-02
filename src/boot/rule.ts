import { boot } from 'quasar/wrappers';
const rule = {
  required: (val: string | number | undefined | null) =>
    (val !== undefined && val !== null && val.toString().length > 0) || 'Không được để trống',
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $rule: typeof rule;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$rule = rule;
});

export { rule };
