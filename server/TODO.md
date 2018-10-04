## Authentication
* [x] Create Server
* [x] Add auth router 
* [x] Create user with POST
  * [x] Validate required fields
  * [x] Check if username is unique
  * [x] Hash password with bcrypt
  * [x] Isert into db  

* [x] Create a Landing Page
* [x] Link to Sign Up Page   
* [x] Create Sign Up Page
  * [x] Create Form
  * [x] Validate username 
  * [x] Validate password 
  * [x] Display errors
    * [x]  If succesful sign up redirect to login page

* [x] Create Sign In Page
  * [x] Create Form
  * [x] Validate username 
  * [x] Validate password 
  * [x] Display errors
    * [x]  If succesful sign
      * [x] Store token lo localStorage
      * [x] Redirect to "dashboard"
    * 
* [x] Login user with POST /auth/signin
  * [x] Validate the user
  * [x] Check if username in db 
    * [x] Compare password with hashed in db 
    * [x] Create and sign a JWT
      * [x] Respond with JWT 
* [x] If a logged in user - signup, signin redirect to dashboard
* [x] If a non logged in user visits dashboard - redirect to sigin
* [x] Show username in dashboard
* [x] After sign up, immediately login
* [] Have one protected route on the backend
  * [] Only logged in users can request this route 

### Authorization:
* [] Visitors can only see the homepage
	* [] checkTokenSetUser middleware
		* [] get token from Authorization header
			* [] if defined ---
				* [] Verify the token with the token secret
				* [] Set req.user to be the decoded verified payload
			* [] else - move along
	* [] isLoggedIn middleware
		* [] if req.user is set - move along
		* [] else - send an unauthorized error message
	* [] redirect to login form
* [] Logged in users can only see their page
* [] Create notes form on client
	* [] Title
	* [] Description
* [] POST /api/v1/notes
	* [] Must be logged in
	* [] Logged in Users Can Create Notes
		* [] Title
		* [] Description -- markdown
		* [] Set user_id on server with logged in users id
* [] GET /api/v1/notes
	* [] Must be logged in
	* [] Logged in Users Can request all their notes 
		* [] Get all notes in DB with logged in users user_id
* [] List all notes on client
	* [] Render description with Markdown