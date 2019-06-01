export function noop() {}

export function now() {
  return new Date().getTime();
}

export function is(type: string, target: any): boolean {
  if (type === 'NaN') {
    return target !== target;
  }
  return Object.prototype.toString.call(target).toLowerCase() === `[object ${type.toLowerCase()}]`;
}

interface plainObject {
  [prop: string]: any
}
function copyObj<T extends plainObject>(obj: T): T {
  let target: T = {} as T;

  for (let k in obj) {
    target[k] = obj[k];
  }

  return target;
}

function copyArr<T extends any[]>(arr: T): T {
  let target = [];

  for (let i = 0; i < arr.length; i++) {
    target[i] = arr[i];
  }
  
  return target as T;
}

export function copy<T extends object|any[]>(obj: T): T|void {
  let target: T|void;

  if (is('object', obj)) {
    target = copyObj(obj);
  } else if (is('array', obj)) {
    target = copyArr(obj as any[]) as T;
  }

  return target;
}
