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

* [] Create Sign In Page
  * [x] Create Form
  * [x] Validate username 
  * [x] Validate password 
  * [x] Display errors
    * [x]  If succesful sign
      * [] Store token lo localStorage
      * [] Redirect to "dashboard"
    * 
* [] Login user with POST /auth/signin
  * [x] Validate the user
  * [x] Check if username in db 
    * [x] Compare password with hashed in db 
    * [x] Create and sign a JWT
      * [x] Respond with JWT 