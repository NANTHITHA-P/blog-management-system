const Blog = require("../models/blog");

const addBlog = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const { title, description, category, image } = req.body;

    const blog = new Blog({
      authorId,
      title,
      description,
      category,
      image
    });

    await blog.save();

    res.status(201).json({ message: "Blog added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

const getMyBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user.userId })
                            .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your blogs" });
  }
};

const getBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("authorId", "name email")
      .populate("comments.userId", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const addLike = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.userId;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        id => id.toString() !== userId.toString()
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      totalLikes: blog.likes.length
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.userId;
    const { message } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      userId,
      message
    });

    await blog.save();

    res.json({ message: "Comment added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const deleteMyBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.blogId,
      authorId: req.user.userId
    });

    if (!blog) {
      return res.status(403).json({
        message: "Unauthorized or blog not found"
      });
    }

    res.json({ message: "Blog deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  addBlog,
  getBlog,
  getMyBlog,
  getBlogByID,
  addLike,
  addComment,
  deleteMyBlog
};
