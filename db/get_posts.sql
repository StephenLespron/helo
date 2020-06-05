select a.username, a.profile_pic, c.author_id, c.title, c.content, c.img, c.id from content c
join account a on c.author_id = a.id
where a.id != $1
and c.title like $2;