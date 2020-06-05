select * from content
join account on content.author_id = account.id
where content.title like $1;