import Product from "../model/dbProductModel.js"
import User from "../model/dbUserModel.js"


async function newUser(req, res) {
    let userData = req.body
    const newUser = await User.create({             // create shorthand property of build() and save()
        ...userData
    })
    console.log("userdata", { ...userData })
    res.json(newUser)
}

async function deleteUserById(req, res) {
    let id = req.params.id
    const user = await User.findByPk(id)
    const deletedUser = await user.destroy()

    console.log(deletedUser)
    res.send(deletedUser)
}

async function getTable(req, res) {
    const users = await User.findAll()
    console.log(users)
    res.json(users)
}

async function updateUserById(req, res) {
    const id = req.params.id;
    const userData = req.body;

    const user = await User.findByPk(id)

    const newUser = await user.update(userData)


    console.log(newUser)
    res.send(newUser)

}


async function associationEx(req, res) {


    
    //const belong = Product.belongsTo(User)
    console.log(hasOneTable)
    res.json(hasOneTable)


}

async function test(req,res){
    const user = await User.findByPk(1,{
        include:[Product.productName]
    })

    console.log(user)
    res.json(user)
}



export { newUser, deleteUserById, getTable, updateUserById, associationEx,test }