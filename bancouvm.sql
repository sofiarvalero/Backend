-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2024 a las 03:50:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bancouvm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cooperativas`
--

CREATE TABLE `cooperativas` (
  `montoTotal` float(10,3) NOT NULL,
  `fechaPago` varchar(10) NOT NULL,
  `depositoMensual` decimal(10,3) NOT NULL,
  `usuarioResponsable` varchar(15) NOT NULL,
  `duracion` varchar(18) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cooperativas`
--

INSERT INTO `cooperativas` (`montoTotal`, `fechaPago`, `depositoMensual`, `usuarioResponsable`, `duracion`, `id`) VALUES
(1000.000, '2001-10-01', 10.000, '0', '', 1),
(12000.000, '12', 120.000, 'Lai', '', 2),
(150.000, '1', 1.000, 'Rafael048', '', 3),
(1000.000, '1', 14.000, 'Juans', '', 5),
(178313.000, '2', 123.000, 'Ali', '', 6),
(2189372.000, '3', 152.000, 'Yisus', '', 7),
(53242.000, '1', 1231.000, 'Kev', '', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentacooperativa`
--

CREATE TABLE `cuentacooperativa` (
  `idCuenta` int(11) NOT NULL,
  `idCooperativa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentacooperativa`
--

INSERT INTO `cuentacooperativa` (`idCuenta`, `idCooperativa`, `idUsuario`, `id`) VALUES
(34, 7, 16, 1),
(34, 8, 16, 2),
(34, 5, 16, 3),
(34, 6, 16, 5),
(39, 2, 18, 8),
(39, 1, 18, 9),
(39, 3, 18, 11),
(30, 1, 14, 16),
(30, 8, 14, 17),
(30, 8, 14, 18),
(30, 2, 14, 19),
(41, 3, 19, 20),
(41, 1, 19, 21),
(43, 2, 20, 22),
(45, 2, 21, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentaprestamo`
--

CREATE TABLE `cuentaprestamo` (
  `idCuenta` int(11) NOT NULL,
  `idPrestamista` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentaprestamo`
--

INSERT INTO `cuentaprestamo` (`idCuenta`, `idPrestamista`, `idUsuario`, `id`) VALUES
(43, 2, 20, 1),
(43, 1, 20, 2),
(45, 1, 21, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `tipo` varchar(18) NOT NULL,
  `saldo` float(10,3) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `numero` bigint(25) NOT NULL,
  `interes` float(11,3) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`tipo`, `saldo`, `usuario_id`, `numero`, `interes`, `id`) VALUES
('corriente', 0.000, 2, 2147483647, NULL, 1),
('corriente', 0.000, 2, 2147483647, NULL, 2),
('corriente', 50.000, 4, 2147483647, NULL, 3),
('corriente', 50.000, 4, 2147483647, NULL, 4),
('corriente', 50.000, 4, 2147483647, NULL, 5),
('corriente', 50.000, 4, 682683799, NULL, 6),
('corriente', 50.000, 4, 91616362, NULL, 7),
('corriente', 50.000, 4, 2147483647, NULL, 8),
('corriente', 50.000, 4, 2147483647, NULL, 9),
('corriente', 50.000, 4, 2147483647, NULL, 10),
('corriente', 50.000, 4, 2147483647, NULL, 11),
('corriente', 50.000, 4, 559980487, NULL, 12),
('corriente', 50.000, 4, 1158605353, NULL, 13),
('corriente', 50.000, 4, 2147483647, NULL, 14),
('corriente', 50.000, 4, 2147483647, NULL, 15),
('corriente', 50.000, 4, 2147483647, NULL, 16),
('corriente', 50.000, 4, 2147483647, NULL, 17),
('corriente', 50.000, 4, 2147483647, NULL, 18),
('corriente', 50.000, 4, 4359813645, NULL, 19),
('corriente', 50.000, 4, 1085372083, NULL, 20),
('corriente', 50.000, 4, 2774939090, NULL, 21),
('corriente', 0.000, 11, 4465987915, NULL, 22),
('corriente', 0.000, 12, 5874479791, NULL, 23),
('corriente', 5.000, 13, 8519678483, NULL, 24),
('ahorro', 10.000, 4, 1039087439, 0.000, 25),
('ahorro', 10.000, 4, 6053274263, 0.000, 26),
('ahorro', 10.000, 4, 9982021016, 1.000, 27),
('ahorro', 10.000, 4, 5050263380, 0.000, 28),
('ahorro', 10.000, 4, 8409821707, 1.000, 29),
('corriente', 104485.000, 14, 6623871212, NULL, 30),
('ahorro', 1000.000, 14, 798856968, 1.000, 31),
('corriente', 0.000, 15, 2390668514, NULL, 32),
('ahorro', 0.000, 15, 7363430903, 0.000, 33),
('corriente', 232555.000, 16, 933285986, NULL, 34),
('ahorro', 20.000, 16, 9197819578, 0.005, 35),
('ahorro', 10.000, 13, 8069348955, 0.005, 36),
('corriente', 110.000, 17, 8996325968, NULL, 37),
('ahorro', 15.000, 17, 8997543081, 0.005, 38),
('corriente', 13150.000, 18, 3010019686, NULL, 39),
('ahorro', 100.000, 18, 5414489286, 0.005, 40),
('corriente', 1150.000, 19, 7088787533, NULL, 41),
('ahorro', 0.000, 19, 2841771607, 0.005, 42),
('corriente', 1000.000, 20, 5907074021, NULL, 43),
('ahorro', 1500.000, 20, 8623007145, 0.005, 44),
('corriente', 13000.000, 21, 2228204390, NULL, 45),
('ahorro', 0.000, 21, 6028827150, 0.005, 46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamistas`
--

CREATE TABLE `prestamistas` (
  `prestamo` decimal(11,3) NOT NULL,
  `fechaPagos` varchar(18) NOT NULL,
  `interes` decimal(10,3) NOT NULL,
  `usuarioResponsable` varchar(18) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamistas`
--

INSERT INTO `prestamistas` (`prestamo`, `fechaPagos`, `interes`, `usuarioResponsable`, `id`) VALUES
(1000.000, '0000-00-00', 1.000, 'Lai', 1),
(15000.000, '10', 0.500, 'Rafael048', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(18) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `cedula` int(9) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `usuario`, `clave`, `cedula`, `telefono`, `id`) VALUES
('Juan Torres', 'Juancho', '$2a$08$iYpl6zVMgKgdQkgIFJKxfukiJOmnh/tNlBLyeIyyTbjsEjMqOOBTS', 30840156, '2147483647', 1),
('Sofia', 'Sofi', '$2a$08$ZNcG1pkQ6UoK2c0NwXnwsubcA7fECkm8FoSSXp5Y93lakFP6KgToG', 12345, '4121234', 2),
('Rafael', 'Rafael048', '$2a$08$fraeaTxh8DDYrx6ePA9VeuNJSTlcZh.pp26Rez23V7JTCJK0OV6ym', 123456, '123456', 3),
('Laila', 'Lai', '$2a$08$loVZHXwXkud9ON2i.8v.m.zcLcCy.h6UXdhEazF9ybGfIje2yZmU.', 2535, '343251', 4),
('Kevin', 'Kev', '$2a$08$pIIjroFBrk0xEFhNdIl3te/7U/AyyDA4n0IyNqPRgsP0j5rI5AmjS', 123, '123421', 5),
('Jesus', 'Yisus', '$2a$08$teXOWCQq1F7W2TvHmYSBpe4E6ApOH1MeFXzkCg5JO.D3WTohVjVXy', 1233, '123241', 6),
('Miguel', 'Miguel', '$2a$08$0D1KCxm4CzcDSiKmhHZMWOsXdpxyyaIk/WkjUaD291PAa93tfO8KG', 164124, '434654', 7),
('Mary', 'MAry', '$2a$08$64T9AYH64FZoosjfeq/st.plWqunGCiBXmgdlbPw8n8xwQgbhDvF.', 1234324, '5325235', 8),
('Jesus', 'Chucho', '$2a$08$ajZl3KQi1/1cIxOtU9WB3OANZ672O223XGtNr88wmxMDuSRtCDiP2', 12432423, '23131', 9),
('Michael', 'Sus123', '$2a$08$3abCJ5j4ZWWJavgZGYIN9.Az8orR7Yc5LUQ93HqXQzYO13tvo3Kka', 122321, '241241', 10),
('Michael', 'Mike', '$2a$08$RkO5Kb/LBd3nL1U.NxWjHuVJuHMeJwIK1VGXnTgIHsAYIWlI.1a3W', 1343154, '124431', 11),
('Lionel', 'Messi012', '$2a$08$nhw3KAau7Hi.fYLnP7ruS.kHDtwPJd0NfCQawTY/k/e4zyL12lCfi', 6987561, '04121748351', 12),
('Juan Torres', 'Juans', '$2a$08$nOjATFsQuKTpf4YXZwDQJe36AUKp5BoRq.ExV8Pke1EJVfqUjEP16', 5787545, '014245645', 13),
('Alirio', 'Ali', '$2a$08$lwngbkPgF5EOP40V5D.9TOzxIWEUtlvyE4mbbjMFkG8rGZvIPCDCW', 5748955, '04126986458', 14),
('Messi', 'Fressi', '$2a$08$Q9GMP4oxO.Dy74hpo/riYe4rExj/VllDKlCF50NLWyccCq3.09vnK', 457841, '44523524', 15),
('Oniel', 'Oti', '$2a$08$NaLe0SRmXEtSopKaIv55Ge8qH.wGgwoL7ukKcM/oOZzzeFhr02w6q', 486745, '01452457', 16),
('Miguel Angel', 'MiguelA', '$2a$08$4jWMmj6BvcQWXYzExtvjEuZwRdcfxH9Bjjskm6NciVWcC5og26aBe', 453468786, '0241564454', 17),
('Red', 'Red', '$2a$08$fDHKw08eeuG8Cnjc8BWDDew4uu7t9TEZLbxZNmLdwIEmZOBM7dR6u', 124324234, '432423525', 18),
('Genesis', 'Gene', '$2a$08$f4K6OzVu/Jm0wmSKxoI9EuHwVtgdP9zkjTWRmpy4O4xsuNr6.GliG', 456748653, '015458797/', 19),
('Leonardo', 'Leo', '$2a$08$e53kThdEiVH349PRcx.8V.t63vBrLzOfvsfSI3amaEG3WGL45mab.', 466574864, '0241657', 20),
('Diego', 'Diego', '$2a$08$mQu1r/W1WEZt6D6fM6hNP.9kQ9zmlGChBSaH/HuSbdNWJdd1xoMvy', 452453256, '04025899', 21);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cooperativas`
--
ALTER TABLE `cooperativas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioResponsable` (`usuarioResponsable`);

--
-- Indices de la tabla `cuentacooperativa`
--
ALTER TABLE `cuentacooperativa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCuenta` (`idCuenta`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idCooperativa_2` (`idCooperativa`),
  ADD KEY `idCooperativa` (`idCooperativa`) USING BTREE;

--
-- Indices de la tabla `cuentaprestamo`
--
ALTER TABLE `cuentaprestamo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCuenta` (`idCuenta`),
  ADD KEY `idPrestamista` (`idPrestamista`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `prestamistas`
--
ALTER TABLE `prestamistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioResponsable` (`usuarioResponsable`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cooperativas`
--
ALTER TABLE `cooperativas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cuentacooperativa`
--
ALTER TABLE `cuentacooperativa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `cuentaprestamo`
--
ALTER TABLE `cuentaprestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `prestamistas`
--
ALTER TABLE `prestamistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuentacooperativa`
--
ALTER TABLE `cuentacooperativa`
  ADD CONSTRAINT `cuentacooperativa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentacooperativa_ibfk_2` FOREIGN KEY (`idCuenta`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentacooperativa_ibfk_3` FOREIGN KEY (`idCooperativa`) REFERENCES `cooperativas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuentaprestamo`
--
ALTER TABLE `cuentaprestamo`
  ADD CONSTRAINT `cuentaprestamo_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentaprestamo_ibfk_2` FOREIGN KEY (`idPrestamista`) REFERENCES `prestamistas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuentaprestamo_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD CONSTRAINT `cuentas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
