# 🌱 AgroGen – Empowering Farmers with AI-Driven, Localized Crop Solutions

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange?style=for-the-badge)
![AWS](https://img.shields.io/badge/AWS-SageMaker-blue?style=for-the-badge&logo=amazonaws)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

> **AgroGen** is an AI-powered agricultural assistant that helps farmers improve crop yield through **real-time weather/soil/market insights**, **machine learning models**, and a **multilingual farmer-friendly dashboard**.

---

## 🚀 Features

- 🔐 **Authentication with Clerk** – Simple and secure onboarding  
- 🗂️ **Farmer Dashboard** – Easy-to-use, multilingual UI with **text + voice** support  
- 📊 **AI Predictions** – ML (Random Forest Regression) deployed on **AWS SageMaker**  
- 🧠 **Gemini Integration** – Personalized yield improvement suggestions  
- 🌦️ **Data Collection via APIs**  
  - Weather (live + historical)  
  - Google Maps (farm location)  
  - Google Search (market prices)  
  - AssemblyAI (speech-to-text)  
  - Google TTS (text-to-speech)  
- 🗄️ **Storage** – Predictions in **Supabase**, voice files in **Firebase**  
- 🌍 **Deployment** – Hosted on **Vercel**, designed for scalability  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), TailwindCSS  
- **Authentication**: [Clerk](https://clerk.com/)  
- **Machine Learning**: AWS SageMaker (Random Forest Regression)  
- **AI Assistance**: Google Gemini API  
- **APIs Integrated**: Weather API, Google Maps API, Google Search API, AssemblyAI, Google TTS  
- **Database**: [Supabase](https://supabase.com/)  
- **File Storage**: Firebase  
- **Deployment**: [Vercel](https://vercel.com/)  

---

## 📊 Model Performance

- **RMSE**: 131.99  
- **Cross-Validation R² Scores**: `0.960, 0.898, 0.997, 0.899, 0.977`  
- **Mean R²**: 0.947 ± 0.04  

---

## 🌍 Impact

- 🌾 Up to **15% yield & income growth** (based on case studies)  
- ⚡ Reduces **10–20% fertilizer/pesticide overuse**  
- 🧑‍🌾 **Accessible for 120M+ smallholder farmers in India**  
- 🗣️ Breaks language barriers with **multilingual voice/chat support**  

---


## ⚙️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Vivek-736/AgroGen.git
cd AgroGen
npm install
