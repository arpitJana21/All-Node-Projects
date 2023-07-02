const authz = function(permittedRole){
    return function(req, res, next){
        if(permittedRole.includes(req.role)){
            next();
        }else{
            res.send("not authorized")
        }
    }
}


module.exports = {
    authz
}