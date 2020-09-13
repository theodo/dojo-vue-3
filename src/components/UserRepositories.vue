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
    v-for="repository in displayedRepositories"
    :key="repository.id"
    class="repository-card"
  >
    <h1>{{ repository.title }}</h1>
    <p>{{ repository.description }}</p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  watch,
  toRef
} from 'vue';
import { REPOSITORIES, LANGUAGES } from '../mock';

export interface Repository {
  id: string;
  title: string;
  description: string;
  language: string;
  author: string;
}

export interface Filters {
  languages: string[];
}

interface Data {
  repositories: Repository[];
  filters: Filters;
  searchQuery: string;
  allLanguages: string[];
}

interface Props {
  user?: string;
}

export default defineComponent({
  props: {
    user: { type: String }
  },
  setup(props: Props) {
    const repositories: Ref<Repository[]> = ref([]);
    const allLanguages = LANGUAGES;

    const fetchUserRepositories = () => {
      repositories.value = REPOSITORIES.filter(
        (repository) => repository.author === props.user
      );
    };

    // Filters
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

    // Search
    const searchQuery = ref('');
    const repositoriesMatchingSearchQuery = computed(() =>
      repositories.value.filter((repository) =>
        repository.title.includes(searchQuery.value)
      )
    );
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

    const displayedRepositories = computed(() =>
      filteredRepositories.value.filter((repository) =>
        repositoriesMatchingSearchQuery.value.includes(repository)
      )
    );

    watch(toRef(props, 'user'), fetchUserRepositories);

    onMounted(() => {
      fetchUserRepositories();
      updateFilters({ languages: allLanguages });
    });

    return {
      repositories,
      allLanguages,
      fetchUserRepositories,
      filters,
      filteredRepositories,
      updateFilters,
      toggleLanguage,
      searchQuery,
      repositoriesMatchingSearchQuery,
      displayedRepositories
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
