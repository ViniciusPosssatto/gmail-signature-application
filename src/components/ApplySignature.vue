<template>
  <div>
    <h2>Olá, {{ name }}!</h2>
    <p>E-mail: {{ primaryEmail }}</p>

    <h3>Configuração de Assinatura de E-mail</h3>
    <form @submit.prevent="applySignature">
      <div>
        <label for="signature">Assinatura:</label>
        <div>
          <div
            style="
              width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
            "
          >
            <div style="float: left">
              <img
                :src="photo"
                alt="Foto do Usuário"
                style="
                  max-width: 100%;
                  height: auto;
                  border-radius: 50%;
                  margin-right: 10px;
                  vertical-align: middle;
                "
                width="50"
              />
            </div>
            <div style="float: left; margin-left: 10px; vertical-align: middle">
              <p style="font-weight: bold">{{ name }}</p>
              <p>{{ primaryEmail }}</p>
              <p>
                Telefone:
                <span style="font-style: italic">{{
                  phoneNumbers.mobile ? phoneNumbers.mobile : phoneNumbers.work
                }}</span>
              </p>
            </div>
            <div style="clear: both"></div>
            <div style="border-top: 1px solid #ccc; padding-top: 20px">
              <p style="font-size: smaller"></p>
            </div>
          </div>
        </div>
        <textarea id="signature" v-model="signature" required></textarea>
      </div>
      <button type="submit">Aplicar Assinatura</button>
    </form>
    <button>Logout</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const signature = ref('')
const name = ref('')
const primaryEmail = ref('')
const photo = ref('')
const phoneNumbers = ref({})

async function getUserInfos(token) {
  await axios
    .get(
      'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,clientData,phoneNumbers,photos,userDefined',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(({ data }) => {
      setUser(data)
    })
    .catch(error => {
      console.log('err: ', error)
      if (error.status === 401) {
        localStorage.removeItem('gtoken')
      }
    })
}

function setUser(data) {
  primaryEmail.value = data?.emailAddresses?.find(
    el => el?.metadata?.primary,
  )?.value
  name.value = data?.names?.[0]?.displayName
  photo.value = data?.photos?.find(el => el?.default)?.url

  const numbers = data?.phoneNumbers || []
  phoneNumbers.value = numbers.reduce((acc, phoneNumber) => {
    acc[phoneNumber.type] = phoneNumber.value
    return acc
  }, {})
}

const signatureHTML = ref(`
    <div style="width:600px; margin:0 auto; padding:20px; font-family:Arial, sans-serif;">
  <div style="float:left;">
    <img :src="${photo.value}" alt="Foto do Usuário" style="max-width:100%; height:auto; border-radius:50%; margin-right:10px; vertical-align:middle;" width="50">
  </div>
  <div style="float:left; margin-left:10px; vertical-align:middle;">
    <p style="font-weight:bold;">${name.value}</p>
    <p>${primaryEmail.value}</p>
    <p>Telefone: <span style="font-style:italic;">${phoneNumbers.value.mobile ? phoneNumbers.value.mobile : phoneNumbers.value.work}</span></p>
  </div>
  <div style="clear:both;"></div>
  <div style="border-top:1px solid #ccc; padding-top:20px;">
    <p style="font-size:smaller;"></p>
  </div>
</div>
  `)

async function applySignature() {
  const gtoken = localStorage.getItem('gtoken')
  const requestBody = {
    signature: signatureHTML.value,
    access_token: gtoken,
    email: primaryEmail.value,
  }

  await axios
    .put(`http://localhost:5000/apply-signature`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      console.log(data)
    })
    .catch(error => {
      console.log('err: ', error)
      if (error.code === 401) {
        localStorage.removeItem('gtoken')
      }
    })
}

onMounted(async () => {
  const gtoken = route.query.token || localStorage.getItem('gtoken')
  if (!gtoken) {
    router.push('/login')
    return
  }
  localStorage.setItem('gtoken', gtoken)
  if (!primaryEmail.value) await getUserInfos(gtoken)
})
</script>
