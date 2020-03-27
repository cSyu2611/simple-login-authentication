
exports.createAndSendMessage = function (req, res, result) {
    let message = {
      route: req.originalUrl,
      status: result.status || "",
      data: result.data || {}
    }
    res.send(message)
    return
  }
  