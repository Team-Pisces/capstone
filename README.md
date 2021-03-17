# Cashed

Cashed is a web app that allows users to track their spending habits, create goals around those habits, and invest the money saved by reducing their spending. Users are encouraged to save money each week by tracking their weekly spending on particular habits. Any money that a user 'saves' relative to their average weekly spending on a given habit can be invested or saved directly from their cashed account.

# Contributors

|                                                     [Ned Brennan](https://www.linkedin.com/in/edward-brennan/)                                                     |                                                   [Sean Murphy](https://www.linkedin.com/in/scmurphy96/)                                                    |                                               [John Ahsher](https://www.linkedin.com/in/-john-asher/)                                               |                                                    [Kevin Lee](https://www.linkedin.com/in/kevin-lee-/)                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://user-images.githubusercontent.com/36062933/111173237-dde2cf80-857c-11eb-8ca4-40962da23ad0.png" width = "150" />](https://github.com/NedBrennan) | [<img src="https://avatars.githubusercontent.com/u/54608605?s=400&v=4" width = "150" />](https://github.com/scmurphy96) | [<img src="https://avatars.githubusercontent.com/u/6667623?s=400&u=b87653292839ec221a5e964b0faa9ac5f1ef38ff&v=4" width = "150" />](https://github.com/jfilm) | [<img src="https://avatars.githubusercontent.com/u/62904438?s=400&u=490262981682487ab16fe4178258adbbc6e79c92&v=4" width = "150" />](https://github.com/juholee96) |
|   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/NedBrennan)   |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/scmurphy96)    |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/jfilm)    |   [<img src="https://www.flaticon.com/svg/vstatic/svg/733/733553.svg?token=exp=1615926999~hmac=da08ee59202123013eed245faedcf296" width="20"> ](https://github.com/juholee96)    |
|                  [ <img src="https://www.flaticon.com/svg/vstatic/svg/725/725337.svg?token=exp=1615927117~hmac=ae71c0ab53b00e1bd2eb087d32b14712" width="20"> ](https://www.linkedin.com/in/edward-brennan/)                   |                [ <img src="https://www.flaticon.com/svg/vstatic/svg/725/725337.svg?token=exp=1615927117~hmac=ae71c0ab53b00e1bd2eb087d32b14712" width="20"> ](https://www.linkedin.com/in/scmurphy96/)                |              [ <img src="https://www.flaticon.com/svg/vstatic/svg/725/725337.svg?token=exp=1615927117~hmac=ae71c0ab53b00e1bd2eb087d32b14712" width="20"> ](https://www.linkedin.com/in/-john-asher/)              |                  [ <img src="https://www.flaticon.com/svg/vstatic/svg/725/725337.svg?token=exp=1615927117~hmac=ae71c0ab53b00e1bd2eb087d32b14712" width="20"> ](https://www.linkedin.com/in/kevin-lee-/)                   |

# Deployed App

http://cashed.us-east-1.elasticbeanstalk.com/

For testing purposes use these Plaid credentials when prompted:
Username: user_good
Password: pass_good

# Getting Started Locally

`git clone` && `cd` into the project directory
`npm install` to install project dependencies
`createdb cashed` to make a Postgres database
`npm run seed` to seed the database with data
Running `npm run start-dev` will make great things happen!
Open up localhost:8080 in your favorite browser
If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

## Secrets

To run this application locally you will also need to define the necessary secrets and evirnoment variables
In the main project directory create a new .env file `touch .env`
You will notice that a .env.test file already exists
Copy and paste all information contained within that file to the newly created .env file.

From here you will need to contact one of the developers to be granted access to the plaid and google secrets

# Naming Conventions:

Components: PascalCase // eg. `AllProducts.js`
Reducers: camelCase // eg. `myStore.js`
Tests: type.spec.js // eg. `AllProducts.test.js`, `myStore.test.js`

# Commit Messages:

Semantic style — http://karma-runner.github.io/4.0/dev/git-commit-msg.html
eg. `feat(add User model to database)`
what is being added(summary of what it does) - more details if needed.

# Pre-Pull Request Workflow

From current feature branch
`git stash`
`git pull origin master`
`git stash apply`
`git add <new feature>`
`git commit -m <commit message>`
`git push origin <current branch>`
