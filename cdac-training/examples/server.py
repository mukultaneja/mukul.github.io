
import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.options
import os
import tornado.autoreload
import json

from tornado.options import options, define

define('port', default='8000', help='port on which server is running')

class IndexHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('profits.html')


class FileHandler(tornado.web.RequestHandler):
	def get(self, filename):
		with open(os.path.join(os.getcwd(), filename)) as f:
			json_data = json.load(f)
			print json_data
			return json_data

if __name__ == '__main__':
	tornado.options.parse_command_line()

	app = tornado.web.Application(handlers=[(r'/', IndexHandler),
											(r'/file/(.*)', FileHandler)],
								  template_path=os.getcwd(),
								  static_path=os.getcwd(),
								  autoreload=True)

	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(options.port)
	tornado.ioloop.IOLoop().instance().start()
