const LOCALSTORAGE_NAME = 'current-theme'
let rootStyles = void 0
// 设置主题
const setThemes = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  rootStyles = getComputedStyle(document.documentElement);
}
export const initThemes = () => {
  // 初始化主题
  const currentTheme = localStorage.getItem(LOCALSTORAGE_NAME) || 'default'
  setThemes(currentTheme)
}

export const changeThemes = (theme) => {
  localStorage.setItem(LOCALSTORAGE_NAME, theme);
  setThemes(theme);
}
// 根据name获取主题颜色
export const getThemesColor = (name) => {
  if (!rootStyles) throw new Error('未初始化主题')
  const color = rootStyles.getPropertyValue(name).trim();
  return color
}