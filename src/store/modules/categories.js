export const state = {
  categories: [
    'sustainability',
    'nature',
    'animal welfare',
    'housing',
    'education',
    'food',
    'community'
  ]
};

export const getters = {
  totalCategories: s => s.categories.length
};
