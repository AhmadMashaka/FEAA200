# 🐟 Fish Species Explorer

A comprehensive web application for exploring global fish species, their conservation status, population trends, and geographic distribution. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Functionality

- **Species Database**: Browse detailed information about 45+ fish species
- **Search & Filter**: Search by name, filter by country, conservation status, or view only endangered species
- **Sorting Options**: Sort species by population, alphabetical order, or conservation status
- **Species Details**: Comprehensive detail pages with:
  - Population estimates and trends
  - Geographic distribution
  - Conservation status (IUCN classification)
  - No-fishing zones
  - Scientific information
  - Sources and references
  - Related species recommendations

### Pages

1. **Home Page**: Main species browser with search, filters, and grid view
2. **Species Detail Page**: Detailed information about individual species
3. **Countries Page**: Filter and view species by country
4. **Endangered Species Page**: Dedicated page for species at risk
5. **Sustainable Recipes Page**: Browse authentic recipes using non-endangered fish species
6. **Species Recipes Page**: Country-specific recipes for each sustainable species
7. **About Page**: Information about the application and data sources

### Sustainable Recipes Feature

- **Recipe Database**: 40+ authentic recipes from around the world
- **Sustainable Cooking**: Only featuring non-endangered species
- **Country-Specific Recipes**: Recipes from Lebanon, Japan, Spain, Greece, Portugal, and more
- **Detailed Instructions**: Step-by-step cooking instructions, ingredients, and cultural background
- **Filtering Options**: Search by recipe name, fish species, cuisine, difficulty, or country
- **Integration**: Direct links from species detail pages to their recipes

### Design Features

- Premium, luxury Apple-style UI with glassmorphism effects
- Deep navy gradient backgrounds with teal accents
- Soft shadows, glow effects, and rounded corners
- Framer Motion animations (fade, slide, scale-up hover)
- Fully responsive design (mobile, tablet, desktop)
- Fast and performant
- Accessible navigation
- Status badges with color coding

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd fish-species-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fish-species-explorer/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout with navigation
│   ├── globals.css          # Global styles
│   ├── not-found.tsx        # 404 page
│   ├── about/               # About page
│   ├── countries/           # Countries filter page
│   ├── endangered/          # Endangered species page
│   ├── recipes/             # Sustainable recipes pages
│   │   ├── page.tsx         # Recipes browser
│   │   └── [speciesId]/     # Species-specific recipes
│   └── species/[id]/        # Species detail page
├── components/              # React components
│   ├── Navigation.tsx       # Main navigation bar
│   ├── SpeciesCard.tsx     # Species card component
│   ├── RecipeCard.tsx      # Recipe card component
│   └── StatusBadge.tsx     # Conservation status badge
├── data/                    # Data files
│   ├── species.json         # Fish species dataset (45+ species)
│   └── recipes.json         # Recipe dataset (40+ recipes)
├── lib/                     # Utility functions
│   ├── data.ts              # Species data fetching and filtering
│   └── recipes.ts           # Recipe data fetching and filtering
├── types/                   # TypeScript types
│   ├── species.ts           # Species type definitions
│   └── recipes.ts           # Recipe type definitions
└── public/                  # Static assets
```

## 🗂️ Data Structure

The application uses a JSON dataset (`data/species.json`) with the following structure:

```json
{
  "species": [
    {
      "id": "string",
      "name": "string",
      "scientificName": "string",
      "status": "ConservationStatus",
      "population": number,
      "populationTrend": "Increasing | Decreasing | Stable",
      "countries": ["string"],
      "noFishingZones": ["string"],
      "image": "string (URL)",
      "description": "string",
      "sources": ["string (URL)"],
      "habitat": "string",
      "maxLength": "string",
      "maxWeight": "string"
    }
  ]
}
```

## 🎨 Conservation Status Categories

- **Critically Endangered**: Extremely high risk of extinction
- **Endangered**: Very high risk of extinction
- **Vulnerable**: High risk of extinction
- **Near Threatened**: Close to qualifying for threatened status
- **Least Concern**: Widespread and abundant
- **Stable**: Population is stable

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build

3. **Deploy:**
   - Click "Deploy"
   - Your site will be live in minutes!

### Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder, or
   - Connect your GitHub repository for continuous deployment

### Environment Variables

No environment variables are required for basic functionality. The application uses static JSON data.

## 🛠️ Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework with custom glassmorphism styles
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library
- **React 19**: UI library

## 📊 Data Sources

The application references data from:
- International Union for Conservation of Nature (IUCN)
- Food and Agriculture Organization (FAO)
- FishBase

**Note**: This is a sample application with simulated data for educational purposes. For accurate, real-time conservation data, please refer to official sources.

## 🎯 Future Enhancements

Potential features to add:
- Interactive world map for country selection
- Map visualization of no-fishing zones
- Export recipes as PDF
- Bookmark/favorite species and recipes
- User accounts and saved collections
- Real-time conservation data from APIs
- Recipe ratings and reviews
- Nutritional information for recipes
- Shopping list generator for recipes

## 📝 License

This project was created for educational purposes as part of a FEAA course.

## 🤝 Contributing

This is a course project. For suggestions or improvements, please refer to the project documentation.

## 📧 Support

For questions or issues, please refer to the project documentation or contact the course instructor.

---

**Built with ❤️ for marine conservation awareness**
