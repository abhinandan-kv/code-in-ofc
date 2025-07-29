import { DataTypes, QueryTypes  } from "sequelize";
import query from "../utils/query.js";
import sequelize from "../model/databaseModel.js";

let User;

export async function sDefine(req, res) {

    User = sequelize.define('user', { ...query.sDefine });
    //await User.sync()
    console.log(User)


    // let userInput = req.body

    // console.log(userInput)


    // let newUser = await User.create(userInput)
    // console.log(newUser)
    // newUser.save()


    res.json(User)
}

// firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// lastName: {
//     type: DataTypes.STRING
// },

function validation(req, res) {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        hashedPassword: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i,
            },
        },
    });
}

async function bindExmaple() {
    await sequelize.query(
        'SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $1',
        {
            bind: ['active'],
            type: QueryTypes.SELECT,
        },
    );

    await sequelize.query(
        'SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
        {
            bind: { status: 'active' },
            type: QueryTypes.SELECT,
        },
    );
}