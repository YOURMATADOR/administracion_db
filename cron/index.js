var CronJob = require("cron").CronJob;
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const uuid = require("uuid/v1");
const fs = require("fs");
const path = require("path");
const ftp_cliente = require("ftp-client");

const client = new ftp_cliente(
  { host: "localhost", port: 21, user: "tumatador", password: "1234" },
  { loggin: "basic" }
);

fs.readdir('/Applications/xampp/xamppfiles/bin/',(err,files)=> {
  if(err){
    console.log(err);
  }
  files.forEach(i=> {
    console.log(i);
    
  })
})
// fs.copyFile(
//   new URL(
//     "file://C:/xampp/mysql/bin/respaldos/puntoa642ee60-4001-11e9-b327-550c36ddf77a.sql"
//   ),
//   path.join(
//     __dirname,
//     "../",
//     "respaldos/puntoa642ee60-4001-11e9-b327-550c36ddf77a.sql"
//   ),
//   err => {
//     if (err) {
//       console.log(err);
//     }
//     client.connect(function() {
//       client.upload(
//         ["respaldos/**"],
//         "respaldos/",
//         {
//           overwrite: "older"
//         },
//         function(result) {
//           console.log(result);
//         }
//       );
//     });
//   }
// );

// new CronJob('* * * * * *', async function() {

//     try {

//      const { stdout, stderr }=  await exec(`cd C:\\xampp\\mysql\\bin && mysqldump.exe --user=root --password= --databases punto_venta > respaldos\\punto${uuid()}.sql`);
//     //  const { stdout, stderr }=  await exec(`cd C:\\xampp\\mysql\\bin && mysqldump.exe --user=root --password=  punto_venta > E:\\punto${uuid()}.sql`)
//     //  client.connect(function () {

//         // client.upload(['test/**'], '/public_html/test', {
//         //     baseDir: 'test',
//         //     overwrite: 'older'
//         // }, function (result) {
//         //     console.log(result);
//         // });

//       console.log('stdout:', stdout);
//       console.log('stderr:', stderr);

//     } catch (error) {
//         console.log(error);

//     }
// }, null, true, 'America/Los_Angeles');
