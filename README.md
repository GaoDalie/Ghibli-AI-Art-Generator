# 🎨 Ghibli AI Art Generator

Transform your photos into stunning Studio Ghibli-style artwork using AI! Upload any image and watch it come to life with the magical aesthetic of Studio Ghibli films.

## ✨ Features

- **AI-Powered Transformation**: Convert photos to Ghibli-style art using Replicate AI
- **Interactive Preview**: Before/after slider to compare original and transformed images  
- **User Authentication**: Secure sign-in/sign-up with Clerk
- **Credit System**: Manage usage with Stripe integration
- **Drag & Drop Upload**: Easy image uploading with drag-and-drop support
- **Multiple Aspect Ratios**: Choose from 1:1, 2:3, or 3:2 formats
- **Custom Prompts**: Add your own creative ideas to influence the transformation

## 🎬 Demo
[Demo video placeholder - Add your demo video here]

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **AI Processing**: Replicate AI
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Accounts for:
  - Clerk (Authentication)
  - Replicate (AI API)
  - Stripe (Payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ghibli-ai-generator.git
   cd ghibli-ai-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here

   # Clerk URLs (Optional customization)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/generate
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/generate

   # Replicate AI
   REPLICATE_API_TOKEN=r8_your_token_here

   # Stripe Payment Processing
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account or log in
2. **Upload Image**: Drag and drop or click to upload your photo
3. **Customize**: Choose aspect ratio and add custom prompts (optional)
4. **Generate**: Click "Generate Ghibli Image" to transform your photo
5. **Download**: Save your transformed artwork

## 📁 Project Structure
```
├── .next/                     # Next.js build output
├── app/                       # Next.js 14 App Router
│   ├── api/
│   │   └── generate-image/    # AI image generation endpoint
│   ├── generate/              # Main generator page
│   ├── sign-in/              # Authentication pages
│   ├── sign-up/
│   ├── dashboard/            # User dashboard
│   └── page.tsx              # Homepage
├── components/               # Reusable React components
├── node_modules/            # Project dependencies
├── public/                  # Static assets (images, icons)
├── src/                     # Additional source files
├── .env.local              # Environment variables (API keys)
├── .gitignore              # Git ignore rules
├── eslint.config.mjs       # ESLint configuration
├── middleware.js           # Clerk authentication middleware
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## 👋 Get in Touch

Connect with us on social media:

- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **Medium**: [Your Medium Profile](https://medium.com/@yourprofile)
- **YouTube**: [Your YouTube Channel](https://youtube.com/@yourchannel)
- **Twitter**: [Your Twitter Profile](https://twitter.com/yourhandle)

## ⭐ Support Us

If you enjoy our project, we'd truly appreciate your support! Simply click the  ⭐ **Star** button on our [GitHub](https://github.com/yourusername/ghibli-ai-generator)! every star helps us grow and keeps the project going. Thank you!

---

Made with ❤️ and ✨ Gao Dalie (高達烈)