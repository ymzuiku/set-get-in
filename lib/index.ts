/* eslint-disable @typescript-eslint/no-explicit-any */

// columns.id=f0.label : columns 中查找 id = f0 的对象，然后查找 label
// columns.5.label : columns 中查找 index = 5 的对象，然后查找 label
// columns.dog.label : columns 中查找 dog 对象，然后查找 label
export function getin(values: any, name: any) {
  if (typeof name !== "string") {
    return undefined;
  }
  const keys = name.split(".");
  let data = values;
  const len = keys.length;
  try {
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      if (i < len - 1) {
        if (Array.isArray(data)) {
          // 说明是一个数组
          if (/=/.test(key)) {
            const [itemKey, itemValue] = key.split("=");
            data = data.find((v) => v[itemKey] == itemValue);
          } else if (!isNaN(Number(key))) {
            data = data[Number(key)];
          }
        } else {
          data = data[key];
        }
      } else {
        return data[key];
      }
    }
  } catch (e) {
    return undefined;
  }

  return undefined;
}

export function setin(values: any, name: any, value: any) {
  if (typeof name !== "string") {
    return undefined;
  }
  const keys = name.split(".");
  let data = values;
  const len = keys.length;
  try {
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      if (i < len - 1) {
        if (Array.isArray(data)) {
          // 说明是一个数组
          if (/=/.test(key)) {
            const [itemKey, itemValue] = key.split("=");
            data = data.find((v) => v[itemKey] == itemValue);
          } else if (!isNaN(Number(key))) {
            data = data[Number(key)];
          }
        } else {
          data = data[key];
        }
      } else {
        data[key] = value;
      }
    }
  } catch (e) {
    //
  }
}
