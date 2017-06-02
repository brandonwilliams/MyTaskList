# MyTaskList
Simple to do list with MEAN app (Prepared for Heroku)

Live on Heroku @ https://mytasklist-71084.herokuapp.com/

Notes:

1. To configure MongoDB (I'm currently using mLab), add config/database.js and add the following with your own info:

module.exports = {
  database: 'mongodb://<myusername>:<mypassword>@ds143221.mlab.com:43221/<mydatabase>',
  secret: '<mysecret>'
}
2. Run 'ng install' from the project folder and also from the angular-src folder to install your dependencies.
3. Go to angular-src/src/app/services/task.service.ts and change the baseUrl to yours. (Ex: "http://localhost:8080" or "https://mytasklist-12345.herokuapp.com").
3. Run the application by cd'ing into your root folder and entering "node serve" (Suggestion: Try out nodemon or similar to auto restart the server after making changes).
4. cd into the angular-src folder and use "ng build" to compile the client folder with production angular code (edit this in your .angular-cli.json file).
5. While editing angular, instead of having to use "ng build" every time you need to see an update, just enter "ng serve" from the angular-src folder. And like before, when you're ready to compile for the client folder, enter "ng build"
7. The theme in Angular's assets folder is from https://bootswatch.com/
