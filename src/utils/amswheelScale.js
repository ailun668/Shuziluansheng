export const initVWheelScale = (Vue) => {
  Vue.directive("wheelScale", (el, binding) => {
    const {
      maxScale = 1.2,
      minScale = 0.1,
      initScale = 1,
      cssVarName = "--scale",
    } = binding.arg || {}
    let currentScale = initScale || el.style.getPropertyValue(cssVarName) || 1
    setWheelScale(binding, {
      el,
      cssVarName,
      currentScale,
      minScale,
      maxScale,
    })
    if (el) {
      el.onwheel = (e) => {
        currentScale = el.style.getPropertyValue(cssVarName) || 1
 
        if (e.wheelDelta > 0) {
          currentScale = currentScale * 1 + 0.1
        } else {
          currentScale = currentScale * 1 - 0.1
        }
        setWheelScale(binding, {
          el,
          cssVarName,
          currentScale,
          minScale,
          maxScale,
        })
      }
    }
  })
}
// 设置 --scale 变量 缩放比例
const setVarScale = (el, cssVarName, currentScale, minScale, maxScale) => {
  // 现在缩放范围
  if (currentScale > maxScale) {
    currentScale = maxScale
  } else if (currentScale < minScale) {
    currentScale = minScale
  }
  let cssText = el.style.cssText
  let cssTextList = cssText.split(";")
  let isExist = false
  let isExistIndex = -1
  for (let index = 0; index < cssTextList.length; index++) {
    const element = cssTextList[index]
    if (element.includes(cssVarName + ":")) {
      isExist = true
      isExistIndex = index
      break
    }
  }
  if (isExist) {
    cssTextList[isExistIndex] = `--scale: ${currentScale}`
  } else {
    cssTextList.push(`--scale: ${currentScale}`)
    //   el.setAttribute("style", `--scale: ${currentScale}`)
  }
  cssText = cssTextList.join(";")
  el.style.cssText = cssText
  return currentScale
}
// 设置 style.transform
const setTransformCss = (el, cssVarName) => {
  let transformCssString = el.style.transform
  let regScaleGlobal = /scale\(.*?[ )]*[)]+[ ]*/g //匹配 Scale属性 全局
  if (regScaleGlobal.test(transformCssString)) {
    transformCssString = transformCssString.replace(
      regScaleGlobal,
      ` scale(var(${cssVarName})) `
    )
  } else {
    transformCssString += " " + `scale(var(${cssVarName}))`
  }
  el.style.transform = transformCssString
}
export const setWheelScale = (binding = {}, options) => {
  const { el, cssVarName, currentScale, minScale, maxScale } = options
  const nowScale = setVarScale(el, cssVarName, currentScale, minScale, maxScale)
  setTransformCss(el, cssVarName)
  // 缩放改变回调函数
  const wheelScaleHandle = binding.value || null
  if (wheelScaleHandle instanceof Function) {
    wheelScaleHandle({
      el,
      cssVarName,
      maxScale,
      minScale,
      currentScale: nowScale,
      setScale: (_scale) => {
        setWheelScale(binding, { ...options, currentScale: _scale })
      },
      binding,
    })
  }
}
 