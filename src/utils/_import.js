export default file => () => {
  return import('@/' + file)
}
