const auth = (req, res, next) => {
  const {role, pass} = req.query;
  if(role === "admin" && pass === "saveEarth"){
    next();
  }else{
    res.send({message: "Not Authorized"})
  }
};

module.exports = {
  auth,
};

