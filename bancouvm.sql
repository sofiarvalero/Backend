-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-07-2024 a las 19:32:21
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
  `tipo` varchar(15) NOT NULL DEFAULT 'usuario',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentacooperativa`
--
ALTER TABLE `cuentacooperativa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentaprestamo`
--
ALTER TABLE `cuentaprestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestamistas`
--
ALTER TABLE `prestamistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
