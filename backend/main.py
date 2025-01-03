from flask import Flask, request, jsonify, redirect
from flask.globals import session
import requests
from google_auth_oauthlib.flow import Flow
from flask_cors import CORS
import json
import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())


class Development(object):
    TESTING = True
    SECRET_KEY = os.getenv('SECRET_KEY')
    FRONTEND_URL = "http://localhost:5173"
    API_URL = "http://localhost:5000"
    CLIENT_SECRETS_OBJECT = os.getenv('GOOGLE_CLIENT_SECRETS')


class Production(object):
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FRONTEND_URL = "https://signature-aplication.web.app"
    API_URL = "https://gmail-signature-903229522808.us-central1.run.app"
    CLIENT_SECRETS_OBJECT = os.environ.get('GOOGLE_CLIENT_SECRETS')


ENV = os.environ.get('ENV')

env_config = {'DEV': Development, 'PROD': Production}

app = Flask(__name__)
app.config.from_object(env_config[ENV])
CORS(app)

flow = Flow.from_client_config(
    client_config=json.loads(app.config.get('CLIENT_SECRETS_OBJECT')),
    scopes=[
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
		'https://www.googleapis.com/auth/gmail.settings.basic',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
		"openid",
    ],
    redirect_uri=f"{app.config.get('API_URL')}/login/callback",
)


@app.route("/auth/google", methods=["POST"])
def auth_google():
	authorization_url, state = flow.authorization_url()
	session["state"] = state

	return jsonify(
		{"url": authorization_url}
	), 200


@app.route("/login/callback", methods=["GET"])
def callback():
    code = request.args.get('code')  # Obter o código da URL
    credentials = flow.fetch_token(code=code)
    token = credentials.get('access_token')

    return redirect(f"{app.config.get('FRONTEND_URL')}/application?token={token}")


@app.route("/apply-signature", methods=["PUT"])
def apply():
    body = request.get_json()

    send_as_email = body.get('email')
    access_token = body.get('access_token')
    signature_html = body.get('signature')

    payload = {
        "signature": signature_html,
    }

    result = requests.patch(f'https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/{send_as_email}', headers={'Authorization': f'Bearer {access_token}'}, json=payload)

    if not result.ok:
        return jsonify(result.json().get('error')), 400
    return jsonify({'code': 'SUCCESS'}), 201


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
