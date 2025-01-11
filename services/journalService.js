import Journal from '../models/journalModel.js';

// Günlük Ekleme Servisi
const addJournal = async (userId, content) => {
    if (!content || !userId) throw new Error('Content and userId are required.');

    const journal = new Journal({
        userId,
        content,
    });

    await journal.save();
    return journal;
};

// Günlük Servislerini Dışa Aktar
export default {
    addJournal,
};