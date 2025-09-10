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
```

### 📋 Environment Setup

Create a `.env.local` file in the root directory: 'Add the necessary environment variables'

### 🏃‍♂️ Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 🧪 Testing

Run the test suite:

```bash
npm test
```

### 🚀 Deploy

The easiest way to deploy is using [Vercel](https://vercel.com/new):

```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
AgroGen/
├── app/                    # Next.js app directory
├── components/             # Reusable UI components
├── lib/                    # Utility functions & configurations
├── public/                 # Static assets
├── styles/                 # CSS/TailwindCSS files
└── types/                  # TypeScript type definitions
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


## 📞 Contact

**Vivek** - [@Vivek-736](https://github.com/Vivek-736)

Project Link: [https://github.com/Vivek-736/AgroGen](https://github.com/Vivek-736/AgroGen)

---

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for weather data
- [Google Cloud Platform](https://cloud.google.com/) for AI services
- [AWS SageMaker](https://aws.amazon.com/sagemaker/) for ML model deployment
- [Supabase](https://supabase.com/) for database infrastructure
- [Vercel](https://vercel.com/) for seamless deployment
