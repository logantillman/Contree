import User from '../models/User.js';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import dotenv from 'dotenv';

dotenv.config({ path: './plaid.env' });

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.CLIENT_ID,
        'PLAID-SECRET': process.env.SECRET,
      },
    },
  });

const client = new PlaidApi(configuration);

export const createLinkToken = async(req, res) => {

    const clientUserId = req.user.id;
    const request = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: clientUserId,
        },
        client_name: 'Plaid Test App',
        products: ['auth'],
        language: 'en',
        country_codes: ['US'],
    };
    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        res.status(200).json({ data: createTokenResponse.data });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Error creating link token" });
    }
};

export const exchangePublicToken = async(req, res, next) => {
    const publicToken = req.body.public_token;
    const id = req.user.id;

    try {
        const response = await client.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemID = response.data.item_id;

        const user = await User.findById(id);
        console.log("found user - ", user.email);

        user.token = accessToken;
        user.itemID = itemID;
        
        await user.save();

        res.status(200).json({ message: "exchange complete" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "error exchanging token" });
    }
}

export const getTransactions = async(req, res) => {
    const id = req.user.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        const user = await User.findById(id);
        const request = {
            access_token: user.token,
            start_date: startDate,
            end_date: endDate
        };
        const response = await client.transactionsGet(request);
        let transactions = response.data.transactions;
        const total_transactions = response.data.total_transactions;
        // Manipulate the offset parameter to paginate
        // transactions and retrieve all available data
        while (transactions.length < total_transactions) {
          const paginatedRequest = {
            access_token: user.token,
            start_date: startDate,
            end_date: endDate,
            options: {
              offset: transactions.length,
            },
          };
          const paginatedResponse = await client.transactionsGet(paginatedRequest);
          transactions = transactions.concat(
            paginatedResponse.data.transactions,
          );
        }

        res.status(200).json({ transactions: transactions });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "error getting transactions" });
      }
};