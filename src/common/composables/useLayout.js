import { inject, markRaw, provide, ref } from "vue";

export function useLayout(layoutName) {
  const changeLayout = inject("changeLayout", false);
  if (!changeLayout) {
    console.error('Can not detect layout manager');
  } else {
    changeLayout(layoutName);
  }
}

/**
 * 
 * @param {Array} Layouts - Array of Layout components  
 * @returns 
 */
export function initLayout(Layouts) {
  const layoutName = ref('UserLayout');
  const layouts = markRaw(Layouts);


  function changeLayout(newLayout) {
    if (newLayout === layoutName.value) {
      return;
    }

    if (Layouts[newLayout]) {
      layoutName.value = newLayout;
      // layout = markRaw(Layouts[newLayout]);
    } else {
      layoutName.value = 'DefaultLayout';
      // layout = markRaw(Layouts.DefaultLayout);
    }
  }


  provide("layoutName", layoutName);
  provide("changeLayout", changeLayout);

  return {
    layouts, layoutName,
  }
}