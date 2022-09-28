module.exports = {
    async index (req, res) {
      try {
        //logic to retrive profile details from db
        //need user id
      } catch (err) {
        //error handling
      }
    },
    async post (req, res) {
      try {
        //send new profile details that *doesnt alr exist* in db
        //need userid and new details
      } catch (err) {
        //error handling
      }
    },
    async update (req, res) {
      try {
        //update profile details
        //need userid and wtv needs to be updated
        //note!! hash password before storing
      } catch (err) {
        //error handling
      }
    }
  }