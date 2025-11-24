import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpeciesById, getRelatedSpecies, getAllSpecies } from "@/lib/data";
import { getRecipesBySpeciesId } from "@/lib/recipes";
import StatusBadge from "@/components/StatusBadge";
import SpeciesCard from "@/components/SpeciesCard";
import { ArrowLeft, TrendingDown, TrendingUp, Minus, Globe, Shield, ExternalLink, UtensilsCrossed } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
  export async function generateStaticParams() {
  const species = getAllSpecies();
  return species.map((s) => ({
    id: s.id,
  }));
}
}

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { id } = await params;
  const species = getSpeciesById(id);

  if (!species) {
    notFound();
  }

  const relatedSpecies = getRelatedSpecies(species, 3);
  const recipes = getRecipesBySpeciesId(id);
  const isEndangered = species.status === "Endangered" || species.status === "Critically Endangered";

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Decreasing":
        return "text-red-400";
      case "Increasing":
        return "text-green-400";
      default:
        return "text-teal-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Decreasing":
        return <TrendingDown size={20} />;
      case "Increasing":
        return <TrendingUp size={20} />;
      default:
        return <Minus size={20} />;
    }
  };

  // Generate unique gradient based on species ID
  const gradients = [
    "from-teal-500/40 via-blue-600/30 to-navy/50",
    "from-cyan-500/40 via-teal-600/30 to-blue-700/50",
    "from-blue-500/40 via-indigo-600/30 to-purple-700/50",
    "from-teal-400/40 via-cyan-600/30 to-blue-800/50",
    "from-indigo-500/40 via-blue-600/30 to-teal-700/50",
    "from-cyan-400/40 via-teal-500/30 to-blue-900/50",
  ];
  const gradientIndex = parseInt(species.id) % gradients.length;
  const selectedGradient = gradients[gradientIndex];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to all species</span>
        </Link>

        {/* Hero Banner - Single column, no image */}
        <div className={`glass-strong rounded-3xl shadow-2xl overflow-hidden mb-10 border border-white/20 bg-gradient-to-br ${selectedGradient} relative`}>
          <div className="p-10">
            {/* Status badge - top right */}
            <div className="absolute top-6 right-6">
              <StatusBadge status={species.status} size="lg" />
            </div>

            {/* Header Section */}
            <div className="mb-8 pr-32">
              <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                {species.name}
              </h1>
              <p className="text-2xl text-teal-300 italic font-light">
                {species.scientificName}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                  Population
                </h3>
                <div className="flex items-baseline space-x-3">
                  <p className="text-4xl font-bold text-white">
                    {species.population.toLocaleString()}
                  </p>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getTrendColor(species.populationTrend).replace('text-', 'bg-').replace('-400', '-500/20')} ${getTrendColor(species.populationTrend)}`}>
                    {getTrendIcon(species.populationTrend)}
                    <span className="text-sm font-semibold">
                      {species.populationTrend}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                  Max Length
                </h3>
                <p className="text-2xl font-bold text-white">
                  {species.maxLength}
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                  Max Weight
                </h3>
                <p className="text-2xl font-bold text-white">
                  {species.maxWeight}
                </p>
              </div>
            </div>

            {/* Habitat */}
            <div className="mt-6 glass rounded-2xl p-5 border border-white/10">
              <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                Habitat
              </h3>
              <p className="text-lg text-white font-medium">{species.habitat}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Description</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">{species.description}</p>
        </div>

        {/* Sustainable Recipes Section */}
        {!isEndangered && recipes.length > 0 && (
          <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-teal-400/30 bg-gradient-to-br from-teal-500/20 via-blue-500/10 to-transparent">
            <div className="flex items-center space-x-4 mb-6">
              <UtensilsCrossed className="text-teal-400" size={32} />
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Sustainable Recipes
                </h2>
                <p className="text-teal-200 mt-2">
                  This species is sustainable to cook and eat! Explore {recipes.length} authentic {recipes.length === 1 ? "recipe" : "recipes"} from around the world.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Total Recipes</p>
                <p className="text-2xl font-bold text-teal-300">{recipes.length}</p>
              </div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Countries</p>
                <p className="text-2xl font-bold text-teal-300">{new Set(recipes.map(r => r.country)).size}</p>
              </div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Cuisines</p>
                <p className="text-2xl font-bold text-teal-300">{new Set(recipes.map(r => r.cuisine)).size}</p>
              </div>
            </div>

            <Link href={`/recipes/${id}`}>
              <button className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center space-x-2">
                <UtensilsCrossed size={20} />
                <span>View All Recipes for {species.name}</span>
                <span className="text-teal-100">→</span>
              </button>
            </Link>
          </div>
        )}

        {/* Countries Distribution */}
        <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="text-teal-400" size={28} />
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Geographic Distribution
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {species.countries.map((country) => (
              <span
                key={country}
                className="px-5 py-2.5 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold border border-teal-400/30 backdrop-blur-sm"
              >
                {country}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            Found in <span className="text-teal-400 font-semibold">{species.countries.length}</span> {species.countries.length === 1 ? "country" : "countries"}
          </p>
        </div>

        {/* No-Fishing Zones */}
        {species.noFishingZones.length > 0 && (
          <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="text-green-400" size={28} />
              <h2 className="text-3xl font-bold text-white tracking-tight">
                No-Fishing Zones
              </h2>
            </div>
            <div className="space-y-3">
              {species.noFishingZones.map((zone) => (
                <div
                  key={zone}
                  className="flex items-center p-5 bg-green-500/10 border border-green-400/30 rounded-2xl backdrop-blur-sm"
                >
                  <span className="text-2xl mr-4">🛡️</span>
                  <span className="text-white font-semibold text-lg">{zone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
            Sources & References
          </h2>
          <ul className="space-y-3">
            {species.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors group"
                >
                  <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="font-medium">{source}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
              Related Species
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSpecies.map((related, index) => (
                <SpeciesCard key={related.id} species={related} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
