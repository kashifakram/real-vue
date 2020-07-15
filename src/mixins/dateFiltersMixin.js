// filters can be used with directives like v-bind
export const dateFilters = {
  filters: {
    localeUS(value) {
      const date = new Date(value);
      return date.toLocaleDateString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    }
  }
};
