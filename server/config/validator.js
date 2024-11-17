module.exports.validate = (password)=>{
    if(!password || password.length<6) return false
    if(!/[A-Z]/.test(password)) return false
    if(!/[a-z]/.test(password)) return false
    if(!/[0-9]/.test(password)) return false
    if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false
    return true
}