const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user= await User.findById(id);
    done(null, user);
    });

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email, password, done)=>{

const validacioncorreo = User.findOne({email: email});
if(validacioncorreo){
    return done(null, false, req.flash('signupMessageemail','este usuario ya exite.'));
} else{
    const newUser = new User();
newUser.email = email;
newUser.password = newUser.encryptPassword(password);
await newUser.save();
done(null, newUser);
}

}));

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true   
},async (req, email, password, done)=>{
    const user = await User.findOne({email:email});
    if(!user){
        return done(null, false, req.flash('signinMessage','El usuario no existe.'));
    }
    if(!user.comparepass(password)){
        return done(null, false, req.flash('failpassword','Contraseña Incorrecta'));
    }
    done(null,user);
}))