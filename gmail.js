import google from 'googleapis';
import googleAuth from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = `${process.env.HOME}/.credentials/gmail-api-quickstart.json`;

export default class Gmail {

  constructor(creds) {
    this.creds = creds;
  }

  fetch() {
    // fetch unread messages
  }

  on(type, cb) {
    for (var i in this.emails) {
      if (this.emails[i].sender === type) {
        return cb(findCRN(this.emails[i].content));
      }
    }
    cb(null);
  }

}

function authorize(creds) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

function findCRN(content) {
  // some regex match
}
