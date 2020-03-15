/**
 * 枚举类
 * @author chenlei
 */
export class Enum {
  /**
   * 添加枚举字段
   * field: 枚举字段
   * label: 界面显示
   * value: 枚举值
   */
  add (label, value) {
    this[value] = label
    return this
  }

  /**
   * 根据枚举value获取其label
   */
  getLabelByValue (value) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) {
      return ''
    }
    value = value + ''
    console.log(typeof value, typeof this[0])
    for (let i in this) {
      if (i === value) {
        return this[i]
      }
    }

    return ''
  }
}
