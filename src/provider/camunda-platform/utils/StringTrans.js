// 获取 e.g.'D126P3' P后的参数
export function getLastPostId(str) {
  return str?.match(/P(\S*)/) && str?.match(/P(\S*)/)[1];
}
// 获取e.g. D和P之间的内容 Array
export function getMidDepIdArray(str) {
  let arr = str?.split(",")
  let temp = []
  arr?.forEach(element => {
    if(element.indexOf('D') == 0){
      temp.push(getMidDepId(element))
    }
  });
  return temp;
}
// 获取e.g. D和P之间的内容
export function getMidDepId(str) {
  return str?.match(/D(\S*)P/) && str?.match(/D(\S*)P/)[1];
}
// D,P和角色R混合 去掉R
export function removeRole(str) {
  let strArr = Array.isArray(str) ? str : str&&str.split(',');
  let temp = []
  strArr&&strArr.forEach((item)=>{
    if(item.indexOf('D') == 0) {
      temp.push(item)
    }
  })
  return temp.join()
}
