use transfer;
-- 創建1092的各校資訊table
CREATE TABLE `school1092` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REGISTRATION_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TEST_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RESULT_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REGULATION` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REMARK` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
)
  
  -- 創建1091的各校資訊table
CREATE TABLE `school1091` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REGISTRATION_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TEST_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RESULT_DATE` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REGULATION` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `REMARK` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
  )

-- 創建心得分享table
CREATE TABLE `experience` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AUTHOR` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TERM` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `EXPERIENCE` varchar(20000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
)  

-- 創建解題區的問題資訊table
CREATE TABLE `solution` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AUTHOR` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SUBJECT` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `QUESTION` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FILENAME` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
)  

-- 創建解題區的問題留言table
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AUTHOR` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMMENT` varchar(20000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SOLUTIONID` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (SOLUTIONID) REFERENCES solution(ID)
)

-- 創建備審資料table
CREATE TABLE `application_packet` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TERM` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SCHOOL` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RANKING` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MAJOR` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FILENAME` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
)  

-- 創建管理者table
CREATE TABLE `admininfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ADMINNAME` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ADMINPWD` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
)  

  
