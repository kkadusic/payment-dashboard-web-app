const { Builder, By, Key, until } = require("selenium-webdriver");
assert = require("assert");
chai = require("chai");
expect = chai.expect;

describe("login", function () {
  this.timeout(30000);
  let driver = new Builder().forBrowser("chrome").build();

  it("email field shouldn't be empty", (done) => {
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys(""))
      .then(() =>
        driver.findElement(By.id("password")).sendKeys("neki password")
      )
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() => driver.getCurrentUrl())
      .then((url) => {
        assert.equal(url, "https://payment-dashboard.herokuapp.com/");
        done();
      });
  });

  it("wrong credentials", (done) => {
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys("ajsa123"))
      .then(() =>
        driver
          .findElement(By.id("password"))
          .sendKeys("kdikhdbdwjkbadknwji14owfsnzdn")
      )
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() =>
        driver.wait(
          until.elementLocated(
            By.xpath("//span[contains(.,'Wrong username or password!')]")
          ),
          10000
        )
      )
      .then(() => {
        driver
          .findElement(
            By.xpath("//span[contains(.,'Wrong username or password!')]")
          )
          .getText()
          .then((message) => {
            assert.equal(message, "Wrong username or password!");
            done();
          });
      });
  });
});
