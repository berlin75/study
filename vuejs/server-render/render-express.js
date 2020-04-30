const Vue = require('vue')
const server = require('express')()
const render = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: '<div>现在访问的URL是：{{ url }}</div>'
	})
	render.renderToString(app, (err, html) => {
		if(err){
			res.status(500).end('Internet Server Error')
			return
		}
		res.end(`
			<!DOCTYPE html>
			<html>
			<head><title>express + vue</title></head>
			<body>${html}</body>
			</html>
		`)
	})
})

server.listen(8888, () => console.log('server listening at http://localhost:8888'))