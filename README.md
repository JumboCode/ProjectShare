# Project SHARE

If you have any development questions, check the Wiki first!

## About the Client

We are developing a "resource finder" for Project SHARE so that they can better distribute their wealth of healthcare resources, which are currently stored haphazardly in varying formats. 

## The Team

- Project Manager: Meguna Okawa
- Technical Lead: Anthony Tranduc
- Designer: Jennifer Weng
- Developer: Peter Horvath
- Developer: Meghan Kloud
- Developer: Linh Tran
- Developer: Kristin Ng 

# Project Structure

- Db: mysql 
- Server: Django
- Frontend: React

# Quickstart

### Clone the Repo

- Make sure you have git installed: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Run `git clone https://github.com/JumboCode/ProjectShare.git` to get all of the files on this repo. 

Have two tabs open in whatever terminal you're using (Terminal, iTerm, etc) so that
you can run both the server (back end) and the client (front end) at the same time. 

### Run the server

- cd into the `backend` directory.
- Make sure you have Python3 installed: https://www.python.org/downloads/
- If you're on mac, make sure you have homebrew installed: https://brew.sh/
- Make sure you have pipenv installed: https://pypi.org/project/pipenv/.
- Run `pipenv install` to install the required python packages.
- Run `pipenv run python3 manage.py runserver` to start the backend server.
  - We run our command under `pipenv run` so that pipenv makes the installed packages
  available to us.
  - `manage.py` is a helpful file generated by Django Rest Framework that lets us 
  run various operations related to our server. `runserver` is one of these operations. 

### Run the client

- cd into the `frontend` directory.
- Make sure you have yarn installed: https://classic.yarnpkg.com/en/docs/install/
- Run `yarn` (short for `yarn install`). This installs the required Node packages. 
  - Note: We could in theory use npm instead of yarn. We'll be using yarn since it's the
  default with create-react-app.
- Run `yarn start` to start the React development server. This automatically reloads
  whenever you save changes.

Start coding!
