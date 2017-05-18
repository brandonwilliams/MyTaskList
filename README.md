# MyTaskList
Simple to do list with MEAN app (Prepared for Heroku)

Live on Heroku

Notes:

1. To configure MongoDB (I'm currently using mLab), edit server.js and change the path to your path with your DB connection info.
2. Set your desired port in server.js if you're running locally. For example, if you want port 8080, change "var port = (process.env.PORT || 5000);" to "var port = 8080". (It's set to use Heroku's chosen port by default).
3. Go to angular-src/src/app/services/task.service.ts and change the baseUrl to yours. (Ex: "http://localhost:8080" or "https://mytasklist-12345.herokuapp.com" - Mine will block you).
3. Run the application by cd'ing into your root folder and entering "node serve" (Suggestion: Try out nodemon or similar to auto restart the server after making changes).
4. cd into the angular-src folder and use "ng build" to compile the client folder with production angular code (edit this in your .angular-cli.json file).
5. While editing angular, instead of having to use "ng build" every time you need to see an update, just enter "ng serve" from the angular-src folder. And like before, when you're ready to compile for the client folder, enter "ng build"
7. The theme in Angular's assets folder is from https://bootswatch.com/
