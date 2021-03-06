## Description

This is the node server repository for the Pryon Mission Control Center application. The repository for the react client of this app can found here: [https://github.com/yboodhan/mcc_client](https://github.com/yboodhan/mcc_client).

### Installation instructions

1. Clone this repository onto your local computer. For more information on cloning, see [https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository].

2. Access the directory using `cd mcc-server`. Install all dependencies using `npm i`.

3. Add the facebook client id and secret to the existing `.env` file in the root directory (get from admin). Note: It might be best to manually type these values in instead of copy pasting to avoid invalid credentials due to hidden formatting (guilty!). Contents should be:
    ```
    * BASE_URL = "http://localhost:3000"
    * FACEBOOK_CLIENT_ID = "ADD THIS"
    * FACEBOOK_CLIENT_SECRET = "ADD THIS"
    * FACEBOOK_CALLBACK_URL = "/auth/facebook/callback"
    * CLIENT_URL = "https://localhost:3001"
    * SECRET_KEY= "fgdLC7X5eJyaPr9lQmsKlsYUTDbFBK"
    ```
4. Run the server in terminal with `nodemon`. Open browser and go to `http://localhost:3000`. Keep server running while using the client part of this app.

> Note: The instructions above assumes that you already have node and nodemon installed globally on your computer.


