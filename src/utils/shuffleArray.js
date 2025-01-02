export default function shuffleArray(array) {
    const shuffled = [...array]; // অ্যারেটির কপি তৈরি করুন, যাতে মূল ডেটা পরিবর্তন না হয়
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // এলোমেলো ইনডেক্স
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // উপাদান পরিবর্তন
    }
    return shuffled;
}