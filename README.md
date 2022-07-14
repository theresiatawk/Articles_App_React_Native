# Articles_App_React_Native

It's a React-Native application that allows the user to sign in, view, and filter articles.It consists of two screens: Login & Dashboard.

## Login screen:
- Contains username and password input fields.
- Contains a login button (Disabled when the login API is in progress).
- Handle invalid credentials.
- Route the users to the dashboard screen when the login API is successful.

## Dashboard screen:
- Contains input field, articles list, a loading indicator when needed, and a logout button.
- It fetches articles from the API whenever the user is routed to the Dashboard screen.
- At any time the user reached the end of the articles list, it loads more articles by calling an API and routed the user to another set of articles (page2)
- It filters the articles and display only the articles that contain the searched pattern in the article abstract.
- The user can clear the searched input and click on the search button to reload the page and fetch all the existing articles.
- On logout press, the user is routed to the login screen.

## Redux:
- Redux was used to store the login response, the response of the articles, and the filtered articles.

## UI/UX
The UI/UX of the application is basic with an eye-appealing design.

## Documentation:
Connected to the backend using this URL: http://34.245.213.76:3000
The API documentation can be found here: http://34.245.213.76:3000/api
Use the following login credentials to perform a successful login:
- Username: candidate
- Password: P@ssw0rd
The article API is authenticated to prevent non-authorized access. It is authenticated using the access token returned in the login response.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Xcode 12](https://developer.apple.com/xcode)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-navigation](https://reactnavigation.org/) navigation library.
- [redux](https://redux.js.org/) for state management.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.

### Running the Application
After cloning this repo: 

- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npm run ios` or `npm run android` to start your application!

Keep in mind that if you do this, you'll have to **install and link** all dependencies (as well as adding all the necessary native code for each library that requires it).
