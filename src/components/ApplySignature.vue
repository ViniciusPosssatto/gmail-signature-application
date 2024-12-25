<template>
  <div
    style="width: 100vw; display: flex; flex-direction: column; padding: 20px"
  >
    <div
      style="display: flex; margin-bottom: 10px; justify-content: space-between"
    >
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        "
      >
        <img
          :src="formData.photo"
          alt="user photo"
          width="55"
          style="border-radius: 50%"
        />
        <h2>Olá, {{ formData.user_name }}!</h2>
      </div>
      <button @click="logout()">Logout</button>
    </div>
    <form style="display: flex; gap: 10px">
      <input type="radio" value="models" v-model="option" />
      <label for="models"><h3>Utilizar modelos</h3></label>
      <input type="radio" value="html" v-model="option" />
      <label for="html"><h3>Utilizar html</h3></label>
    </form>
    <div v-if="option == 'models'">
      <h4 style="margin-top: 10px">Modelos de Assinatura de E-mail</h4>
      <div class="models-buttons">
        <button @click="setSignatureChoiced('signatureOne')">Modelo 1</button>
        <button @click="setSignatureChoiced('signatureTwo')">Modelo 2</button>
      </div>
      <div class="container">
        <div class="form-container">
          <form style="display: flex; gap: 10px; margin-bottom: 20px">
            <input type="radio" value="primary" v-model="userInfoTab" />
            <label for="models">Informações principais</label>
            <input type="radio" value="secondary" v-model="userInfoTab" />
            <label for="html">Outras informações</label>
          </form>
          <form @submit.prevent="applySignature">
            <div v-if="userInfoTab == 'primary'">
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                />
                <span v-if="errors.email">{{ errors.email }}</span>
              </div>
              <div class="form-group">
                <label for="user_name">Nome:</label>
                <input
                  type="text"
                  id="user_name"
                  v-model="formData.user_name"
                  required
                />
                <span v-if="errors.name">{{ errors.name }}</span>
              </div>
              <div class="form-group">
                <label for="address">Endereço:</label>
                <input type="text" id="address" v-model="formData.address" />
              </div>
              <div class="form-group">
                <label for="phone">Telefone:</label>
                <input type="tel" id="phone" v-model="formData.phone" />
              </div>
              <div class="form-group">
                <label for="department">Departamento:</label>
                <input
                  type="text"
                  id="departament"
                  v-model="formData.departament"
                />
              </div>
              <div class="form-group">
                <label for="enterprise_phone">Telefone comercial:</label>
                <input
                  type="text"
                  id="enterprise_phone"
                  v-model="formData.enterprise_phone"
                />
              </div>
            </div>
            <div v-else>
              <div class="form-group">
                <label for="enterprise_name">Nome da empresa:</label>
                <input
                  type="text"
                  id="enterprise_name"
                  v-model="formData.enterprise_name"
                />
              </div>
              <div class="form-group">
                <label for="website">Site:</label>
                <input type="text" id="website" v-model="formData.site" />
              </div>
              <div class="form-group">
                <label for="enterprise_logo">Logo:</label>
                <input
                  type="text"
                  id="enterprise_logo"
                  v-model="formData.enterprise_logo"
                />
              </div>
              <div class="form-group">
                <label for="instagram">Instagram:</label>
                <input
                  type="text"
                  id="instagram"
                  v-model="formData.instagram"
                />
              </div>
              <div class="form-group">
                <label for="facebook">Facebook:</label>
                <input type="text" id="facebook" v-model="formData.facebook" />
              </div>
              <div class="form-group">
                <label for="twitter">Twitter:</label>
                <input type="text" id="twitter" v-model="formData.twitter" />
              </div>
              <div class="form-group">
                <label for="linkedin">Linkedin:</label>
                <input type="text" id="linkedin" v-model="formData.linkedin" />
              </div>
              <div class="form-group">
                <label for="youtube">Youtube:</label>
                <input type="text" id="youtube" v-model="formData.youtube" />
              </div>
            </div>
            <button type="submit">Aplicar Assinatura</button>
          </form>
        </div>
        <div class="preview-container">
          <h3 style="margin-bottom: 10px">Pré-visualização da Assinatura</h3>
          <div class="signature">
            <span v-html="generateSignature"></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div style="display: flex; flex-direction: column">
        <textarea
          v-model="signatureInHtml"
          name="signatureHtml"
          style="width: 50vw"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button style="margin: 15px 0 15px 0" @click="applySignature()">
          Aplicar Assinatura
        </button>
      </div>
      <div class="preview-container">
        <h3>Pré-visualização da Assinatura</h3>
        <div class="signature">
          <span v-html="generateSignature"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { signatureModels } from '@/signatureModels/signatures'

const route = useRoute()
const router = useRouter()
const signature = ref('')
const primaryEmail = ref('')
const phoneNumbers = ref({})

const option = ref('models')
const userInfoTab = ref('primary')
const signatureInHtml = ref('')

const formData = reactive({
  photo: '',
  user_name: '',
  departament: '',
  email: '',
  address: '',
  website: '',
  enterprise_logo: '',
  enterprise_name: '',
  enterprise_phone: '',
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: '',
  youtube: '',
  site: '',
})

const placeholders = [
  'PHOTO',
  'USER_NAME',
  'DEPARTAMENT',
  'EMAIL',
  'ADDRESS',
  'SITE',
  'ENTERPRISE_LOGO',
  'ENTERPRISE_NAME',
  'ENTERPRISE_PHONE',
  'FACEBOOK',
  'INSTAGRAM',
  'TWITTER',
  'YOUTUBE',
  'LINKEDIN',
  'PHONE',
  'ENTERPRISE_PHONE',
]

const errors = reactive({
  email: null,
  name: null,
})

function setSignatureChoiced(key) {
  signature.value = signatureModels[key]
}

const generateSignature = computed(() => {
  if (option.value === 'html') return signatureInHtml.value

  let signatureHtml = signature.value

  placeholders.forEach(placeholder => {
    const value = formData[placeholder.toLowerCase()]
    signatureHtml = signatureHtml.replace(
      new RegExp(placeholder, 'g'),
      value || placeholder,
    )
  })

  return signatureHtml
})

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
        logout()
      }
    })
}

function setUser(data) {
  formData['email'] = data?.emailAddresses?.find(
    el => el?.metadata?.primary,
  )?.value
  formData['user_name'] = data?.names?.[0]?.displayName
  formData['photo'] = data?.photos?.find(el => el?.default)?.url

  const numbers = data?.phoneNumbers || []
  phoneNumbers.value = numbers.reduce((acc, phoneNumber) => {
    acc[phoneNumber.type] = phoneNumber.value
    return acc
  }, {})
}

// const signatureHTML = ref(`
//   <div style="width:600px; margin:0 auto; padding:20px; font-family:Arial, sans-serif;">
//     <div style="float:left;">
//       <img :src="${photo.value}" alt="Foto do Usuário" style="max-width:100%; height:auto; border-radius:50%; margin-right:10px; vertical-align:middle;" width="50">
//       </div>
//       <div style="float:left; margin-left:10px; vertical-align:middle;">
//         <p style="font-weight:bold;">${name.value}</p>
//         <p>${primaryEmail.value}</p>
//         <p>Telefone: <span style="font-style:italic;">${phoneNumbers.value.mobile ? phoneNumbers.value.mobile : phoneNumbers.value.work}</span></p>
//         </div>
//         <div style="clear:both;"></div>
//         <div style="border-top:1px solid #ccc; padding-top:20px;">
//           <p style="font-size:smaller;"></p>
//           </div>
//           </div>
//           `)

async function applySignature() {
  const gtoken = localStorage.getItem('gtoken')
  const requestBody = {
    signature:
      option.value == 'html' ? signatureInHtml.value : generateSignature.value,
    access_token: gtoken,
    email: formData.email,
  }
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  await axios
    .put(`${url}/apply-signature`, requestBody, {
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

function logout() {
  localStorage.removeItem('gtoken')
  router.push('/login')
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
<style scoped>
.container {
  display: flex;
  width: 100%;
  margin: 20px auto;
}

.form-container,
.preview-container {
  width: 80%;
  padding: 20px;
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.signature {
  border: 1px dashed #ccc;
  padding: 10px;
}

.signature a {
  color: blue;
  text-decoration: underline;
}

.signature p {
  margin: 5px 0;
}

.models-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  width: 130px;
  height: 25px;
  cursor: pointer;
}
</style>
