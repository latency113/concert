exports.get = (req,res)=>{
    res.send("Get customers");
}
exports.getName = (req,res)=>{
    res.send("Customer Name:" + req.params.name);
}
exports.editName = (req,res)=>{
    res.send("Edit Customer Name:" + req.params.id);
}
exports.create = (req,res)=>{
    res.send("New customer");
}
exports.getById = (req,res)=>{
    res.send("Customers ID:" + req.params.id);
}
exports.patch = (req,res)=>{
    res.send("Patch customers ID:" + req.params.id);
}
exports.rmCustomer = (req,res)=>{
    res.send("Delete customers ID:" + req.params.id);
}
