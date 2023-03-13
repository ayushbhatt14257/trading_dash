const express = require("express");
const userModel = require('../models/userSchema');
const Products = require('../models/productsSchema')
const bcrypt = require('bcrypt');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser())

// USER REGISTRATION 

router.post('/register', async(req, res) => {
    const { name, email, phone, password, cpassword } = req.body

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ errow: "Please fill all the input field now" })
    }

    try {

        const userExist = await userModel.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: `Email already exist` })

        } else if (password != cpassword) {
            return res.status(422).json({ error: `Password is not matching` })

        } else {
            const user = new userModel({ name, email, phone, password, cpassword })
            await user.save();
            res.status(201).json({ message: `user register successfuly` })

        }

    } catch (error) {
        console.log(error);
    }
});

// USER LOGIN 

router.post('/login', async(req, res) => {
        try {
            let token;

            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ errow: "Please fill " })
            }
            const userLogin = await userModel.findOne({ email: email })

            if (userLogin) {
                const isMatching = await bcrypt.compare(password, userLogin.password);

                token = await userLogin.generateAuthToken();

                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                if (!isMatching) {
                    res.status(400).json({ errow: "Invalid Login Details" })

                } else {
                    res.json({ message: 'User Signin Sccessfully' });
                }
            } else {

                res.status(400).json({ errow: "Invalid Login Details" })
            }

        } catch (error) {
            console.log(error);
        }
    }),


    // GET ALL STOCK DATA 
    router.get("/stocks", requireSignIn, async(req, res) => {
        try {
            const stockData = await Products.find();
            // console.log(productdata)
            res.status(201).json(stockData);
        } catch (error) {
            console.log(error.message);
        }
    })

// ADMIN API 

router.get('/admin', requireSignIn, isAdmin, async(req, res) => {
    try {
        const stockData = await Products.find();
        // console.log(productdata)
        res.status(201).json(stockData);
    } catch (error) {
        console.log(error.message);
    }
})


// CREATE STOCK FROM ADMIN PAGE 

router.post('/create', async(req, res) => {
    const { title, oneYear, threeYear, fiveYear, img } = req.body

    if (!title || !oneYear || !threeYear || !fiveYear) {
        return res.status(422).json({ error: 'Please fill all input field' });
    }

    try {

        const stock = new Products({ title, oneYear, threeYear, fiveYear, img })
        await stock.save();
        res.status(201).json({ message: 'Stock added successfully' })

    } catch (error) {
        console.log(error);
    }
})


// DELETE STOCK FROM ADMIN PANNEL API 

router.delete('/delete_stocks/:id', async(req, res) => {
    try {
        const deleteAdd = await Products.findByIdAndDelete(req.params.id);
        res.status(200).json('Address Deleted');

    } catch (error) {
        res.json(error);
    }
})

// UPDATE STOCK FROM ADMIN PANNEL API 
router.put('/update_stocks/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const updateAdd = await Products.findByIdAndUpdate(_id, { $set: req.body }, {
            new: true
        });
        res.status(200).json('Address updated');
        console.log('updated')
    } catch (error) {
        console.log(error);
    }
})


// GET INDIVIDUAL PRODUCT API 

router.get('/stocks/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const user = await Products.findById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    } catch (err) {
        console.log('Error finding user by ID', err);
        res.status(500).send('Error finding user by ID');
    }
});

// LOGOUT USER 

router.get('/logout', (req, res) => {
    console.log('Hello my about');
    res.clearCookie('jwttoken', { path: '/' });
    res.status(200).send(req.rootUser);
});


module.exports = router