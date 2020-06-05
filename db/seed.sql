create table account (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

create table content (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references account(id)
);