require("dotenv").config();

const Twitter = require("twitter-lite");

const user = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
});

// Wrap the following code in an async function that is called
// immediately so that we can use "await" statements.
(async function () {
  try {
    // Retrieve the bearer token from twitter.
    const response = await user.getBearerToken();
    console.log(
      `Got the following Bearer token from Twitter: ${response.access_token}`
    );

    // Construct our API client with the bearer token.
    const app = new Twitter({
      bearer_token: response.access_token,
    });
  } catch (e) {
    console.log("There was an error calling the Twitter API.");
    console.dir(e);
  }
})();
