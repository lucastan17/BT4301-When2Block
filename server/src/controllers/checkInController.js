module.exports = {
  async index (req, res) {
    try {
      //logic to retrive check in details from db
      //need userid
    } catch (err) {
      //error handling
    }
  },
  async post (req, res) {
    try {
      //send check in details to db
      //need user id and date
    } catch (err) {
      //error handling
    }
  },
  async remove (req, res) {
    try {
      //remove check in from database if user unchecks
      //need userid and date
    } catch (err) {
      //error handling
    }
  }
}