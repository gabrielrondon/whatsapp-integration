/**
 * Handles errors from the Lisk API or the middleware.
 * @param {Error} error - The error object.
 */
function handleError(error) {
    console.error(`Error encountered: ${error.message}`);
    // Additional logging or error reporting logic can be added here
  }
  
  module.exports = {
    handleError
  };
  