

Client is deployed in:
heroku:
https://smart-brain-client.herokuapp.com/
And also in:
https://ronen567.github.io/smart-brain-client/

See notes on Github deploy

1. [Notes on Creat React App](#available-scripts)  
2. [Switching remote GITHUB URLs from HTTPS to SSH](#switching-remote-github-urls-from-https-to-ssh)  
3. [Notes on deploying rect in Github](#deploy-react-app-to-github)  



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify




# Switching remote GITHUB URLs from HTTPS to SSH

### List your existing remotes in order to get the name of the remote you want to change.

```$ git remote -v
```
```
> origin  https://github.com/USERNAME/REPOSITORY.git (fetch)
> origin  https://github.com/USERNAME/REPOSITORY.git (push)
```

### Change your remote's URL from HTTPS to SSH with the git remote set-url command.
```$ git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```
### Verify that the remote URL has changed.
```
$ git remote -v

> origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
> origin  git@github.com:USERNAME/REPOSITORY.git (push)
```


# Deploy React app to Github

Reference:  https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d

After pushing files to origin do:
##### Deploy application
```
 install gh-pages package
 ```
 ```
$ npm install --save gh-pages
```
##### Deploy application
 Modify package.json:


- Add "homepage" attribute:
"homepage": "https://[your-user-name].github.io/[your-repo-name]/"
The “homepage” specifies the host path where you want to host the application. 


- Add predeploy and deploy to "scripts" object:
“predeploy”: "npm run build"
“predeploy” specifies the command to build before deployment.

“deploy”: "gh-pages -d build"
“deploy” specifies which branch and directory to deploy.
- deploy application
```
$ npm run deploy
```


# Deploy on heroku:

## From Heroku page:
- Create a new App - give name e.g. smart-brain-client
- It gives us commands to setup everything:

(If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.) - was done before

$ heroku login
Create a new Git repository
Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a smart-brain-client
Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master

then:
 heroku open



