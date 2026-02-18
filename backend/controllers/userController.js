const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Blog = require("../models/blog");



/* ================= REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



/* ================= LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });

    res.json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



/* ================= CHECK LOGIN (/me) ================= */
const checkLogin = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    res.json({ user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



/* ================= LOGOUT ================= */
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out successfully"
  });
};



/* ================= SAVE BLOG ================= */
const saveBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = user.savedblogid.includes(blogId);

    if (alreadySaved) {
      return res.json({ message: "Blog already saved" });
    }

    user.savedblogid.push(blogId);
    await user.save();

    res.json({ message: "Blog saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error saving blog" });
  }
};



/* ================= UNSAVE BLOG ================= */
const unsaveBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedblogid = user.savedblogid.filter(
      id => id.toString() !== blogId.toString()
    );

    await user.save();

    res.json({ message: "Blog unsaved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error unsaving blog" });
  }
};



/* ================= GET SAVED BLOGS ================= */
const getSavedBlog = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .populate("savedblogid");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      savedBlogs: user.savedblogid
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching saved blogs" });
  }
};




module.exports = {
  registerUser,
  loginUser,
  checkLogin,
  logoutUser,
  saveBlog,
  unsaveBlog,
  getSavedBlog
};
