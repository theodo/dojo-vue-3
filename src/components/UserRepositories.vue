<template>
  <div class="search">
    <label>Search</label>
    <input v-model="searchQuery" />
  </div>
  <div class="filters">
    <label>Languages</label>
    <template v-for="language in allLanguages" :key="language">
      <input
        type="checkbox"
        :checked="filters.languages.includes(language)"
        @input="toggleLanguage(language)"
      />
      <span>{{ language }}</span>
    </template>
  </div>
  <div
    v-for="repository in repositories"
    :key="repository.id"
    class="repository-card"
  >
    <h1>{{ repository.title }}</h1>
    <p>{{ repository.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { useRepositoriesNameSearch } from './composables/useRepositoriesNameSearch';
import { useUserRepositories } from './composables/useUserRepositories';
import { useRepositoryFilters } from './composables/useRepositoryFilters';
import { LANGUAGES } from '@/mock';

interface Props {
  user: string;
}

export default defineComponent({
  props: {
    user: { type: String, required: true }
  },
  setup(props: Props) {
    const { repositories } = useUserRepositories(toRef(props, 'user'));

    const {
      filteredRepositories,
      updateFilters,
      filters,
      toggleLanguage
    } = useRepositoryFilters(repositories);

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoriesNameSearch(filteredRepositories);

    return {
      repositories: repositoriesMatchingSearchQuery,
      allLanguages: LANGUAGES,
      filters,
      filteredRepositories,
      updateFilters,
      toggleLanguage,
      searchQuery,
      repositoriesMatchingSearchQuery
    };
  }
});
</script>

<style>
.repository-card {
  text-align: left;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.search {
  text-align: left;
  padding-bottom: 1rem;
}
.search label {
  padding-right: 1rem;
}

.filters {
  text-align: left;
  padding-bottom: 1rem;
}
.filters label {
  padding-right: 1rem;
}
</style>
