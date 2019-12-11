-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-12-10 11:35:32
-- 服务器版本： 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ease_training`
--
CREATE DATABASE IF NOT EXISTS `ease_training` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ease_training`;

-- --------------------------------------------------------

--
-- 表的结构 `dataset`
--

CREATE TABLE `dataset` (
  `id` int(11) NOT NULL COMMENT '编号',
  `voczip_path` text NOT NULL COMMENT 'zip路径',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `created_at` int(11) NOT NULL COMMENT '创建时间戳'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `epoch`
--

CREATE TABLE `epoch` (
  `id` int(11) NOT NULL COMMENT '编号',
  `job_id` int(11) NOT NULL DEFAULT '0',
  `epoch_num` int(11) NOT NULL DEFAULT '0' COMMENT 'epoch编号',
  `val_avg_time` float NOT NULL DEFAULT '0' COMMENT '平均验证时间',
  `m_ap` float NOT NULL DEFAULT '0' COMMENT 'meanAP',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间戳'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL COMMENT '编号',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `docker_cmd` text NOT NULL COMMENT 'docker命令'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `model`
--

INSERT INTO `model` (`id`, `name`, `docker_cmd`) VALUES
(1, 'yolo3_darknet53_custom', 'train_yolo3.py --gpus=1,2 --network=darknet53'),
(2, 'yolo3_mobilenet0.25_custom', 'train_yolo3.py --gpus=1,2 --network=mobilenet0.25'),
(3, 'yolo3_mobilenet1.0_custom', 'train_yolo3.py --gpus=1,2 --network=mobilenet1.0'),
(4, 'faster_rcnn_resnet101_v1d_custom', 'train_faster_rcnn.py --gpus=1,2 --network=resnet101_v1d'),
(5, 'faster_rcnn_resnet50_v1b_custom', 'train_faster_rcnn.py --gpus=1,2 --network=resnet50_v1b'),
(6, 'ssd_300_mobilenet0.25_custom', 'train_ssd.py --gpus=1,2 --network=mobilenet0.25  --data-shape=300'),
(7, 'ssd_300_vgg16_atrous_custom', 'train_ssd.py --gpus=1,2 --network=vgg16_atrous  --data-shape=300'),
(8, 'ssd_512_mobilenet1.0_custom', 'train_ssd.py --gpus=1,2 --network=mobilenet1.0  --data-shape=512'),
(9, 'ssd_512_resnet50_v1_custom', 'train_ssd.py --gpus=1,2 --network=resnet50_v1  --data-shape=512'),
(10, 'ssd_512_vgg16_atrous_custom', 'train_ssd.py --gpus=1,2 --network=vgg16_atrous  --data-shape=512');

-- --------------------------------------------------------

--
-- 表的结构 `train`
--

CREATE TABLE `train` (
  `id` int(11) NOT NULL COMMENT '编号',
  `dataset_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `working` int(1) NOT NULL DEFAULT '0' COMMENT '工作状态，0=未开始，1=进行中，2=已完成，-1=出错',
  `created_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间戳',
  `started_at` int(11) NOT NULL DEFAULT '0' COMMENT '启动时间',
  `ended_at` int(11) NOT NULL DEFAULT '0' COMMENT '完成时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataset`
--
ALTER TABLE `dataset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `epoch`
--
ALTER TABLE `epoch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `train`
--
ALTER TABLE `train`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `dataset`
--
ALTER TABLE `dataset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号';

--
-- 使用表AUTO_INCREMENT `epoch`
--
ALTER TABLE `epoch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号';

--
-- 使用表AUTO_INCREMENT `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号', AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `train`
--
ALTER TABLE `train`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
