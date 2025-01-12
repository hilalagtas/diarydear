import blogService from '../services/blogService.js';

// Blog Yayınlama
const publishBlog = async (req, res) => {
    try {
        const { title, content, isAnonymous, userId } = req.body;

        if (!title || !content || userId === undefined) {
            return res.status(400).json({ error: 'Title, content, and userId are required.' });
        }

        const blog = await blogService.publishBlog(title, content, isAnonymous, userId);
        return res.status(201).json({ message: 'Blog published successfully.', blog });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Blog Silme
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Blog ID is required.' });
        }

        const deletedBlog = await blogService.deleteBlog(id);
        return res.status(200).json({ message: 'Blog deleted successfully.', deletedBlog });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Bloga Yorum Ekleme
const addCommentToBlog = async (req, res) => {
    try {
        const { blogId, userId, content } = req.body;

        if (!blogId || !userId || !content) {
            return res.status(400).json({ error: 'Blog ID, user ID, and content are required.' });
        }

        const updatedBlog = await blogService.addCommentToBlog(blogId, userId, content);
        return res.status(200).json({ message: 'Comment added successfully.', updatedBlog });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export default { publishBlog, deleteBlog, addCommentToBlog };