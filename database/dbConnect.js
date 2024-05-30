const mongoose =require('mongoose');
exports.mongooseConnect = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("The database is connected")
    }).catch((e) => {
        console.log(`The error in connecting mongodb is ${e}`)
    })
}