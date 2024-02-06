import User from "../../database/schemas/User/User";

class userController {
    constructor () {}

    public async createUser() {
       

        // await User.create({
        //     username: 'Usuardsadsaio Teste',
        //     email: 'teste@teste.dsadsacom',
        //     password: '1234dasdsa56',
        // });

    
    }

    public async getUser(id: string) {
        try {
            const user: any = await User.findOne({ id });
            if(user) {
                return {
                    error: false,
                    message: `User ${user.username} found!`,
                    return: user,
                    status: 200,
                }
            } else {
                return {
                    error: true,
                    message: `User not found!`,
                    return: undefined,
                    status: 404,
                }
            }
            console.log(user);
        } catch (error) {
            return {
                error: true,
                message: `A error is ocurred: ${error}`,
                return: undefined,
                status: 500,
            }
        }
    }

    public async deleteUser() {
        // delete user
    }
}

export default userController;