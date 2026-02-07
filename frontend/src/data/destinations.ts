export interface Destination {
    id: string;
    name: string;
    packages: number;
    image: string;
    priceRange: string;
    description: string;
    category: "all" | "best-seller" | "nature" | "city" | "seasonal";
    /*link: string;*/
}

export const destinations: Destination[] = [
    {
        id: "1",
        name: "Indonesia",
        packages: 20,
        image: "indonesia",
        priceRange: "$500 - $2,000",
        description: "Discover the enchanting beauty of Indonesia, from Bali's temples to Komodo's dragons. A tropical paradise with diverse culture and stunning landscapes.",
        category: "best-seller",
    },
    {
        id: "2",
        name: "Japan",
        packages: 20,
        image: "japan",
        priceRange: "$1,000 - $5,000",
        description: "Experience the perfect blend of ancient traditions and modern innovation. From cherry blossoms to neon-lit cities, Japan offers unforgettable adventures.",
        category: "city",
    },
    {
        id: "3",
        name: "China",
        packages: 20,
        image: "china",
        priceRange: "$800 - $3,000",
        description: "Walk the Great Wall, explore the Forbidden City, and cruise the Li River. China's vast landscapes and rich history await your exploration.",
        category: "nature",
    },
    {
        id: "4",
        name: "Philippines",
        packages: 20,
        image: "philippines",
        priceRange: "$400 - $1,500",
        description: "With over 7,000 islands, the Philippines offers pristine beaches, crystal-clear waters, and warm hospitality that will make you want to stay forever.",
        category: "best-seller",
    },
    {
        id: "5",
        name: "Thailand",
        packages: 15,
        image: "indonesia",
        priceRange: "$300 - $1,200",
        description: "From bustling Bangkok to serene Chiang Mai temples and idyllic southern islands, Thailand is the Land of Smiles for every traveler.",
        category: "seasonal",
    },
    {
        id: "6",
        name: "Vietnam",
        packages: 12,
        image: "china",
        priceRange: "$350 - $1,000",
        description: "Cruise through Ha Long Bay, explore vibrant Ho Chi Minh City, and savor world-renowned street food in this captivating Southeast Asian gem.",
        category: "nature",
    },
];
