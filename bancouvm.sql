-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2024 a las 17:47:23
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
  `montoTotal` decimal(10,0) NOT NULL,
  `fechaPago` date NOT NULL,
  `depositoMensual` decimal(10,0) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta-cooperativa`
--

CREATE TABLE `cuenta-cooperativa` (
  `idCuenta` int(11) NOT NULL,
  `idCooperativa` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta-prestamo`
--

CREATE TABLE `cuenta-prestamo` (
  `idCuenta` int(11) NOT NULL,
  `idPrestamista` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `tipo` varchar(18) NOT NULL,
  `saldo` decimal(10,0) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `numero` bigint(25) NOT NULL,
  `interes` decimal(11,0) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuentas`
--

INSERT INTO `cuentas` (`tipo`, `saldo`, `usuario_id`, `numero`, `interes`, `id`) VALUES
('corriente', 0, 2, 2147483647, NULL, 1),
('corriente', 0, 2, 2147483647, NULL, 2),
('corriente', 0, 4, 2147483647, NULL, 3),
('corriente', 0, 4, 2147483647, NULL, 4),
('corriente', 0, 4, 2147483647, NULL, 5),
('corriente', 0, 4, 682683799, NULL, 6),
('corriente', 0, 4, 91616362, NULL, 7),
('corriente', 0, 4, 2147483647, NULL, 8),
('corriente', 0, 4, 2147483647, NULL, 9),
('corriente', 0, 4, 2147483647, NULL, 10),
('corriente', 0, 4, 2147483647, NULL, 11),
('corriente', 0, 4, 559980487, NULL, 12),
('corriente', 0, 4, 1158605353, NULL, 13),
('corriente', 0, 4, 2147483647, NULL, 14),
('corriente', 0, 4, 2147483647, NULL, 15),
('corriente', 0, 4, 2147483647, NULL, 16),
('corriente', 0, 4, 2147483647, NULL, 17),
('corriente', 0, 4, 2147483647, NULL, 18),
('corriente', 0, 4, 4359813645, NULL, 19),
('corriente', 0, 4, 1085372083, NULL, 20),
('corriente', 0, 4, 2774939090, NULL, 21),
('corriente', 0, 11, 4465987915, NULL, 22),
('corriente', 0, 12, 5874479791, NULL, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamistas`
--

CREATE TABLE `prestamistas` (
  `prestamo` decimal(11,0) NOT NULL,
  `fechaPagos` date NOT NULL,
  `interes` decimal(10,0) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('Lionel', 'Messi012', '$2a$08$nhw3KAau7Hi.fYLnP7ruS.kHDtwPJd0NfCQawTY/k/e4zyL12lCfi', 6987561, '04121748351', 12);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cooperativas`
--
ALTER TABLE `cooperativas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuenta-cooperativa`
--
ALTER TABLE `cuenta-cooperativa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idCooperativa` (`idCooperativa`),
  ADD KEY `idCuenta` (`idCuenta`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `cuenta-prestamo`
--
ALTER TABLE `cuenta-prestamo`
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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuenta-cooperativa`
--
ALTER TABLE `cuenta-cooperativa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuenta-prestamo`
--
ALTER TABLE `cuenta-prestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `prestamistas`
--
ALTER TABLE `prestamistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuenta-cooperativa`
--
ALTER TABLE `cuenta-cooperativa`
  ADD CONSTRAINT `cuenta-cooperativa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuenta-cooperativa_ibfk_2` FOREIGN KEY (`idCuenta`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuenta-cooperativa_ibfk_3` FOREIGN KEY (`idCooperativa`) REFERENCES `cooperativas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuenta-prestamo`
--
ALTER TABLE `cuenta-prestamo`
  ADD CONSTRAINT `cuenta-prestamo_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuenta-prestamo_ibfk_2` FOREIGN KEY (`idPrestamista`) REFERENCES `prestamistas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuenta-prestamo_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD CONSTRAINT `cuentas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
