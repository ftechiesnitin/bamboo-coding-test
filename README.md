# bamboo-coding-test

## Using the App
1. `Clone the Repository`.
2. Run `npm install`
3. `Add .env file to add all the environment variables. Sample shown below for local use`
 ```
 # APP CONFIG
 APP_PORT=4000
 APP_ENV=DEV

 # ELASTIC CONF
 ELASTIC_HOST=localhost
 ELASTIC_PORT=9200

```

4. `This app uses Elastic Search and store the top stories. Add all the necessary configs in env for the Elastic Search`

5. Run `npm start`
6. `You can access http://HOST:PORT/people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false`
