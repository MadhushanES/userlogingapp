const express = require('express');
const bcrypt = require('bcryptjs');
const { hashPassword,generateAccessToken, authenticateToken} = require('../helper');
const signUpSchema = require('../Model/SignUpModel');


const router = express.Router();

router.post("/Signup", async (req, res) => {
  try {
    const existEmail = await signUpSchema.findOne({ UserEmail: req.body.uemail });

    if (existEmail) {
      return res.status(400).json("Email already exists");
    }

    const hashPwd = await hashPassword(req.body.upass);

    const signUpData = new signUpSchema({
      UserName: req.body.uname,
      UserEmail: req.body.uemail,
      UserPassword: hashPwd,
    });

    const postUser = await signUpData.save();

    if (postUser) {
      return res.status(200).json("Registered successfully");
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json("Duplicate key found");
    }
    return res.status(400).json(err.message || err);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const validData = await signUpSchema.findOne({ UserEmail: req.body.uemail }).select('+UserPassword');
    console.log(validData);

    if (!validData) {
      return res.status(400).json("Invalid email");
    }

    const isPasswordValid = await bcrypt.compare(req.body.upass, validData.UserPassword);

    if (isPasswordValid) {
      const userToken = generateAccessToken(validData);
      res.header('Authorization', `Bearer ${userToken}`).json({ token: userToken });
    } else {
      return res.status(400).json("Invalid password");
    }
  } catch (err) {
    return res.status(500).json(err.message || err);
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
      const UserEmail = req.body.uemail;
      const newPassword = req.body.newPassword;

      if (!UserEmail || !newPassword) {
          return res.status(400).json({ error: 'Email and newPassword are required.' });
      }

      const user = await signUpSchema.findOne({ UserEmail: UserEmail});
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.UserPassword = hashedPassword;
      await user.save();
      return res.json({ message: 'Password reset successfully.' });
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/userProfile", authenticateToken, async(req,res) => {
  res.json({ message: 'Welcome to the User Profile!', user: req.user });
});


router.delete("/userProfile", authenticateToken, async (req, res) => {
  const userDelete = req.user.UserEmail; 
  try {
      const user = await signUpSchema.findOneAndDelete({ UserEmail: userDelete });

      if (user) {
          res.json({ message: 'User profile deleted successfully', deletedUser: user });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
