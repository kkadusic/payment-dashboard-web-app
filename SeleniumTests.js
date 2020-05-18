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
});

describe("notifications", function () {
  this.timeout(50000);
  let driver;

  it("redirect to all notifications", (done) => {
    driver = new Builder().forBrowser("chrome").build();
    driver
      .get("https://payment-dashboard.herokuapp.com/")
      .then(() => driver.findElement(By.id("email")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.id("password")).sendKeys("ajsa123"))
      .then(() => driver.findElement(By.tagName("button")).click())
      .then(() =>
        driver.wait(until.elementLocated(By.css(".ant-scroll-number")), 15000)
      )
      .then(() => driver.findElement(By.css(".ant-scroll-number")).click())
      .then(() => driver.wait(until.elementLocated(By.xpath("//div/a")), 15000))
      .then(() =>
        driver
          .findElement(By.xpath("//div/a"))
          .then(
            (element) =>
              driver
                .actions()
                .move({ duration: 5000, origin: element, x: 0, y: 0 }).perform
          )
      )
      .then(() => driver.findElement(By.xpath("//div/a")).click())
      .then(() =>
        driver.getCurrentUrl().then((url) => {
          assert.equal(
            url,
            "https://payment-dashboard.herokuapp.com/notifikacije"
          );
          done();
        })
      );
  });
});
