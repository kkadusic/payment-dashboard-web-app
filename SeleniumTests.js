const { Builder, By, Key } = require("selenium-webdriver");
assert = require("assert");

describe("nesto", () => {
  it("emailFieldEmpty", () => {
    let driver = new Builder().forBrowser("chrome").build();
    driver.get("https://payment-dashboard.herokuapp.com/");
    driver.findElement(By.id("email")).sendKeys("");
    driver.findElement(By.id("password")).sendKeys("neki password");
    driver.findElement(By.tagName("button")).click();
    const currentUrl = driver.getCurrentUrl();
    //ovdje je response Promise !!!
    assert.equal(currentUrl, "https://payment-dashboard.herokuapp.com/");
  });
});
