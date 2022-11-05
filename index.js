const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var fs = require("fs");

  function logger(req, res, next) {
    const user_ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null); // ::1
    const req_page = req.originalUrl; // /
    const date = new Date(); //2019-10-10T18:35:21.967Z
    console.log(date);

    const log = `------------------------------------------------------------------------------------------------------\n[${date}]:  |  Ip=${user_ip}  |  Req_page=${req_page}\n------------------------------------------------------------------------------------------------------\n`;

    fs.appendFile("logs.txt", log, err => {
      if (err) throw err;
    });

    next();
  }

  logger();


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
