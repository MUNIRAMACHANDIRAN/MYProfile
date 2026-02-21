-- ================================================================
--  Muniyappan R Portfolio - MySQL Database Schema
-- ================================================================

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- ─── Users Table ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id           INT           AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100)  NOT NULL,
  email        VARCHAR(150)  NOT NULL UNIQUE,
  password     VARCHAR(255)  NOT NULL,
  profileImage VARCHAR(500)  DEFAULT NULL,
  role         ENUM('admin','user') DEFAULT 'user',
  isActive     TINYINT(1)    DEFAULT 1,
  createdAt    DATETIME      DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Certificates Table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id           INT           AUTO_INCREMENT PRIMARY KEY,
  userId       INT           NOT NULL,
  name         VARCHAR(200)  NOT NULL,
  organization VARCHAR(200)  NOT NULL,
  issueDate    DATE          DEFAULT NULL,
  filePath     VARCHAR(500)  DEFAULT NULL,
  fileType     VARCHAR(50)   DEFAULT NULL,
  createdAt    DATETIME      DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── Projects Table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200)  NOT NULL,
  description TEXT          DEFAULT NULL,
  githubLink  VARCHAR(500)  DEFAULT NULL,
  techStack   VARCHAR(500)  DEFAULT NULL,
  imageUrl    VARCHAR(500)  DEFAULT NULL,
  `order`     INT           DEFAULT 0,
  createdAt   DATETIME      DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed: Default Projects ─────────────────────────────────────
INSERT IGNORE INTO projects (name, description, githubLink, techStack, `order`) VALUES
('Land Management – VAO Admin Portal',
 'A comprehensive land record management system built for Village Administrative Officers (VAO) to manage patta, chitta, and adangal records digitally. Features role-based access, document generation, and an audit trail for all property transactions.',
 'https://github.com/muniyappan', 'Java, Spring Boot, MySQL, HTML, CSS, JavaScript', 1),

('Help Desk Ticketing Management',
 'A full-featured IT help desk system that handles ticket creation, assignment, escalation, and resolution workflows. Includes SLA tracking, email notifications, priority queues, and a real-time dashboard for managers.',
 'https://github.com/muniyappan', 'Java, SQL Server, Bootstrap, REST APIs', 2),

('Resume Maker (ATS Based)',
 'An intelligent resume builder that follows Applicant Tracking System (ATS) standards. Users can create, preview, and download professional resumes with keyword optimization suggestions to pass automated HR screening systems.',
 'https://github.com/muniyappan', 'React JS, Node.js, HTML, CSS, JavaScript', 3),

('TASMAC Shop Account Management',
 'An accounting and inventory management system specifically designed for TASMAC retail outlets. Manages daily sales, stock reconciliation, employee attendance, and generates GST-compliant financial reports.',
 'https://github.com/muniyappan', 'Python, Django, MySQL, Bootstrap', 4),

('VAO Adangal System (Account I & II)',
 'A digital record-keeping platform for VAO Adangal (agricultural land use register) covering both Account-I (land use) and Account-II (water use). Enables online entry, verification, and generation of official government reports.',
 'https://github.com/muniyappan', 'Java, Oracle DB, JSP, Servlets', 5);
