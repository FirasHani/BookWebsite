const customerModel=require('../models/customerModel')

// module.exports = {
//     ensureAuthenticated:  async(req, res, next)=> {
  
//       if (req.isAuthenticated()) {
       
//         return next()
//       }
      
//       res.redirect('/user/loginpage')
    
//   },
  
      
//     }


// const ensureAuthenticatedIsAdmin=async(req,res,next)=>{
 
//   const shownames =await customerModel.find({username:'firas'}).lean()

//   console.log('hiiiii  ',shownames)

//   shownames.forEach(item=>{
     
//       const test =item.username
//       console.log('yesssssssssssss  (auth) ',test)
  
//     if(test=='firas'){

//       req.isAuthenticated()
//         return next()
  
//     }
//   })
//       res.redirect('/user/loginpage')

//   }

  const ensureAuthenticated=async(req,res,next)=>{

    if (req.isAuthenticated()) {
       
      
       
        return next()
 
    
  }
  res.redirect('/user/loginpage')
  }



module.exports={
   
   
     ensureAuthenticated
      
        
    }