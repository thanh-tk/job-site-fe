# Getting Started with Create React App

This is a front-end React application for a job board. It allows users to view all jobs, edit existing jobs, and create new jobs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

------------------------------------------------------------

### Features:

* View all jobs (with pagination)
* Edit existing jobs
* Create new jobs

### Dependencies:

* React
* React Router
* Tailwind
* dayJs (Ant compatible)
* Moment

### Getting started:

* Clone this repository
* Install the dependencies with `npm install`
* Start the development server with `npm start`
* Open a web browser and go to `http://localhost:3000`

### Pages:

* `/jobs?{param}`: The homepage, where users can view all jobs.
* `/jobs/new`: A form where users can create new jobs.
* `/jobs/{id}/edit`: A form where users can edit existing jobs.

**Edit/Delete buttons:**

Each job ad on the homepage has an "edit" button and a "delete" button.
* The edit button takes the user to the edit page for that specific job.
* The delete button deletes the job and refresh the listing page.

**Creating New Jobs:**

To create a new job, users go to the `/jobs/new` page or click add new job button and fill out the form. The form fields include:

* Title
* Description
* Expiry date

Once the form is submitted, the new job is created and the user is redirected back to the listing page.

**Editing Existing Jobs:**

To edit an existing job, users go to the `/jobs/{id}/edit` page for that specific job. The edit page has the same form as the create new job page.

Once the form is submitted, the job is updated and the user is redirected back to the listing page.
