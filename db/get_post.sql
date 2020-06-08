select a.username, c.author_id, c.title, c.content, c.img from content c
join account a on c.author_id = a.id
where c.id = $1;