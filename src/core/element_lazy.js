//  按需引入element
import {
  ElAside,
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElInputNumber,
  ElLoading,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMessage,
  ElMessageBox,
  ElOption,
  ElPagination,
  ElPopover,
  ElProgress,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSteps,
  ElSubMenu,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTag,
  ElTooltip,
  ElTree,
  ElUpload,
  ElImage,
  ElIcon
} from 'element-plus';

import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function registerElements(app) {
  // 注册组件
  app.component(ElButton.name, ElButton);
  app.component(ElSelect.name, ElSelect);
  app.component(ElDialog.name, ElDialog);
  app.component(ElForm.name, ElForm);
  app.component(ElFormItem.name, ElFormItem);
  app.component(ElInput.name, ElInput);
  app.component(ElOption.name, ElOption);
  app.component(ElContainer.name, ElContainer);
  app.component(ElCard.name, ElCard);
  app.component(ElDropdown.name, ElDropdown);
  app.component(ElDropdownMenu.name, ElDropdownMenu);
  app.component(ElDropdownItem.name, ElDropdownItem);
  app.component(ElRow.name, ElRow);
  app.component(ElCol.name, ElCol);
  app.component(ElMenu.name, ElMenu);
  app.component(ElSubMenu.name, ElSubMenu);
  app.component(ElMenuItem.name, ElMenuItem);
  app.component(ElAside.name, ElAside);
  app.component(ElMain.name, ElMain);
  app.component(ElBadge.name, ElBadge);
  app.component(ElHeader.name, ElHeader);
  app.component(ElTabs.name, ElTabs);
  app.component(ElBreadcrumb.name, ElBreadcrumb);
  app.component(ElBreadcrumbItem.name, ElBreadcrumbItem);
  app.component(ElAvatar.name, ElAvatar);
  app.component(ElTabPane.name, ElTabPane);
  app.component(ElDivider.name, ElDivider);
  app.component(ElTable.name, ElTable);
  app.component(ElTableColumn.name, ElTableColumn);
  app.component(ElCascader.name, ElCascader);
  app.component(ElCheckbox.name, ElCheckbox);
  app.component(ElTag.name, ElTag);
  app.component(ElPagination.name, ElPagination);
  app.component(ElDrawer.name, ElDrawer);
  app.component(ElTree.name, ElTree);
  app.component(ElCheckboxGroup.name, ElCheckboxGroup);
  app.component(ElPopover.name, ElPopover);
  app.component(ElInputNumber.name, ElInputNumber);
  app.component(ElSwitch.name, ElSwitch);
  app.component(ElCollapse.name, ElCollapse);
  app.component(ElCollapseItem.name, ElCollapseItem);
  app.component(ElTooltip.name, ElTooltip);
  app.component(ElDatePicker.name, ElDatePicker);
  app.component(ElSteps.name, ElSteps);
  app.component(ElUpload.name, ElUpload);
  app.component(ElProgress.name, ElProgress);
  app.component(ElScrollbar.name, ElScrollbar);
  app.component(ElImage.name, ElImage);
  app.component(ElColorPicker.name, ElColorPicker);

  // 注册指令
  app.directive('loading', ElLoading.directive);

  // 挂载全局方法
  app.config.globalProperties.$loading = ElLoading.service;
  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$confirm = ElMessageBox.confirm;

  // 修改默认属性
  ElDialog.props.closeOnClickModal.default = false;

  // 注册图标
  app.component(ElIcon.name, ElIcon);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}