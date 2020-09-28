import { REPOSITORIES } from '../../mock';
import { onMounted, ref, Ref, watch } from 'vue';

export interface Repository {
  id: string;
  title: string;
  description: string;
  language: string;
  author: string;
}

export const useUserRepositories = (user: Ref<string | undefined>) => {
  const repositories: Ref<Repository[]> = ref([]);

  const fetchUserRepositories = () => {
    repositories.value = REPOSITORIES.filter(
      (repository) => repository.author === user.value
    );
  };

  onMounted(() => {
    fetchUserRepositories();
  });

  watch(user, fetchUserRepositories);

  return {
    repositories
  };
};
