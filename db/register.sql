insert into account
(username, password, profile_pic)
values
($1, $2, $3);

select * from account
where username = $1;