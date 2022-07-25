// 获取 e.g.'D126P3' P后的参数
export function getLastPostId(str) {
  return str?.match(/P(\S*)/) && str?.match(/P(\S*)/)[1];
}
// 获取e.g. D和P之间的内容 Array
export function getMidDepIdArray(str) {
  let arr = str?.split(",")
  let temp = []
  arr?.forEach(element => {
    temp.push(Number(getMidDepId(element)))
  });
  return temp;
}
// 获取e.g. D和P之间的内容
export function getMidDepId(str) {
  return str?.match(/D(\S*)P/) && str?.match(/D(\S*)P/)[1];
}
