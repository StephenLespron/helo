select * from content
join account on content.author_id = account.id
where account.id != $1;
and content.title like $2;