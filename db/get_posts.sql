select a.username, c.author_id, c.title, c.content, c.img, c.id from content c
join account a on c.author_id = a.id
where a.id != $1
and lower(c.title) like $2;