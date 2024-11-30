gcloud auth login

gcloud config set project <seu-projeto-gcp>

--

docker build -t gcr.io/<seu-projeto-gcp>/gmail-signature:latest .

docker push gcr.io/<seu-projeto-gcp>/gmail-signature:latest

--

gcloud run deploy gmail-signature --image gcr.io/signature-aplication/signature-application:latest

gcloud secrets versions create GOOGLE_CLIENT_SECRETS --data-file=.env --secret=GOOGLE_CLIENT_SECRETS

gcloud secrets versions create SECRET_KEY --data-file=.env --secret=SECRET_KEY

gcloud run deploy signature-application --region=us-central1 --image=gcr.io/signature-aplication/ signature-application:latest --allow-unauthenticated --platform=managed --set-env-vars GOOGLE_CLIENT_SECRETS=GOOGLE_CLIENT_SECRETS,SECRET_KEY=SECRET_KEY

gcloud run deploy signature-application --source . --project=signature-aplication --timeout=300 --region=us-central1 --allow-unauthenticated --platform=managed --set-env-vars GOOGLE_CLIENT_SECRETS=GOOGLE_CLIENT_SECRETS,SECRET_KEY=SECRET_KEY
