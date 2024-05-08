****server setup *****

1.npm install
2.npm start

****database setup *****

#Create database:

Create database fullstackassessment;


#Create users tables:

create table users(id int AUTO_INCREMENT PRIMARY KEY,name varchar(255) not null, email varchar(255) not null,createdAt timestamp default current_timestamp,updatedAt timestamp default current_timestamp);
