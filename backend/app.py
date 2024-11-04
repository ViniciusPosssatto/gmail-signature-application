from flask import Flask, request, jsonify
import requests


app = Flask(__name__)


@app.route('/apply_signature', methods=['POST'])
def apply_signature():
    """
    Aplica uma assinatura à conta Gmail do usuário.
    """
    print(request.json)
    # Obter a assinatura do corpo da requisição
    signature_html = request.json.get('signature')
    user_id = request.json.get("user_id")
    access_token = request.json.get("access_token")

    if not signature_html:
        return jsonify({"error": "A assinatura é obrigatória."}), 400

    # Construir o serviço Gmail
    url = f"https://gmail.googleapis.com/gmail/v1/users/{user_id}/settings/signature"

    # Criar a solicitação de atualização de assinatura
    body = {
        "signature": {
            "htmlSignature": signature_html
        }
    }

    headers = {'content-type': 'application/json',
               'Authorization': f'Bearer {access_token}'}

    # Fazer a requisição para a API do Google Gmail
    result = requests.put(url, json=body, headers=headers)

    if not result.ok:
        return jsonify(result.get('error'))
    return {'code': 'SUCCESS'}, 201


if __name__ == '__main__':
    app.run(debug=True)
