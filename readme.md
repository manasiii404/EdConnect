# 🎓 **EdConnect**

> A platform built to bridge educational gaps by connecting Zilla Parishad schools with passionate expert volunteers.

---

## 📘 **About the Project**

**EdConnect** is designed to revolutionize learning in underserved communities. Schools can upload curriculum topics they need assistance with, and verified volunteers can register to teach via live or recorded sessions. The platform ensures seamless tracking of volunteer contributions while maintaining student engagement and learning quality.

### 🔑 Key Features:
- 📅 Session tracking
- 💬 Smart feedback system
- 🤖 AI-powered volunteer matching
- 🏆 Gamification modules
- 🌐 Multi-language support
- ⏰ Automated reminders

---

## 🧰 **Tech Stack**

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/865bf445-b764-48b0-9a75-916928ea1ddf" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/9708f051-0417-451d-9dd2-58cd4cb69011" width="300"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/511f564d-d234-4eaa-a34b-0f3bc577eb6a" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/e1fd3d6d-9b5d-424a-903b-1024019d2e35" width="300"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0ff9af38-bafd-496c-b0dd-4fd032dc5bb2" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/b738598f-88c4-422d-9c45-9a9f3e0ec844" width="300"/></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="https://github.com/user-attachments/assets/bbc5772b-edd4-48ac-8d50-3093d35e9c81" width="300"/></td>
  </tr>
</table>

---

## 🚀 **Extensive Features**

<img src="https://github.com/user-attachments/assets/c52de8f8-f888-4709-8b6c-11f77a00ca4b" width="700"/>

---

### 🎥 **Live Classes**

Interactive sessions with automatic recording capabilities for future use. :point_up:

<img src="https://github.com/user-attachments/assets/fd015bcb-3eab-4cc7-946a-226d0d48f971" width="700"/>

---

### 🤖 **Chatbot**

**CHATBOT** – A smart, conversational AI assistant that answers all your questions based on any uploaded document. :point_up:

<img src="https://github.com/user-attachments/assets/be53f0b4-28e3-46fb-bba7-eebc0dcada93" width="700"/>

---

### 📊 **Smart Feedback System**

**Smart Feedback System** – Uses sentiment analysis to automatically generate accurate and unbiased ratings for volunteers based on real student feedback. :point_up:

---

## ⚙️ **Setup & Installation**

### 🛠️ **Prerequisites**
- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)
- Python (v3.8 or later)

---

### 📦 **Installation Steps**

#### 1️⃣ Clone the Repository
git clone https://github.com/yourusername/edconnect.git
cd edconnect

#### 2️⃣ Install Backend Dependencies

cd backend
npm install
#### 3️⃣ Install Python Dependencies for AI Features

cd scripts
pip install -r requirements.txt
#### 4️⃣ Install Frontend Dependencies


cd ../frontend
npm install
#### 5️⃣ Set Up PostgreSQL Database

#### Create a PostgreSQL database named 'edconnect'
createdb edconnect
#### 6️⃣ Set Up Environment Variables
Create a .env file in the backend directory with the following values:
env

####  Database Configuration
DB_NAME=edconnect
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

####  JWT Secret
JWT_SECRET=your_jwt_secret_key

####  OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

####  HuggingFace API Key
HUGGINGFACE_API_KEY=your_huggingface_token
HF_TOKEN=your_huggingface_token
▶️ Run the Application
Start the Backend Server


cd backend
node server.js
Start the Frontend Development Server


cd frontend
npm start
#### 🌐 Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:5000



t
