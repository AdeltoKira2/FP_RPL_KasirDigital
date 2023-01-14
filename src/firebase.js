import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBLcDS4b4WBSWOSpA9ThfifPNg3iT4x85o',
  authDomain: 'kasdigitalvue.firebaseapp.com',
  projectId: 'kasdigitalvue',
  storageBucket: 'kasdigitalvue.appspot.com',
  messagingSenderId: '129321784242',
  appId: '1:129321784242:web:5486a3704f1c6e9789caab',
}

const fApp = initializeApp(firebaseConfig)
const db = getFirestore(fApp)

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(fApp), resolve, reject),
  )

export const useAuthState = () => {
  const user = ref(null)
  const error = ref(null)

  const auth = getAuth(fApp)
  let unsubscribe
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e),
    )
  })
  onUnmounted(() => unsubscribe())

  const isAuthenticated = computed(() => user.value != null)

  return { user, error, isAuthenticated }
}

export { fApp, db }
