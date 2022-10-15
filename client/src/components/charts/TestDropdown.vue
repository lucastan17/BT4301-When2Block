<template>
    <section>
      <o-dropdown :triggers="['hover']" :value="selectedOptions" aria-role="list">
        <template #trigger>
          <o-button variant="primary" type="button">
            <span>{{ selectedOptions }}</span>
          </o-button>
        </template>
  
        <o-tooltip label="Tooltip top" size="large" position="right" multiline> 
        <o-dropdown-item value="option1" aria-role="listitem">
          <span>Option 1</span>
        </o-dropdown-item>
        </o-tooltip>
  
        <o-dropdown-item value="option2" aria-role="listitem">
          <span>Option 2</span>
        </o-dropdown-item>
  
        <o-dropdown-item value="option3" aria-role="listitem">
          <span>Option 3</span>
        </o-dropdown-item>
      </o-dropdown>

    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default{
    setup() {
      const selectedOptions = ref('');
  
      return {
        selectedOptions,
      };
    },
  };
  </script>

<style>
.oruga-tooltip-background-color {
  background-color: white;
}
</style>