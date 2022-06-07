import * as cp from './csvparser.js';

let filename=await cp.getfile();
let filedata=await cp.read_file(filename);
let fileobject=await cp.getAllLines(filedata);
let header=await cp.getFirstLine(filedata);
let delim=await cp.getDelim(header)
console.log(header);
console.log(`Delimiter is:  ${delim}`)
let x=cp.getFields(filedata,delim)
console.log(x)
/*console.log(typeof(fileobject));
for (const i of fileobject) {
    console.log(i.split(','));
}*/
