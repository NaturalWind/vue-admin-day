import { isURL } from '@/util/validate';

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}

/**
 * json树转数组
 * @param {Array} sourceData json树
 * @param {Array} arr 目标数组
 * @return 转换后的目标数组
 */
export function jsonTreeTransformArray(sourceData, arr) {
  for (let i = 0; i < sourceData.length; i++) {
    let item = sourceData[i];
    arr.push(item);
    if (item.children && item.children.length !== 0) {
      jsonTreeTransformArray(item.children, arr);
    }
  }
  return arr;
}

/**
 * 将一级的数据结构处理成树状数据结构
 * @param {Object} obj {key, pKey, data}
 * @param obj.key  字段名称 比如id
 * @param obj.pKey 父字段名称 比如 pid
 * @param obj.rootPValue 根节点的父字段的值
 * @param obj.data 需要处理的数据
 * @param obj.jsonData 是否深复制数据（默认是true）
 * @return {Array} arr
 */
export const getTreeArr = (obj) => {
  if (!Array.isArray(obj.data)) {
    return []
  }
  obj.jsonData = obj.jsonData === false ? obj.jsonData : true
  const arr = obj.jsonData ? JSON.parse(JSON.stringify(obj.data)) : obj.data
  const arr1 = []
  // 将数据处理成数状结构
  arr.forEach(item => {
    let index = 0
    item.children = []
    arr.forEach(item1 => {
      // 得到树结构关系
      if (item[obj.key] === item1[obj.pKey]) {
        item.children.push(item1)
      }
      // 判断根节点
      if (item1[obj.key] !== item[obj.pKey]) {
        index++
      }
    })
    // 没传入根节点，根据当前数据结构得到根节点
    if (!('rootPValue' in obj) && index === arr.length) {
      arr1.push(item)
    }
  })
  // 传入根节点，根据传入的根节点组成树结构
  if ('rootPValue' in obj) {
    arr.forEach(item => {
      if (item[obj.pKey] === obj.rootPValue) {
        arr1.push(item)
      }
    })
  }
  return arr1
}

/**
 * 传入时间戳，转换指定的时间格式
 * @param {Number} val      时间戳
 * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
 * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
 */
export function switchTime(val = +new Date(), dateType = 'YYYY-MM-DD') {
  // 将字符串转换成数字
  const timeStamp = +new Date(val);
  // 如果转换成数字出错
  if (!timeStamp) {
    return val;
  }
  let str;
  // 得到时间字符串
  const dateStr = new Date(timeStamp);
  str = dateType.replace('YYYY', dateStr.getFullYear());
  str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1));
  str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate());
  str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours());
  str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes());
  str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds());
  return str;
}

/**
 * 动态添加路由
 * @param {Object} router VueRouter实例
 * @param {Object} routerData 路由数据
 */
export function installRouters(router, routerData) {
  let menu = [];
  jsonTreeTransformArray(routerData, []).forEach(item => {
    if (!isURL(item.path)) {
      let menuItem = {
        parentId: item.parentId,
        id: item.id,
        path: item.path || '',
        name: item.name || '',
        component: resolve => require([item.component === 'Layout' ? '@/page/layout/index.vue' : `@/${item.component}.vue`], resolve),
        meta: {
          keepAlive: item.keepAlive || false
        },
        children: []
      };
      menu.push(menuItem);
    }
  });
  let routerMenu = getTreeArr({key: 'id', pKey: 'parentId', data: menu, jsonData: false});
  router.addRoutes(routerMenu);
}
