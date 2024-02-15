import { Account, Client, Databases, Functions, ID, Query } from 'appwrite';
import { PollOption } from '../routes/dashboard/polls/CreatePoll';
import axios from 'axios'


export type CreateAccountT = {
    name: string
    email: string
    password: string
}

export type LoginT = {
    email: string
    password: string
}

export type CreatePollT = {
    question: string
    options: string[]

}

export type CollectionUserT = {
    id?: string
    name?: string
    email: string
    created_at: string
    is_verified?: boolean
}

export type MakeVoteT = {
    userID: string
    pollID: string
    optionID: string
}

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT
const PROJECT = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID

const client = new Client();

class Appwrite {
    account: Account;
    database: Databases;
    functions: Functions;


    constructor() {
        client
            .setEndpoint(ENDPOINT)
            .setProject(PROJECT)

        this.account = new Account(client)
        this.database = new Databases(client)
        this.functions = new Functions(client)
    }

    async createUser({ email, password, name }: CreateAccountT) {
        try {

            const createdAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(createdAccount)
            if (createdAccount) {
                let collectionUser = {
                    name: createdAccount.name,
                    email: createdAccount.email,
                    is_verified: createdAccount.status,
                    created_at: createdAccount.$createdAt
                }

                await this.executeCreateUserFunction(collectionUser)

                // await this.database.createDocument(DATABASE_ID, "users", ID.unique(), collectionUser)
                return this.loginUser({ email, password })
            }
        } catch (e) {
            throw "Appwrite Service :: createUser :: " + e
        }
    }

    async checkSessionExists() {
        try {
            let currentSession = await this.account.getSession('current')
            if (currentSession) return true
            else return false
        } catch (e) {
            return false
            throw "Appwrite Service :: checkSessionExists :: " + e
        }
    }

    async loginUser({ email, password }: LoginT) {
        console.log(email, password)
        try {
            return await this.account.createEmailSession(email, password);
        } catch (e) {
            throw "Appwrite Service :: loginUser :: " + e
        }
    }

    async logoutUser() {
        try {
            return await this.account.deleteSessions();
        } catch (e) {
            throw "Appwrite Service :: logoutUser :: " + e
        }
    }

    async getCurrentAuthUser() {
        try {
            return this.account.get()
        } catch (e) {
            throw "Appwrite Service :: getCurrentAuthUser :: " + e
        }
    }

    //Gets user from
    async getCurrentUser() {
        try {
            let authUser = await this.getCurrentAuthUser()
            return (await this.database.listDocuments(DATABASE_ID, "users", [Query.equal("email", authUser.email)])).documents[0]
        } catch (e) {
            throw "Appwrite Service :: getCurrentUser :: " + e
        }
    }

    async createPoll({ question, options }: CreatePollT) {
        try {
            let timestamp = new Date()
            let currentUser = await this.getCurrentUser()
            let userID = currentUser.$id
            let newPoll = {
                question,
                timestamp,
                owner: userID,
                options: options.map(option => ({ description: option }))
            }
            await this.database.createDocument(DATABASE_ID, 'polls', ID.unique(), newPoll)

        } catch (e) {
            throw "Appwrite Service :: createPoll :: " + e
        }
    }

    async getUserPolls(userID: string) {
        try {
            return (await this.database.listDocuments(DATABASE_ID, 'polls', [Query.equal("owner", userID)])).documents
        } catch (e) {
            throw "Appwrite Service :: getUserPolls :: " + e
        }
    }

    async getAllPolls() {
        try {
            return (await this.database.listDocuments(DATABASE_ID, 'polls')).documents
        } catch (e) {
            throw "Appwrite Service :: getAllPolls :: " + e
        }
    }

    async getPoll(pollID: string) {
        try {
            return await this.database.getDocument(DATABASE_ID, 'polls', pollID)
        } catch (e) {
            throw "Appwrite Service :: getPoll :: " + e
        }
    }

    //Includes options and votes
    async getFullPollData(pollID: string) {
        try {
            let poll = await this.database.getDocument(DATABASE_ID, 'polls', pollID)
            let options = await this.database.listDocuments(DATABASE_ID, 'options', [Query.equal('poll_id', pollID)])
            let optionIDs = options.documents.map(option => option.$id)
            let votes = await this.database.listDocuments(DATABASE_ID, 'votes', [Query.equal('option', optionIDs)])

            const fullPollData = {
                ...poll,
                votes,
                options
            }

            return fullPollData
        } catch (e) {
            throw "Appwrite Service :: getFullPollData :: " + e
        }
    }

    //We filter out the polls where we had already voted
    async getVotablePolls() {
        try {
            let currentUser = await this.getCurrentUser()
            let allPolls = await this.getAllPolls()
            let myVotes = await this.getMyVotes(currentUser.$id)
            let votePollIDs = myVotes.documents.map(vote => vote.poll.$id)
            //If poll was not made by us or if we already voted for poll, we cannot vote for the poll
            let votablePolls = allPolls.filter((poll: any) => !votePollIDs.includes(poll.$id) && poll.owner.$id !== currentUser.$id)
            return votablePolls
        } catch (e) {
            throw "Appwrite Service :: getVotablePolls :: " + e
        }
    }

    async makeVote({ optionID, pollID, userID }: MakeVoteT) {
        try {
            return await this.database.createDocument(DATABASE_ID, 'votes', ID.unique(), {
                option: optionID,
                poll: pollID,
                user: userID
            })
        } catch (e) {
            throw "Appwrite Service :: makeVote :: " + e
        }
    }
    

    async getMyVotes(userID: string) {

        try {
            let myVotes = await this.database.listDocuments(DATABASE_ID, 'votes', [Query.equal('user', userID)])
            return myVotes
        } catch (e) {
            throw "Appwrite Service :: getMyVotes :: " + e
        }
    }


    //Executes Appwrite Function that adds a user to users collection
    async executeCreateUserFunction(collectionUser: CollectionUserT) {
        await this.functions.createExecution(
            '65cb7247a8c1d919904c',
            JSON.stringify(collectionUser),
            false,
            '/create-user',
            'POST',
            { 'Access-Control-Allow-Origin': '*' }
        )
    }

}

export default Appwrite