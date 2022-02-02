import { functionHelper } from "./";

export function checkPropsExist (props, propNames, rootFileName = '', consoleType = 'warn') {
  var filename = functionHelper.getCallerName(2);
  
  // console.log(err.stack);
  var returnVal = [];
  propNames.forEach(name => {
    if (!(name in props)) {
      console[consoleType](`${rootFileName && `${rootFileName}: `}Missing prop '${name}' on (${filename})`);
      returnVal.push(name);
    }
  })
  return returnVal;
}


export default {
  checkPropsExist,
}