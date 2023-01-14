<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm @submit.prevent="handleSubmit">
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    id="email"
                    type="email"
                    class="input is-primary"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    class="input is-primary"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="primary" type="submit">Buat Akun</CButton>
                  <br />
                  <router-link to="/" custom v-slot="{ navigate }">
                    <CButton
                      color="success"
                      @click="navigate"
                      variant="outline"
                      role="link"
                    >
                      Kembali ke Login
                    </CButton>
                  </router-link>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import fApp from '../firebase'
export default {
  setup() {
    const auth = getAuth(fApp)
    const router = useRouter()
    const handleSubmit = async (e) => {
      const { email, password } = e.target.elements
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        router.push('/dashboard')
      } catch (e) {
        alert(e.message)
      }
    }
    return { handleSubmit }
  },
}
</script>
