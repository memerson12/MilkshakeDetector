# MilkshakeDetector

## What is this?
A NodeJS script utilizing Puppeteer and the GroupMe API to answer one of the most important questions in life. Does the dining hall have milkshakes?

## How does it work?
The script is set to run every half hour while the dining hall is open using a cron job. When run, it will sign in to the dining hall website, locate the menu, 
and check if the menu has Milkshakes available for order. If so, it will then send a message to a GroupMe group chat to let everyone interested know immediately if what they crave so much is available.

## Dependencies
- puppeteer: Headless browser automation library for Node.js.
- uuid: Library for generating unique identifiers.
- axios: Promise-based HTTP client for making requests.
- dotenv: Loads environment variables from a .env file into process.env.
