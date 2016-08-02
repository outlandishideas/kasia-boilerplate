// TODO: is there a way to recurse down the components, and fetch all of their data?
export default function getPreloaders (components) {
  return components.reduce((preloaders, component) => {
    if (typeof component.preload == 'function') {
      preloaders.push(component.preload)
    }
    return preloaders
  }, [])
}
