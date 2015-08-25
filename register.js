var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    R = require('ramda');

var crn = process.argv[2];

var data = '';

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    data += chunk;
  }
});
process.stdin.on('end', function() {
  data = JSON.parse(data);
  var isClosed = R.find(R.propEq('crn', crn))(data).status === 'CLOSED';

  if (isClosed) {
    console.log('The course with CRN', crn, 'is closed.');
  } else {
    register(crn);
  }
});

function register(crn) {
  console.log('registering for:', crn); return;
  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

  driver.get('https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin');

  driver.findElement(By.id('UserID')).sendKeys(process.env.WM_USERNAME);
  driver.findElement(By.xpath('//*[@id="PIN"]/input')).sendKeys(process.env.WM_PASSWORD);
  driver.findElement(By.xpath('/html/body/div[3]/form/p/input')).click();
  driver.wait(until.titleIs('Main Menu'), 1000);

  driver.findElement(By.xpath('/html/body/div[3]/table[2]/tbody/tr[2]/td[2]/a')).click();
  driver.wait(until.titleIs('Student'), 1000);

  driver.findElement(By.xpath('/html/body/div[3]/table[1]/tbody/tr[2]/td[2]/a')).click();
  driver.wait(until.titleIs('Registration'), 1000);

  driver.findElement(By.xpath('/html/body/div[3]/table[1]/tbody/tr[3]/td[2]/a')).click();
  // to be contiued when I know what registration looks like on the site
}
