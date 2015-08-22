import express from express;
import Gmail from './gmail';
import Banner from './banner';

var app = express();

var email = new Gmail({
  username: process.env.GMAIL_USERNAME,
  password: process.env.GMAIL_PASSWORD
});

var banner = new Banner({
  wmuserid: process.env.WM_USERID,
  password: process.env.WM_PASSWORD
});

function fetch() {
  email.fetch()
  email.on('bannerstalker', crn => {
    if (crn) {
      banner.register(crn).then(email.notify);
    }
  });
}

function listen() {
  setInterval(fetch, 60000); // every minute
}

var server = app.listen(3000, () => {
  listen();
  var host = server.address().address;
  var post = server.address().port;
  console.log(`server listening at ${host} ${port}`);
});
