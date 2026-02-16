// Mock for laravel-nova during build time
// In actual Nova application, this will be provided by Nova itself

export const FormField = {
  data() {
    return {
      value: null
    }
  },
  methods: {
    setInitialValue() {},
    fill() {}
  }
};

export const HandlesValidationErrors = {
  computed: {
    errors() {
      return [];
    }
  }
};
