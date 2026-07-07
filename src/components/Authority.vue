<script setup lang="ts">
import { usePermission } from '@/composables/usePermission'

const props = defineProps<{
  /** 所需角色或权限，满足其一即可 */
  value: string | string[]
}>()

const { hasAuth } = usePermission()

const isAuthorized = computed(() => hasAuth(props.value))
</script>

<template>
  <slot v-if="isAuthorized" />
  <slot v-else name="unauthorized" />
</template>
