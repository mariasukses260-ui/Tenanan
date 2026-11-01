import type { PersonSet, Question } from '../lib/debate';

const PERSONS = ['Edi', 'Ridwan', 'Susanto', 'Suprapti', 'Eka', 'Jumiati'] as const;

type Person = (typeof PERSONS)[number];
type Role = 'duit semilyar' | 'urip kepenak' | 'Kamulyan jagad';

const PERSON_FOCUS: Record<Person, string> = {
  Edi: 'niat baik & perlindungan penguasa beritikad baik',
  Ridwan: 'beban pembuktian & kekuatan alat bukti',
  Susanto: 'penguasaan fisik sebagai fakta hukum',
  Suprapti: 'cacat formil vs cacat materiil & hierarki norma',
  Eka: 'perlindungan pihak ketiga yang beritikad baik',
  Jumiati: 'sistem pendaftaran tanah & kekuatan register negara',
};

interface ClusterDef {
  id: number;
  role: Role;
  questions: Record<Person, [string, string]>;
}

const CLUSTERS: ClusterDef[] = [
  {
    id: 1,
    role: 'duit semilyar',
    questions: {
      Edi: ['Bagaimana niat baik dapat memengaruhi penilaian Majelis atas posisi kepemilikan?', 'Apakah perlindungan bagi penguasa beritikad baik dapat membatalkan kelemahan administrasi?'],
      Ridwan: ['Bagaimana beban pembuktian dibedakan antara bukti formal dan fakta materiil?', 'Apakah alat bukti formal selalu lebih kuat daripada penguasaan nyata?'],
      Susanto: ['Apakah penguasaan fisik yang nyata dapat menutup kekurangan formil dalam pembuktian?', 'Sejauh mana fakta penguasaan dapat memengaruhi penafsiran hak?'],
      Suprapti: ['Apa perbedaan utama antara cacat formil dan cacat materiil dalam sengketa tanah?', 'Bagaimana hierarki norma memengaruhi penilaian dua jenis cacat itu?'],
      Eka: ['Apakah pihak ketiga yang beritikad baik layak mendapat perlindungan hukum?', 'Sejauh mana kepastian transaksi dapat melindungi pihak yang tidak tahu cacat?'],
      Jumiati: ['Bagaimana register negara menilai klaim yang lahir tanpa pendaftaran formal?', 'Apakah sistem pendaftaran harus selalu diutamakan atas fakta nyata?'],
    },
  },
  {
    id: 2,
    role: 'urip kepenak',
    questions: {
      Edi: ['Apa yang membuat perlindungan terhadap penguasa beritikad baik menjadi penting di tengah kontradiksi bukti?', 'Apakah itikad baik cukup menjadi alasan utama untuk menguatkan kedudukan hukum?'],
      Ridwan: ['Bagaimana Majelis menimbang bukti formal yang terlambat muncul dengan fakta penguasaan lama?', 'Apakah pembuktian materiil dapat membatalkan asumsi formal yang terbantahkan?'],
      Susanto: ['Apakah penguasaan fisik jangka panjang mampu membuktikan hak yang sah meski format administrasi belum lengkap?', 'Bisakah penguasaan nyata menjadi indikator utama ketika dokumen tidak konsisten?'],
      Suprapti: ['Bagaimana cara membedakan bentuk cacat yang menghilangkan hak dengan cacat yang hanya menurunkan kekuatan bukti?', 'Apakah semua cacat formil berakibat sama terhadap substansi hak?'],
      Eka: ['Apakah perlindungan terhadap pihak ketiga harus dibatasi oleh pengetahuan atau hanya berdasarkan itikad baik?', 'Seberapa jauh pihak ketiga dapat memperoleh jaminan ketika fakta di lapangan sudah terbentuk?'],
      Jumiati: ['Apakah register negara bisa dipakai sebagai satu-satunya alat visualisasi kepemilikan?', 'Apakah ketidaklengkapan data resmi selalu menjadikan klaim nyata kehilangan bobot?'],
    },
  },
  {
    id: 3,
    role: 'Kamulyan jagad',
    questions: {
      Edi: ['Bagaimana Majelis menguji apakah perlindungan terhadap penguasa beritikad baik sejalan dengan prinsip kepastian hukum?', 'Apakah ketentuan yang memberi ruang bagi itikad baik juga membuka peluang penyalahgunaan?'],
      Ridwan: ['Apakah kekuatan alat bukti dapat berubah apabila fakta materiil dan data formal saling bertentangan?', 'Bagaimana Majelis menentukan bobot pembuktian yang paling meyakinkan?'],
      Susanto: ['Apakah penguasaan fisik yang berlangsung lama dapat menjadi bukti dominan dalam sengketa tanah?', 'Sejauh mana fakta penguasaan dapat mengatasi kontradiksi dokumen?'],
      Suprapti: ['Apa prinsip yang paling menentukan saat Majelis membedakan cacat formil dengan cacat materiil?', 'Apakah penalaran hierarki norma harus diutamakan di atas kepastian transaksi?'],
      Eka: ['Bagaimana perlindungan pihak ketiga seharusnya ditafsirkan bila fakta sudah membentuk ekspektasi yang kuat?', 'Apakah kepastian hukum harus melampaui tuntutan keadilan individual?'],
      Jumiati: ['Apakah register negara bukan sekadar alat administrasi tetapi juga alat pembuktian yang dominan?', 'Bagaimana Majelis menilai ketika data register belum lengkap tetapi fakta penguasaan sudah mapan?'],
    },
  },
];

export const duelSets: PersonSet[] = PERSONS.map((person) => ({
  person,
  sets: CLUSTERS.map((cluster) => [
    { id: cluster.id, role: cluster.role, text: cluster.questions[person][0] },
    { id: cluster.id + 10, role: cluster.role, text: cluster.questions[person][1] },
  ]),
}));

export function getClusterQuestions(person: string): Question[] {
  const entry = duelSets.find((item) => item.person.toLowerCase() === person.toLowerCase());
  if (!entry) return [];

  return entry.sets.flatMap((set) => set);
}

export function getQuestionsForPerson(person: string): (Question & { person: string; setIndex: number })[] {
  const entry = duelSets.find((item) => item.person.toLowerCase() === person.toLowerCase());
  if (!entry) return [];

  return entry.sets.flatMap((set, setIndex) =>
    set.map((question) => ({
      ...question,
      person,
      setIndex,
    }))
  );
}

export const PERSONS_LIST = PERSONS;
export const PERSON_FOCUS_MAP = PERSON_FOCUS;
