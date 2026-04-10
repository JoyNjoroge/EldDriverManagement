ELD Driver Management System (FleetLog)
📌 Project Overview

FleetLog is a comprehensive Electronic Logging Device (ELD) solution designed for the trucking and logistics industry. It streamlines Hours of Service (HOS) tracking, ensuring drivers remain compliant with FMCSA regulations through an intuitive, data-driven mobile interface.

This project demonstrates the integration of complex regulatory requirements with a high-performance, offline-first mobile architecture.
🚀 Key Features
1. Regulatory Compliance (HOS)

    Real-time HOS Monitoring: Dynamic tracking of "Drive," "On Duty," and "Cycle" timers with visual progress indicators.

    Automatic Log Certification: Logic-driven workflow for drivers to certify daily logs, reducing human error.

    Inspection Mode: One-tap activation to share encrypted ELD data via QR Code, USB, or Bluetooth with law enforcement.

2. Advanced Engineering

    Offline-First Strategy: Built to function in "Dead Zones" with robust background synchronization when connectivity is restored.

    Fleet Telematics Integration: Real-time location tracking (GPS) and vehicle health diagnostics (Odometer, Last Service, VIN tracking).

    Security: Read-only Inspection Mode ensures data integrity during roadside checks.

3. User-Centric Design

    Dark Mode Support: Optimized for night-time driving to reduce eye strain.

    Voice Alerts: Audio notifications for status changes and potential violations.

    Quick Actions: Simplified UI for vehicle checks, document management, and trip starts.

🛠 Tech Stack

    Frontend: React / React Native (Cross-platform mobile optimization)

    Backend: Python Flask / FastAPI (High-concurrency data processing)

    Database: PostgreSQL with TimescaleDB (Optimized for time-series log data)

    Authentication: JWT-based secure driver login

    Third-Party APIs: Google Maps API for real-time tracking, FMCSA compliance endpoints.

## 📸 Application Preview

### 1. Seamless Onboarding
The application features a streamlined authentication process with built-in demo credentials for easy stakeholder review.

<p align="center">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927967.jpg?raw=true" width="300" alt="Login Screen">
</p>

### 2. Driver Command Center
The dashboard provides high-visibility HOS (Hours of Service) timers and quick-action toggles for status changes, optimized for in-cab use.

<p align="center">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927968.jpg?raw=true" width="300" alt="Dashboard">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927971.jpg?raw=true" width="300" alt="Driver Profile">
</p>

### 3. Compliance & Logging
Detailed log management allows drivers to certify their status and review trip history with precision, ensuring full FMCSA compliance.

<p align="center">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927969.jpg?raw=true" width="300" alt="Log Entries">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927970.jpg?raw=true" width="300" alt="Inspection Mode">
</p>

### 4. Advanced Configuration
Full support for offline modes, dark theme preferences, and localized tracking settings to enhance the driver experience in remote areas.

<p align="center">
  <img src="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/blob/main/screenshots/1000927972.jpg?raw=true" width="300" alt="Settings Page">
</p>

🚦 Getting Started
Prerequisites

    Node.js v16+

    Python 3.9+

    Docker (Optional for database setup)

Installation

    Clone the repo
    Bash

    git clone https://github.com/yourusername/eld-driver-app.git

    Setup Backend
    Bash

    cd backend
    pip install -r requirements.txt
    python app.py

    Setup Frontend
    Bash

    cd frontend
    npm install
    npm start

👨‍💻 Author

[Your Name] – Quant-Dev / Data Analyst

    Portfolio: [Link to your site]

    LinkedIn: [Link to your profile]

Pro-Tip for the "Harvey Specter" Vibe:

In your repository, make sure you have a folder named /docs that includes a PDF or Markdown file explaining the HOS Calculation Logic. Showing a recruiter that you can translate "14-hour on-duty rules" into clean Python logic is what will get you the "Quant" roles you're looking for.
