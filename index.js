require("dotenv").config();

const Twitter = require("twitter-lite");

(async function () {
  const user = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
  });

  try {
    let response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    // Search for recent tweets from the twitter API
    response = await app.get(`/search/tweets`, {
      q: "Lionel Messi", // The search term
      lang: "en", // Let's only get English tweets
      count: 100, // Limit the results to 100 tweets
    });

    // Loop over all the tweets and print the text
    for (tweet of response.statuses) {
      console.dir(tweet.text);
    }
  } catch (e) {
    console.log("There was an error calling the Twitter API");
    console.dir(e);
  }
})();
