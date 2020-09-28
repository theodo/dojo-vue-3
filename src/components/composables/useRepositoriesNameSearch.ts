import { Repository } from '@/components/composables/useUserRepositories';
import { computed, Ref, ref } from 'vue';

export const useRepositoriesNameSearch = (repositories: Ref<Repository[]>) => {
  const searchQuery = ref('');

  const repositoriesMatchingSearchQuery = computed(() =>
    repositories.value.filter((repository) =>
      repository.title.includes(searchQuery.value)
    )
  );

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  };
};
