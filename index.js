require('dotenv').config();
const axios = require('axios');

const LISK_RPC_URL = process.env.LISK_RPC_URL;

/**
 * Function to check the balance of a Lisk wallet address
 * @param {string} address - The wallet address to check the balance for.
 */
async function checkBalance(address) {
  try {
    const response = await axios.post(LISK_RPC_URL, {
      jsonrpc: "2.0",
      method: "getAccount",
      params: { address },
      id: 1
    });
    const balance = response.data.result.balance;
    console.log(`Balance of ${address}: ${balance}`);
    return balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

/**
 * Function to initiate a token transfer on Lisk
 * @param {string} fromAddress - Sender wallet address.
 * @param {string} toAddress - Receiver wallet address.
 * @param {number} amount - Amount of tokens to transfer.
 */
async function transferTokens(fromAddress, toAddress, amount) {
  try {
    const response = await axios.post(LISK_RPC_URL, {
      jsonrpc: "2.0",
      method: "sendTransaction",
      params: {
        sender: fromAddress,
        recipient: toAddress,
        amount: amount,
        passphrase: "your-wallet-passphrase" // Placeholder
      },
      id: 2
    });
    console.log(`Transaction sent! Response: ${response.data.result}`);
    return response.data.result;
  } catch (error) {
    console.error('Error transferring tokens:', error);
  }
}

// Simulate WhatsApp message handling
(async () => {
  console.log("Simulating WhatsApp-Lisk interaction...");

  // Simulated balance check request
  const walletAddress = "your-lisk-address-here";
  await checkBalance(walletAddress);

  // Simulated token transfer request
  const recipientAddress = "recipient-lisk-address-here";
  const amountToSend = 100000; // Example amount
  await transferTokens(walletAddress, recipientAddress, amountToSend);
})();
