<template>
  <div class="app-table d-flex flex-column">
    <!-- Table Element -->
    <table class="w-full shadow">
      <!-- Header -->
      <thead
        class="text-left"
        :class="[
          `bg-${color}`,
          color === 'white' ? 'text-black' : 'text-white',
        ]"
      >
        <!-- Header Rows -->
        <tr>
          <!-- Header Cell -->
          <th
            v-for="(header, index) in localHeaders"
            class="p-2 align-center"
            :class="header.className || null"
            :key="`app-table-header-${header.value || header.text}-${index}`"
          >
            <p class="m-0 inline truncate">
              {{ header.text || header.value || header }}
            </p>
            <!-- Sorting Icon -->
            <component
              v-if="header.sortable"
              :is="header.desc ? 'ArrowNarrowUpIcon' : 'ArrowNarrowDownIcon'"
              class="
                m-0
                mx-1
                app-icon-sm
                inline
                hover:opacity-60
                cursor-pointer
              "
              @click="sort(header.value || header.text, !header.desc)"
            ></component>
          </th>
        </tr>
      </thead>
      <tr v-if="!items">
        <td class="font-bold text-center p-3" :colspan="headers.length">
          No items to show
        </td>
      </tr>
      <tbody v-else class="text-sm">
        <!-- Item Row -->
        <slot name="items" :shownItems="displayableItems">
          <tr
            v-for="(item, itemIndex) in displayableItems"
            :key="`appTableItem-${itemIndex}`"
            :class="[
              `even:bg-${color} even:bg-opacity-10`,
              hoverable
                ? `hover:bg-${color} hover:bg-opacity-50 cursor-pointer shadow`
                : '',
            ]"
            @click="$emit('itemClick', item)"
          >
            <!-- Item Cell -->
            <slot name="item" :shownItem="item">
              <td
                v-for="(property, propertyIndex) in localHeaders"
                :key="`appTableItem-${itemIndex}-${propertyIndex}`"
                class="p-2"
              >
                <!-- Item Cell Content -->
                <slot
                  :name="`item-${property.value || propertyIndex}`"
                  :item="item"
                >
                  {{
                    item[property.value] ||
                    item[property.text] ||
                    item[property]
                  }}
                </slot>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </table>
    <!-- Pagination Content -->
    <AppPagination
      class="mt-auto p-2"
      :class="paginationConfig.class || ''"
      :currentPage="currentPage || localCurrentPage"
      :itemsPerPage="itemsPerPage || items.length"
      :total="apiTotal || items.length"
      :hideDetails="paginationConfig.hideDetail || false"
      :centerPagination="paginationConfig.centerPagination || false"
      @update:currentPage="goToPage"
    ></AppPagination>
  </div>
</template>

<script>
import { computed, ref, toRefs, watch } from "vue";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/vue/solid";
import AppPagination from "./AppPagination.vue";

export default {
  name: "AppTable",
  components: { ArrowNarrowDownIcon, ArrowNarrowUpIcon, AppPagination },

  props: {
    /** Color theme of the table */
    color: { type: String, default: "primary-500" },
    /**
     * Table headers to be displayed. can be String or Object.
     *
     * Object Properties:
     * - @property {String} text  - Text to be displayed as header
     * - @property {String} value - The key to match with the item
     * - @property {Boolean} sortable - Flag to make the header sortable
     * - @property {Boolean} desc  - Flag to sort the data by descending order
     */
    headers: { type: Array, default: () => [] },
    /** Flag whether to make items hoverable */
    hoverable: { type: Boolean, default: false },
    /** List of items to be displayed. Should be an array of object
     *  that matches the value of the header
     */
    items: { type: Array, default: () => [] },
    /** Items to be displayed per page. (Not usable when using apiPage prop ) */
    itemsPerPage: { type: [String, Number], default: 10 },
    /** current page of items to be displayed */
    currentPage: { type: [String, Number], default: 0 },
    /** current page of items being displayed.
     * (To be used when retrieving data from the API)
     */
    apiPage: { type: [String, Number], default: 0 },
    /** Total number of items from the API.
     * (To be used when retrieving data from the API)
     */
    apiTotal: { type: [String, Number], default: 0 },
    /**
     * Configuration for the table pagination.
     *
     * Object Properties:
     * - @property {String} class  - class to be appended to the pagination component
     * - @property {Boolean} hideDetails - Hides the page information at the lower left side
     * - @property {Boolean} centerPagination - Aligns the pagination button to the middle
     */
    paginationConfig: {
      type: Object,
      default: () => ({
        class: "",
        hideDetails: false,
        centerPagination: false,
      }),
    },
  },

  setup(props, context) {
    const { headers, currentPage, apiPage, items, itemsPerPage } =
      toRefs(props);

    /******************************
     COMPONENT STATE 
     ******************************/

    //  clone props for local use
    const localHeaders = ref(headers.value);
    const localCurrentPage = ref(currentPage.value || 1);

    // items to be displayed in the table
    const displayableItems = computed(() => {
      if (apiPage.value) {
        return items.value;
      } else {
        const _page = currentPage.value || localCurrentPage.value;
        const _start = itemsPerPage.value * (_page - 1);
        const _end = itemsPerPage.value * _page;
        const _items = [...items.value];
        return _items.slice(_start, _end);
      }
    });

    /** Sorting Logic */

    function sort(header, desc) {
      const getMatchingHeader = (_header) => {
        return _header.value === header || header.text === header;
      };

      const newHeader = [...localHeaders.value];
      newHeader.find(getMatchingHeader).desc = desc;
      localHeaders.value = false;
      localHeaders.value = newHeader;
      context.emit("sort", { header, desc });
      context.emit("update:headers", newHeader);
    }
    // watchers for current page props (updates the local value on prop change)
    watch(
      () => headers,
      (_headers) => (localHeaders.value = _headers)
    );

    /** Pagination Logic */

    function goToPage(page) {
      context.emit("update:apiPage", page);
      context.emit("update:currentPage", page);
      localCurrentPage.value = page;
    }
    // watchers for current page props (updates the local value on prop change)
    watch(
      () => apiPage,
      (page) => (localCurrentPage.value = page)
    );
    watch(
      () => currentPage,
      (page) => (localCurrentPage.value = page)
    );

    const componentState = {
      localHeaders,
      localCurrentPage,
      displayableItems,
      sort,
      goToPage,
    };

    return {
      ...componentState,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>