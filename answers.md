# Answers to Questions for the Final  

---  

## Part 1  

### 1.) Authentication vs. Authorization  

#### Explain the difference between authentication and authorization. Then describe what an API should return in each situation: The request does not contain valid authentication credentials and the caller is authenticated but does not have permission to perform the requested operation. Include the appropiate HTTP status code for each situation.  

Answer:  

The difference between authentication and authorization is that authentication proves identity while Authorization grants permission. Authentication checks who you are while authorization checks what you can do. If the request does not contain valid authentication credentials the API should return a `401 Unauthorized` status code because the API could not verify the users identity. If the caller is authenticated but does not have permission to perform the requested operation, the API should return a `403 Forbidden` status because the user does not have the role of being able to perform the action despite being identified.

### 2.) Passwords, Sessions, and Tokens  

#### An application allows users to log in with a username and password. Explain: why the application should never store passwords as plain text, what the server should store instead, how a session-based login differs from a token-based login and one advantage of each approach.  

Answer:  

The application should never store passwords as plain text because it poses a security risk. If the app was hacked, the hackers would be able to easily and directly access the users' passwords. Servers should store a salted password hash made with a password-hashing alorithm. A session stores login state on the server and uses a cookie to identify the client. The cookie identifies a server-side session so the session holds the login state. The advantage to this is that the server controls the session so it can easily be managed and revoked. A token is a signed credential that the client sends with API requests. The API checks the token before allowing the user access to protected routes/resources. The advantage to this is that the srver does not have to keep up with session data for every logged in user.  

### 3.) JSON Web Tokens  

#### Describe the purpose and structure of a JSON Web Token (JWT). Your answer should include: the three major parts of a JWT, the difference between signing and encrypting a token, why a server must validate a JWT before trusting its claims, one risk of using JWTs with excessively long expiration times.  

Answer:  

A JSON Web Token is a compact signed token commonly used to represent identity and claims to securely send info. It contains three major parts: the Header, Payload and Signature. Signing makes sure the token hasn't been changed and that it came from the expected source while encrypting helps to hide the contents of the token. JWTs need to be validated by a server before trusting its claims because someone could create a fake token or change it. One risk of using JWTs with an excessively long expiration time is that it leaves it vulnerable to hackers for a while and if they succesfully steal it, they will have a long time to use it.  

### 4.) OAuth  

#### Explain the purpose of OAuth. Your answer should distinguish among: the resoucse owner, the client application, the authorization server, the resource server and the access token. Also explain why giving a third-party application an OAuth access token is safer than giving it the user's password.  

Answer:  

OAuth is a delegated authorization framework. The resource owner owns the data. The client application is what is wanting to access the user's resources. The authorization server authenticates the user and gives a token once access is granted. The resource server contains the user's resources and receives tokens to let clients access them. The access token is what the client needs to be ablt to access a user's resources. Giving a third-party application an OAuth access token is safer than giving it the user's password because the third party will nor be storing the user's actual password putting it at risk. So, the token can be revokd without having to change the user's password. 

### 5.) PKI and Certificates  

#### Explain how a digital certificate helps a client establish a secure connection to an API server. Your answer should include: The purpose of the server's public and private keys, the role of a certificate authority, what the client verifies in the certificate, and what could happen if certificate validation were skipped.  

Answer:  

A digital certificate helps a client establish a secure connection to an API server by helping verify a client is connecting to the intened API by binding an identity to a public key. The purpose of a serv'er public and private key is to be used together to prove the server's identity, establish a secure connection and be sure the contents reach the intended place. A Certificate Authority verifies idetities and digitally signs certificates. Clients trust certificates because they trust one of the root Certificate Authorities installed in their operating system or browser. The client verifies each signature until it reaches a trusted root certificate. The client verifies whether the certificate is signed by a trusted CA, if its currently valid, if the hostname matches the certificate, if the certificate is allowed to identify a server, if the certificate has been revoked and if the server can prove it owns the private key. If certificate validation is skipped, client may establish a connection with a hacker pretending to be the API server and send sensitive information. 

### 6.) Databases, Messages, and Asynchronous Processing  

#### An API receives a request to generate a large report. Producing the report may take sveral minutes. Explain why the API should normally use asynchronous processing instead of keeping the HTTP request open. Describe a resonable design that includes: a database record representing the requested job, a message queue, a background worker, an immediate HTTP response, and a way for the client to check the job's status. Inlcude the successful HTTP status code for submitting the job and the successful status code for retrieving its current status.  

Answer:  

The API should normally use asynchronous processing instead of keeping the HTTP request open because the report can take several minutes to finish. If generating the report does take that long it could cause a timeout if not using asynchronous. A simple design could be to make a database record for for the request job. The record representing the requested job would have a job ID. The API can return with a `202 Accepted` status code and the job ID. The job would then be put into the message queue. The background worker would take the job from the queue and start working on it to generate the large report. The client could have a user ID of some sort that gives it access to check on its job's status using a GET request and the job ID. The succeful status code for retrieving the job's current status would be `200 OK` with the current job status