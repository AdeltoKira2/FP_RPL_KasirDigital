<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <span class="h3"> Kasir Digital Online</span>
      <div class="flexbt">
        <CButton color="danger" @click="signOutUser">Sign out</CButton>
      </div>
    </CContainer>
  </CHeader>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
export default {
  name: 'AppHeader',
  setup() {
    const { user } = useAuthState()
    const auth = getAuth()
    const router = useRouter()
    const signOutUser = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (e) {
        alert(e.message)
      }
    }
    return { user, signOutUser }
  },
}
</script>
