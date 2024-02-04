const User = require('../model/model');


const homePage = async (req,res)=>{
    try {
        if(req.session.user){
            res.redirect("/dashboard")
        }else{
            res.render('home');
        }

    } catch (error) {
        console.log(error.message);
    }
}

const registerPage = async(req,res)=>{
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
    }
}

const insertUser= async (req,res)=>{
   try {
    const user =  new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    const userData = await user.save();

    if(userData){
        res.render('register',{message:"registration succesfull"})
    }else{
        res.render('register',{message:"registration Failed"})
    }
    
   } catch (error) {
        console.log(error.message);
   } 
}

const checkUser = async(req,res)=>{
    try {
       
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if(userData.email === email && userData.password === password){
            req.session.user = userData._id
            res.redirect('/dashboard');
        }else{
            res.render('home',{message:'invalid password and usernamee'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async(req,res)=>{
    try {
        if(!req.session.user){
            res.redirect("/")
        }else{
            let userData = await User.findById(req.session.user)
            res.render('dashboard', {user: userData});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async(req,res)=>{
    try {
        req.session.user = null
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    homePage,
    registerPage,
    insertUser,
    checkUser,
    loadDashboard,
    logout
}