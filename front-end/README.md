# React Authentication

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

## OAuth 2.0
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