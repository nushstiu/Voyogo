Context General
Trebuie să dezvolți interfața frontend completă pentru aplicația de turism VOYAGO folosind React + Vite + TypeScript + Tailwind CSS.
⚠️ IMPORTANTE:

ZERO PHP - totul va fi implementat în React/TypeScript
Autentificarea este deja implementată și NU trebuie modificată
Design-ul complet este în Figma: https://www.figma.com/community/file/1318696331052014772/vacasky-tour-travel-agency-website-figma-template
Denumirea aplicației: VOYAGO (nu Vacasky)
Am atașat fișiere PHP DOAR pentru referință structurală - vei recrea totul în React


📦 Structura Proiectului React
voyago-frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── PopularDestinations.tsx
│   │   │   ├── PromoSection.tsx
│   │   │   └── FAQSection.tsx
│   │   ├── destinations/
│   │   │   ├── DestinationCard.tsx
│   │   │   └── FilterButtons.tsx
│   │   ├── tours/
│   │   │   └── TourItem.tsx
│   │   └── booking/
│   │       ├── PersonalInfoForm.tsx
│   │       ├── PackageSelector.tsx
│   │       └── BookingForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Destinations.tsx
│   │   ├── Tours.tsx
│   │   └── Booking.tsx
│   ├── types/
│   │   ├── destination.ts
│   │   ├── tour.ts
│   │   └── booking.ts
│   ├── data/
│   │   ├── destinations.json
│   │   ├── tours.json
│   │   └── packages.json
│   └── App.tsx

🎨 STRUCTURA DETALIATĂ A FIECĂREI PAGINI

1️⃣ COMPONENTE COMUNE (Header & Footer)
📌 HEADER COMPONENT
Design Vizual:
[Logo VOYAGO]                    [Destinations] [Tours] [Book] [👤]
Specificații:

Poziție: Fixed top / Absolute peste hero
Background: Transparent peste imagini hero / Alb pe scroll
Logo: Stânga, imagine PNG "voyago.png" (width: 25% pe desktop)
Navigație:

Link-uri: Destinations, Tours, Book
Culoare text: Alb (pe hero) / Gri închis (pe fundal alb)
Font: Semibold, text-xl
Hover: text-cyan-400


Icon profil: Dreapta, FontAwesome fa-user
Responsive: Hamburger menu pe mobile (< 768px)

TypeScript Interface:
typescriptinterface HeaderProps {
transparent?: boolean;
}
```

---

### 📌 **FOOTER COMPONENT**

**Design Vizual:**
```
┌─────────────────────────────────────────────┐
│ [Logo]          [Links]          [Social]  │
│ Destinations, Tours, Book    FB TikTok IG   │
├─────────────────────────────────────────────┤
│ © 2025 Voyago          Privacy | Terms      │
└─────────────────────────────────────────────┘
```

**Specificații:**
- **Background:** bg-gray-800
- **Text:** text-white
- **Layout:** 3 coloane (Logo | Links | Social)
- **Border:** border-t border-gray-700 între secțiuni
- **Social icons:** Facebook, TikTok, Instagram (FontAwesome)
- **Padding:** p-10

---

## 2️⃣ **MAIN PAGE (Home.tsx)**

### 🎯 **SECȚIUNEA 1: HERO SECTION**

**Design Vizual:**
```
┌──────────────────────────────────────────────┐
│        [Imagine fundal full-screen]          │
│                                              │
│     UNFORGETTABLE TRAVEL AWAITS THE         │
│            A D V E N T U R E                 │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ [Destination▼] [Check-in] [Check-out]  │ │
│  │ [Price▼]                    [Search]   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5]   │
└──────────────────────────────────────────────┘
```

**Specificații detaliate:**

**Background:**
- Imagine: Montagne/natură impresionantă
- Height: `h-screen` (100vh)
- Background: `bg-cover bg-center`

**Text Subtitle:**
- Content: "UNFORGETTABLE TRAVEL AWAITS THE"
- Styling: `text-white tracking-[20px]` (spațiere mare între litere)
- Font-size: text-2xl

**Titlu Principal:**
- Content: "ADVENTURE"
- Styling: `text-white text-9xl font-extrabold`
- Center aligned

**Search Form:**
- Background: `bg-white p-10 rounded-lg`
- Width: `max-w-4xl mx-auto`
- Layout: Flexbox cu `gap-2`
- **4 Câmpuri:**
  1. **Dropdown Destination:**
     - Placeholder: "Destination"
     - Width: `w-1/3`
     - Opțiuni: Lista destinații din JSON
  2. **Input Check-in Date:**
     - Placeholder: "Check-in Date"
     - Type: text cu datepicker
     - Width: `w-1/3`
  3. **Input Check-out Date:**
     - Placeholder: "Check-out Date"
     - Width: `w-1/3`
  4. **Dropdown Price:**
     - Opțiuni: "$500-$1000", "$1000-$2000", "$2000-$5000", "$5000-$10000"
- **Buton Search:**
  - Background: `bg-cyan-400 text-white`
  - Padding: `p-3 rounded`
  - Hover: bg-cyan-500

**Partner Logos:**
- Container: `flex justify-center items-center space-x-10 mt-20`
- Fiecare logo: `w-32 h-auto object-contain`
- 5 logo-uri aliniate orizontal

---

### 🎯 **SECȚIUNEA 2: POPULAR DESTINATIONS**

**Design Vizual:**
```
┌──────────────────────────────────────────────┐
│        Destinations (watermark mare)         │
│      POPULAR DESTINATIONS (cyan)             │
│                                              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│  │ Img │ │ Img │ │ Img │ │ Img │           │
│  │ Bali│ │Paris│ │Tokyo│ │Rome │           │
│  │ 12  │ │ 8   │ │ 15  │ │ 10  │           │
│  │ pkg │ │ pkg │ │ pkg │ │ pkg │           │
│  └─────┘ └─────┘ └─────┘ └─────┘           │
│                                              │
│         [Load more destinations]             │
└──────────────────────────────────────────────┘
```

**Specificații:**

**Header:**
- **Watermark text:** 
  - Content: "Destinations"
  - Position: `absolute top-10 left-1/2 transform -translate-x-1/2`
  - Styling: `text-8xl font-bold opacity-5`
- **Subtitle:**
  - Content: "POPULAR DESTINATIONS"
  - Styling: `text-cyan-400 tracking-widest`
  - Position: Peste watermark

**Grid de Destinații:**
- **Layout:** Flexbox wrap, 4 carduri pe rând
- **Card width:** `w-[23%] min-w-[250px]`
- **Styling:** 
  - Border: `border border-gray-200 rounded-2xl`
  - Shadow: `shadow-lg hover:shadow-xl`
  - Padding: `p-3`

**Structura Card:**
```
┌────────────────┐
│                │ <- Imagine (h-[350px])
│     Imagine    │
│                │
├────────────────┤
│ Nume Destinație│ <- text-lg font-semibold
│ 📍 12 packages │ <- text-sm text-gray-600
│              →│ <- Icon chevron (absolute bottom-5 right-5)
└────────────────┘
```

**Buton "Load More":**
- Text: "Load more destinations"
- Styling: `bg-white text-cyan-400 border border-cyan-400 px-6 py-2 rounded-lg`
- Hover: `hover:bg-cyan-400 hover:text-white`
- Funcționalitate: Afișează cardurile ascunse

---

### 🎯 **SECȚIUNEA 3: PROMO SECTION (2 Bannere)**

**Design Vizual:**
```
┌────────────────────┐  ┌──────────────┐
│                    │  │              │
│  Escape            │  │  ADVENTURE   │
│  the paradise      │  │  AWAITS      │
│                    │  │              │
│  [Book now]        │  │  [Book now]  │
└────────────────────┘  └──────────────┘
(50% width)            (33% width)
```

**Specificații:**

**Container:** `flex justify-center space-x-10 my-10`

**Banner 1 (Mai mare):**
- Width: `w-1/2`
- Height: `h-96`
- Background image: Plajă/paradis
- Text overlay:
  - Titlu: "Escape the paradise" (text-4xl font-bold text-white)
  - Subtitle: "Book now and save 20% on your magical trip"
  - Buton: `bg-white text-black px-6 py-2 rounded`

**Banner 2 (Mai mic):**
- Width: `w-1/3`
- Height: `h-96`
- Background: Imagine aventură
- Text centrat:
  - Titlu: "ADVENTURE AWAITS"
  - Subtitle: "Book a tour today, get a FREE excursion!"
  - Buton: `bg-black text-white px-6 py-2 rounded`

---

### 🎯 **SECȚIUNEA 4: FAQ SECTION**

**Design Vizual:**
```
┌─────────────┬──────────────────────────┐
│   BLOG      │ Q: What type of travel..?│
│             │    ▼                     │
│ FREQUENTLY  │ ────────────────────────│
│ ASKED       │ Q: How do I book..?     │
│ QUESTION    │    ▼                     │
│             │ ────────────────────────│
│ What our    │ Q: What is payment..?   │
│ clients...  │    ▼                     │
└─────────────┴──────────────────────────┘
(33% width)      (67% width)
```

**Specificații:**

**Container:** `flex gap-20 my-20 mx-60`

**Coloana Stânga (1/3):**
- Label: "BLOG" (text-cyan-400 tracking-widest)
- Titlu: "FREQUENTLY ASKED QUESTION" (text-6xl font-bold, line breaks)
- Subtitle: "What our clients usually asked about our services and tours"

**Coloana Dreapta (2/3):**
- **Fiecare FAQ Item:**
  - Container: `border rounded-lg p-4`
  - Layout întrebare: `flex justify-between items-center cursor-pointer`
  - Icon: Arrow down (fa-arrow-down) cu `transition-transform`
  - Răspuns: Hidden by default, `mt-2 text-gray-600 text-sm`
  - Click: Toggle răspuns + rotate arrow 180deg

**Întrebări (4 items):**
1. "What type of travel packages does Voyago offer?"
2. "How do I book a trip with Voyago?"
3. "What is the payment process for Voyago?"
4. "How to cancel my booking in Voyago?"

---

### 🎯 **SECȚIUNEA 5: NEWSLETTER SECTION**

**Design Vizual:**
```
┌──────────────────────────────────────────────┐
│    [Imagine fundal cu overlay semi-transp]   │
│                                              │
│         START YOUR ADVENTURE                 │
│                                              │
│    Sign up for our newsletter and receive... │
│                                              │
│  [Email input _______________] [Subscribe]   │
│                                              │
└──────────────────────────────────────────────┘
```

**Specificații:**
- Container: `relative h-[45vh] min-h-[300px]`
- Background: Imagine cu `opacity-50`
- Overlay content: Centrat vertical/orizontal
- Input email: Border bottom, background transparent
- Buton: `bg-black text-white px-6 py-2 rounded`

---

## 3️⃣ **DESTINATIONS PAGE (Destinations.tsx)**

### 🎯 **HERO SECTION**

**Design Vizual:**
```
┌──────────────────────────────────────────────┐
│        [Imagine fundal full-screen]          │
│                                              │
│              Home | Destination              │
│            D E S T I N A T I O N S          │
│                                              │
└──────────────────────────────────────────────┘
```

**Specificații:**
- Background: Imagine natură (înălțime 100vh)
- Breadcrumb: "Home | Destination" (text-white text-xl, centrat)
- Titlu: "DESTINATIONS" (text-9xl font-extrabold text-white)
- Vertical center: `h-3/4 flex flex-col items-center justify-center`

---

### 🎯 **FILTER & SEARCH SECTION**

**Design Vizual:**
```
POPULAR DESTINATIONS                    [Search 🔍]

[All] [Best Seller] [Nature] [City] [Seasonal]
```

**Specificații:**

**Header Row:** `flex justify-between mx-32 mt-16`
- Titlu: "POPULAR DESTINATIONS" (text-4xl font-bold)
- Search: Input cu icon (border-bottom, bg-transparent)

**Filter Buttons:** `flex space-x-4 mx-32 my-8`
- Button activ: `bg-blue-500 text-white px-6 py-2 rounded`
- Button inactiv: `bg-gray-200 text-black px-6 py-2 rounded`
- Categorii: All, Best Seller, Nature, City, Seasonal

---

### 🎯 **GRID DESTINAȚII CU HOVER EFFECT**

**Design Vizual (card normal vs hover):**
```
Normal:                     Hover:
┌────────────────┐         ┌────────────────┐
│                │         │  [Dark overlay]│
│     Imagine    │         │   Bali         │
│                │         │  12 packages   │
│                │   →     │  Description...│
│  Bali          │         │  [View Details]│
│  12 packages   │         │                │
└────────────────┘         └────────────────┘
```

**Specificații:**

**Grid Container:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-32 mb-10`

**Card Structure:**
- Container: `relative h-96 p-3 border border-gray-200 rounded-2xl cursor-pointer bg-cover bg-center group`
- Background image: Destinația

**Default Content (visible normal):**
- Position: `absolute bottom-0 left-0 right-0`
- Background: `bg-gradient-to-t from-black to-transparent`
- Opacity: `transition-opacity duration-300 group-hover:opacity-0`
- Content:
  - Nume: text-6xl font-light text-white
  - Info: packages + price range

**Hover Content (visible on hover):**
- Position: `absolute inset-0`
- Background: `bg-black bg-opacity-50`
- Layout: `flex flex-col items-center justify-center`
- Opacity: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- Content:
  - Nume: text-4xl font-bold
  - Info: packages + price
  - Descriere: text-sm text-center mt-4 px-8
  - Buton: "View Details" (border alb, hover fill alb)

---

## 4️⃣ **TOURS PAGE (Tours.tsx)**

### 🎯 **HERO SECTION**

Similar cu Destinations, dar:
- Titlu: "TOUR PACKAGES" (text-8xl font-bold)
- Breadcrumb: "Home | Tours"

---

### 🎯 **TOURS LIST LAYOUT**

**Design Vizual:**
```
OUR TOUR PACKAGES                       [Search 🔍]

[All] [Best Seller] [Nature] [City] [Seasonal]

┌───────────┬─────────────────────────────────┐
│           │ 📍 Indonesia                    │
│   Imagine │ Bali Adventure Tour             │
│           │ Description of the tour...      │
│           │ ⏰ 5 Days  💲 Start from $1200  │
│           │ [Book now] [Learn more]         │
└───────────┴─────────────────────────────────┘
```

**Specificații:**

**Container:** `container mx-auto px-4 mt-16`

**Tour Item Layout:** `flex flex-col md:flex-row mb-8`

**Structura fiecărui tour:**

**Imagine (33%):**
- Width: `w-full md:w-1/3`
- Styling: `rounded-lg w-full h-64 object-cover`

**Detalii (67%):**
- Width: `w-full md:w-2/3 mt-4 md:mt-0 md:ml-8`
- **Locație:** `text-blue-500` cu icon location-dot
- **Nume:** `text-2xl font-bold`
- **Descriere:** `mt-4` (paragraph)
- **Meta info:** 
  - Duration: Icon clock + "X Days"
  - Price: Icon dollar + "Start from $X"
- **Butoane:**
  - "Book now": `bg-blue-500 text-white px-4 py-2 rounded`
  - "Learn more": `border border-blue-500 text-blue-500 px-4 py-2 rounded ml-4`

**Search Functionality:**
- Real-time filter pe input
- Ascunde tours care nu match search text

---

## 5️⃣ **BOOKING PAGE (Booking.tsx)**

### 🎯 **HERO SECTION**

**Design Vizual:**
```
┌──────────────────────────────────────────────┐
│        [Imagine fundal full-screen]          │
│                                              │
│          Home | Tours | Booking              │
│          B O O K I N G   F O R M            │
│                                              │
└──────────────────────────────────────────────┘
```

**Specificații:**
- Breadcrumb: "Home | Tours | Booking"
- Titlu: "BOOKING FORM" (text-9xl font-extrabold)

---

### 🎯 **PERSONAL IDENTITY FORM**

**Design Vizual:**
```
       PERSONAL IDENTITY

┌─────────────────┬─────────────────┐
│ FIRST NAME *    │ LAST NAME *     │
│ [Mr.▼] [____]   │ [___________]   │
└─────────────────┴─────────────────┘

┌─────────────────┬─────────────────┐
│ EMAIL ADDRESS   │ PHONE NUMBER *  │
│ [___________]   │ [___________]   │
└─────────────────┴─────────────────┘

┌──────────┬──────────┬──────────────┐
│START DATE│ DURATION │ DESTINATION *│
│[D][M][Y] │ [____▼]  │ [_________▼] │
└──────────┴──────────┴──────────────┘
```

**Specificații:**

**Titlu:** `text-3xl font-bold p-5 ml-20 text-center`

**Form Container:** `max-w-6xl mx-auto`

**Row 1 - Personal Info:** `flex gap-4 mb-10`

**First Name (flex-1):**
- Label: "FIRST NAME" + asterisk albastru
- Layout: `flex gap-2`
  - Dropdown gender: `p-4 rounded text-neutral-600 bg-gray-100` (Ms./Mr./None)
  - Input name: `p-4 rounded flex-1 bg-gray-100`

**Last Name (flex-1):**
- Label: "LAST NAME" + asterisk
- Input: `p-4 rounded w-full bg-gray-100`

**Row 2 - Contact:** `flex gap-4 mb-10`
- Email (flex-1): bg-gray-100
- Phone (flex-1): bg-gray-100 + asterisk

**Row 3 - Trip Details:** `flex gap-4 mb-10`

**Start Date (flex-1):**
- Label: "START DATE" + asterisk
- Layout: 3 dropdowns (Day, Month, Year)
  - Styling: `px-9 py-4 bg-gray-100 rounded`

**Duration (flex-1):**
- Dropdown: "1-2 Days", "5-7 Days", "7-14 Days", "14+ Days"

**Destination (flex-1):**
- Dropdown: Listă locații din JSON

---

### 🎯 **PACKAGE SELECTION (Dinamic)**

**Design Vizual (după selectarea destinației):**
```
              PACKAGE

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│             │ │             │ │             │
│  Imagine    │ │  Imagine    │ │  Imagine    │
│             │ │             │ │             │
│ Package 1   │ │ Package 2   │ │ Package 3   │
│ 📍 Bali     │ │ 📍 Bali     │ │ 📍 Bali     │
│ 💲 $1200    │ │ 💲 $1500    │ │ 💲 $2000    │
│         ☑️  │ │             │ │         ☑️  │
└─────────────┘ └─────────────┘ └─────────────┘
```

**Specificații:**

**Trigger:** On change destination dropdown

**Container:** `id="packages" mt-10`

**Titlu:** "PACKAGE" (text-3xl font-bold text-center mb-6)

**Grid:** `flex justify-center gap-8 mb-8`

**Structura Package Card:**
- Dimensions: `h-96 w-[28.125rem]`
- Background: Imagine package (bg-cover bg-center)
- Position: `relative overflow-hidden cursor-pointer`
- **Gradient overlay:** `absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`

**Content (absolute bottom-5 left-5):**
- Nume package: text-2xl font-medium text-white
- Info: location + price (text-sm font-light)

**Checkbox (absolute top-5 right-5):**
- Icon: Unchecked default, checked on click
- Salvare în localStorage: `JSON.parse(localStorage.getItem('checked'))`

---

### 🎯 **TERMS & SUBMIT SECTION**

**Design Vizual:**
```
┌────────────────────────────────┬──────────┐
│ ☐ Get me a travel insurance... │          │
│ ☐ I have read all terms...     │[Book now]│
└────────────────────────────────┴──────────┘
Specificații:
Container: flex justify-center gap-[500px] mt-8
Terms (stânga):

Checkbox 1: "Get me a travel insurance..." (link albastru)
Checkbox 2: "I have read all terms and conditions..." (linkuri albastre)
Styling: flex flex-col gap-[10px] text-gray-700

Submit Button (dreapta):

Text: "Book now"
Styling: h-[65px] w-[200px] bg-blue-500 text-white rounded-lg hover:bg-blue-600
Type: submit


📊 STRUCTURI DE DATE (TypeScript)
Destination Interface:
typescriptinterface Destination {
id: string;
name: string;
image: string;
packages: number;
priceRange: string;
description: string;
category: 'nature' | 'city' | 'seasonal' | 'best-seller';
link: string;
}
Tour Interface:
typescriptinterface Tour {
id: string;
name: string;
location: string;
img: string;
description: string;
days: number;
price: number;
category: string;
link: string;
}
Package Interface:
typescriptinterface Package {
id: string;
name: string;
location: string;
img: string;
price: number;
fav: string; // icon path
}
Booking Interface:
typescriptinterface BookingFormData {
gender: 'Ms.' | 'Mr.' | 'None';
firstName: string;
lastName: string;
email: string;
phone: string;
startDate: {
day: number;
month: number;
year: number;
};
duration: string;
destination: string;
selectedPackages: string[]; // array of package IDs
insurance: boolean;
termsAccepted: boolean;
}

🎨 PALETTE DE CULORI
typescriptconst colors = {
primary: {
cyan: '#22D3EE', // cyan-400
blue: '#3B82F6', // blue-500
},
neutral: {
gray100: '#F3F4F6',
gray200: '#E5E7EB',
gray600: '#4B5563',
gray700: '#374151',
gray800: '#1F2937',
},
white: '#FFFFFF',
black: '#000000',
};

🛠️ FUNCȚIONALITĂȚI CHEIE
1. Search/Filter Functionality:

Real-time filtering pe input change
Filter by category (buttons)
Case-insensitive search

2. Date Picker:

Library: react-datepicker sau custom component
Format: YYYY-MM-DD
Validation: Check-out > Check-in

3. Package Selection:

Multi-select cu checkbox
Local storage persistence
Visual feedback (checkmark icon toggle)

4. Form Validation:

Required fields marked cu asterisk
Email format validation
Phone number validation
Terms acceptance required

5. Responsive Design:

Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
Mobile: Hamburger menu, stacked layouts
Desktop: Multi-column layouts


📝 INSTRUCȚIUNI FINALE
Creează aplicația respectând:

✅ Componentizare: Componente reutilizabile, separare logică
✅ TypeScript: Tipare stricte pentru toate datele
✅ Tailwind CSS: DOAR clase Tailwind (no CSS custom)
✅ React Router: Navigație între pagini
✅ State Management: useState, useContext pentru state global
✅ Performance: Lazy loading pentru imagini, code splitting
✅ Accessibility: ARIA labels, keyboard navigation
✅ Design fidel: Respectă exact specificațiile vizuale din acest prompt și Figma

Numele aplicației în tot codul: VOYAGO (nu Vacasky)