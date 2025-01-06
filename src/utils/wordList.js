// Difficulty levels for words
export const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
};

// Word categories with their respective single words and difficulties
export const wordCategories = {
    animals: {
        easy: ['cat', 'dog', 'fish', 'bird', 'pig', 'cow', 'duck', 'frog', 'ant', 'hen', 'mouse', 'bee'],
        medium: ['lion', 'bear', 'horse', 'sheep', 'fox', 'deer', 'monkey', 'rabbit', 'goat', 'wolf', 'snake', 'turtle'],
        hard: ['zebra', 'penguin', 'camel', 'hippo', 'rhino', 'panda', 'squirrel', 'owl'],
        expert: ['octopus', 'snail', 'parrot', 'crab', 'bat', 'peacock', 'lobster', 'jellyfish']
    },
    insects: {
        easy: ['ant', 'bee', 'fly', 'bug', 'worm', 'moth', 'spider'],
        medium: ['ladybug', 'beetle', 'caterpillar', 'grasshopper', 'mosquito', 'wasp'],
        hard: ['dragonfly', 'centipede', 'mantis', 'termite', 'cricket'],
        expert: ['scorpion', 'cockroach', 'tick', 'prayingmantis', 'cicada']
    },
    marine_life: {
        easy: ['fish', 'shark', 'crab', 'starfish', 'whale', 'shell', 'clam', 'shrimp'],
        medium: ['dolphin', 'octopus', 'turtle', 'seahorse', 'squid', 'lobster', 'seal'],
        hard: ['jellyfish', 'ray', 'coral', 'urchin', 'eel', 'pufferfish'],
        expert: ['swordfish', 'anemone', 'plankton', 'barracuda', 'seasnake', 'oyster']
    },
    objects: {
        easy: ['chair', 'table', 'book', 'door', 'cup', 'ball', 'pen', 'box', 'hat', 'key', 'shoe', 'lamp'],
        medium: ['clock', 'phone', 'mirror', 'bag', 'glasses', 'wallet', 'comb', 'fork', 'spoon', 'knife'],
        hard: ['guitar', 'umbrella', 'camera', 'remote', 'vase', 'plate', 'candle', 'bowl'],
        expert: ['compass', 'laptop', 'headphones', 'stapler', 'notebook', 'broom', 'pencil', 'eraser']
    },
    furniture: {
        easy: ['chair', 'table', 'bed', 'desk', 'sofa', 'stool', 'shelf'],
        medium: ['bench', 'cabinet', 'dresser', 'lamp', 'mirror', 'rug', 'cushion'],
        hard: ['wardrobe', 'bookcase', 'sideboard', 'nightstand', 'vanity'],
        expert: ['screen', 'ottoman', 'chandelier', 'hutch', 'divan']
    },
    nature: {
        easy: ['tree', 'sun', 'moon', 'star', 'cloud', 'leaf', 'flower', 'rock', 'hill', 'river', 'rain', 'sky'],
        medium: ['mountain', 'rainbow', 'waterfall', 'lake', 'forest', 'pond', 'beach', 'valley'],
        hard: ['volcano', 'cave', 'desert', 'canyon', 'cliff', 'dune', 'island'],
        expert: ['iceberg', 'glacier', 'swamp', 'coralreef', 'geyser', 'arch']
    },
    weather: {
        easy: ['cloud', 'sun', 'rain', 'wind', 'snowflake', 'fog', 'lightning'],
        medium: ['rainbow', 'tornado', 'hail', 'mist', 'breeze'],
        hard: ['thundercloud', 'storm', 'drizzle', 'snowstorm', 'frost'],
        expert: ['hurricane', 'blizzard', 'drought', 'monsoon', 'downpour', 'cyclone']
    },
    vehicles: {
        easy: ['car', 'bus', 'bike', 'boat', 'train', 'plane', 'truck', 'van'],
        medium: ['scooter', 'motorcycle', 'sailboat', 'wagon', 'taxi'],
        hard: ['helicopter', 'rocket', 'submarine', 'ferry', 'tram'],
        expert: ['tank', 'hotairballoon', 'limousine', 'sled', 'yacht']
    },
    food: {
        easy: ['apple', 'pizza', 'cake', 'bread', 'egg', 'banana', 'cookie', 'icecream'],
        medium: ['donut', 'taco', 'burger', 'sandwich', 'salad', 'soup', 'rice', 'cheese'],
        hard: ['pasta', 'sushi', 'steak', 'carrot', 'hotdog', 'corn'],
        expert: ['cupcake', 'pancake', 'omelet', 'burrito', 'broccoli', 'grapes', 'peas', 'chili']
    },
    buildings: {
        easy: ['house', 'school', 'store', 'church', 'barn', 'tower', 'hotel'],
        medium: ['castle', 'bridge', 'lighthouse', 'museum', 'library', 'garage', 'office'],
        hard: ['skyscraper', 'pyramid', 'temple', 'factory', 'mansion', 'palace'],
        expert: ['stadium', 'monument', 'aqueduct', 'fortress', 'observatory', 'plaza']
    },
    sports_equipment: {
        easy: ['ball', 'bat', 'glove', 'net', 'racket', 'skates', 'rope'],
        medium: ['skateboard', 'helmet', 'paddle', 'stick', 'skis'],
        hard: ['trophy', 'goal', 'whistle', 'weights', 'puck', 'baton'],
        expert: ['surfboard', 'javelin', 'hurdle', 'bow', 'arrow', 'discus']
    },
    fantasy: {
        easy: ['dragon', 'ghost', 'witch', 'fairy', 'elf', 'troll'],
        medium: ['wizard', 'unicorn', 'mermaid', 'vampire', 'genie', 'ogre'],
        hard: ['phoenix', 'werewolf', 'griffin', 'minotaur', 'golem', 'demon'],
        expert: ['kraken', 'centaur', 'sphinx', 'basilisk', 'cyclops', 'medusa', 'banshee']
    },
    musical_instruments: {
        easy: ['drum', 'piano', 'guitar', 'flute', 'bell', 'harp', 'horn'],
        medium: ['violin', 'trumpet', 'saxophone', 'cello', 'tambourine', 'recorder'],
        hard: ['accordion', 'clarinet', 'ukulele', 'trombone', 'harmonica', 'banjo'],
        expert: ['xylophone', 'synthesizer', 'bagpipes', 'sitar', 'organ', 'mandolin', 'theremin']
    },
    plants: {
        easy: ['tree', 'flower', 'leaf', 'rose', 'bush', 'grass', 'weed', 'clover'],
        medium: ['cactus', 'mushroom', 'vine', 'palm', 'lily', 'daisy', 'tulip', 'sunflower'],
        hard: ['fern', 'bonsai', 'orchid', 'bamboo', 'corn', 'wheat'],
        expert: ['sequoia', 'algae', 'moss', 'thistle', 'gingko', 'willow', 'maple']
    },
    space: {
        easy: ['rocket', 'planet', 'moon', 'star', 'sun', 'comet', 'sky'],
        medium: ['satellite', 'galaxy', 'nebula', 'asteroid'],
        hard: ['spaceship', 'telescope', 'blackhole', 'orbit', 'lander'],
        expert: ['quasar', 'neutron', 'wormhole', 'cosmos', 'constellation', 'supernova']
    },
    tools: {
        easy: ['hammer', 'saw', 'screwdriver', 'wrench', 'scissors', 'shovel', 'knife'],
        medium: ['brush', 'pliers', 'tape', 'axe', 'glue', 'rake', 'plunger'],
        hard: ['drill', 'toolbox', 'ladder', 'mallet', 'clamp'],
        expert: ['caliper', 'anvil', 'blowtorch', 'lathe', 'vise', 'grinder']
    }
};

// Get a random word based on difficulty
export const getRandomWord = (difficulty = DIFFICULTY.EASY) => {
    const categories = Object.keys(wordCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordCategories[randomCategory][difficulty];
    const word = words[Math.floor(Math.random() * words.length)];

    return {
        word,
        category: randomCategory,
        difficulty
    };
};