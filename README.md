# Public Repo Viewer

This App queries public user data from GitHub and shows an overview of your public directories and their commits.

# Step-By-Step

## 1. Open the App in your browser and enter the username of the GitHub user you'd like to look up.

 Note: you can press enter or click the search button to proceed. When a User is found a card is show with their avatar, name and number of public repositories they have.
 Click the arrow button to continue.

## 2. The Repository interface
 You can click the star on the repository cards to favourite them and move them up in the list. The GitHub icon will link you to the actual repository on GitHub and clicking on one will open up the Commits interface.

## 3. The Commits interface
 This page fetches the last 20 commits made to the chosen repository and lists them up from newest one to oldest one. You can enter a search query in the textfield to the left of the commits to filter based on their commit messages.

## 4. This app makes use off:
    - Axios for the api requests
    - Arrow functions for shorter writing of anonymous functions
    - Spread operator to merge two arrays into a new one
    - UseEffect, UseNavigate, UseContext, ... React webhooks

