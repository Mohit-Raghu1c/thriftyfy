const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            city,
            address,
            pincode
        } = req.body;


        // CHECK EXISTING USER
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );


        // CREATE USER
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            city,
            address,
            pincode
        });


        await user.save();


        // GENERATE TOKEN
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.status(201).json({
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // CHECK USER
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }


        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        // GENERATE TOKEN
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// GET PROFILE
router.get("/profile/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });
    }
});


// UPDATE PROFILE
router.put("/profile/:id", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            city,
            address,
            pincode
        } = req.body;


        // FIND USER
        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        // UPDATE FIELDS
        user.name = name || user.name;

        user.email = email || user.email;

        user.phone = phone || user.phone;

        user.city = city || user.city;

        user.address = address || user.address;

        user.pincode = pincode || user.pincode;


        // SAVE UPDATED USER
        const updatedUser = await user.save();


        // RETURN WITHOUT PASSWORD
        res.json({

            id: updatedUser._id,

            name: updatedUser.name,

            email: updatedUser.email,

            phone: updatedUser.phone,

            city: updatedUser.city,

            address: updatedUser.address,

            pincode: updatedUser.pincode
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;