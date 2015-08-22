// automated browser shit

export default class Banner {

  constructor(creds) {
    this.creds = creds;
  }

  register(crn) {
    return new Promise((resolve, reject) => {
      if (/*it went well*/true) {
        resolve('boom shakalaka');
      } else {
        resolve('dang');
      }
    });
  }

}
