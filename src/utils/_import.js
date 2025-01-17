const modules = import.meta.glob('@/view/**/*.vue'); // glob异步加载 globEager同步加载
console.log(modules)

export default file => () => {
  const path = `/src/${file}` // TODO /src 有点写死的感觉了，不好对项目进行迁移
  console.log('Importing:', path)

  if (modules[path]) {
    return modules[path](); // 动态加载对应文件
  }
  return import(path)
}