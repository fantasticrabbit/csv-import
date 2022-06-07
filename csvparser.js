import * as fs from "node:fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from 'process';

export const read_file=async(fname)=>{
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

export const getfile=async()=>{
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

export const getAllLines=async (filestr) => {
    try {
        let linearray=filestr.split('\n');
        return linearray;
    } catch(err) {
        console.log(err);
    }
}

export const getFirstLine=async (filestring) => {
    try {
        let lines=filestring.split('\n')
        return lines[0];
    } catch(err) {
        console.log(err);
    }
}

export const getDelim =async (hdline) => {
    try {
    let c=hdline.split(",")
    let qc=hdline.split('","')
    let qcsp=hdline.split('", "')
    console.log(c)
    console.log(qc)
    console.log(qcsp)

    if (c.length > qc.length && c.length > qcsp.length) {
        return ","
    } else if (qc.length >= qcsp.length && (qc.length === c.length || qc.length > 2)) {
        return '","'
    } else if (qcsp.length >= qc.length && (qcsp.length === c.length || qcsp.length > 2)) {
        return '", "'
    }
    } catch(err) {
        console.log(err);
    }
}

export const getFields = (body, dlm) => {
    let result=[]
    body.split('\n').forEach(element => {
        result += element.split(dlm)
    });
    return result
}

export default {read_file, getfile, getAllLines, getFirstLine, getDelim, getFields}