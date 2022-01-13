docker run -itd --name limuctf-db -e MYSQL_ROOT_PASSWORD=123456789 -e MYSQL_DATABASE=limuctf -e LANG=C.UTF-8 -p 3307:3306  mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
