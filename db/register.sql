insert into account
(username, password)
values
($1, $2);

select * from account
where username = $1;