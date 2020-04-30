const Vue = require('vue')
const server = require('express')()
const render = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
	const context = {
		title: 'express + vue',
		meta: `
			<meta charset="utf-8">
			<meta name="keywords" content="vue, express" />               
			<meta name="description" content="This page is about the use of ssr." />
		`,
		inject: '<div>现在访问的URL是：{{ url }}</div>'
	}
	const app = new Vue({
		data: {
			url: req.url
		},
		template: context.inject
	})
	render.renderToString(app, context, (err, html) => {
		if(err){
			res.status(500).end(`Internet Server Error`)
			console.log(err);
			return
		}
		res.end(html)
	})
})

server.listen(8888, () => console.log('server listening at http://localhost:8888'))