// Word categories with their respective words
export const wordCategories = {
    animals: ['cat', 'dog', 'fish', 'bird', 'elephant', 'lion', 'tiger'],
    objects: ['chair', 'table', 'phone', 'clock', 'book', 'lamp', 'door'],
    nature: ['tree', 'flower', 'sun', 'moon', 'star', 'cloud', 'leaf'],
    vehicles: ['car', 'bike', 'boat', 'plane', 'train', 'bus', 'ship'],
};

export const getRandomWord = () => {
    const categories = Object.keys(wordCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordCategories[randomCategory];
    const word = words[Math.floor(Math.random() * words.length)];

    return {
        word,
        category: randomCategory
    };
};