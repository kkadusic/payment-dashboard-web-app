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

  it("right credentials", () => {
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.id("password")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() => driver.getCurrentUrl())
      .then((url) => {
        assert.equal(url, "https://payment-dashboard.herokuapp.com/pocetna");
        done();
      });
  });
});

describe("user is logged in", function () {
  this, this.timeout(50000);
  let driver;

  it("logging out", (done) => {
    driver = new Builder().forBrowser("chrome").build();
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.id("password")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() =>
        driver.wait(
          until.elementLocated(
            By.xpath("//div[@id='root']/section/section/aside/div/ul/li[7]/a")
          ),
          15000
        )
      )
      .then(() =>
        driver
          .findElement(
            By.xpath("//div[@id='root']/section/section/aside/div/ul/li[7]/a")
          )
          .click()
      )
      .then(() =>
        driver.wait(
          until.elementLocated(By.xpath("(//button[@type='button'])[3]")),
          15000
        )
      )
      .then(() => {
        driver.findElement(By.xpath("(//button[@type='button'])[3]")).click();
      })
      .then(() => driver.getCurrentUrl())
      .then((url) => {
        assert.equal(url, "https://payment-dashboard.herokuapp.com/logout");
        done();
      });
  });

  it("adding bank account", (done) => {
    driver = new Builder().forBrowser("chrome").build();
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.id("password")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() =>
        driver.wait(
          until.elementLocated(
            By.xpath(
              "//div[@id='root']/section/section/aside/div/ul/li[4]/div/span"
            )
          ),
          15000
        )
      )
      .then(() =>
        driver
          .findElement(
            By.xpath(
              "//div[@id='root']/section/section/aside/div/ul/li[4]/div/span"
            )
          )
          .click()
      )
      .then(() =>
        driver.wait(
          until.elementLocated(By.xpath("//ul[@id='sub2$Menu']/li[3]/a")),
          15000
        )
      )
      .then(() => {
        driver
          .findElement(By.xpath("//ul[@id='sub2$Menu']/li[3]/a"))
          .click()
          .then(() => {
            driver
              .findElement(By.css("#add-account_cardNumber"))
              .sendKeys("123456789123456");
          })
          .then(() =>
            driver
              .findElement(
                By.xpath(
                  "//form[@id='add-account']/div[2]/div[2]/div/div/div/div/div/div/div"
                )
              )
              .sendKeys(new Date(2020, 1, 1))
          )
          .then(() =>
            driver.findElement(By.css("#add-account_cvc")).sendKeys("123")
          )
          .then(() => () => driver.findElement(By.tagName("button")).click());
      });
  });
});
