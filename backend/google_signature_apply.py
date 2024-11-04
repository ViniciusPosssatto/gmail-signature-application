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

    # Fazer a requisição para a API do Google Gmail
    try:
        result = service.users().settings().update(userId=USER_ID, body=body).execute()
        return jsonify({"message": "Assinatura aplicada com sucesso.", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 