const tempAuth = (req,res,next) => {

    req.session.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNWRmZDgxZS0wNTZiLTRlMTItOGVlNS0wNjk3N2VhMjAxYWQiLCJlbWFpbCI6InR1cmd1dHNhbGdpbjU1MzRAZ21haWwuY29tIiwiaWF0IjoxNzY1OTIzNzYzLCJleHAiOjE3NjY1Mjg1NjN9.kiD1JQ_3MtTelXr96Jg49cJnXtruHziqNCjpgK40ZNE"

    next()
}

module.exports = tempAuth