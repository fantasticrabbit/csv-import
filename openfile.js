import * as cp from './csvparser.js';

let filename=await cp.getfile();
let filedata=await cp.read_file(filename);
let fileobject=await cp.getAllLines(filedata);
let header=await cp.getFirstLine(filedata);
console.log(header);
console.log(typeof(fileobject));
for (const i of fileobject) {
    console.log(i.split(','));
}
