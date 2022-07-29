const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../database/models');


module.exports = () => {
    return(
        passport.use(
            new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3006/usuario/login/google/callback" /* config googleCloud */
            },
            function(accessToken, refreshToken, profile, done) {
                console.log(profile)
                db.User.findOrCreate({
                    where: {
                        social_id: profile.id
                    },
                    defaults:{
                        name: profile.name.givenName,
                        email: profile.emails[0].value,
                        password: null,
                        rolId: 2,
                        social_id: profile.id,
                        social_provider: 'google',
                        image: "default-image.png" || profile.photos[0].value,
                    }
                })
                .then(usuario =>{
                    return done(null, usuario)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
            )
        )
    )
}
