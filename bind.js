Function.prototype.myBind = function(thisArg, ...boundArgs) {
    return ((...newArgs) =>{
        const boundObj = {
            ...thisSrg,
            boundFunc: this
        }
        return boundObj.boundFunc(...boundArgs, ...newArgs)
    })
}