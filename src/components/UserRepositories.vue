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
import { computed, defineComponent, Ref, ref } from 'vue';
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
  watch: {
    user: 'fetchUserRepositories'
  },
  methods: {
    fetchUserRepositories() {
      this.repositories = REPOSITORIES.filter(
        (repository) => repository.author === this.user
      );
    },
    updateFilters(filters: Filters) {
      this.filters = filters;
    },
    toggleLanguage(language: string) {
      const includesLang = this.filters.languages.includes(language);
      if (includesLang) {
        this.filters = {
          languages: this.filters.languages.filter((lang) => lang !== language)
        };
      } else {
        this.filters = {
          languages: [...this.filters.languages, language]
        };
      }
    }
  },
  mounted() {
    this.fetchUserRepositories();
    this.updateFilters({ languages: this.allLanguages });
  },
  setup(props: Props) {
    const repositories: Ref<Repository[]> = ref([]);
    const allLanguages = LANGUAGES;

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

    // Search
    const searchQuery = ref('');
    const repositoriesMatchingSearchQuery = computed(() =>
      repositories.value.filter((repository) =>
        repository.title.includes(searchQuery.value)
      )
    );

    const displayedRepositories = computed(() =>
      filteredRepositories.value.filter((repository) =>
        repositoriesMatchingSearchQuery.value.includes(repository)
      )
    );

    return {
      repositories,
      allLanguages,
      filters,
      filteredRepositories,
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
