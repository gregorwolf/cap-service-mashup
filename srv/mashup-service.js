module.exports = (say)=>{
    say.on ('Hello', req => `Hello ${req.data.name}!`)
  }