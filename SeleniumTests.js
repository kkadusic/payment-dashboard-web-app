const { Builder, By, Key } = require("selenium-webdriver");
assert = require("assert");

describe("login", function () {
  this.timeout(30000);
  it("email field shouldn't be empty", async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://payment-dashboard.herokuapp.com/");
    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("neki password");
    await driver.findElement(By.tagName("button")).click();
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, "https://payment-dashboard.herokuapp.com/");
  });
});
