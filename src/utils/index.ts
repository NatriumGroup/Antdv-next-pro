/** 将路由 meta 中的 icon 名称映射为组件引用 */
export function resolveIcon(name: string | undefined) {
  if (!name) return undefined
  return name
}

/** 休眠 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 判断是否为外链 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/** 深拷贝 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
