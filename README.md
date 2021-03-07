# Cashed

Thank you for your interest in Cashed!

Cashed is a web app that allows users to track their spending habits, create goals around those habits, and invest the money saved by reducing their spending. Users are encouraged to save money each week by tracking their weekly spending on particular habits. Any money that a user 'saves' relative to their average weekly spending on a given habit can be invested or saved directly from their cashed account.

## Link to website

http://cashed.us-east-1.elasticbeanstalk.com/

## A note on development

If you would like to pull this code down you are welcome to do so.

### Cloning the repo

`git clone https://github.com/Team-Pisces/capstone.git`
 
`npm install`

You will need to connect the sandbox Plaid account as well.
Username: user_good
Password: pass_good

### Plaid, JWT, Google oAuth

Cashed useds Plaid to connect our user's bank accounts, JWT to secure all routes and google oAuth for secure external login. To use these features developers will need to set up environment variables in a .env file. We use the `dotenv` library to handle our environment variables. Please contact one of our team members to request access to the necessary keys.
