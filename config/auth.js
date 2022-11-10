const studentR=require('../models/USER')

module.exports = {
    ensureAuthenticated:  async(req, res, next)=> {
  
      if (req.isAuthenticated()) {
       
        return next()
      }
      
      res.redirect('/users/loginpage')
    
  },
  
      
    }
