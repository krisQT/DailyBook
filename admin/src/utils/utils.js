import { parse } from 'querystring';
import { cloneDeep } from 'lodash'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 导出树状结构
 * @param {Array} list 
 */
export const buildTree = (list) => {
  if (!Array.isArray(list) || !list.length) {
    return []
  }
  
  list = cloneDeep(list)
  let temp = {}
  let tree = []

  list.forEach((item) => {
    temp[item.id] = item
  })

  for (const key in temp) {
    if (temp[key].parentId) {
      if (!temp[temp[key].parentId].children) {
        temp[temp[key].parentId].children = []
      }
      temp[temp[key].parentId].children.push(temp[key])
    } else {
      tree.push(temp[key])
    }
  }
  
  tree.forEach(item => {
    if (item.children) {
      item.children.sort((a, b) => a.sort - b.sort)
    }
  })
  tree.sort((a, b) => a.sort - b.sort)

  return tree
}

/**
 * 获取一级数据
 * @param {*} list 
 */
export const buildFirstLevel = (list) => {
  if (!Array.isArray(list) || !list.length) {
    return []
  }
  
  list = cloneDeep(list)

  return list.reduce((pre, cur) => {
    if (!cur.parentId) {
      pre.push(cur)
    }
    return pre
  }, [])
}
