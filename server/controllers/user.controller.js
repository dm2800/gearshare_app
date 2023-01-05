const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);

        const user = new User(req.body);

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Successfully registered!");
                res.json({
                    successMessage: "Thanks for registering!",
                    user: newUser,
                });
            })
            .catch((err) => {
                console.log("Register Unsuccessful");
                res.status(400).json(err);
            });
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((userRecord) => {
                if (userRecord === null) {
                    res.status(400).json({ message: "Invalid Login Attempt" });
                } else {
                    bcrypt
                        .compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                      {
                                        //payload is the data we want to save/use
                                        id: userRecord._id,
                                        email: userRecord.email,
                                        username: userRecord.username,
                                      },
                                      //we need a key to sign & hash cookie's data 
                                      // our payload needs a secret key. we will use a .env file to store such things privately 
                                      // they will not be added to your public code. this private key is one example. 
                                      // another can be our db name-- these can be used throughout our app, use "process.keyName"
                                      process.env.JWT_SECRET
                                    ),
                                    //config settings for this cookie (options)
                                    //we will make sure these cookies are "httponly"-- this means that the cookies are invisible to client-side JavaScript and can only be read by the server. 
                                    {
                                      httpOnly: true, 
                                      expires: new Date(Date.now() + 9000000)
                                    }

                                ).json({
                                  message: "Successfully",
                                  userLoggedIn: userRecord.username,
                                  // userId: userRecord._id
                                })
                            } else {
                                res.status(400).json({
                                    message: "Login and/or Email invalid.",
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Login and/or Email invalid.",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    message: "Login and/or email invalid.",
                });
            });
    },
    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out.",
        });
    },

    getLoggedInUser: (req, res)=> {
      const decodedJWT = jwt.decode(req.cookies.usertoken,{
        complete: true
      })
      User.findOne({_id: decodedJWT.payload.id})
      .then((user)=> {
        console.log(user);
        res.json(user);
      })
      .catch((err)=> {
        console.log(err);
      })
    }
};
