# Rapyd Payment solution for B2C Ads, B2B Invoices
A Complete Payment solution to create B2C Smart Ads | B2B Invoices with Tax Analytics AI, powered by Rapyd

## Project Name
B2C Smart Ads | B2B Invoices with UncleSamAI powered by Rapyd

## Elevator Pitch

## About this Project

## Project Structure
```ts
FOLDERS
    src -> folder contains "Angular App" source code
    test -> Included other HTML, Angular, Flutter app to test "Angular App" functionality in iOS, Android, Web, Desktop & Linux
    deploy -> web app deployed on Firebase hosting

FILESs
    .gitignore -> included list of files/folder/types which are not included in repo
    .LICENSE -> MIT License information
    -README.md -> documentation file
```

```diff
- If you like this project, please consider giving it a star (*) and follow me at GitHub & YouTube.
```
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/youtube.svg" width=40 height=50>](https://youtube.com/AmitShukla_AI)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/github.svg" width=40 height=50>](https://github.com/AmitXShukla)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/medium.svg" width=40 height=50>](https://medium.com/@Amit_Shukla)
[<img src="https://github.com/AmitXShukla/AmitXShukla.github.io/blob/master/assets/icons/twitter_1.svg" width=40 height=50>](https://twitter.com/ashuklax)

<a href="https://www.youtube.com/playlist?list=PLp0TENYyY8lHNMTAlrfVQKzAvQo3yzHYk">Click here for Video Description !</a>
<br/>

``` ts
Installation Instructions
Step 1: Install your favorite Code editor
Anroid Studio, IntelliJ community edition, Visual Studio Code

Step 2: download node js
make sure, your windows, linux or mac environment path is setup to the directory where your node.exe file is
for example

Path  = c:\amit.la\Program\node
now run following commands in terminal window
$ node -v
$ npm -v
make sure both the these commands return a valid node and npm version.
now install angular cli
$ npm install -g @angular/cli
// after installation
$ ng version
make sure ng version returns a valid Angular cli version.

Step 3: download this GitHub repository - Fork/Download Zip 
extract all files to your c drive and browse to the directory where you can see package.json
$ npm install --save
make sure installation finished without any error
$ ng serve --open
at this point, your app will serve on localhost:4200 but it show some errors because your firebase in not setup yet

Step 4: Setup Firebase project 
go to -> console.firebase.com
set up a new project
inside your project, click on authentication and enable
email/password, Google and Facebook authentication methods
now setup Firebase rules
please copy paste these rules as-is and make sure, there are no errors anywhere.

    rules_version = '2';
    service cloud.firestore {
    match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    }
    }

Step 5: find Firebase Project settings
copy and replace Firebase settings in your app->environments/environment.ts and environment.prod.ts


Step 6: Browse App 
to check if your app is up and running now if not, please open browser console and look for errors

if firebase is not setup properly or settings are not copies correctly, you will see error like invalid API Key.

For any other error please open a new issue and include a screen shot of your terminal and browser console window.
```