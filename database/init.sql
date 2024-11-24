-- SQL Server script
USE master;
GO

-- Drop the database if it exists
IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'starwars')
 DROP DATABASE starwars;
GO

-- Create the database
CREATE DATABASE starwars;
GO
USE starwars;
GO

-- Table 'UserData'
IF OBJECT_ID('UserData', 'U') IS NOT NULL
 DROP TABLE UserData;
GO
CREATE TABLE UserData (
 id CHAR(36) NOT NULL PRIMARY KEY,
 data VARCHAR(160) NOT NULL
);
GO