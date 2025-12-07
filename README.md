# Ümit Köprüsü (Bridge of Hope) - Social Responsibility Platform

A high-fidelity web application connecting children in care institutions with volunteers who provide support in education, psychology, and other developmental areas, powered by AI safety features.

## 🎯 Project Overview

**Ümit Köprüsü** (Bridge of Hope) is a platform that connects children in care institutions (çocuk esirgeme kurumu) with volunteer mentors who provide support across multiple areas including education, psychology, life skills, and emotional development. The platform uses AI to monitor conversations for safety and stress levels, ensuring a secure and supportive environment.

**Tagline:** "Her Çocuk Bir Umut, Her Gönüllü Bir Köprü" (Every Child is Hope, Every Volunteer is a Bridge)

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Hooks (useState, useMemo)

## 🎨 Design System

- **Theme:** Trustworthy, calming, and hopeful
- **Colors:**
  - Soft Blues (Trust) - `trust-*`
  - Warm Oranges (Energy) - `energy-*`
  - Gentle Greens (Safety) - `safety-*`
- **Typography:** Inter (Google Fonts)
- **UI Effects:** Glassmorphism with backdrop blur

## 📁 Project Structure

```
umit-koprusu/
├── app/
│   ├── admin/          # Admin dashboard with alert system
│   ├── child/          # Child interface (gamified)
│   ├── login/          # Login page
│   ├── volunteer/      # Volunteer dashboard (main feature)
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── AICoPilot.tsx   # AI analysis panel
│   ├── AdminAlertModal.tsx  # Critical alert modal
│   ├── ChatMessage.tsx      # Message component
│   ├── ChildrenList.tsx     # Sidebar with children list
│   └── Navbar.tsx           # Navigation bar
├── data/
│   └── mockData.ts     # Mock conversation and AI data
└── ...
```

## 🎯 Key Features

### 1. Landing Page
- Hero section with tagline: "Her Çocuk Bir Umut, Her Gönüllü Bir Köprü"
- Feature grid (Multi-Area Support, AI Shield, Safe Space)
- Call-to-action buttons for volunteers and children

### 2. Volunteer Dashboard (Main Feature)
- **3-Column Layout:**
  - Left: List of assigned children from care institutions
  - Center: Chat interface for educational/psychological support
  - Right: AI Co-Pilot panel with:
    - Real-time stress level graph
    - AI suggestions for effective support
    - Safety status indicator
- Real-time toxicity check indicator
- Message input with send functionality
- Support areas: Education, Psychology, Life Skills, Emotional Development

### 3. Child Interface
- Gamified, colorful design
- Chat interface with volunteer mentor
- Panic button ("Rahatsız Hissettim")
- Avatar system (Superhero characters)

### 4. Admin Dashboard
- System statistics
- Critical alert simulation
- Alert modal for intervention

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages & Routes

- `/` - Landing page
- `/login` - Login page (demo - no authentication)
- `/volunteer` - Volunteer dashboard (main feature)
- `/child` - Child interface
- `/admin` - Admin dashboard with alert system

## 🎭 Demo Usage

This is a **demo application** for hackathon presentation. All data is mocked:

1. **Landing Page:** Click "Gönüllü Ol" or "Giriş Yap"
2. **Login:** Select a role (Volunteer, Child, or Admin)
3. **Volunteer Dashboard:** 
   - View conversation with "Can"
   - See AI analysis in the right panel
   - Stress graph updates based on conversation
4. **Child Interface:** 
   - View chat from child's perspective
   - Test panic button
5. **Admin Dashboard:** 
   - Click "Uyarıyı Tetikle" to see alert modal

## 🎨 Design Highlights

- **Glassmorphism:** Translucent panels with backdrop blur
- **Soft Shadows:** Subtle depth and elevation
- **Rounded Corners:** Modern, friendly appearance
- **Gradient Backgrounds:** Calming color transitions
- **Responsive Design:** Works on mobile, tablet, and desktop

## 📊 Mock Data

The application uses mock data in `data/mockData.ts`:
- Conversation between volunteer "Deniz" and child "Can"
- AI analysis data with stress levels and suggestions
- Multiple children in the volunteer's list

## 🔒 Safety Features (Demo)

- Real-time toxicity check indicator
- Stress level monitoring with visual graph
- AI-powered suggestions for volunteers
- Panic button for children
- Admin alert system for critical situations

## 📝 Notes

- This is a **demo/MVP** for hackathon presentation
- No real backend or authentication
- All AI features are simulated with mock data
- Designed to look like a production-ready application

## 🎯 Hackathon Presentation Tips

1. **Start with Landing Page** - Show the mission
2. **Focus on Volunteer Dashboard** - This is the main feature
3. **Demonstrate AI Co-Pilot** - Show stress graph and suggestions
4. **Show Child Interface** - Demonstrate user experience
5. **Trigger Admin Alert** - Show safety intervention system

## 📄 License

This project is created for hackathon purposes.

---

**Built with ❤️ for social responsibility**


