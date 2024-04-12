# Cinema Booking Application

### Connecting your database
1. Create a MYSQL server instance called "cinema" listengin at the default ip port
2. Ensure the mysql connector is in your POM file, and the H2 embedded DB is commented out from your pom file. 
3. Ensure the sql configuration in the application.properties file is not commented out
4. Open that connection and run the following mysql code:
```mysql
create database cinema; -- Creates the new database
create user 'springuser'@'%' identified by 'password'; -- Creates the user
grant all on cinema.* to 'springuser'@'%'; -- Gives all privileges to the new user on the newly created database
```
### Install NX build tool
```
npm install -g nx
```
