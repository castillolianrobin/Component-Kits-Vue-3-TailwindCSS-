export function getCallerName(stack = 1) {
  function getErrorObject(){
      try { throw Error('') } catch(err) { return err; }
  }
  
  var err = getErrorObject();
  var caller_line = err.stack.split("\n")[stack + 3];
  var filename = caller_line.split("/").pop();
  filename = filename.split("?").shift();
  return filename
}

export default {
  getCallerName
}