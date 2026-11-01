import type { PersonSet, Question } from '../lib/debate';

const PERSONS = ['Edi', 'Ridwan', 'Susanto', 'Suprapti', 'Eka', 'Jumiati'] as const;

type Person = (typeof PERSONS)[number];
type Role = 'duit semilyar' | 'urip kepenak' | 'Kamulyan jagad';

const PERSON_FOCUS: Record<Person, string> = {
  Edi: 'iktikad baik & perlindungan penguasa beritikad baik',
  Ridwan: 'beban pembuktian & kekuatan alat bukti',
  Susanto: 'pendudukan nyata / penguasaan fisik sebagai fakta hukum',
  Suprapti: 'cacat formil vs cacat materiil & hierarki norma',
  Eka: 'perlindungan pihak ketiga yang beritikad baik',
  Jumiati: 'sistem pendaftaran tanah & kekuatan register negara',
};

interface ClusterDef {
  id: number;
  role: Role;
  questions: Record<Person, [string, string]>;
}

const clusters: ClusterDef[] = [
  { id: 1, role: 'duit semilyar', questions: {
    Edi: ['Bagaimana iktikad baik dipertimbangkan bila naskah baru lahir belakangan?', 'Apakah perlindungan bagi penguasa beritikad baik harus tetap dijaga?'],
    Ridwan: ['Bagaimana beban pembuktian ditentukan bila naskah baru lahir belakangan?', 'Apakah alat bukti lama lebih kuat dari naskah yang lahir kemudian?'],
    Susanto: ['Apakah pendudukan nyata yang lama tetap bernilai hukum meski naskah baru muncul?', 'Bagaimana pendudukan fisik lama dipertimbangkan bila naskah datang belakangan?'],
    Suprapti: ['Apakah keterlambatan penerbitan naskah termasuk cacat formil atau materiil?', 'Bagaimana membedakan cacat formil dan cacat materiil dalam sengketa ini?'],
    Eka: ['Bagaimana perlindungan pihak ketiga dijaga saat naskah baru lahir belakangan?', 'Apakah kepentingan pihak ketiga beritikad baik harus diprioritaskan?'],
    Jumiati: ['Bagaimana register negara dipertimbangkan bila naskah baru lahir belakangan?', 'Apakah data pendaftaran tanah lebih kuat dari naskah yang baru muncul?'],
  } },
  { id: 2, role: 'duit semilyar', questions: {
    Edi: ['Apakah penguasaan lahan lama dengan iktikad baik layak dilindungi?', 'Apakah penguasaan lama tanpa naskah bisa menjadi dasar perlindungan hukum?'],
    Ridwan: ['Apakah penguasaan lama tanpa naskah dapat menggeser beban pembuktian?', 'Sejauh mana penguasaan lama dapat menjadi bukti prima facie?'],
    Susanto: ['Apakah pendudukan lahan lama tanpa naskah dapat berdiri sebagai fakta hukum?', 'Apakah pendudukan fisik selama bertahun-tahun dapat berdiri sendiri di hadapan hukum?'],
    Suprapti: ['Apakah cacat formil dapat ditutup oleh penguasaan lama?', 'Bagaimana penguasaan lama memengaruhi cacat formil versus materiil?'],
    Eka: ['Apakah pihak ketiga yang mengandalkan penguasaan terlihat harus dilindungi?', 'Bagaimana perlindungan pihak ketiga dihitung saat penguasaan lama terbuka?'],
    Jumiati: ['Apakah data register negara dapat dikalahkan oleh penguasaan lama?', 'Apakah penguasaan lama dapat menggeser kekuatan register negara?'],
  } },
  { id: 3, role: 'duit semilyar', questions: {
    Edi: ['Dapatkah kelalaian administrasi menghapus perlindungan iktikad baik?', 'Apakah kelalaian tata usaha otomatis meniadakan perlindungan hukum?'],
    Ridwan: ['Apakah kelalaian tata usaha otomatis memindahkan beban pembuktian?', 'Sejauh mana kelalaian administrasi memperberat pembuktian pihak yang mengajukan?'],
    Susanto: ['Apakah kelalaian administrasi menghapus nilai hukum pendudukan fisik yang sudah terbentuk?', 'Apakah fakta pendudukan lama tetap berlaku meskipun tata usaha terlambat?'],
    Suprapti: ['Apakah kelalaian tata usaha hanya cacat formil semata?', 'Apakah cacat formil bisa meniadakan hak materiil yang sudah terbentuk?'],
    Eka: ['Apakah kelalaian tata usaha merugikan pihak ketiga beritikad baik?', 'Apakah kepentingan pihak ketiga harus dipertahankan meski tata usaha terlambat?'],
    Jumiati: ['Apakah data pendaftaran tanah bisa dihapus karena kelalaian administrasi?', 'Apakah register negara kehilangan kekuatan bila tata usaha terlambat?'],
  } },
  { id: 4, role: 'duit semilyar', questions: {
    Edi: ['Ketika bukti saling bertentangan, apa yang lebih menentukan: iktikad baik atau naskah?', 'Bagaimana panel hakim memilih bukti yang patut dilindungi?'],
    Ridwan: ['Siapa yang paling berat memikul pembuktian ketika bukti saling berlawanan?', 'Bagaimana bobot bukti dibandingkan dalam konflik dokumen?'],
    Susanto: ['Bagaimana fakta pendudukan fisik dinilai bila dokumen saling bertentangan?', 'Apakah pendudukan nyata lebih konkret daripada bukti dokumen yang saling berlawanan?'],
    Suprapti: ['Bagaimana membedakan bukti cacat formil dan materiil?', 'Apakah hierarki bukti menentukan akibat hukum yang ditetapkan?'],
    Eka: ['Bagaimana pihak ketiga yang tidak terlibat harus dilindungi?', 'Apakah kepentingan pihak ketiga lebih penting daripada klaim internal para pihak?'],
    Jumiati: ['Apakah data pendaftaran tanah harus dijadikan acuan utama?', 'Bagaimana register negara dibanding bukti di luar sistem pendaftaran?'],
  } },
  { id: 5, role: 'duit semilyar', questions: {
    Edi: ['Apakah perbuatan tak tertulis dapat dilindungi karena iktikad baik?', 'Apakah peralihan tanpa naskah tetap sah bila ada itikad baik?'],
    Ridwan: ['Apakah perbuatan tak tertulis cukup untuk menggeser pembuktian?', 'Bagaimana bukti tidak tertulis menilai beban pembuktian?'],
    Susanto: ['Apakah perbuatan tak tertulis dapat dibuktikan melalui pendudukan nyata?', 'Apakah pendudukan fisik dapat menjadi bukti peralihan yang sah?'],
    Suprapti: ['Apakah ketiadaan bentuk tertulis hanya cacat formil?', 'Apakah substansi hak tetap sah meski bentuk tertulis tidak ada?'],
    Eka: ['Apakah pihak ketiga yang mengandalkan perbuatan tak tertulis harus dilindungi?', 'Apakah kepentingan pihak ketiga beritikad baik harus dijaga?'],
    Jumiati: ['Apakah perbuatan tak tertulis dapat mengalahkan data register negara?', 'Apakah perbuatan tak tertulis dapat diakui meski tidak tercatat?'],
  } },
  { id: 6, role: 'duit semilyar', questions: {
    Edi: ['Apakah hakim wajib menelusuri iktikad baik sebelum menilai naskah belakangan?', 'Apakah sejarah peralihan harus ditelusuri sebelum menilai naskah baru?'],
    Ridwan: ['Apakah rangkaian pembuktian historis harus ditelusuri lebih dulu?', 'Bagaimana beban pembuktian ditentukan setelah menilai sejarah?'],
    Susanto: ['Apakah fakta pendudukan historis harus ditelusuri sebelum menilai naskah baru?', 'Apakah pendudukan nyata masa lalu memengaruhi bobot naskah baru?'],
    Suprapti: ['Apakah cacat formil atau materiil harus ditelusuri lebih dahulu?', 'Bagaimana hierarki cacat formil dan materiil dinilai dalam sejarah?'],
    Eka: ['Apakah dampak peralihan historis terhadap pihak ketiga harus ditelusuri?', 'Bagaimana perlindungan pihak ketiga dianalisis dalam konteks sejarah?'],
    Jumiati: ['Apakah data pendaftaran tanah harus diperiksa sebelum menilai naskah baru?', 'Bagaimana register negara dipertimbangkan dalam sejarah peralihan?'],
  } },
  { id: 7, role: 'duit semilyar', questions: {
    Edi: ['Bagaimana kesaksian masyarakat setempat membuktikan iktikad baik?', 'Apakah keterangan lokal dapat membuktikan niat baik peralihan lisan?'],
    Ridwan: ['Bagaimana keterangan lokal dipertimbangkan sebagai alat bukti?', 'Apakah kesaksian orang setempat memenuhi standar pembuktian?'],
    Susanto: ['Bagaimana kesaksian lokal membuktikan pendudukan nyata masa lalu?', 'Apakah keterangan setempat dapat menguatkan pendudukan fisik?'],
    Suprapti: ['Bagaimana kesaksian lokal menutup cacat formil tanpa naskah?', 'Apakah substansi peralihan tetap sah meski formalitas tidak lengkap?'],
    Eka: ['Apakah keterangan lokal dapat melindungi pihak ketiga beritikad baik?', 'Bagaimana masyarakat setempat memengaruhi perlindungan pihak ketiga?'],
    Jumiati: ['Apakah data pendaftaran tanah dapat dibantah oleh kesaksian lokal?', 'Bagaimana register negara dipertimbangkan bila ada keterangan lokal?'],
  } },
  { id: 8, role: 'duit semilyar', questions: {
    Edi: ['Apakah tidak adanya sertifikat menghilangkan perlindungan hukum?', 'Apakah tidak sertifikasi otomatis meniadakan kedudukan penguasa beritikad baik?'],
    Ridwan: ['Apakah ketiadaan sertifikat menggeser beban pembuktian?', 'Bagaimana tidak ada sertifikat memengaruhi pembuktian formal?'],
    Susanto: ['Apakah ketiadaan sertifikat menghilangkan nilai hukum pendudukan nyata?', 'Apakah pendudukan fisik tetap memiliki nilai hukum meski tidak sertifikasi?'],
    Suprapti: ['Apakah ketidaksertafikatan hanya cacat formil?', 'Apakah substansi hak tetap berlaku meski sertifikat tidak ada?'],
    Eka: ['Apakah tidak ada sertifikat merugikan pihak ketiga beritikad baik?', 'Bagaimana perlindungan pihak ketiga dipertahankan tanpa sertifikat?'],
    Jumiati: ['Apakah sistem pendaftaran tanah tetap kuat tanpa sertifikat?', 'Apakah tidak ada sertifikat menghapus kekuatan register negara?'],
  } },
  { id: 9, role: 'duit semilyar', questions: {
    Edi: ['Bagaimana hakim menilai konflik antara penguasaan lama dan naskah baru?', 'Apakah iktikad baik penguasa lama lebih kuat dari naskah baru?'],
    Ridwan: ['Bagaimana beban dan kekuatan pembuktian dinilai dalam konflik itu?', 'Apakah pembuktian lama lebih menentukan daripada naskah belakangan?'],
    Susanto: ['Bagaimana fakta pendudukan lama dibanding naskah yang baru terbit?', 'Apakah pendudukan fisik harus diberi bobot lebih besar?'],
    Suprapti: ['Apakah konflik itu berupa cacat formil atau materiil?', 'Bagaimana membedakan masalah formil dan substansi dalam konflik ini?'],
    Eka: ['Bagaimana perlindungan pihak ketiga dipertimbangkan?', 'Apakah pihak ketiga beritikad baik harus dilindungi dari konflik ini?'],
    Jumiati: ['Bagaimana register negara dibanding naskah belakangan?', 'Apakah data sistem pendaftaran lebih kuat dari naskah baru?'],
  } },
  { id: 10, role: 'duit semilyar', questions: {
    Edi: ['Apakah pembayaran kewajiban bertahun-tahun memperkuat iktikad baik?', 'Apakah jejak pembayaran dapat memperkuat perlindungan hukum?'],
    Ridwan: ['Apakah pembayaran bertahun-tahun dapat menggeser beban pembuktian?', 'Sejauh mana jejak pembayaran memperkuat kekuatan pembuktian?'],
    Susanto: ['Apakah pembayaran bertahun-tahun memperkuat fakta pendudukan nyata?', 'Apakah pendudukan fisik memiliki nilai hukum lebih besar karena jejak pembayaran?'],
    Suprapti: ['Apakah jejak pembayaran menutup cacat formil?', 'Apakah jejak pembayaran menunjukkan bahwa yang ada hanya cacat formil?'],
    Eka: ['Apakah jejak pembayaran melindungi pihak ketiga beritikad baik?', 'Apakah perlindungan pihak ketiga diperkuat oleh pembayaran lama?'],
    Jumiati: ['Apakah data register negara dapat dipertahankan dengan pembayaran lama?', 'Apakah jejak pembayaran dapat mendukung kedudukan di luar register?'],
  } },
  { id: 11, role: 'urip kepenak', questions: {
    Edi: ['Apakah pencatatan negara menciptakan hak baru atau sekadar menegaskan yang sudah ada?', 'Bagaimana pencatatan memengaruhi perlindungan iktikad baik?'],
    Ridwan: ['Apakah pencatatan negara hanya memperkuat bukti lama?', 'Bagaimana pencatatan memengaruhi alat bukti yang ada?'],
    Susanto: ['Apakah pencatatan negara sekadar merekam pendudukan fisik yang sudah ada?', 'Apakah sistem pendaftaran hanya mengafirmasi fakta pendudukan nyata?'],
    Suprapti: ['Apakah pencatatan negara hanya menutup cacat formil?', 'Apakah pencatatan mengubah substansi hak yang sudah terbentuk?'],
    Eka: ['Apakah pencatatan negara melindungi pihak ketiga yang mengandalkan data resmi?', 'Bagaimana data resmi memengaruhi kepastian pihak ketiga?'],
    Jumiati: ['Apakah pencatatan dalam register negara hanya mengukuhkan data yang ada?', 'Bagaimana pendaftaran tanah memengaruhi kebenaran data negara?'],
  } },
  { id: 12, role: 'urip kepenak', questions: {
    Edi: ['Bagaimana membedakan cacat yang merusak iktikad baik dan yang hanya prosedural?', 'Apakah cacat administratif otomatis menghapus perlindungan?'],
    Ridwan: ['Bagaimana membedakan cacat pembuktian dengan cacat prosedural?', 'Apakah cacat administratif mengubah kekuatan alat bukti?'],
    Susanto: ['Bagaimana membedakan cacat yang mengganggu pendudukan nyata dan yang hanya prosedural?', 'Apakah cacat administratif menghapus fakta pendudukan?'],
    Suprapti: ['Bagaimana membedakan cacat materiil dan formil?', 'Apakah cacat formil dapat dipisahkan dari substansi hak?'],
    Eka: ['Bagaimana membedakan cacat yang merugikan pihak ketiga dan yang hanya prosedural?', 'Apakah cacat administratif berdampak pada pihak ketiga?'],
    Jumiati: ['Bagaimana membedakan cacat yang merusak register negara dari yang bersifat administratif?', 'Apakah cacat prosedural menghapus kekuatan pencatatan?'],
  } },
  { id: 13, role: 'urip kepenak', questions: {
    Edi: ['Apabila regulasi pelaksana bertentangan dengan norma pokok, mana yang harus diprioritaskan?', 'Bagaimana hakim menentukan norma yang lebih harus dijunjung?'],
    Ridwan: ['Apabila norma pembuktian bertentangan dengan aturan pelaksana, mana yang mesti diutamakan?', 'Bagaimana beban pembuktian ditentukan dalam konflik norma?'],
    Susanto: ['Apabila aturan pelaksana bertentangan dengan norma pengakuan pendudukan nyata, mana yang diprioritaskan?', 'Apakah norma tentang pendudukan fisik harus didahulukan?'],
    Suprapti: ['Apabila norma hierarki cacat formil dan materiil bertentangan dengan aturan pelaksana, mana yang diutamakan?', 'Bagaimana hakim menyelesaikan konflik antara norma dan aturan pelaksana?'],
    Eka: ['Apabila regulasi bertentangan dengan norma perlindungan pihak ketiga, mana yang harus diutamakan?', 'Bagaimana perlindungan pihak ketiga diatur bila terdapat konflik norma?'],
    Jumiati: ['Apabila aturan pelaksana bertentangan dengan prinsip register negara, mana yang harus diutamakan?', 'Bagaimana register negara dihormati di atas aturan pelaksana yang bertentangan?'],
  } },
  { id: 14, role: 'urip kepenak', questions: {
    Edi: ['Apakah iktikad baik lebih menentukan daripada naskah resmi?', 'Dalam sengketa lahan, apakah perlindungan penguasa beritikad baik lebih kuat?'],
    Ridwan: ['Apakah kekuatan pembuktian lebih menentukan daripada naskah formal?', 'Apakah beban pembuktian lebih penting daripada dokumen semata?'],
    Susanto: ['Apakah penguasaan aktual lebih menentukan daripada naskah formal?', 'Apakah pendudukan nyata lebih berbobot daripada naskah tanpa penguasaan?'],
    Suprapti: ['Apakah keabsahan materiil lebih menentukan daripada formil semata?', 'Bagaimana substansi hak dijaga dari formalitas semata?'],
    Eka: ['Apakah perlindungan pihak ketiga lebih menentukan daripada naskah internal?', 'Apakah kepentingan pihak ketiga beritikad baik lebih berharga?'],
    Jumiati: ['Apakah data register negara lebih menentukan daripada naskah di luar sistem?', 'Apakah kekuatan data negara lebih kuat daripada naskah non-register?'],
  } },
  { id: 15, role: 'urip kepenak', questions: {
    Edi: ['Bagaimana hukum menilai penguasa yang beritikad baik tanpa naskah?', 'Apakah penguasaan tanpa naskah tetap mendapat perlindungan?'],
    Ridwan: ['Bagaimana pembuktian dinilai bila tidak ada naskah resmi?', 'Apakah beban pembuktian berubah bila penguasaan lama tanpa naskah?'],
    Susanto: ['Bagaimana hukum menilai pendudukan nyata tanpa naskah?', 'Apakah pendudukan fisik tetap mempunyai bobot hukum?'],
    Suprapti: ['Apakah ketiadaan naskah termasuk cacat formil atau materiil?', 'Bagaimana substansi hak dipertahankan bila formil tidak lengkap?'],
    Eka: ['Bagaimana perlindungan pihak ketiga atas penguasaan tanpa naskah?', 'Apakah kepentingan pihak ketiga beritikad baik tetap dijaga?'],
    Jumiati: ['Bagaimana kedudukan di hadapan register negara tanpa naskah?', 'Apakah data pendaftaran tanah masih menjadi acuan utama?'],
  } },
  { id: 16, role: 'urip kepenak', questions: {
    Edi: ['Apakah naskah resmi dapat dikalahkan oleh iktikad baik penguasa lama?', 'Apakah perlindungan iktikad baik dapat mengalahkan naskah yang kuat?'],
    Ridwan: ['Apakah naskah resmi dapat digugurkan oleh pembuktian lawan?', 'Bagaimana beban pembuktian bergeser bila ada bukti penguasaan lawan?'],
    Susanto: ['Apakah naskah resmi dapat dikalahkan oleh pendudukan nyata lawan?', 'Apakah pendudukan fisik lama lebih kuat daripada naskah formal?'],
    Suprapti: ['Apakah cacat materiil dapat mengalahkan naskah formal?', 'Bagaimana cacat materiil ditimbang terhadap keabsahan formil?'],
    Eka: ['Apakah perlindungan pihak ketiga dapat menutup kekuatan naskah?', 'Apakah kepentingan pihak ketiga lebih penting daripada naskah formal?'],
    Jumiati: ['Apakah register negara dapat mengalahkan naskah yang tidak sesuai data?', 'Bagaimana data register menilai naskah yang bertentangan?'],
  } },
  { id: 17, role: 'urip kepenak', questions: {
    Edi: ['Seberapa jauh formalitas naskah dapat menutup perlindungan iktikad baik?', 'Apakah naskah formal tetap mengesampingkan penguasa beritikad baik?'],
    Ridwan: ['Seberapa jauh formalitas naskah dapat menggeser beban pembuktian?', 'Apakah daya ikat naskah lebih kuat dari penguasaan nyata?'],
    Susanto: ['Seberapa jauh formalitas naskah dapat menutup fakta pendudukan nyata?', 'Apakah nilai hukum pendudukan fisik bisa diabaikan oleh naskah formal?'],
    Suprapti: ['Seberapa jauh formalitas naskah dapat menutup perbedaan formil dan materiil?', 'Apakah formalitas dapat menghapus pembedaan antara formil dan substansi?'],
    Eka: ['Seberapa jauh formalitas naskah dapat menutup perlindungan pihak ketiga?', 'Apakah kepentingan pihak ketiga tetap dilindungi meski naskah formal kuat?'],
    Jumiati: ['Seberapa jauh formalitas naskah dapat menutup data register negara?', 'Apakah register negara tetap diberi bobot tinggi?'],
  } },
  { id: 18, role: 'urip kepenak', questions: {
    Edi: ['Bagaimana hakim menilai klaim pihak baru yang membawa naskah terhadap pihak lama?', 'Apakah penguasa lama tetap dilindungi meski pihak baru membawa naskah?'],
    Ridwan: ['Bagaimana beban pembuktian dinilai terhadap penggugat baru yang membawa naskah?', 'Apakah pihak lama tetap memiliki beban yang lebih ringan?'],
    Susanto: ['Bagaimana fakta pendudukan lama dibanding klaim pihak baru dengan naskah?', 'Apakah pendudukan fisik lama lebih kuat daripada klaim naskah baru?'],
    Suprapti: ['Bagaimana membedakan cacat formil dan materiil dalam klaim baru?', 'Apakah subtansi hak pihak lama lebih dijaga dibanding naskah baru?'],
    Eka: ['Bagaimana perlindungan pihak ketiga dipertimbangkan dalam klaim baru?', 'Apakah pihak ketiga beritikad baik harus dilindungi dari tuntutan baru?'],
    Jumiati: ['Bagaimana register negara menilai klaim baru dengan naskah?', 'Apakah data lama dalam register tetap dipertimbangkan?'],
  } },
  { id: 19, role: 'urip kepenak', questions: {
    Edi: ['Apakah naskah yang lahir kemudian dapat mengganti kedudukan penguasa lama?', 'Apakah naskah kemudian dapat menutup perlindungan hukum penguasa lama?'],
    Ridwan: ['Apakah naskah kemudian dapat menggeser beban pembuktian?', 'Apakah naskah baru dapat mengubah kekuatan pembuktian pihak lama?'],
    Susanto: ['Apakah naskah kemudian dapat menggeser fakta pendudukan nyata?', 'Apakah pendudukan fisik lama tetap bernilai meski naskah baru terbit?'],
    Suprapti: ['Apakah naskah kemudian hanya menutup cacat formil atau juga mengubah substansi?', 'Apakah naskah baru dapat membatalkan hak materiil lama?'],
    Eka: ['Apakah hak pihak ketiga lama dapat terhapus karena naskah baru?', 'Apakah kepentingan pihak ketiga beritikad baik harus tetap dijaga?'],
    Jumiati: ['Apakah naskah baru dapat menggeser data register negara?', 'Apakah register negara tetap lebih kuat dari naskah baru?'],
  } },
  { id: 20, role: 'urip kepenak', questions: {
    Edi: ['Apakah hakim boleh mengabaikan iktikad baik hanya karena naskah belum lengkap?', 'Dalam sengketa, apakah perlindungan iktikad baik dapat diabaikan?'],
    Ridwan: ['Apakah hakim boleh mengabaikan pembuktian lama hanya karena naskah belum lengkap?', 'Apakah beban pembuktian dapat dihapus hanya karena formalitas belum lengkap?'],
    Susanto: ['Apakah hakim boleh mengabaikan pendudukan nyata hanya karena naskah belum lengkap?', 'Apakah pendudukan fisik lama bisa dihapus hanya karena formalitas tidak lengkap?'],
    Suprapti: ['Apakah hak materiil bisa diabaikan hanya karena ada cacat formil?', 'Apakah substansi hak harus dikalahkan oleh formalitas yang belum lengkap?'],
    Eka: ['Apakah perlindungan pihak ketiga dapat diabaikan karena naskah belum lengkap?', 'Apakah kepentingan pihak ketiga beritikad baik dapat diabaikan?'],
    Jumiati: ['Apakah data register negara dapat diabaikan hanya karena naskah lain belum lengkap?', 'Apakah register negara bisa ditinggalkan demi naskah yang belum lengkap?'],
  } },
  { id: 21, role: 'Kamulyan jagad', questions: {
    Edi: ['Sejauh mana jarak waktu memengaruhi perlindungan iktikad baik?', 'Apakah tenggang waktu meningkatkan atau menurunkan bobot perlindungan?'],
    Ridwan: ['Sejauh mana rentang waktu memengaruhi beban dan kekuatan pembuktian?', 'Apakah jarak waktu mengubah bobot pembuktian naskah?'],
    Susanto: ['Sejauh mana rentang waktu memengaruhi nilai pendudukan nyata?', 'Apakah pendudukan fisik selama tenggang waktu memperoleh bobot hukum?'],
    Suprapti: ['Sejauh mana rentang waktu memengaruhi cacat formil dan materiil?', 'Apakah keterlambatan lebih bersifat formil atau materiil?'],
    Eka: ['Sejauh mana rentang waktu memengaruhi perlindungan pihak ketiga?', 'Apakah kepentingan pihak ketiga berubah karena tenggang waktu?'],
    Jumiati: ['Sejauh mana jarak waktu memengaruhi register negara?', 'Apakah data pendaftaran tanah berubah karena ada tenggang waktu?'],
  } },
  { id: 22, role: 'Kamulyan jagad', questions: {
    Edi: ['Dapatkah iktikad baik selama puluhan tahun menjadi dasar perlindungan?', 'Apakah itikad baik penguasa lama layak dijadikan pijakan utama?'],
    Ridwan: ['Dapatkah iktikad baik menggeser beban pembuktian?', 'Apakah itikad baik memperkuat kekuatan pembuktian?'],
    Susanto: ['Dapatkah itikad baik menguatkan fakta pendudukan nyata?', 'Apakah pendudukan fisik lama memperoleh bobot hukum karena itikad baik?'],
    Suprapti: ['Dapatkah itikad baik menutup cacat formil yang tidak menyentuh substansi?', 'Apakah itikad baik membantu membedakan formil dan materiil?'],
    Eka: ['Dapatkah itikad baik melindungi pihak ketiga yang mengandalkan keadaan itu?', 'Apakah itikad baik menjadi pijakan perlindungan pihak ketiga?'],
    Jumiati: ['Dapatkah itikad baik mengisi kekosongan data register negara?', 'Apakah itikad baik membantu menilai ketercapaian data pendaftaran?'],
  } },
  { id: 23, role: 'Kamulyan jagad', questions: {
    Edi: ['Siapa yang harus membuktikan tidak adanya iktikad baik?', 'Apabila satu kubu punya naskah dan lain mengandalkan penguasaan lama, siapa yang membuktikan?'],
    Ridwan: ['Siapa yang memikul beban pembuktian bila satu kubu punya naskah formal?', 'Kapan pihak yang mengandalkan penguasaan lama harus membuktikan lebih berat?'],
    Susanto: ['Siapa yang harus membantah pendudukan nyata bila satu kubu punya naskah?', 'Apakah pihak lawan wajib menyangkal fakta pendudukan fisik?'],
    Suprapti: ['Siapa yang harus membuktikan cacat materiil bila ada naskah formal?', 'Apakah pembuktian cacat materiil lebih berat daripada cacat formil?'],
    Eka: ['Siapa yang harus menanggung beban melindungi pihak ketiga?', 'Apakah pihak penguasaan lama atau pemegang naskah yang harus menjaga pihak ketiga?'],
    Jumiati: ['Siapa yang harus membuktikan ketidaksesuaian dengan register negara?', 'Kapan data pendaftaran harus dibuktikan oleh pihak yang memegang naskah?'],
  } },
  { id: 24, role: 'Kamulyan jagad', questions: {
    Edi: ['Apakah kesenjangan antara peristiwa hukum dan naskah baru membuka celah perlindungan?', 'Apakah selisih waktu antara peristiwa dan naskah dapat memberi ruang perlindungan?'],
    Ridwan: ['Apakah kesenjangan waktu membuka celah dalam pembuktian?', 'Apakah beban pembuktian berubah bila naskah lahir belakangan?'],
    Susanto: ['Apakah kesenjangan waktu membuka ruang bagi pengakuan pendudukan nyata?', 'Apakah pendudukan fisik mendapat bobot karena ada jarak waktu?'],
    Suprapti: ['Apakah kesenjangan waktu menciptakan celah cacat formil yang tidak membatalkan substansi?', 'Apakah perbedaan waktu mempermudah membedakan formil dan materiil?'],
    Eka: ['Apakah kesenjangan waktu membuka celah perlindungan bagi pihak ketiga?', 'Apakah pihak ketiga beritikad baik layak diberi ruang?'],
    Jumiati: ['Apakah kesenjangan antara peristiwa dan naskah menciptakan celah dalam register negara?', 'Apakah data pendaftaran perlu diuji bila ada perbedaan waktu?'],
  } },
  { id: 25, role: 'Kamulyan jagad', questions: {
    Edi: ['Apakah kontribusi keluarga penguasa lahan selama puluhan tahun membuktikan iktikad baik?', 'Apakah sumbangsih keluarga memperkuat kedudukan hukum atas lahan?'],
    Ridwan: ['Apakah kontribusi keluarga dapat menggeser beban pembuktian?', 'Apakah sumbangsih keluarga memperkuat pembuktian penguasaan?'],
    Susanto: ['Apakah kontribusi keluarga membuktikan pendudukan nyata yang sah?', 'Apakah pendudukan fisik berbasis keluarga memiliki nilai hukum?'],
    Suprapti: ['Apakah kontribusi keluarga menutup cacat formil tanpa naskah?', 'Apakah substansi hak tetap terlihat meski formil tidak lengkap?'],
    Eka: ['Apakah kontribusi keluarga melindungi pihak ketiga yang mengandalkan keadaan itu?', 'Apakah sumbangsih keluarga menjadi dasar perlindungan pihak ketiga?'],
    Jumiati: ['Apakah kontribusi keluarga dapat memperkuat kedudukan di luar register negara?', 'Apakah sumbangsih keluarga menopang dalil saat data register belum lengkap?'],
  } },
  { id: 26, role: 'Kamulyan jagad', questions: {
    Edi: ['Bagaimana hakim menyikapi kontradiksi antara dalil tanpa bukti fisik dan pendudukan nyata lama?', 'Apakah penguasaan lama harus lebih diprioritaskan daripada dalil tanpa bukti?'],
    Ridwan: ['Bagaimana hakim menyikapi kontradiksi dalam beban pembuktian?', 'Siapa yang memikul beban lebih berat bila dalil dan penguasaan bertentangan?'],
    Susanto: ['Bagaimana hakim menyikapi kontradiksi antara dalil tanpa bukti fisik dan pendudukan nyata?', 'Apakah pendudukan fisik selama puluhan tahun harus diutamakan?'],
    Suprapti: ['Bagaimana hakim membedakan cacat materiil dalil dan substansi penguasaan?', 'Apakah dalil tanpa bukti harus dinilai sebagai cacat formil atau materiil?'],
    Eka: ['Bagaimana hakim menyikapi kontradiksi sambil melindungi pihak ketiga?', 'Apakah pihak ketiga beritikad baik harus tetap dihormati?'],
    Jumiati: ['Bagaimana hakim menilai kontradiksi dalam kerangka register negara?', 'Apakah data register harus dijadikan pegangan utama?'],
  } },
  { id: 27, role: 'Kamulyan jagad', questions: {
    Edi: ['Apakah kesinambungan lintas generasi dapat memperkuat iktikad baik?', 'Apakah keberlanjutan penguasaan keluarga dapat memperkuat perlindungan hukum?'],
    Ridwan: ['Apakah kesinambungan lintas generasi dapat menguatkan pembuktian?', 'Apakah keberlanjutan penguasaan dapat menggeser beban pembuktian?'],
    Susanto: ['Apakah kesinambungan lintas generasi memperkuat fakta pendudukan nyata?', 'Apakah pendudukan fisik lintas generasi tetap mempunyai bobot hukum?'],
    Suprapti: ['Apakah kesinambungan lintas generasi menutup cacat formil?', 'Apakah substansi hak tetap terlihat meski formil tidak lengkap?'],
    Eka: ['Apakah kesinambungan lintas generasi melindungi pihak ketiga beritikad baik?', 'Apakah penguasaan lintas generasi juga menumbuhkan kepastian bagi pihak ketiga?'],
    Jumiati: ['Apakah kesinambungan generasi dapat memperkuat kedudukan di hadapan register negara?', 'Apakah data register dapat dibenarkan oleh kesinambungan penguasaan?'],
  } },
  { id: 28, role: 'Kamulyan jagad', questions: {
    Edi: ['Bagaimana hakim menilai keterlambatan penggugat yang datang belakangan?', 'Apakah keterlambatan penggugat harus mengurangi perlindungan penguasa lama?'],
    Ridwan: ['Bagaimana hakim menilai keterlambatan dari sisi beban pembuktian?', 'Apakah kelambanan penggugat mengubah bobot pembuktian?'],
    Susanto: ['Bagaimana hakim menilai keterlambatan penggugat bila pendudukan nyata lama sudah terjadi?', 'Apakah pendudukan fisik lama lebih diprioritaskan daripada gugatan belakangan?'],
    Suprapti: ['Apakah keterlambatan penggugat menimbulkan cacat formil atau materiil?', 'Bagaimana pembeda antara dampak formil dan substansi ditentukan?'],
    Eka: ['Bagaimana hakim menimbang keterlambatan agar tidak merugikan pihak ketiga?', 'Apakah kepentingan pihak ketiga beritikad baik harus dijaga?'],
    Jumiati: ['Bagaimana hakim menilai keterlambatan di kerangka register negara?', 'Apakah data yang sudah ada dalam register memengaruhi penilaian keterlambatan?'],
  } },
  { id: 29, role: 'Kamulyan jagad', questions: {
    Edi: ['Dapatkah penerimaan sosial menjadi penopang pembuktian iktikad baik?', 'Apakah pengakuan masyarakat setempat dapat menjadi sandaran perlindungan hukum?'],
    Ridwan: ['Dapatkah penerimaan sosial memperkuat kekuatan pembuktian?', 'Apakah pengakuan sosial dapat menggeser beban pembuktian?'],
    Susanto: ['Dapatkah penerimaan sosial memperkuat fakta pendudukan nyata?', 'Apakah pengakuan sosial dapat dijadikan sandaran pendudukan fisik?'],
    Suprapti: ['Dapatkah penerimaan sosial menutup cacat formil tanpa naskah?', 'Apakah pengakuan sosial dapat dijadikan sandaran substansi hak?'],
    Eka: ['Dapatkah penerimaan sosial melindungi pihak ketiga beritikad baik?', 'Apakah pengakuan sosial dapat menjadi sandaran perlindungan pihak ketiga?'],
    Jumiati: ['Dapatkah penerimaan sosial memperkuat kedudukan di hadapan register negara?', 'Apakah pengakuan sosial dapat menyokong data saat register belum lengkap?'],
  } },
  { id: 30, role: 'Kamulyan jagad', questions: {
    Edi: ['Bagaimana hakim menimbang keadilan bila satu pihak menguasai nyata dan yang lain hanya punya naskah?', 'Apakah rasa keadilan harus lebih diprioritaskan daripada formalitas semata?'],
    Ridwan: ['Bagaimana hakim menimbang keadilan dalam beban pembuktian?', 'Apakah semua pihak harus membuktikan proporsional sesuai realitas penguasaan?'],
    Susanto: ['Bagaimana hakim menimbang keadilan bila ada pendudukan nyata dan hanya naskah semata?', 'Apakah fakta pendudukan fisik harus diberi bobot lebih besar?'],
    Suprapti: ['Bagaimana hakim menimbang keadilan dengan membedakan cacat formil dan materiil?', 'Apakah substansi hak harus diutamakan atas formalitas semata?'],
    Eka: ['Bagaimana hakim menimbang keadilan agar pihak ketiga tidak dikorbankan?', 'Apakah kepentingan pihak ketiga beritikad baik harus dipertahankan?'],
    Jumiati: ['Bagaimana hakim menimbang keadilan dalam kerangka register negara?', 'Apakah data pendaftaran tanah tetap menjadi pegangan utama?'],
  } },
];

function generateDuelSets(): PersonSet[] {
  const personQs: Record<string, [Question[], Question[]]> = {};
  for (const p of PERSONS) personQs[p] = [[], []];

  for (let i = clusters.length - 1; i >= 0; i--) {
    const c = clusters[i];
    for (const person of PERSONS) {
      const [t0, t1] = c.questions[person];
      personQs[person][0].push({ id: c.id, role: c.role, text: t0 });
      personQs[person][1].push({ id: c.id, role: c.role, text: t1 });
    }
  }

  return PERSONS.map((p) => ({
    person: p,
    sets: personQs[p],
  }));
}

export const duelSets: PersonSet[] = generateDuelSets();

export function getClusterQuestions(
  clusterId: number,
  persons?: string[]
): (Question & { person: string; setIndex: number })[] {
  const out: (Question & { person: string; setIndex: number })[] = [];
  const c = clusters.find((x) => x.id === clusterId);
  if (!c) return out;
  for (const person of PERSONS) {
    if (persons && !persons.includes(person)) continue;
    const [t0, t1] = c.questions[person];
    out.push({ id: c.id, role: c.role, text: t0, person, setIndex: 0 });
    out.push({ id: c.id, role: c.role, text: t1, person, setIndex: 1 });
  }
  return out;
}

export function getQuestionsForPerson(person: string): (Question & { person: string; setIndex: number })[] {
  if (!PERSONS.includes(person as Person)) return [];
  const out: (Question & { person: string; setIndex: number })[] = [];
  for (let i = clusters.length - 1; i >= 0; i--) {
    const c = clusters[i];
    const [t0, t1] = c.questions[person as Person];
    out.push({ id: c.id, role: c.role, text: t0, person, setIndex: 0 });
    out.push({ id: c.id, role: c.role, text: t1, person, setIndex: 1 });
  }
  return out;
}

export { clusters, PERSONS, PERSON_FOCUS };
