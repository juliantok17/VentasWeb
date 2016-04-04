-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2015 a las 20:24:06
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ventas`
--

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE IF NOT EXISTS `operaciones` (
  `ope_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `fecha_ope` int(11) NOT NULL,
  `cant_ope` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `pro_id` int(11) NOT NULL,
  `pro_nom` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `pro_pre` double NOT NULL,
  `pro_des` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `pro_cat` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`pro_id`, `pro_nom`, `pro_pre`, `pro_des`, `pro_cat`) VALUES
(1, 'PlayStation 4', 10999, 'La consola de juego PS4 C/3 Sony es un centro de entretenimiento que permite jugar los títulos disponibles de los videojuegos más recientes, o bien, reproducir películas en alta definición gracias...', 2),
(2, 'Pendrive Kingston 32gb ', 219, 'Guarda toda tu información de manera segura con Kingston.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_usuarios`
--

CREATE TABLE IF NOT EXISTS `productos_usuarios` (
  `usu_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos_usuarios`
--

INSERT INTO `productos_usuarios` (`usu_id`, `pro_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `pro_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `total_pro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `usu_id` int(11) NOT NULL,
  `usu_nom` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usu_ape` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usu_mail` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `usu_pass` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_nom`, `usu_ape`, `usu_mail`, `usu_pass`) VALUES
(1, 'Juan', 'Perez', 'perez@gmail.com', '1234'),
(2, 'María', 'Villar', 'mariav@gmail.com', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`ope_id`), ADD KEY `usu_id` (`usu_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`pro_id`), ADD KEY `pro_cat` (`pro_cat`);

--
-- Indices de la tabla `productos_usuarios`
--
ALTER TABLE `productos_usuarios`
  ADD PRIMARY KEY (`usu_id`,`pro_id`), ADD KEY `pro_id` (`pro_id`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`pro_id`), ADD KEY `pro_id` (`pro_id`), ADD KEY `usu_id` (`usu_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `ope_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operaciones`
--
ALTER TABLE `operaciones`
ADD CONSTRAINT `operaciones_ibfk_1` FOREIGN KEY (`ope_id`) REFERENCES `productos` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `operaciones_ibfk_2` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`pro_cat`) REFERENCES `categorias` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_usuarios`
--
ALTER TABLE `productos_usuarios`
ADD CONSTRAINT `productos_usuarios_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `productos_usuarios_ibfk_2` FOREIGN KEY (`pro_id`) REFERENCES `productos` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stock`
--
ALTER TABLE `stock`
ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`pro_id`) REFERENCES `productos` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
