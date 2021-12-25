const userService = require('./userService')
const userModel = require('./userModel')
exports.login = (req, res) => {
    const wrong = req.query['wrong'] !== undefined;

    res.render('authentication/views/login', {wrong});
}

exports.logout = (req, res) =>{
    req.logout();
    res.redirect('/');
}

exports.renderRegister = (req, res)=>{
    res.render('authentication/views/register')
}

exports.register = async (req, res)=>{
    const {username, email, password, repassword}  = req.body;
    let errors = [];

    if(!username || !email || !password || !repassword){
        errors.push({msg: "Please enter all fields"})
    }else if(password.length < 6){
        console.log(password.length);
        errors.push({ msg: "Password must be at least 6 characters" });
    }
    
    if(password != repassword){
        errors.push({msg: "Passwords do not match"})
    }

    

    await userModel.findOne({username: username}).then(user =>{
        if(user){
            errors.push({msg: "Username has been existed!"})
        }
        
    })


    if(errors.length > 0){
        res.render('authentication/views/register', {errors, username, email, password, repassword});
    }else{
        userModel.findOne({email: email}).then(async (user) => {
            if(user){
                errors.push({msg: "Email already exists"});
                res.render('authentication/views/register', {errors, username, email, password, repassword});
            }else{
                 await userService.register(username, email, password); 
                res.redirect('/login');
            }
        })
    }
}

exports.activate = async(req, res, next)=>{
    const email = req.query.email;
    const activationString = req.query['activation-string'];
    const result = await userService.activate(email, activationString);

    if(result){
        const user = await userService.findByEmail(email);
        req.login(user, function(err){
            if(err){return next(err)}
            return res.redirect('/')
        })
    }else{
        return res.redirect('/')
    }

}

exports.getEmail = async (req, res) => {
    const email = req.query.email;
    const result = await userService.findByEmail(email);
    if(result){
       userService.sendActivateLinkToResetPassword(email);
       return res.redirect('/');
    }else{
        res.redirect('/');
    }
}

exports.resetPassword = (req, res) => {
    res.render('authentication/views/reset-password', {email: req.query.email});
}

exports.forgotPassword = (req, res) =>{
    res.render('authentication/views/forgot-password')
}

exports.updatePassword = async (req, res) =>{
    const {email, password} = req.body;
    const result = await userService.updatePassword(email, password);
    if(result){
        const user = await userService.findByEmail(email);
        req.login(user, function(err){
            if(err){return next(err)}
            return res.redirect('/')
        })
    }else{
        return res.redirect('/')
    }
}