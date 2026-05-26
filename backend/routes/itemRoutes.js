const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");

// GET HOME ITEMS
router.get("/home", async (req, res) => {
    try {
        const items = await Item.find()
        .sort({ createdAt: -1 })
        .limit(10);

        res.json(items);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});




// SEARCH ITEMS
router.get("/search", async (req, res) => {

    try {

        const {
            q,
            category,
            condition,
            minPrice,
            maxPrice,
            sort
        } = req.query;


        // FILTER OBJECT
        let filter = {};


        // SEARCH BY TITLE
        if (q) {

            filter.title = {
                $regex: q,
                $options: "i"
            };
        }


        // CATEGORY
        if (category && category !== "all") {

            filter.category = category;
        }


        // CONDITION
        if (condition) {

            filter.condition = {
                $gte: Number(condition)
            };
        }


        // PRICE FILTER
        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }


        // SORTING
        let sortOption = {
            createdAt: -1
        };


        if (sort === "price_asc") {

            sortOption = {
                price: 1
            };
        }

        else if (sort === "price_desc") {

            sortOption = {
                price: -1
            };
        }


        // FETCH ITEMS
        const items = await Item.find(filter)
            .sort(sortOption)
            .populate("seller_id", "name");


        res.json(items);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;


// GET SINGLE ITEM
router.get("/item/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate("seller_id");

        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// GET ITEMS OF USER
router.get("/items/:id", async (req, res) => {
    try {
        const items = await Item.find({
            seller_id: req.params.id,
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// CREATE ITEM
router.post(
    "/item",
    authMiddleware,
    upload.array("images", 5),
    async (req, res) => {

        try {

            const uploadedImages = req.files.map(file => ({
                url: file.path,
                public_id: file.filename,
            }));


            const item = new Item({
                title: req.body.title,

                price: req.body.price,

                brand: req.body.brand,

                size: req.body.size,

                condition: req.body.condition,

                color: req.body.color,

                category: req.body.category,

                description: req.body.description,

                type: req.body.type,

                seller_id: req.user.id,

                images: uploadedImages
            });

            const savedItem = await item.save();

            res.status(201).json(savedItem);

        } catch (err) {

            res.status(500).json({
                message: err.message,
            });
        }
    }
);

// UPDATE ITEM
router.put("/item/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// DELETE ITEM
router.delete("/item/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;