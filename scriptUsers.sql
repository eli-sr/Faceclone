create table user (
    id int primary key auto_increment,
    username varchar(30) unique not null,
    password varchar(30) not null,
    name varchar(30) not null,
    email varchar(30),
    userImage varchar(300)
);

insert into user
    (username, password, name)
values
('rachel','1234','Rachel');

-- drop table user;