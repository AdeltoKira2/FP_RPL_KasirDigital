<script setup>
import { useCollection } from 'vuefire'
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore'
import fApp from '../firebase'

const database = getFirestore(fApp)

const addBarang = async (item) => {
  const { idbrg, namaBarang, harga, stok } = item.target.elements
  const idb = idbrg.value
  try {
    await setDoc(doc(database, 'barang', idb), {
      namaBarang: namaBarang.value,
      harga: harga.value,
      stok: stok.value,
    })
    idbrg.value = ''
    namaBarang.value = ''
    harga.value = ''
    stok.value = ''
  } catch (error) {
    alert(error.message)
  }
}
</script>

<script>
import { deleteDoc, getDoc } from 'firebase/firestore'

const db = getFirestore(fApp)
const barang = useCollection(collection(db, 'barang'))
export default {
  name: 'Manajemen',
  data() {
    return {
      filter: '',
      filterb: barang,
    }
  },
  methods: {
    async deleteBarang(id) {
      try {
        await deleteDoc(doc(db, 'barang', id))
        alert('data berhasil dihapus')
      } catch (error) {
        alert(error.message)
      }
    },
    async editBarang(id) {
      try {
        const dataBarang = await getDoc(doc(db, 'barang', id))
        const dbarang = dataBarang.data()
        document.getElementById('idbrg').value = id
        document.getElementById('namaBarang').value = dbarang.namaBarang
        document.getElementById('harga').value = dbarang.harga
        document.getElementById('stok').value = dbarang.stok
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        alert(error.message)
      }
    },
  },
  computed: {
    filterBarang() {
      return this.filterb.filter((item) => {
        const id = item.id.toString().toLowerCase()
        const nama = item.namaBarang.toLowerCase()
        const searchTerm = this.filter.toLowerCase()

        return id.includes(searchTerm) || nama.includes(searchTerm)
      })
    },
  },
}
</script>

<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Manajemen Produk</strong>
    </CCardHeader>
    <CCardBody>
      <CForm @submit.prevent="addBarang" ref="frmBarang">
        <CRow class="mb-3">
          <CFormLabel for="idbarang" class="col-sm-2 col-form-label-sm">
            ID Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="ID Barang" id="idbrg" />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="nmbarang" class="col-sm-2 col-form-label-sm">
            Nama Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Nama Barang" id="namaBarang" />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="hgbarang" class="col-sm-2 col-form-label-sm">
            Harga Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Harga Barang" id="harga" />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="stokbarang" class="col-sm-2 col-form-label-sm">
            Stok Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Stok Barang" id="stok" />
          </CCol>
        </CRow>
        <hr />
        <div class="flexbt">
          <CButton class="marginl" color="dark" type="submit"
            >Tambahkan
          </CButton>
        </div>
      </CForm>
    </CCardBody>
  </CCard>
  <CCard class="mb-4 heightBarang">
    <CCardHeader>
      <strong>Tabel Produk</strong>
      <CFormInput
        placeholder="Pencarian Barang, Masukan ID atau Nama Barang"
        size="sm"
        id="filter"
        v-model="filter"
      />
      <hr />
      <CTable color="primary" class="sizeL">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Nama Barang</CTableHeaderCell>
            <CTableHeaderCell class="padL">Harga</CTableHeaderCell>
            <CTableHeaderCell class="padL">Stok</CTableHeaderCell>
            <CTableHeaderCell class="padC">Edit/Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </CCardHeader>
    <CCardBody class="heightTableb">
      <CTable color="dark" borderless>
        <CTableBody>
          <CTableRow v-for="item in filterBarang" :key="item.id">
            <CTableHeaderCell scope="row">{{ item.id }}</CTableHeaderCell>
            <CTableDataCell>{{ item.namaBarang }}</CTableDataCell>
            <CTableDataCell>{{ item.harga }}</CTableDataCell>
            <CTableDataCell>{{ item.stok }}</CTableDataCell>
            <CTableDataCell class="padL">
              <CButton color="success" @click="editBarang(item.id)"
                >Edit</CButton
              >
              <CButton
                class="marginBt"
                color="danger"
                @click="deleteBarang(item.id)"
                >Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
</template>

<!-- <script>
export default {
  name: 'Manajemen',
}
</script> -->
