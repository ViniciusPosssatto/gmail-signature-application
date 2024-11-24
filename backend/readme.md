gcloud secrets versions create GOOGLE_CLIENT_SECRETS --data-file=.env --secret=GOOGLE_CLIENT_SECRETS
gcloud secrets versions create SECRET_KEY --data-file=.env --secret=SECRET_KEY
gcloud run deploy signature-application --image=signature-application --platform=managed --set-env-vars GOOGLE_CLIENT_SECRETS=GOOGLE_CLIENT_SECRETS,SECRET_KEY=SECRET_KEY
