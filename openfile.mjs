import { promises as fs } from "fs";
import { promises as readline } from "readline";
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const read_file=async(fname)=>{
    try{
        let file=await fs.open(fname, 'r')
        let stat=await file.stat();
        let buffer=Buffer.alloc(stat.size);
        let result=await file.read(buffer, 0, stat.size, null);
        console.log(`Read ${result.bytesRead} bytes\nContents:\n${result.buffer.toString()}`);
    } catch(err) {
        console.log("ERROR", err);
    }
}

const getfile=async()=>{
    try {
        let filenm=await rl.question("What file would you like to read? ");
        rl.close();
        return filenm;
    } catch(err) {
        console.log(err);
        rl.close();
    }
}

let filename=await getfile();
await read_file(filename);