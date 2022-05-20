import * as fs from "node:fs/promises";
import * as readline from "node:readline/promises";
import once from "events";
import { stdin as input, stdout as output } from 'process';

const read_file=async(fname)=>{
    try{
        let file=await fs.open(fname, 'r')
        let stat=await file.stat();
        let buffer=Buffer.alloc(stat.size);
        let result=await file.read(buffer, 0, stat.size, null);
        return result.buffer.toString();
//        console.log(`Read ${result.bytesRead} bytes\nContents:\n${result.buffer.toString()}`);
    } catch(err) {
        console.log("ERROR", err);
    }
}

const getfile=async()=>{
    if (process.argv[2]===undefined) {
        try {
            const rl = readline.createInterface({ input, output });
            let filenm=await rl.question("What file would you like to read? ");
            rl.close();
            return filenm;
        } catch(err) {
            console.log(err);
            rl.close();
        }
    } else {
        return process.argv[2];
    }
}

const getFirstLine=async (xfilex) => {
    try {
        const rl = await readline.createInterface({
            input: fs.createReadStream(xfilex),
            crlfDelay: Infinity
          });
    
        rl.on('line', (line) => {
            console.log(`Line from file: ${line}`);
        });
    
        await once(rl, 'close');
    
        console.log('Header processed.');
      } catch (err) {
        console.error(err);
      }
}

let filename=await getfile();
let filedata=await read_file(filename);
console.log(filedata);
let header=await getFirstLine(filename);
console.log(header);