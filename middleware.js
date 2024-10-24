const { checkBalance, transferTokens } = require('./index');

/**
 * Simulate processing an incoming WhatsApp message.
 * @param {string} message - The user's WhatsApp message.
 */
async function processWhatsAppMessage(message) {
  if (message.includes('balance')) {
    const address = extractAddressFromMessage(message);
    if (address) {
      await checkBalance(address);
    } else {
      console.log("Please provide a valid Lisk address to check the balance.");
    }
  } else if (message.includes('transfer')) {
    const [fromAddress, toAddress, amount] = extractTransferDetails(message);
    if (fromAddress && toAddress && amount) {
      await transferTokens(fromAddress, toAddress, amount);
    } else {
      console.log("Please provide valid transfer details (from, to, amount).");
    }
  } else {
    console.log("Unknown command. Please use 'balance' or 'transfer'.");
  }
}

/**
 * Extracts the wallet address from a WhatsApp message.
 * @param {string} message - The WhatsApp message.
 * @returns {string|null} - Extracted address or null if not found.
 */
function extractAddressFromMessage(message) {
  const regex = /address: (\w+)/;
  const match = message.match(regex);
  return match ? match[1] : null;
}

/**
 * Extract transfer details (fromAddress, toAddress, amount) from a WhatsApp message.
 * @param {string} message - The WhatsApp message.
 * @returns {Array} - [fromAddress, toAddress, amount].
 */
function extractTransferDetails(message) {
  const regex = /from: (\w+), to: (\w+), amount: (\d+)/;
  const match = message.match(regex);
  return match ? [match[1], match[2], parseInt(match[3])] : [null, null, null];
}

// Example WhatsApp message simulation
processWhatsAppMessage("balance address: your-lisk-address-here");
processWhatsAppMessage("transfer from: sender-address, to: receiver-address, amount: 50000");
