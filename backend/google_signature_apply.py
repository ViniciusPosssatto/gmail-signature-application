from flask import Flask, request, jsonify
from googleapiclient.discovery import build
import os

app = Flask(__name__)

# Credenciais da API
USER_ID = os.environ.get('USER_ID', 'me')
API_KEY = os.environ.get('API_KEY')

# Construir o serviço Gmail
service = build('gmail', 'v1', developerKey=API_KEY)


@app.route('/apply_signature', methods=['POST'])
def apply_signature():
    """
    Aplica uma assinatura à conta Gmail do usuário.
    @gmail.com e @domínio.empresarial
    """

    # Obter a assinatura do corpo da requisição
    signature_html = request.json.get('signature')

    if not signature_html:
        return jsonify({"error": "A assinatura é obrigatória."}), 400

    # Criar a solicitação de atualização de assinatura
    body = {
        "signature": {
            "htmlSignature": signature_html
        }
    }

    result = service.users().settings().update(userId=USER_ID,
                                               body=body).execute()
    print(result)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
