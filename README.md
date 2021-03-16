# Cashed

# Contributors

|                                                     [Ned Brennan](https://www.linkedin.com/in/edward-brennan/)                                                     |                                                   [Sean Murphy](https://www.linkedin.com/in/scmurphy96/)                                                    |                                               [John Ahsher](https://www.linkedin.com/in/-john-asher/)                                               |                                                    [Kevin Lee](https://www.linkedin.com/in/kevin-lee-/)                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://user-images.githubusercontent.com/36062933/111173237-dde2cf80-857c-11eb-8ca4-40962da23ad0.png" width = "150" />](https://github.com/NedBrennan) | [<img src="https://avatars.githubusercontent.com/u/54608605?s=400&v=4" width = "150" />](https://github.com/scmurphy96) | [<img src="https://avatars.githubusercontent.com/u/6667623?s=400&u=b87653292839ec221a5e964b0faa9ac5f1ef38ff&v=4" width = "150" />](https://github.com/jfilm) | [<img src="https://avatars.githubusercontent.com/u/62904438?s=400&u=490262981682487ab16fe4178258adbbc6e79c92&v=4" width = "150" />](https://github.com/juholee96) |
|   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/NedBrennan)   |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/scmurphy96)    |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/jfilm)    |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/juholee96)    |
|                  [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/edward-brennan/)                   |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/scmurphy96/)                |              [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/-john-asher/)              |                  [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/kevin-lee-/)                   |

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
