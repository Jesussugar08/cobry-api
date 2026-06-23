import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import {Request, Response} from 'express'


const client = new CognitoIdentityProviderClient({
    region: process.env.COGNITO_REGION
})

export const register = async (req: Request, res: Response) =>{
    try{
        const {email, password, name} = req.body
        
        const command = new SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: 'name', Value: name }
            ]

        })
        
        await client.send(command)

        res.status(201).json({Message: 'User has been create successfully'})

    }catch(error){
        res.status(500).json({error: 'Error to register'})
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const command = new InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters:{
                USERNAME: email,
                PASSWORD: password
            }
        })


        const result = await client.send(command)
        res.status(200).json({
            token: result.AuthenticationResult?.AccessToken
        })

    }catch (error: any) {
        console.error('Login error:', JSON.stringify(error, null, 2))
        res.status(500).json({ error: error.message || 'User is not found' })
    }
}

export const confirmUser = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body

        const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code
        })

        await client.send(command)

        res.status(200).json({ message: 'User confirmed successfully' })

    } catch (error) {
        res.status(500).json({ error: 'Error confirming user' })
    }
}