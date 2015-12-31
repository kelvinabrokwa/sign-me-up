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
  console.log(crn);
  var course = R.find(R.propEq('crn', crn))(data);

  if (course === undefined) {
    console.log('No class with the given CRN was found');
  } else if (course.status === 'CLOSED') {
    console.log('The course with CRN', crn, 'is closed');
  } else if (course.status === 'OPEN') {
    register(crn);
  }


  console.log('---');
});

function register(CRN) {
  console.log('registering for:', CRN);

  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

  driver.get('https://banweb.wm.edu/pls/PROD/twbkwbis.P_WWWLogin');

  /**
   * log in
   */
  driver.findElement(By.id('UserID')).sendKeys(process.env.WM_USERNAME);
  driver.findElement(By.xpath('//*[@id="PIN"]/input')).sendKeys(process.env.WM_PASSWORD);
  driver.findElement(By.xpath('/html/body/div[3]/form/p/input')).click();
  driver.wait(until.titleIs('Main Menu'), 1000);

  /**
   * click on "Student"
   */
  driver.findElement(By.xpath('/html/body/div[3]/table[2]/tbody/tr[2]/td[2]/a')).click();
  driver.wait(until.titleIs('Student'), 1000);

  /**
   * click on "Registration"
   */
  driver.findElement(By.xpath('/html/body/div[3]/table[1]/tbody/tr[2]/td[2]/a')).click();
  driver.wait(until.titleIs('Registration'), 1000);

  /**
   * click on "Add/Drop Classes"
   */
  driver.findElement(By.xpath('/html/body/div[3]/table[1]/tbody/tr[3]/td[2]/a')).click();
  driver.wait(until.titleIs('Select Term'), 1000);

  /**
   * select "Fall 2015"
   */
  driver.findElement(By.xpath('//*[@id="term_id"]/option')).click();
  driver.findElement(By.xpath('/html/body/div[3]/form/input')).click();
  driver.wait(until.titleIs('Add/Drop Classes:'), 1000);

  /**
   * enter CRN and register
   */
  driver.findElement(By.xpath('//*[@id="crn_id1"]')).sendKeys(CRN);
  driver.findElement(By.xpath('/html/body/div[3]/form/input[19]')).click();

  // to do: check for sucess
  console.log('successfully reigstered for', CRN);

  driver.quit();
}
