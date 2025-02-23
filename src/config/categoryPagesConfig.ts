
interface Feature {
  title: string;
  description: string;
}

export interface CategoryPageConfig {
  title: string;
  description: string;
  bannerImage: string;
  features: Feature[];
  categoryType: string;
  parentCategory?: string;
}

export const categoryPagesConfig: Record<string, CategoryPageConfig> = {
  // Main categories
  "vetements-cuisine": {
    title: "Vêtements de Cuisine",
    description: "Des vêtements professionnels pour tous les métiers de la cuisine",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Qualité Premium",
        description: "Matériaux durables et confortables pour un usage professionnel intensif"
      },
      {
        title: "Personnalisation",
        description: "Service de personnalisation disponible pour tous nos produits"
      },
      {
        title: "Livraison Rapide",
        description: "Expédition sous 24/48h pour toute la France métropolitaine"
      }
    ],
    categoryType: "vetements-cuisine"
  },
  "vetements-boulanger": {
    title: "Vêtements Boulanger & Pâtissier",
    description: "Tenues professionnelles pour boulangers et pâtissiers",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Confort Optimal",
        description: "Tissus respirants adaptés aux environnements chauds"
      },
      {
        title: "Hygiène Garantie",
        description: "Matériaux faciles à nettoyer et conformes aux normes HACCP"
      },
      {
        title: "Sur-Mesure",
        description: "Possibilité d'ajustements selon vos besoins"
      }
    ],
    categoryType: "vetements-boulanger"
  },
  "vetements-hotellerie": {
    title: "Vêtements Service & Hôtellerie",
    description: "Tenues élégantes pour le service et l'hôtellerie",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Élégance",
        description: "Design professionnel et moderne"
      },
      {
        title: "Confort",
        description: "Matériaux légers et agréables à porter"
      },
      {
        title: "Durabilité",
        description: "Résistance aux lavages fréquents"
      }
    ],
    categoryType: "vetements-hotellerie"
  },
  "vetements-travail": {
    title: "Vêtements de Travail",
    description: "Vêtements professionnels adaptés à tous les métiers",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Protection",
        description: "Conformes aux normes de sécurité"
      },
      {
        title: "Résistance",
        description: "Matériaux renforcés pour une durée de vie maximale"
      },
      {
        title: "Praticité",
        description: "Poches et rangements fonctionnels"
      }
    ],
    categoryType: "vetements-travail"
  },
  "chaussures": {
    title: "Chaussures de Sécurité",
    description: "Chaussures professionnelles pour votre sécurité",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Sécurité",
        description: "Protection optimale des pieds"
      },
      {
        title: "Confort",
        description: "Semelles ergonomiques pour un port prolongé"
      },
      {
        title: "Durabilité",
        description: "Matériaux résistants à l'usure"
      }
    ],
    categoryType: "chaussures"
  },
  "produits-marketing": {
    title: "Produits Marketing",
    description: "Solutions marketing personnalisées pour votre entreprise",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Personnalisation",
        description: "Options de personnalisation étendues"
      },
      {
        title: "Qualité",
        description: "Matériaux premium pour une finition parfaite"
      },
      {
        title: "Service",
        description: "Accompagnement personnalisé pour vos projets"
      }
    ],
    categoryType: "produits-marketing"
  },

  // Sub-categories
  "produits-marketing/notebooks": {
    title: "Carnets & Notebooks Personnalisés",
    description: "Carnets professionnels personnalisables pour votre entreprise",
    bannerImage: "/lovable-uploads/98a68746-eff6-4ad1-b7d9-7fed922db14f.png",
    features: [
      {
        title: "Qualité Premium",
        description: "Papier de haute qualité"
      },
      {
        title: "Personnalisation",
        description: "Multiples options de personnalisation"
      },
      {
        title: "Finitions",
        description: "Choix de reliures et couvertures"
      }
    ],
    categoryType: "produits-marketing",
    parentCategory: "Produits Marketing"
  },
  // Add more subcategories as needed...
};
