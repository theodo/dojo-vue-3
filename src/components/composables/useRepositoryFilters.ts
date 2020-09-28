import { computed, onMounted, Ref, ref } from 'vue';
import { Repository } from '@/components/composables/useUserRepositories';

import { LANGUAGES } from '@/mock';

export interface Filters {
  languages: string[];
}

export const useRepositoryFilters = (repositories: Ref<Repository[]>) => {
  const filters: Ref<Filters> = ref({
    languages: []
  });
  const filteredRepositories = computed(() =>
    repositories.value.filter((repository) =>
      filters.value.languages
        ? filters.value.languages.includes(repository.language)
        : true
    )
  );

  const updateFilters = (newFilters: Filters) => {
    filters.value = newFilters;
  };

  const toggleLanguage = (language: string) => {
    const includesLang = filters.value.languages.includes(language);
    if (includesLang) {
      filters.value = {
        languages: filters.value.languages.filter((lang) => lang !== language)
      };
    } else {
      filters.value = {
        languages: [...filters.value.languages, language]
      };
    }
  };

  onMounted(() => {
    updateFilters({ languages: LANGUAGES });
  });

  return {
    filteredRepositories,
    updateFilters,
    filters,
    toggleLanguage
  };
};
