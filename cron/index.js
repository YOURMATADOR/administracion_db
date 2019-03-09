var CronJob = require("cron").CronJob;
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const spawn = require("child_process").spawn;
const uuid = require("uuid/v1");
const fs = require("fs");
const path = require("path");
const ftp_cliente = require("ftp-client");
const sgMail = require("@sendgrid/mail");
const nodeMailer = require("nodemailer");

var mailer = nodeMailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS
  }
});

const client = new ftp_cliente(
  { host: "localhost", port: 21, user: "tumatador", password: "1234" },
  { loggin: "basic" }
);



new CronJob(
  "* * * * *",
  async function() {
    try {
      let id_respaldo = uuid();
      const { stdout, stderr } = await exec(
        `cd C:\\xampp\\mysql\\bin && mysqldump.exe --user=root --password= --databases punto_venta > respaldos\\punto${id_respaldo}.sql`
      );
      //  const { stdout, stderr }=  await exec(`cd C:\\xampp\\mysql\\bin && mysqldump.exe --user=root --password=  punto_venta > E:\\punto${uuid()}.sql`)
        
        // * respaldo a USB
      // fs.copyFile(
      //   new URL(`RUTA DE USB`),
      //   path.join(__dirname, "../", `respaldos/punto${id_respaldo}.sql`),
      //   err => {
      //     if (err) {
      //       console.log(err);
      //     }
      //   })
      fs.copyFile(
        new URL(`file://C:/xampp/mysql/bin/respaldos/punto${id_respaldo}.sql`),
        path.join(__dirname, "../", `respaldos/punto${id_respaldo}.sql`),
        err => {
          if (err) {
            console.log(err);
          }
          client.connect(function() {
            client.upload(
              ["respaldos/**"],
              "respaldos/",
              {
                baseDir: "respaldos/"
              },
              function(result) {
                console.log(result);
              }
            );
          });

          fs.readFile(
            path.join(__dirname, "..", "respaldos", `punto${id_respaldo}.sql`),
            (err_r, file) => {
              if (err_r) {
                console.log(err_r);
              }
              mailer.sendMail({
                sender: "jesus.amancilla@alumnos.udg.mx",
                to: "jesus.amancilla@alumnos.udg.mx",
                subject: "respaldo nodemailer!",
                body: "contenido mail chido",
                attachments: [{ filename: "RespaldoDB.sql", content: file }]
              }),
                function(err_r_r, success) {
                  if (err_r_r) {
                    console.log(err_r_r);
                  }
                };
              fs.unlink(
                path.join(
                  __dirname,
                  "..",
                  "respaldos",
                  `punto${id_respaldo}.sql`
                ),
                err => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          );
        }
      );

      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "America/Los_Angeles"
);
