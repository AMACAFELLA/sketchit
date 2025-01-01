// Difficulty levels for words
export const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
};

// Word categories with their respective words and difficulties
export const wordCategories = {
    animals: {
        easy: ['cat', 'dog', 'fish', 'bird', 'pig', 'cow', 'duck', 'hen', 'rat', 'goat', 'sheep', 'frog', 'mouse'],
        medium: ['elephant', 'giraffe', 'penguin', 'dolphin', 'rabbit', 'monkey', 'panda', 'zebra', 'lion', 'tiger', 'bear', 'wolf', 'deer', 'horse', 'camel'],
        hard: ['octopus', 'rhinoceros', 'kangaroo', 'crocodile', 'butterfly', 'scorpion', 'gorilla', 'cheetah', 'leopard', 'jaguar', 'hamster', 'koala', 'sloth'],
        expert: ['platypus', 'anteater', 'narwhal', 'armadillo', 'chameleon', 'pangolin', 'axolotl', 'echidna', 'capybara', 'lemur', 'tapir', 'manatee']
    },
    insects: {
        easy: ['ant', 'bee', 'fly', 'bug', 'worm', 'snail', 'slug'],
        medium: ['butterfly', 'spider', 'beetle', 'cricket', 'ladybug', 'moth', 'wasp'],
        hard: ['praying mantis', 'dragonfly', 'grasshopper', 'caterpillar', 'centipede', 'firefly'],
        expert: ['hercules beetle', 'atlas moth', 'walking stick', 'leafcutter ant', 'orchid mantis']
    },
    marine_life: {
        easy: ['fish', 'shark', 'whale', 'seal', 'crab', 'star fish'],
        medium: ['dolphin', 'octopus', 'jellyfish', 'seahorse', 'turtle', 'lobster'],
        hard: ['manta ray', 'sea dragon', 'moray eel', 'anglerfish', 'hammerhead'],
        expert: ['coelacanth', 'nautilus', 'blue-ringed octopus', 'leafy seadragon']
    },
    objects: {
        easy: ['chair', 'table', 'book', 'door', 'bed', 'cup', 'ball', 'pen', 'box', 'hat', 'shoe', 'sock', 'lamp'],
        medium: ['laptop', 'camera', 'guitar', 'umbrella', 'clock', 'glasses', 'phone', 'mirror', 'wallet', 'backpack', 'keyboard'],
        hard: ['telescope', 'microscope', 'chandelier', 'typewriter', 'compass', 'hourglass', 'thermometer', 'stethoscope'],
        expert: ['gramophone', 'kaleidoscope', 'metronome', 'sundial', 'sextant', 'astrolabe', 'phonograph']
    },
    furniture: {
        easy: ['chair', 'table', 'bed', 'desk', 'sofa', 'shelf', 'stool'],
        medium: ['bookcase', 'wardrobe', 'cabinet', 'dresser', 'bench', 'ottoman'],
        hard: ['chaise lounge', 'grandfather clock', 'vanity table', 'credenza'],
        expert: ['fainting couch', 'secretary desk', 'hope chest', 'murphy bed']
    },
    nature: {
        easy: ['tree', 'sun', 'moon', 'star', 'cloud', 'leaf', 'flower', 'grass', 'rock', 'hill', 'lake', 'river'],
        medium: ['mountain', 'volcano', 'rainbow', 'waterfall', 'beach', 'forest', 'desert', 'island', 'cave', 'valley'],
        hard: ['glacier', 'geyser', 'canyon', 'aurora', 'archipelago', 'fjord', 'oasis', 'reef', 'savanna'],
        expert: ['nebula', 'constellation', 'supernova', 'black hole', 'quasar', 'neutron star', 'magnetar']
    },
    weather: {
        easy: ['rain', 'snow', 'wind', 'cloud', 'sun', 'storm'],
        medium: ['rainbow', 'lightning', 'thunder', 'hail', 'fog', 'frost'],
        hard: ['hurricane', 'tornado', 'blizzard', 'avalanche', 'drought'],
        expert: ['polar vortex', 'derecho', 'haboob', 'fire whirl']
    },
    vehicles: {
        easy: ['car', 'bus', 'bike', 'boat', 'train', 'plane', 'truck', 'van', 'taxi'],
        medium: ['helicopter', 'submarine', 'sailboat', 'tractor', 'scooter', 'motorcycle', 'jet ski'],
        hard: ['spacecraft', 'hovercraft', 'dirigible', 'snowmobile', 'segway', 'tank', 'yacht'],
        expert: ['lunar rover', 'time machine', 'teleporter', 'flying car', 'jetpack', 'space elevator']
    },
    food: {
        easy: ['apple', 'pizza', 'cake', 'bread', 'egg', 'banana', 'cookie', 'ice cream', 'candy', 'soup'],
        medium: ['hamburger', 'spaghetti', 'sushi', 'taco', 'sandwich', 'salad', 'pancake', 'donut'],
        hard: ['croissant', 'lasagna', 'ratatouille', 'tiramisu', 'paella', 'sashimi', 'macarons'],
        expert: ['beef wellington', 'baked alaska', 'souffle', 'croquembouche', 'baumkuchen']
    },
    buildings: {
        easy: ['house', 'school', 'store', 'barn', 'church', 'tower', 'garage', 'shed'],
        medium: ['castle', 'lighthouse', 'windmill', 'skyscraper', 'bridge', 'temple', 'palace'],
        hard: ['pyramid', 'colosseum', 'pagoda', 'taj mahal', 'cathedral', 'mosque', 'ziggurat'],
        expert: ['parthenon', 'stonehenge', 'petra', 'angkor wat', 'machu picchu', 'hagia sophia']
    },
    sports: {
        easy: ['ball', 'bat', 'goal', 'net', 'race', 'jump', 'swim', 'run'],
        medium: ['baseball', 'basketball', 'football', 'tennis', 'soccer', 'hockey', 'golf'],
        hard: ['volleyball', 'skateboard', 'surfboard', 'javelin', 'discus', 'hurdles'],
        expert: ['pole vault', 'curling stone', 'pommel horse', 'balance beam', 'luge']
    },
    fantasy: {
        easy: ['dragon', 'wizard', 'fairy', 'giant', 'elf', 'troll', 'witch', 'ghost'],
        medium: ['unicorn', 'mermaid', 'phoenix', 'centaur', 'goblin', 'vampire', 'werewolf'],
        hard: ['griffin', 'basilisk', 'chimera', 'kraken', 'minotaur', 'pegasus', 'sphinx'],
        expert: ['leviathan', 'ouroboros', 'hydra', 'behemoth', 'cthulhu', 'banshee']
    },
    music: {
        easy: ['drum', 'piano', 'guitar', 'flute', 'bell', 'horn', 'harp'],
        medium: ['violin', 'trumpet', 'saxophone', 'trombone', 'clarinet', 'cello'],
        hard: ['accordion', 'bagpipes', 'harmonica', 'xylophone', 'tambourine'],
        expert: ['theremin', 'didgeridoo', 'hurdy gurdy', 'glass harmonica']
    },
    plants: {
        easy: ['tree', 'flower', 'grass', 'bush', 'leaf', 'rose', 'daisy'],
        medium: ['cactus', 'palm tree', 'sunflower', 'mushroom', 'bamboo', 'vine'],
        hard: ['venus flytrap', 'bonsai tree', 'orchid', 'pitcher plant', 'fern'],
        expert: ['corpse flower', 'giant sequoia', 'welwitschia', 'jade vine']
    },
    space: {
        easy: ['star', 'moon', 'sun', 'planet', 'comet', 'rocket', 'alien'],
        medium: ['asteroid', 'satellite', 'telescope', 'astronaut', 'meteor', 'galaxy'],
        hard: ['nebula', 'black hole', 'supernova', 'constellation', 'space station'],
        expert: ['pulsar', 'quasar', 'magnetar', 'wormhole', 'dark matter']
    },
    tools: {
        easy: ['hammer', 'saw', 'nail', 'brush', 'ruler', 'pen', 'scissors'],
        medium: ['screwdriver', 'wrench', 'drill', 'pliers', 'level', 'chisel'],
        hard: ['soldering iron', 'lathe', 'anvil', 'vice grip', 'protractor'],
        expert: ['oscilloscope', 'spectrometer', 'theodolite', 'pantograph']
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