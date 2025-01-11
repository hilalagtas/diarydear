import dairyService from '../services/journalService.js';

// Günlük Ekleme
const addJournal = async (req, res) => {
    try {
        const { content, userId } = req.body;

        if (!content || !userId) {
            return res.status(400).json({ error: 'Content and userId are required.' });
        }

        const journal = await dairyService.addJournal(userId, content);
        return res.status(201).json({ message: 'Journal added successfully.', journal });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export default { addJournal };