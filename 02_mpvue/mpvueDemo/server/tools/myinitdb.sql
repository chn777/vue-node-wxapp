DROP TABLE IF EXISTS `books`;

 CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) NOT NULL COLLATE utf8mb4_unicode_ci,
  `openid` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `title` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `image` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `alt` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `publisher` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `summary` varchar(1000) NOT NULL COLLATE utf8mb4_unicode_ci,
  `price` varchar(100) DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  `rate` float DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  `tags` varchar(100) DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  `author` varchar(100) DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  `count` int(11) NOT NULL DEFAULT '0' COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `bookid` varchar(100) NOT NULL COLLATE utf8mb4_unicode_ci,
  `comment` varchar(200) NOT NULL COLLATE utf8mb4_unicode_ci,
  `phone` varchar(20) DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  `location` varchar(20) DEFAULT NULL COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;