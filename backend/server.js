import express from "express"
import cors from "cors"

import User, { sql } from "./User.js";


const app = express()


const port = 5000;

app.use(express.json())
app.use(cors())


try {
    await sql.authenticate();
    app.listen(port, () => {
        console.log("Server started on port " + port);
    })
    await sql.sync()
} catch (err) {
    console.log("Error connecting to database" , err)
}

app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

//endpoint for generating numbers
app.get("/generate", async (req, res) => {
    try {
        const inputNumber = parseInt(req.query.number);
        const result = Array.from(generateFancyNumber(inputNumber, 10000))
        return res.status(200).json({ result, na: "dsads" })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

//endpoint for registering the user
app.post("/register", async (req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name) {
            if (req.body.password.length < 6) {
                return res.status(400).send({ msg: "Password must be greater than 6 characters" })
            }
            const existingUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (existingUser) {
                return res.status(400).json({ msg: "User Already exists" })
            }
            const user = await User.create(req.body)
            return res.status(200).json(user)
        } else {
            return res.status(400).send({
                msg: "Please fill all the fields"
            })
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

// endpoint for loggedin in user
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(404).json({ msg: "No user found with the email , Please Register" })
        }
        if (user.password === req.body.password) {
            return res.status(200).send(user)
        }
        return res.status(400).json({ msg: "Passwords does not match" })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})


//--------------- Fancy number generation code below --------------//
const generateFancyNumber = (fancyNumber, limit) => {
    const result = new Set();
    for (let i = 1000; i <= limit; i++) {
        const val = i.toString();
        const last = Number(val[0]) + Number(val[1]) + Number(val[2]) + Number(val[3]);
        if (last === fancyNumber && isFancy(val)) {
            result.add(val);
        }
    }
    return result;
}

const isFancy = (s) => {
    if (cond1(s) || cond2(s)) return true;
    else return false;
}

const cond1 = (s) => {
    for (let i = 0; i < s.length - 2; i++) {
        if (s[i] == s[i + 1] && s[i + 1] == s[i + 2]) return true;
    }
    return false;
}

const cond2 = (s) => {
    for (let i = 0; i < s.length - 2; i++) {
        if (
            (s[i] < s[i + 1] && s[i + 1] < s[i + 2]) ||
            (s[i] > s[i + 1] && s[i + 1] > s[i + 2])
        )
            return true;
    }
    return false;
}

