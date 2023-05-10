const { axiosInstance } = require(".");

// verify reciever account

export const VerifyAccount = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/api/transactions/verify-account", payload);
    } catch (error) {
        return error.response.data;
    }
};

// transfer funds

export const TransferFunds =  async (payload) => {
    try {
        const {data} = await axiosInstance.post("/api/transactions/transfer-funds", payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

//get all transactions for a user

export const GetTransactionsOfUser = async() => {
    try {
        const {data} = await axiosInstance.post("/api/get-all-transactions-by-user");
    } catch (error) {
        return error.response.data
    }
}
