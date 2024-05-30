const User = require("../models/User");

exports.login = async (req, res) => {
  try { 
    const { password, email } = req.body;
    if (!email || !password ) {
      return res.status(400).json({
        success: false,
        message : "Select all fileds"
      })
    }
    const user = await User.findOne({
      email
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message : "User not found"
      })
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message : "Password don't match"
      })
    }
       const options = {
         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
         httpOnly: true,
         secure: true,
         sameSite: "none",
       };


    const token = user.getJWTToken();
    res.status(200)
      .cookie('token', token, options).json({
      success: true,
      token,
      user
    })


        
      
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "Add all details",
      });
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
      }
      const user = await User.create({
          name,email,phone, role,password
      })

      res.status(200).json({
          success: true,
          message: "User registered",
          user
      })
      
      

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.logOut = async (req, res, next) => {
  try {
    res.status(201).cookie('token', "", {
      httpOnly: true,
      expires : new Date(Date.now())
    }).json({
      success: true,
      message : "User logged out successfully"
    })

  } catch (e) {
    return res.status(500).json({
      success: false,
      message : e.message
    })
  }
}
exports.myprofile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id)
    console.log(req.user);

    res.send(
    {  user : req.user}
    )

  } catch (e) {
    return res.status(500).json({
      success: false,
      message : e.message
    })
  }
}
exports.editProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({
        success: false,
        message : "Provide details to change"
      })
    }
    
    const user = await User.findById(_id);

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }
    if (phone) {
  user.phone = phone
}
    await user.save();
    res.status(200).json({
      success: true,
      message : "Updated successfully"
    })


  } catch (e) {
    return res.status(500).json({
      success: false,
      message : e.message
    })
  }
}