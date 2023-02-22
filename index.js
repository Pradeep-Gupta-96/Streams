
const http=require('http')
const fs=require('fs')
const {  Transform } = require('stream')


const server= http.createServer((req,res)=>{
        if(req.url !== "/"){
          return  res.end()
        }
const readeFile=fs.createReadStream('text.txt')
const writeFile=fs.createWriteStream('output.txt')

//direct data transfer
readeFile.on('data',(chunk)=>{
console.log('data',chunk)
writeFile.write(chunk)
})

//data transfer with pipe method
readeFile.pipe(writeFile)

//transfer method with pipe
const convertoupperCase= new Transform({
    transform(chunk, encoding, callback){
        callback(null,chunk.toString().toUpperCase())
    }
})

//replace word 
const replaceWord=new Transform({
    transform(chunk,encoding,callback){
        const finalString=chunk.toString().replaceAll(/video/gi, 'assisment');
        callback(null,finalString)
    }
})

//===
readeFile.pipe(convertoupperCase).pipe(writeFile)
readeFile.pipe(replaceWord).pipe(writeFile)

res.end()

})

const PORT=4000
server.listen(PORT,()=>console.log(`server running at prot ${PORT}`))