# React Authentication

## Authentication Best Practices
<details>
  <summary>Click to see Best Practices</summary>

1. ### Using HTTPS, SSL and TLS
    * https instead of http means a site is using SSL/TLS
        * i.e. https://www.google.com
    * It's important that users know that they're interacting with our site, and only our site.
    * HTTPS encrypts the data that are being send from client to server
    * Register the site with a certificate authority
    * The authority gives us an SSL certificate we can use to verify our identity
    * Lets Encrypt is one of the free certificate providers.

2. ### Salting and Peppering Passwords
    * ***Salting*** - generating a random string for each user and combining that with their password **before hashing**.
        * ```
            asasd123asd12 + myP4sSW0rd!
                       |
                       v
            asasd123asd12myP4sSW0rd!   
                       |
                       v
            (Generate a hash from this)
    * ***Peppering*** - This is the same thing as salting, except the random "pepper" string is the same for all users and not stored in the database.
        * Salting and Peppering usually combined together.
    
    * Adds an extra layer of security over just hashing.
    * Makes easy-to-guess passwords harder to identify in the database.

3. ### Never trust the Front-End
    * When implementing some kind of security measure, it must be implemented on the server. It should never rely solely on client-side logic.
        * Some Examples:
            * Make sure users can only view their own data
            * Make sure users can't store arbitrary fields in our database
            * Make sure only paid subscribers can access certain content

4. ### Authentication Error Handling
    * Inform Users of Authentication Errors, if something goes wrong let the user know.
    * Don't tell them too much. There are certain things that we don't want our users to know too much about.
    * Balance between maximizing user experience and maximizing safety.

5. ### Securing Your Database
    * Hosting your database somewhere means "exposing it to the elements"
    * Most database providers will already have a basic security setup such as only allowed IPs

</details>

## JSON Web Tokens (JWTs)
> Strings that we give to users when they authenticate. Can be used instead of the user's password to interact with protected server resources

<pre>
eyJhbGciOiJl   .   eyJzdWliOilxMjM0NTY30D   .   SflKxwRJS

Header             Payload                      Signature
{                  {                            Used to verify the 
 "alg": "HS256",    "email": "john@gmail.com",  authenticity of the 
 "typ": "JWT",      "likesCoffe": true,         other parts
}                  }

<b>Signature</b> is created by combining the header and payload and signing those using the specified algorithm and secret key (usually defined in the backend server)

Anyone who has access to token can see the information it contains, unless it's encrpyted, but the data in the token cannot be changed unless private key (backend server has it) is known.
</pre>

### **How JWTs are used in the Full-Stack Apps**
- **Step 1**: The user logs in.
- **Step 2**: The server generates a JWT containing the user's information.
- **Step 3**: The server sends the JWT to the server.
- **Step 4**: The front end stores this JWT (usually by storing it in cookies, session storage or local storage).
- **Step 5**: The front end includes this JWT whenever it needs privileged access. (usually the JWT is included in the HTTP Headers like so; <code>{ Authorization: 'Bearer eyJhbGciOiJl.eyJzdWliOilxMjM0NTY30D.SflKxwRJS }</code>)
- **Step 6**: The server uses the JWT's signature to verify that it hasn't been modified 

### **Signing vs. Encrypting**
**Signing** - proves that the data in the JWT hasn't been modified. (make sure that server is the one that generated the token)

**Encrypting** - prevents third parties from seeing the data inside the JWT (hides the information)

Notes: JWTs are credentials. Never display them in the public.

---

## **OAuth 2.0**
> A standard for allowing users to log in to our site using their credentials from another site, such as Google, Linkedin, Github, and others.
### **The Three OAuth Parties**
1. The user
2. Our app
3. The service provider (such as Google, Github, Linkedin etc.)
### **The Basic OAuth Process**
1. Generate a special URL for the service-provider's site
2. Send the user to this URL when they click "Log in with ______"
3. If the user grants us permission, the service provider will redirect them back to our site with special code.
4. Our site uses this code to load the user's info.
5. We create or update the user's account with the provider's info.

---

## **AWS Cognito** (Third-party Authentication Provider)
The problem with setting up user authentication from scrach is that it can be ver time consuming even though it gives developers more flexibilty.

In order to focus on business logic of the app one can use Third-party authentication provide (i.e. AWS Cognito) which offers lots of authentication functionality out of the box

*AWS Cognito* offers; Storing users' passwords (and logging in/signing up), Verifying email addresses, Resetting passwords and much more.

**AWS Cognito Pools**
- *User Pools* - store our users' account information
- *Identity Pools* - keep track of our users' permissions

### How AWS Cognito Works

- When a user signs up, we give their username and password to Cognito instead of storing it ourselves. (could also store any user related data)

- When a user logs in, we give their password to Cognito for verification

- To verify emails, Cognito sends a six-digit code instead of a link

- A 6-digit code is used for password resets as well

