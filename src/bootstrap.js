import prisma from "../prisma/prisma.client.js";


export const bootstrap = async (app , express) => {

    app.use(express.json());

    app.get("/users", async (req, res) => {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            users: users,
        });
    });

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            omit : {
              userId : true
            },
            where : {
                userId : id,
            },
        });
        return res.status(200).json({
            user
        })
    })

    app.post("/create", async (req, res) => {
        const {name, email} = req.body;
        const user = await prisma.user.create({
            data : {
                name,
                email,
            }
        });

        return res.status(201).json({
            massage: "User created successfully",
            user
        });
    });


    app.post('/creatUserWithProfile', async (req, res) => {
        const {name, email , bio} = req.body;
        const user = await prisma.user.create({
            data : {
                name,
                email,
                profile : {
                    create : {
                        bio : bio
                    }
                }
            },
            include : {
                profile : true
            }
        });

        return res.status(201).json({
            massage: "User created successfully",
            user
        });
    })


    app.get('/usersWithProfile', async (req, res) => {
        const users = await prisma.user.findMany({
            include : {
                profile : true
            }
        });

        return res.status(200).json({
            massage: "Users with profile returned",
            users
        })
    })

}