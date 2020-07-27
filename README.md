## Description

This is the node server repository for the Pryon Mission Control Center application. The repository for the react client of this app can found here: [https://github.com/yboodhan/mcc_server](https://github.com/yboodhan/mcc_server).

### Installation instructions

1. [https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository](Clone) this repository onto your local computer. 

2. Access the directory using `cd mcc-server`. Install all dependencies using `npm i`.

3. Create a `.env` file to store the following values ($ = get through Facebook/admin):
    ```
    * BASE_URL = "http://localhost:3000"
    * FACEBOOK_CLIENT_ID = "$"
    * FACEBOOK_CLIENT_SECRET = "$"
    * FACEBOOK_CALLBACK_URL = "/auth/facebook/callback"
    * CLIENT_URL = "https://localhost:3001"
    * SECRET_KEY= "fgdLC7X5eJyaPr9lQmsKlsYUTDbFBK"
    ```
4. Run the server in terminal with `nodemon`. Open browser and go to `http://localhost:3000`. Keep server running while using the client part of this app.

> Note: The instructions above assumes that you already have node and nodemon installed globally on your computer.


