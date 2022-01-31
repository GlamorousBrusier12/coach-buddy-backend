# Coach-buddy

Designing and implementing an application which has multiple courses from which the student will be able to book a slot for the course

## steps for local setup

1. install all the packages using npm i
2. to start the api service run "npm start"

## assumptions:

1. there is no authentication for the user
2. anyone with an email can register for the course
3. anyone can cacnel the course enrollemnt before 30min of the course starts

## api endpoints

1. get users.
   link: http://localhost:3001/api/users.
2. get a particular user.
   link : http://localhost:3001/api/user/:email.
3. create a user (POST).
   userschema: { name: "", email:""}.
   link : http://localhost:3001/api/createuser
4. enroll to course (POST).
   a. provide the userobject while putting a post request.
   user:{ name:"", email:""}.
   link : http://localhost:3001/api/course/enroll/:courseId.
5. unenroll from the course (if the user is enrolled) (POST).
   a. provide the userobject while putting a post request.
   user:{ name:"", email:""}.
   link : http://localhost:3001/api/course/unenroll/:courseId.
