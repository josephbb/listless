import Twitter from "twitter-lite";

const client = new Twitter({
  consumer_key: process.env.TWITTER_CLIENT_ID,
  consumer_secret: process.env.TWITTER_CLIENT_SECRET,
});

export default (req, res) =>{
  console.log('My address', process.env.VERCEL_URL)
  return new Promise((resolve) => {
    client
      .getRequestToken(
        `${process.env.VERCEL_URL || "http://localhost:3000"}/api/auth/twitter`
      )
      .then((resp) => {
        resolve(res.status(200).json({ oauth_token: resp.oauth_token }));
      })
      .catch((err) => {
        console.error(err);
        resolve(res.status(500).json({ error: JSON.stringify(err) }));
      });
  });

}
