# Usa uma imagem base mínima do Python
FROM python:3.8.13-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /backend
EXPOSE 8080
ENV PORT 8080
ENV HOST 0.0.0.0
# Copia o arquivo requirements.txt para instalar as dependências
COPY requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código da aplicação
COPY . .

# Define o comando para executar a aplicação Flask
# CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
CMD ["python", "app.py"]
