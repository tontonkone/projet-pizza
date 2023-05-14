-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 mai 2023 à 00:46
-- Version du serveur : 10.4.25-MariaDB
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `testp`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(12) NOT NULL,
  `user_id` int(11) NOT NULL,
  `addressName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `user_id`, `addressName`) VALUES
(79, 72, '1 rue de maison  44000 nantes'),
(80, 72, '1 rue de maison  44000 nantes'),
(83, 19, 'che de ville 8800 la bas '),
(84, 20, 'cheveux de la viell ede 89333'),
(85, 23, 'cheveux'),
(86, 27, 'cheveux'),
(87, 74, '12 rue de d\'essaie 33000  bordeaux'),
(88, 74, '13 rue d\'essaie 93700 drancy'),
(89, 75, 'ssss eeee'),
(90, 75, 'ddddd zzzzzz'),
(91, 77, '1 rue de la fosse'),
(92, 77, '2 rue de je ne sais pas ');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(12) NOT NULL,
  `category_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `category_name`) VALUES
(73, 'boissons'),
(72, 'dessert'),
(71, 'menu'),
(70, 'pizza');

-- --------------------------------------------------------

--
-- Structure de la table `deliveryman`
--

CREATE TABLE `deliveryman` (
  `id` int(12) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createdate` datetime DEFAULT curtime(),
  `updatedate` datetime DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `deliveryman`
--

INSERT INTO `deliveryman` (`id`, `firstName`, `lastName`, `email`, `createdate`, `updatedate`) VALUES
(50, 'Irma', 'Lueilwitz', 'jay.hammes@example.org', '1979-10-08 00:00:00', '2023-05-05 21:56:31'),
(51, 'Madie', 'Goyette', 'destini.pfannerstill@example.org', '1995-11-15 00:00:00', '2023-05-05 21:56:31'),
(52, 'Stella', 'Kohler', 'tmclaughlin@example.com', '2022-12-09 00:00:00', '2023-05-05 21:56:31'),
(53, 'Leslie', 'Kirlin', 'chance67@example.com', '2000-02-05 00:00:00', '2023-05-05 21:56:31'),
(54, 'River', 'Harber', 'halvorson.garnet@example.com', '2014-09-12 00:00:00', '2023-05-05 21:56:31'),
(55, 'Molly', 'Senger', 'russel.vandervort@example.com', '1990-07-26 00:00:00', '2023-05-05 21:56:31'),
(56, 'Kenyatta', 'Er', 'daugherty.werner@example.com', '1979-01-28 00:00:00', '2023-05-05 21:56:31');

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(12) NOT NULL,
  `name` varchar(30) NOT NULL,
  `QuantityStock` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `QuantityStock`) VALUES
(60, 'champignon', 20),
(61, 'pattes pizza', 30),
(62, 'fromage', 50);

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(12) NOT NULL,
  `user_id` int(11) NOT NULL,
  `deliveryman_id` int(11) NOT NULL,
  `quantityOrdered` int(4) NOT NULL,
  `orderStatus` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '0=REGISTER.\r\n1=EN COURS .\r\n2=LIVRE.\r\n',
  `product_id` int(11) NOT NULL,
  `orderpassed_id` int(11) NOT NULL,
  `priceTotal` double NOT NULL,
  `address_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `user_id`, `deliveryman_id`, `quantityOrdered`, `orderStatus`, `product_id`, `orderpassed_id`, `priceTotal`, `address_id`) VALUES
(12, 19, 52, 55, '2', 12, 4, 475.63, 83),
(13, 19, 52, 476, '2', 13, 5, 40708.79, 83),
(14, 20, 54, 9393, '2', 14, 6, 6242569.7595, 84),
(15, 74, 52, 0, '0', 15, 7, 0.88, 87),
(16, 21, 52, 16, '1', 16, 8, 0, 0),
(17, 20, 52, 401, '2', 0, 9, 18309471.693377, 0),
(18, 21, 52, 5270, '1', 18, 10, 536.58, 0),
(19, 23, 49, 759, '2', 19, 11, 1022910.738321, 0),
(20, 22, 49, 4007, '2', 20, 12, 4579.418796, 0),
(21, 21, 49, 4347, '2', 21, 13, 1, 0),
(22, 19, 49, 0, '2', 22, 14, 19017357.404577, 0);

-- --------------------------------------------------------

--
-- Structure de la table `orderpassed`
--

CREATE TABLE `orderpassed` (
  `id` int(12) NOT NULL,
  `user_Id` int(11) NOT NULL,
  `totalAmount` double DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `finishdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orderpassed`
--

INSERT INTO `orderpassed` (`id`, `user_Id`, `totalAmount`, `createdate`, `finishdate`) VALUES
(4, 19, 0, '2017-01-13 11:54:24', '2014-11-04 23:25:31'),
(5, 20, 7, '1988-03-04 12:35:25', '1974-03-30 12:35:14'),
(6, 21, 0, '1996-06-18 18:44:14', '2004-03-18 03:12:04'),
(7, 22, 19.83, '2016-07-12 11:07:57', '1979-01-18 04:41:23'),
(8, 23, 32.439861766, '1993-12-24 06:27:27', '1982-02-17 07:01:56'),
(9, 24, 70, '2017-11-29 15:52:37', '2015-09-26 15:00:55'),
(10, 25, 35.296624, '1989-07-24 21:49:05', '1982-11-04 02:12:24'),
(11, 26, 37.61, '2009-12-24 10:44:18', '1979-06-18 08:56:55'),
(12, 27, 32, '2019-03-12 08:04:28', '1988-09-16 01:35:21'),
(13, 28, 77.06067, '2020-08-17 19:20:46', '2013-11-20 21:15:45'),
(14, 29, 58.79899, '1998-05-06 04:46:59', '1982-03-22 06:26:20'),
(15, 30, 84.781, '1991-09-01 19:37:14', '1980-12-21 10:03:24'),
(16, 31, 37, '1987-12-17 04:38:28', '1999-03-13 07:56:16'),
(17, 32, 57, '2018-05-30 21:50:51', '1970-04-21 09:53:04'),
(18, 33, 205, '1971-07-27 03:51:20', '1989-11-20 11:01:26'),
(19, 34, 71.99, '1991-10-31 13:41:18', '1984-10-14 21:02:38'),
(20, 35, 95, '2002-03-24 00:00:29', '2007-02-26 18:39:04'),
(21, 36, 95, '1985-10-03 17:04:01', '1972-05-14 11:03:15'),
(22, 37, 52.45485, '1980-03-15 09:11:11', '1974-06-21 08:21:20'),
(23, 38, 77.4045, '2016-08-10 00:06:01', '1975-02-12 12:44:22'),
(24, 39, 61, '2022-12-10 08:56:21', '1980-07-07 15:40:59'),
(25, 40, 0, '1994-07-24 05:30:19', '2017-05-23 23:33:52'),
(26, 41, 206, '1974-06-26 07:32:36', '1997-07-04 11:56:21'),
(27, 42, 72, '2002-10-21 23:05:57', '1999-04-19 19:41:55'),
(28, 43, 78, '2017-04-11 21:20:40', '1978-05-26 04:16:55'),
(29, 44, 75, '2015-06-12 05:01:26', '1981-08-23 18:23:59'),
(30, 45, 94, '1973-12-09 09:54:16', '2016-04-15 17:01:58'),
(31, 46, 8, '2005-09-26 22:47:17', '1989-05-06 11:59:43'),
(32, 47, 82, '2010-02-09 23:47:35', '2008-04-05 07:13:41'),
(33, 48, 0, '1993-07-12 09:00:42', '1982-06-24 02:38:56');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(12) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `photo` varchar(30) NOT NULL,
  `description` varchar(250) NOT NULL,
  `QuantityStock` tinyint(4) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `category_id`, `name`, `photo`, `description`, `QuantityStock`, `price`) VALUES
(12, 70, ' La Margherita', 'tmp//4846ea6ceb38a95493a19f507', 'Voluptatem cupiditate enim rem aut. Unde placeat eligendi ratione at. Quam quod velit sunt sint.', 4, 13),
(13, 70, 'La Savoyarde', 'tmp//aada7aedc4fcf240696fe6328', 'Id rerum eaque voluptas recusandae porro ea voluptatum. Odit labore hic possimus reiciendis. Beatae numquam nisi recusandae veritatis. Ad ut voluptatem modi.', 3, 17),
(14, 70, 'La calsone', 'tmp//5d17ce78d625cb20a66fc60c7', 'Numquam a corrupti quis cupiditate vel aliquam quam. Qui provident maiores eum ut officia culpa quia. Soluta et quia molestiae nemo at commodi voluptates.', 0, 16.7),
(15, 70, 'La reine', 'tmp//ff280fd61d1a5cd5b9c075612', 'Numquam illo harum nobis voluptate. Rerum suscipit voluptatibus aut rerum eum beatae odit. Hic natus quas quos aut reiciendis cupiditate. Eum accusamus in fugit eaque iste voluptatem et.', 127, 4490.116),
(16, 70, 'La pizza royale', 'tmp//b297b415419e760e286464ba3', 'Sunt omnis voluptas corrupti corporis nesciunt quasi vitae. Perferendis dolor nihil cum inventore odio omnis corporis. Fugit nemo labore id rerum consequuntur fugiat eius. Et est voluptas quidem rerum qui aut dolorem.', 127, 438616.6),
(19, 70, 'La Capricciosa', 'tmp//bb4cf3807118eb0ce6de8f4de', 'Est in rerum magni adipisci aliquid consequatur. Et voluptatem cupiditate dolor molestiae et. Saepe est itaque et est.', 1, 2370604.6631324),
(20, 70, 'La Quatre saisons', 'tmp//b274004a9a941f7658cb12343', 'Vero vel animi expedita placeat. Consequatur iste consequatur quo quas dolorem minima. Quod est repellendus consequatur minus officia. Quia quia neque deleniti id deserunt placeat est.', 127, 221.73),
(21, 70, 'La Napolitaine', 'tmp//4e6c782b5783983d087387d87', 'Quia sint non qui minima corrupti ratione veritatis. Et et labore vitae iusto quia.', 127, 6191441.468502),
(22, 70, 'La Diavola', 'tmp//c3cb4d235ccd482c7219d128d', 'Aut quo rerum velit nobis sunt. Corporis quisquam tempore non itaque. Dignissimos incidunt dignissimos aut et dignissimos et.', 127, 291873.43649),
(23, 70, 'La Romaine', 'tmp//419a34e5b8b1d24b57d0531ff', 'Expedita iste corporis et cupiditate. Ipsam amet laudantium ut esse cum cumque. Dolore dignissimos blanditiis voluptas quisquam aliquid nihil possimus quasi. Et non aut aut voluptatibus.', 127, 5254),
(26, 72, 'La Focaccia à l’ail', 'tmp//573f8cd336cdac69a237278f5', 'Ut consequatur laborum in quisquam eius. Cupiditate omnis animi eveniet fugit. Odio cupiditate reiciendis eum.', 0, 17),
(27, 72, 'La Raclette', 'tmp//53d2ced85b56600f50a817a0c', 'Voluptatem ut adipisci nulla voluptas est aut sed voluptatibus. Facere perferendis consequatur nam officiis blanditiis ut aut. Et incidunt consectetur est eum.', 127, 5.9541769),
(28, 72, 'La deep dish pizza', 'tmp//7f0c9cc3447f53cbeb920e4ce', 'Et dolorem culpa aperiam optio at eos est. Eius iste ex tempore autem voluptate ut. Maiores ex occaecati consectetur vel.', 127, 465201908.91072),
(29, 71, 'menu 2 pour 3', 'tmp//104d8aea47055f7dc9adcc82a', 'Qui aut ipsa officiis voluptatem. Molestiae cum excepturi magnam amet. Tempore quasi placeat quo. Facere nesciunt rerum sed id error.', 3, 13),
(30, 71, 'menu ado ', 'tmp//dc33d453562bd75ffe161c441', 'Ducimus veniam illo rem aut ullam vel facere. Molestiae nulla velit sunt ut expedita. Et reprehenderit ut qui aliquid corporis. Reprehenderit totam necessitatibus et perferendis quam nihil.', 127, 7),
(31, 71, 'menu été', 'tmp//dd5d27bf63e5a993e5af32a84', 'Architecto dicta aspernatur impedit odio ad. Voluptatem assumenda facere est aspernatur repellat dignissimos et eaque. Officia doloremque aut et consequuntur. Et sit architecto illo est at consequatur dolores.', 127, 8),
(32, 73, 'coca cola', 'tmp//dd5d27bf63e5a993e5af32a84', 'Architecto dicta aspernatur impedit odio ad. Voluptatem assumenda facere est aspernatur repellat dignissimos et eaque. Officia doloremque aut et consequuntur. Et sit architecto illo est at consequatur dolores.', 127, 32.10032),
(33, 73, 'orangina', 'tmp//dd5d27bf63e5a993e5af32a84', 'Architecto dicta aspernatur impedit odio ad. Voluptatem assumenda facere est aspernatur repellat dignissimos et eaque. Officia doloremque aut et consequuntur. Et sit architecto illo est at consequatur dolores.', 127, 32.10032),
(34, 72, 'acetea', 'tmp//dd5d27bf63e5a993e5af32a84', 'Architecto dicta aspernatur impedit odio ad. Voluptatem assumenda facere est aspernatur repellat dignissimos et eaque. Officia doloremque aut et consequuntur. Et sit architecto illo est at consequatur dolores.', 127, 32.10032),
(37, 71, 'manrose', '', '', 2, 12),
(39, 70, 'sss', '', '', 1, 23),
(40, 70, 'ssss', '', '', 127, 3),
(43, 73, 'xxxx', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `product_ingredient`
--

CREATE TABLE `product_ingredient` (
  `id` int(11) NOT NULL,
  `quantity` int(4) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product_ingredient`
--

INSERT INTO `product_ingredient` (`id`, `quantity`, `product_id`, `ingredient_id`) VALUES
(1, 2, 12, 60),
(2, 3, 12, 62),
(3, 1, 12, 61);

-- --------------------------------------------------------

--
-- Structure de la table `product_order`
--

CREATE TABLE `product_order` (
  `id` int(12) NOT NULL,
  `product_id` int(11) NOT NULL,
  `orderdetails_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product_order`
--

INSERT INTO `product_order` (`id`, `product_id`, `orderdetails_id`) VALUES
(1, 19, 16),
(2, 14, 16);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(12) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdate` datetime NOT NULL,
  `is_admin` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `createdate`, `is_admin`) VALUES
(1, 'dd', 'd', 'b@bb', '$2a$10$iPS9oyCnO66QFHRZzzgqKe', '2023-05-06 01:20:16', 0),
(19, 'Lew', 'Kuhn', 'predovic.faustino@example.com', 'fe1b5fa1fcf4027b06ab1924ec732e950317366f', '1984-04-24 02:15:51', 0),
(20, 'Kieran', 'Lang', 'mohr.mac@example.com', '1e6fb8900b82622b1818a8d84fd065f7a4cd5a98', '2014-07-08 04:15:54', 0),
(21, 'Gwen', 'VonRueden', 'rosalee45@example.org', 'ecb73b03843c73590e614254d9db794c5520f2e6', '1979-04-07 19:24:48', 0),
(22, 'Deon', 'Hickle', 'lakin.eleazar@example.net', '6c034a8199adc31f99de4bb8f4c5e1e4b2d8357c', '1990-03-26 23:31:38', 0),
(23, 'Elissa', 'Carroll', 'prohaska.fausto@example.org', '16377cc7564bc494c7cb50c0b0c57c54bb4d262b', '2004-02-20 12:11:21', 0),
(24, 'Kaela', 'Bahringer', 'jarod.jacobi@example.net', 'f83df9825c63255cc8d0b301f9f0efc2598aac28', '1982-08-04 21:34:03', 0),
(26, 'Camila', 'Raynor', 'adelia.hodkiewicz@example.org', '5715998e5a2c5a796ef08c8dd8bef73c37891b33', '1984-06-19 15:57:33', 0),
(27, 'Sabina', 'Flatley', 'zkutch@example.com', '4ac57b6b47b992c1ec98c410258e0738f7faeaab', '1997-10-24 19:34:14', 0),
(28, 'Kale', 'Deckow', 'vlakin@example.net', '7979745d6c6e5408a4d277dad0f63138d5e90830', '2010-07-04 17:54:53', 0),
(29, 'Emile', 'Torp', 'antwan98@example.com', 'a8be94dcb8f254075b825ff2b620e3853716a435', '2023-03-19 09:39:42', 0),
(30, 'Antwan', 'Goodwin', 'clowe@example.net', '6158e31463597cef6125f25dcefe00a434d6a670', '1995-05-03 10:16:20', 0),
(31, 'Laurel', 'Koss', 'doug.schneider@example.org', 'dfe7835785b551d2bc3902102df0cc030ad81cd2', '2005-02-08 11:22:03', 0),
(32, 'Elyssa', 'Zemlak', 'tess.emmerich@example.net', '0fe5d1ebadda8716501079a1ab195f3465e97dc1', '1977-10-28 12:14:39', 0),
(33, 'Lincoln', 'Walsh', 'bonita67@example.com', '4eaf871534fac268fba3278674ae4f5cbe5cf0f7', '2008-02-21 09:58:45', 0),
(34, 'Jonathan', 'Greenholt', 'scrist@example.org', 'a1974833ba91cfe8303ac7cb86fdf783acdc5084', '2019-01-14 22:07:14', 0),
(35, 'Ressie', 'Rosenbaum', 'kamren.schamberger@example.org', 'c1ddde9ee69709290eb9f364953d3771e0afbbd5', '1980-03-21 16:18:04', 0),
(36, 'Janae', 'Becker', 'halle85@example.com', 'ba4d2c376cae5eaa93cec51a0e82ace7a9f9ecb0', '2018-09-09 03:36:04', 0),
(37, 'Stacy', 'Miller', 'obatz@example.net', 'e18123b65b8f66d2e02c757674c4043e5f9e0cfa', '2022-01-19 16:54:21', 0),
(38, 'Bernardo', 'Frami', 'carmine12@example.com', '7d9d251f2b36e2283756b7e08d08bb7670508ea4', '2004-05-10 14:54:25', 0),
(39, 'Donna', 'Hackett', 'katharina35@example.org', '43d4aff05e8f8c05eea201e051e3d5c62d57e5a9', '1990-08-23 18:06:41', 0),
(40, 'Arvilla', 'Hodkiewicz', 'arturo.kihn@example.net', '66ed44fc7a9388d16abc488f4e98401b0f8e2810', '1990-08-03 18:04:11', 0),
(41, 'Billy', 'Watsica', 'vhettinger@example.net', '39eee0c9ccf5d37770f3e48b1a12e15aeca6f8b9', '1976-01-20 06:24:51', 0),
(42, 'Alexandre', 'Kris', 'lillian.volkman@example.net', '9cd3b058652b3a76e834b528b9a2b8ea5e6723ed', '1971-08-17 07:23:13', 0),
(43, 'Queenie', 'Kerluke', 'brekke.emmy@example.com', '7beace527b6228dd3da36436a5b990293bf9ddda', '2013-05-06 01:58:09', 0),
(45, 'Robert', 'Ullrich', 'bernier.syble@example.net', '990134c64f6152609525c933ec455594380f9fb3', '2021-02-03 23:51:04', 0),
(46, 'Evans', 'Batz', 'pearlie.johnson@example.com', 'e1c142812b32e68a84dab6609e5d5cd98931bfc8', '2007-08-11 09:23:25', 0),
(48, 'Ted', 'Sipes', 'wilhelmine47@example.com', '6fa252629610420a0dacfe2ad68b7e4ecb3ceaca', '1980-01-11 00:27:20', 0),
(49, 'b', 'b', 'b@b', '$2a$10$ib5HLUPzOnKCx0r9tQnvGO', '1980-01-11 00:27:20', 1),
(57, 'sssss', 'ssssss', 'd@dsssssss', '$2a$10$iwEK5qcMsuaNhmygDvueK.', '2023-05-05 01:17:19', 1),
(58, '2222', '2222', '22@44', '$2a$10$VXMUSjNVJsVRa5GfdisSku', '2023-05-06 01:42:28', 0),
(72, 'jddjdj', 'jdjddj', 'b@bkk', '$2a$10$xBtQgZTarS2zkqrG7zY4Tu', '2023-05-06 06:10:43', 0),
(74, 'admin', 'admin du tp', 'admin@admin', '$2a$10$XR7Y2w3mM7V05klm8is.NO', '2023-05-07 23:01:08', 1),
(75, 'sss', 'sssss', 'b@bss', '$2a$10$esICdtdAZxpQtxYW6tXa0O', '2023-05-14 20:47:39', 0),
(77, 'dddddddddddddd', 'dddddddddddddddd', 'bababa@aammma', '$2a$10$eVmEOrGyU0mKHQQQm/4.Qe', '2023-05-14 22:24:36', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Index pour la table `deliveryman`
--
ALTER TABLE `deliveryman`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productOrderDeliver` (`product_id`,`orderpassed_id`,`deliveryman_id`),
  ADD KEY `order_id` (`orderpassed_id`),
  ADD KEY `deliveryman_id` (`deliveryman_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `orderpassed`
--
ALTER TABLE `orderpassed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_Id` (`user_Id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`category_id`);

--
-- Index pour la table `product_ingredient`
--
ALTER TABLE `product_ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Index pour la table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `orderdetails_id` (`orderdetails_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `deliveryman`
--
ALTER TABLE `deliveryman`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `orderpassed`
--
ALTER TABLE `orderpassed`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `product_ingredient`
--
ALTER TABLE `product_ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_4` FOREIGN KEY (`deliveryman_id`) REFERENCES `deliveryman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `product_ingredient`
--
ALTER TABLE `product_ingredient`
  ADD CONSTRAINT `product_ingredient_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_ingredient_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`orderdetails_id`) REFERENCES `orderdetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
