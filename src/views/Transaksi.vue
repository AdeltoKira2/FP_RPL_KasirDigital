<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Transaksi</strong>
    </CCardHeader>
    <CCardBody>
      <span>ID Transaksi (Tekan Sebelum Memulai Transaksi Baru)</span>
      <div class="flexbt1">
        <span id="idT">null</span>
        <CButton class="marginpx" size="sm" color="primary" @click="addT"
          >Transaksi Baru</CButton
        >
      </div>
      <hr />
      <CTable color="dark" borderless id="printThis">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
            <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
            <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody v-for="tr in { dataT }" :key="tr.id">
          <CTableRow v-for="(item, key) in tr.namaBarang" :key="key">
            <CTableDataCell>{{ item }}</CTableDataCell>
            <CTableDataCell>{{ tr.qty[key] }}</CTableDataCell>
            <CTableDataCell>{{ tr.hargaBarang[key] }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CForm>
        <CRow class="mb-3">
          <CFormLabel for="idbarang" class="col-sm-2 col-form-label-sm">
            ID Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput
              placeholder="ID Barang"
              id="idbarang"
              v-model="idb"
              @change="getBarang($event)"
            />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="nmbarang" class="col-sm-2 col-form-label-sm">
            Nama Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Nama Barang" id="nmbarang1" />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="jml" class="col-sm-2 col-form-label-sm">
            Jumlah
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Jumlah" id="jml" />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="hgbarang" class="col-sm-2 col-form-label-sm">
            Harga Barang
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Harga Barang" id="hgbarang1" />
          </CCol>
        </CRow>
        <hr />
        <div class="flexbt">
          <CButton class="marginl" color="dark" @click="addItem"
            >Tambahkan</CButton
          >
        </div>
      </CForm>
    </CCardBody>
  </CCard>

  <CCard class="mb-4">
    <CCardHeader>
      <strong>Total Harga</strong>
    </CCardHeader>
    <CCardBody>
      <CForm>
        <CRow class="mb-3">
          <CFormLabel for="total" class="col-sm-2 col-form-label-sm">
            Total Harga
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Total Harga" id="total" disabled />
          </CCol>
        </CRow>
        <CRow class="mb-3">
          <CFormLabel for="bayar" class="col-sm-2 col-form-label-sm">
            Uang yang Dibayarkan
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Uang yang Dibayarkan" id="bayar" />
          </CCol>
        </CRow>
        <CRow>
          <CFormLabel for="kembalian" class="col-sm-2 col-form-label-sm">
            Kembalian
          </CFormLabel>
          <CCol :sm="10">
            <CFormInput placeholder="Kembalian" id="kembalian" disabled />
          </CCol>
        </CRow>
        <br />
        <hr />
        <div class="flexbt">
          <CButton class="marginl" color="dark" @click="selesai"
            >Selesaikan</CButton
          >
        </div>
      </CForm>
    </CCardBody>
  </CCard>
</template>

<script>
import {
  getFirestore,
  getDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore'
import fApp from '../firebase'

const db = getFirestore(fApp)
let wb = writeBatch(db)
export default {
  name: 'Transaksi',
  data() {
    return {
      dataT: '',
      dataB: '',
      idT: '6HyxZ3nm9i0e9UpcR89F',
      totalHarga: 0,
      uangBayar: 0,
      uangKembali: 0,
      latestStok: 0,
    }
  },
  methods: {
    async getBarang(event) {
      try {
        const dataB = await getDoc(doc(db, 'barang', event.target.value))
        const barangData = dataB.data()
        document.getElementById('nmbarang1').value = barangData.namaBarang
        document.getElementById('hgbarang1').value = barangData.harga
        this.latestStok = barangData.stok
      } catch (error) {
        alert(error.message)
      }
    },
    async addT() {
      try {
        const dataB = await addDoc(collection(db, 'transaksi'), {
          namaBarang: [],
          hargaBarang: [],
          qty: [],
          totalHarga: 0,
          uangBayar: 0,
          uangKembali: 0,
          timesamp: serverTimestamp(),
        })
        this.idT = dataB.id
        onSnapshot(doc(db, 'transaksi', this.idT), (doc) => {
          this.dataT = doc.data()
        })
        document.getElementById('idT').innerHTML = dataB.id
        document.getElementById('total').value = ''
        this.totalHarga = 0
      } catch (error) {
        alert(error.message)
      }
    },
    async addItem() {
      try {
        const nmb = document.getElementById('nmbarang1').value
        const hgb = document.getElementById('hgbarang1').value
        const jml = document.getElementById('jml').value
        const idBrg = document.getElementById('idbarang').value
        const newStok = this.latestStok - jml
        this.totalHarga = this.totalHarga + hgb * jml
        await updateDoc(doc(db, 'transaksi', this.idT), {
          namaBarang: arrayUnion(nmb),
          hargaBarang: arrayUnion(hgb),
          qty: arrayUnion(jml),
          totalHarga: this.totalHarga,
        })
        wb.update(doc(db, 'barang', idBrg), { stok: newStok })
        document.getElementById('idbarang').value = ''
        document.getElementById('nmbarang1').value = ''
        document.getElementById('hgbarang1').value = ''
        document.getElementById('jml').value = ''
        document.getElementById('total').value = this.totalHarga
      } catch (error) {
        alert(error.message)
      }
    },
    async selesai() {
      try {
        this.uangBayar = document.getElementById('bayar').value
        this.uangKembali = this.uangBayar - this.totalHarga
        await updateDoc(doc(db, 'transaksi', this.idT), {
          totalHarga: this.totalHarga,
          uangBayar: this.uangBayar,
          uangKembali: this.uangKembali,
        })
        document.getElementById('kembalian').value = this.uangKembali
        wb.commit()
        wb = writeBatch(db)
        alert('Transaksi Berhasil')
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>
