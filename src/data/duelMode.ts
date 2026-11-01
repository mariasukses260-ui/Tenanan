import type { PersonSet, Question } from '../lib/debate';

const PERSONS = ['Edi', 'Ridwan', 'Susanto', 'Suprapti', 'Eka', 'Jumiati'] as const;

type Person = (typeof PERSONS)[number];
type Role = 'duit semilyar' | 'urip kepenak' | 'Kamulyan jagad';

const PERSON_FOCUS: Record<Person, string> = {
  Edi: 'iktikad baik & perlindungan penguasa beritikad baik',
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
