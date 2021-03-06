
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

var helpers = {
  getChromeDriver: function () {
    return new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
  },

  getChromeDriverWithVerboseLogging: function (filePath) {
    var builder = new chrome.ServiceBuilder();
    builder.enableVerboseLogging();
    builder.loggingTo(filePath || 'chromedriver.log');
    var service = builder.build();
    return new chrome.Driver(null, service);
  },

  waitForPageLoadAfter: function (driver, seleniumOperation) {
    var bodyElement;
    driver.
        findElement(webdriver.By.tagName('BODY')).
        then(function (element) {
          bodyElement = element;
        });
    seleniumOperation();
    driver.wait(function () {
      return bodyElement.getAttribute('class').then(
          function () {
            return false; },
          function (error) {
            // better implementation:
            //   check error.message for "stale element reference: element is not attached to the page document"
            //   and reject the promise we're returning in that case
            return true;
          })
    })
  }
};

module.exports = helpers;
