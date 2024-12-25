gcloud auth login

gcloud config set project <seu-projeto-gcp>

--

gcloud auth login

gcloud config set project signature-aplication

gcloud run deploy gmail-signature --source . --region us-central1 --allow-unauthenticated
