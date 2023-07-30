-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2023 at 12:37 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointments`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(25) NOT NULL,
  `10th_marks` float NOT NULL,
  `12th_marks` float NOT NULL,
  `req_branch` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `appointment_time` time NOT NULL,
  `appointment_date` date NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`first_name`, `last_name`, `email`, `phone`, `country`, `city`, `10th_marks`, `12th_marks`, `req_branch`, `dob`, `appointment_time`, `appointment_date`, `created_at`, `id`) VALUES
('Ankan', 'Shaw', 'ankanshaw2015@gmail.com', '6265583144', 'India', 'Jamshedpur', 99, 95, 'M.tech', '2023-05-30', '00:00:00', '0000-00-00', '2023-05-22 11:25:14', 17),
('Ayush', 'Kumar', 'ayush@gmail.com', '8464578954', 'India', 'Jamshedpur', 42, 57, 'B.tech CE', '2023-05-30', '00:00:00', '0000-00-00', '2023-05-05 21:20:36', 14),
('Ayush Kumar', 'Ankit', 'ayushkumar@gmail.com', '8206445621', 'India', 'Jamshedpur', 70, 85, 'B.tech EEE', '2000-04-04', '00:00:00', '0000-00-00', '2023-04-23 13:34:36', 3),
('Mukesh', 'Mahto', 'mukesh786mahato@gmail.com', '64646464687', 'India', 'Jamshedpur', 54, 87, 'MCA', '2023-05-10', '12:00:00', '2023-05-28', '2023-05-22 11:17:07', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
