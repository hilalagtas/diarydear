import Blog from '../models/blogModel.js';

// Blog Yayınlama Servisi
const publishBlog = async (title, content, isAnonymous, userId) => {
    if (!title || !content || userId === undefined) {
        throw new Error('Title, content, and userId are required.');
    }

    const blog = new Blog({
        title,
        content,
        isAnonymous,
        userId,
    });

    await blog.save();
    return blog;
};

// Blog Silme Servisi
const deleteBlog = async (blogId) => {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) throw new Error('Blog not found.');
    return deletedBlog;
};

// Yorum Ekleme Servisi
const addCommentToBlog = async (blogId, userId, content) => {
    if (!content) throw new Error('Comment content is required.');

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error('Blog not found.');

    // Yorum ekleme
    const comment = { userId, content };
    blog.comments.push(comment);

    await blog.save();
    return blog;
};

// Blog Servislerini Dışa Aktar
export default {
    publishBlog,
    deleteBlog,
  addCommentToBlog, 
};