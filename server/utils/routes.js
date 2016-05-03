module.exports = function(app) {
  app.route('/game/:id')
    .get(function(req, res) {
      console.log(req.body);
      res.status(200).send('ok');
    })
    .post(function(req, res) {
      console.log(req.body);
      res.status(200).send('ok');
    });
}
