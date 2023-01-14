<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <span class="h2">Selamat Datang,</span>
          <br />
          <span class="h2">di Web Aplikasi Kasir Digital Online</span>
          <br />
          <br />
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleSubmit">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Masuk kedalam akun anda</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput type="email" placeholder="Email" id="email" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-success py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Mari bergabung dengan kami untuk meningkatkan efektifitas
                    dan efisiensi UMKM Anda
                  </p>
                  <router-link to="/register" custom v-slot="{ navigate }">
                    <CButton
                      color="light"
                      @click="navigate"
                      variant="outline"
                      class="mt-3"
                      role="link"
                    >
                      Daftar Disini
                    </CButton>
                  </router-link>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import fApp from '../firebase'
export default {
  setup() {
    const auth = getAuth(fApp)
    const router = useRouter()
    const handleSubmit = async (e) => {
      const { email, password } = e.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        alert('Anda berhasil Login')
        router.push('/dashboard')
      } catch (e) {
        alert(e.message)
      }
    }
    return { handleSubmit }
  },
}
</script>
