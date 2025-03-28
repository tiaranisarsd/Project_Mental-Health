const appPage = {
    id: {
        nav: {
            beranda: 'Beranda',
            edukasi: 'Edukasi',
            tinjauan: 'Tinjauan',
            loginAdmin: 'Masuk Admin',
            janji: 'Janji Temu',
            users: 'Pengguna',
            btnLogout: 'Keluar',
            title: 'Halaman Admin',
            lang: 'Indonesia'
        },
        footer: {
            title: '© 2025 Pelayanan Publik Digital Kesehatan Mental.',
            desc: 'Layanan ini bukan pengganti konsultasi medis profesional. Hubungi tenaga kesehatan jika membutuhkan bantuan darurat.'
        },
        notFound: {
            pageNotFound: "Halaman Tidak Ditemukan"
        },
        login: {
            password: 'Kata Sandi',
            btn: 'Masuk',
            phEmail: 'Masukkan email Anda',
            phPassword: 'Masukkan kata sandi Anda'
        },
        logout: {
            confirmMessage: "Apakah Anda yakin ingin keluar?"
            
          }
    },
    en: {
        nav: {
            beranda: 'Home',
            edukasi: 'Education',
            tinjauan: 'Review',
            loginAdmin: 'Login Admin',
            janji: 'Appointment',
            users: 'Users',
            btnLogout: 'Logout',
            title: 'Admin Page',
            lang: 'English'
        },
        footer: {
            title: '© 2025 Mental Health Digital Public Service.',
            desc: 'This service is not a substitute for professional medical advice. Contact a health professional if you need emergency help.'
        },
        notFound: {
            pageNotFound: "Page Not Found"
        },
        login: {
            password: 'Password',
            btn: 'Login',
            phEmail: 'Enter your email',
            phPassword: 'Enter your password'
        },
            logout: {
              confirmMessage: "Are you sure you want to log out?"
          }
    }
}

const heroPage = {
    id: {
        hero: {
            title: "Pelayanan Publik Digital Kesehatan Mental",
            subtitle: "Dapatkan Dukungan Kesehatan Mental dengan Mudah dan Cepat",
            description: "Kami menyediakan layanan konsultasi berbasis AI, janji temu dengan profesional, dan edukasi kesehatan mental. Akses layanan kapan saja, di mana saja.",
            konsultasi: "Mulai Konsultasi AI",
            janji : "Buat Janji dengan Psikolog"
        }
    },
    en: {
        hero: {
            title: "Mental Health Digital Public Service",
            subtitle: "Get Mental Health Support Easily and Quickly",
            description: "We provide AI-based consultation services, professional appointments, and mental health education. Access services anytime, anywhere.",
            konsultasi: "Start AI Consulting",
            janji: "Make an Appointment"
        }
    }
}

const edukasiPage = {
    id: {
        edukasi : {
            title : "Edukasi" ,
            titleAdmin : 'Daftar Konten Edukasi',
            titleEditEdukasi: 'Edit Konten Edukasi',
            addEdukasi : "Tambah Data Edukasi",
            konten : "Konten",
            actions : "Aksi",
            confirmDelete: "Apakah Anda yakin ingin menghapus edukasi ini?",
            btnBatal: "Batal",
            btnSimpan: "Simpan"
        }
    },
    en: {
        edukasi : {
            title : "Education" ,
            titleAdmin : 'Educational Content List',
            titleEditEdukasi: 'Edit Educational Content',
            addEdukasi : "Add Educational Data",
            konten : "Content",
            actions : "Actions",
            confirmDelete : "Are you sure you want to delete this education",
            btnBatal: "Cancel",
            btnSimpan: "Save"
        }
    }
}

const tinjauanPage = {
    id: {
        tinjauan : {
            title : "Tinjauan" ,
            nama : "Nama",
            layanan: "Layanan",
            rating: "Penilaian",
            tinjauan: "Tinjauan",
            titleAddTinjauan: "Tambah Tinjauan",
            msg: "Tinjauan berhasil ditambahkan!",
            addButton: "Kirim Tinjauan",
            anonimLabel: "Kirim sebagai Anonim",
            anonim: "Anonim",
            selected: "Pilih Layanan",
            konselingAi: "Konseling AI",
            janji: "Janji Temu Psikolog",
            konten: "Konten Edukasi",
            titleAdmin : "Daftar Tinjauan",
            addTinjauan: "Tambah Data Tinjauan",
            editTinjauan: "Edit Tinjauan",
            actions: "Aksi",
            confirmDelete: "Apakah Anda yakin ingin menghapus tinjauan ini?",
            btnBatal: "Batal",
            btnSimpan: "Simpan"
        }
    },
    en: {
        tinjauan : {
            title : "Review",
            nama : "Name",
            layanan: "Service",
            rating: "Rating",
            tinjauan: "Review",
            titleAddTinjauan: "Add Review",
            msg: "Review successfully added!",
            addButton: "Submit Review",
            anonimLabel: "Send as Anonymous",
            anonim: "Anonymous",
            selected: "Select Service",
            konselingAi: "AI Counseling",
            janji: "Psychologist Appointment",
            konten: "Educational Content",
            titleAdmin : "Review List",
            addTinjauan: "Add Review Data",
            editTinjauan: "Edit Review",
            actions: "Actions",
            confirmDelete: "Are you sure you want to delete this review?",
            btnBatal: "Cancel",
            btnSimpan: "Save"
        }
    }
}

const usersPage = {
    id: {
        users : {
            title : "Daftar Pengguna" ,
            titleAddUser : "Tambah Pengguna Baru",
            titleEditUser : "Edit Pengguna",
            addUser : "Tambah Pengguna",
            nama : "Nama",
            role: "Peran",
            create: "Dibuat Oleh",
            actions: "Aksi",
            confirmDelete: "Apakah Anda yakin ingin menghapus tinjauan ini?",
            password: "Kata Sandi",
            confPassword: "Konfirmasi Kata Sandi",
            pilihRole: "Pilih Peran",
            btnBatal: "Batal",
            btnSimpan: "Simpan"
        }
    },
    en: {
        users : {
            title : "User List" ,
            titleAddUser : "Add New User",
            titleEditUser : "Edit User",
            addUser : "Add User",
            nama : "Name",
            role: "Role",
            create: "Made by",
            actions: "Actions",
            confirmDelete: "Are you sure you want to delete this users?",
            password: "Password",
            confPassword: "Confirm Password",
            pilihRole: "Select Role",
            btnBatal: "Cancel",
            btnSimpan: "Save",
        }
    }
}

const janjiPage = {
    id: {
        janji : {
            title : "Daftar Data Janji Temu Psikolog" ,
            addJanji : "Tambah Janji Temu",
            nama : "Nama",
            noTelp: "Nomor Telepon",
            domisili: "Domisili",
            kategori: "Kategori Pengguna",
            tanggal: "Tanggal",
            tanggalKonsultasi: "Tanggal Konsultasi",
            jenis: "Jenis Konsultasi",
            alasan: "Alasan Konsultasi",
            actions: "Actions",
            confirmDelete: "Apakah Anda yakin ingin menghapus janji temu ini?",
            pasienBaru: "Pasien Baru",
            pasienLama: "Pasien Lama",
            keluarga: "Keluarga Pasien",
            mahasiswaPelajar: "Mahasiswa/Pelajar",
            pekerjaKaryawan: "Pekerja/Karyawan",
            orangTua: "Orang Tua",
            tenagaMedis: "Tenaga Medis",
            lansia: "Lansia",
            penderita: "Penderita Gangguan Mental",
            online: "Online melalui Panggilan Video",
            offline: "Tatap Muka di Klinik",
            chat: "Obrolan Pribadi",
            lainya: "Lainnya",
            btnBatal: "Batal",
            btnSimpan: "Simpan",
            selectedJenis: "Pilih Jenis Konsultasi",
            selectedKategori: "Pilih Kategori Pengguna",
            privacy: "Saya menyetujui kebijakan privasi dan syarat layanan.",
            schedule: "Saya memahami bahwa jadwal dapat berubah sesuai ketersediaan psikolog.",
            msg: "Terima kasih! Janji Anda sudah kami terima. Admin kami akan menghubungi Anda melalui chat dalam waktu dekat. Mohon ditunggu ya!",
            exportPdf: "Cetak PDF"
        }
    },
    en: {
        janji : {
            title : "Psychologist Appointment Data List" ,
            addJanji : "Add Appointment",
            nama : "Name",
            noTelp: "Phone Number",
            domisili: "Domicile",
            kategori: "User Categories",
            tanggalKonsultasi: "Consultation Date",
            tanggal: "Date",
            jenis: "Types of Consultation",
            alasan: "Reason for Consultation",
            actions: "Actions",
            confirmDelete: "Are you sure you want to delete this appointment?",
            pasienBaru: "New Patient",
            pasienLama: "Old Patient",
            keluarga: "Patient Family",
            mahasiswaPelajar: "Students",
            pekerjaKaryawan: "Worker/Employee",
            orangTua: "Parent",
            tenagaMedis: "Medical personnel",
            lansia: "Elderly",
            penderita: "People with Mental Disorders",
            online: "Online via Video Call",
            offline: "Face to Face at the Clinic",
            lainya: "Other",
            chat: "Private Chat",
            btnBatal: "Cancel",
            btnSimpan: "Save",
            selectedJenis: "Select Consultation Type",
            selectedKategori: "Select User Category",
            privacy: "I agree to the privacy policy and terms of service.",
            schedule: "I understand that the schedule may change depending on the availability of the psychologist.",
            msg: "Thank you! We have received your promise. Our admin will contact you via chat soon. Please wait!",
            exportPdf: "Print PDF"
        }
    }
}



const content = {
    appPage,
    heroPage,
    edukasiPage,
    tinjauanPage,
    usersPage,
    janjiPage
}

export {
    appPage,
    heroPage,
    edukasiPage,
    tinjauanPage,
    usersPage,
    janjiPage
}

export default content