// Editors for the text that belongs to a single page section (Hero, section headings, contact details)
import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { MultiLangText } from '../../../types';
import { TagInput } from '../TagInput';
import { Card, Field, inputClass } from '../ui';

type Lang = 'EN' | 'TR';

const text = (value: MultiLangText | string | undefined, lang: Lang) =>
  typeof value === 'string' ? value : value?.[lang] ?? '';

export const HeroEditor: React.FC<{ editLang: Lang }> = ({ editLang }) => {
  const { heroContent, setHeroContent, profile, updateProfile } = useAdmin();
  const tr = editLang === 'TR';
  const setText = (field: 'greeting' | 'role' | 'bio' | 'status' | 'ctaText', value: string) =>
    setHeroContent({ ...heroContent, [field]: updateMultiLangText(heroContent[field], value, editLang) });

  return (
    <div className="space-y-6">
      <Card title={tr ? 'Tanıtım' : 'Introduction'} description={tr ? 'Ziyaretçinin ilk gördüğü ekran.' : 'The first screen visitors see.'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={`${tr ? 'Selamlama' : 'Greeting'} (${editLang})`}>
            <input type="text" value={text(heroContent.greeting, editLang)} onChange={(e) => setText('greeting', e.target.value)} className={inputClass} placeholder={tr ? 'Merhaba, ben' : "Hi, I'm"} />
          </Field>
          <Field label={tr ? 'İsim' : 'Name'} hint={tr ? 'Başlıkta yalnızca ilk isim gösterilir.' : 'Only the first name appears in the heading.'}>
            <input type="text" value={heroContent.name} onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <Field label={`${tr ? 'Rol' : 'Role'} (${editLang})`}>
          <input type="text" value={text(heroContent.role, editLang)} onChange={(e) => setText('role', e.target.value)} className={inputClass} />
        </Field>
        <Field
          label={tr ? 'Dönen unvanlar' : 'Rotating titles'}
          hint={tr
            ? "İki veya daha fazla unvan eklerseniz Rol yerine bunlar sırayla döner."
            : 'With two or more titles, they cycle in place of the Role.'}
        >
          <TagInput
            tags={profile.titles || []}
            onChange={(titles) => updateProfile({ ...profile, titles })}
            placeholder={tr ? "Unvan yazıp Enter'a basın" : 'Type a title and press Enter'}
            inputClass={inputClass}
          />
        </Field>
        <Field label={`${tr ? 'Kısa açıklama' : 'Bio'} (${editLang})`}>
          <textarea value={text(heroContent.bio, editLang)} onChange={(e) => setText('bio', e.target.value)} className={inputClass} />
        </Field>
        <Field label={`${tr ? 'Durum rozeti' : 'Status badge'} (${editLang})`}>
          <input type="text" value={text(heroContent.status, editLang)} onChange={(e) => setText('status', e.target.value)} className={inputClass} placeholder={tr ? 'Yeni projeler için uygun' : 'Available for new projects'} />
        </Field>
      </Card>

      <Card title={tr ? 'Düğmeler' : 'Buttons'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={`${tr ? 'Ana düğme metni' : 'Primary button text'} (${editLang})`} hint={tr ? 'Projeler bölümüne kaydırır.' : 'Scrolls to the projects section.'}>
            <input type="text" value={text(heroContent.ctaText, editLang)} onChange={(e) => setText('ctaText', e.target.value)} className={inputClass} />
          </Field>
          <Field label={tr ? 'CV bağlantısı' : 'Resume link'}>
            <input type="url" value={heroContent.resumeLink} onChange={(e) => setHeroContent({ ...heroContent, resumeLink: e.target.value })} className={inputClass} placeholder="https://" />
          </Field>
        </div>
      </Card>
    </div>
  );
};

type HeadingKey = 'techStack' | 'projects' | 'experience' | 'contact';

// Tech Stack's heading used to be hard-coded; these mirror its old copy until edited
const TECH_STACK_DEFAULT = {
  title: { EN: 'Technology Stack', TR: 'Teknoloji Yığını' },
  description: { EN: 'Tools and technologies I use to build modern applications', TR: 'Modern uygulamalar geliştirmek için kullandığım araçlar ve teknolojiler' },
};

export const SectionHeadingEditor: React.FC<{ section: HeadingKey; editLang: Lang }> = ({ section, editLang }) => {
  const { sectionContent, setSectionContent } = useAdmin();
  const tr = editLang === 'TR';
  const heading = sectionContent[section] ?? TECH_STACK_DEFAULT;
  const update = (field: 'title' | 'description', value: string) =>
    setSectionContent({
      ...sectionContent,
      [section]: { ...heading, [field]: updateMultiLangText(heading[field], value, editLang) },
    });

  return (
    <Card title={tr ? 'Bölüm başlığı' : 'Section heading'}>
      <Field label={`${tr ? 'Başlık' : 'Title'} (${editLang})`}>
        <input type="text" value={text(heading.title, editLang)} onChange={(e) => update('title', e.target.value)} className={inputClass} />
      </Field>
      <Field label={`${tr ? 'Açıklama' : 'Description'} (${editLang})`}>
        <textarea value={text(heading.description, editLang)} onChange={(e) => update('description', e.target.value)} className={inputClass} />
      </Field>
    </Card>
  );
};

export const ContactDetailsEditor: React.FC<{ editLang: Lang }> = ({ editLang }) => {
  const { sectionContent, setSectionContent } = useAdmin();
  const tr = editLang === 'TR';
  const contact = sectionContent.contact;
  const update = (patch: Partial<typeof contact>) => setSectionContent({ ...sectionContent, contact: { ...contact, ...patch } });

  return (
    <Card title={tr ? 'İletişim bilgileri' : 'Contact details'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={tr ? 'E-posta adresi' : 'Email address'}>
          <input type="email" value={contact.emailLabel} onChange={(e) => update({ emailLabel: e.target.value })} className={inputClass} placeholder="you@example.com" />
        </Field>
        <Field label={`${tr ? 'Sosyal medya başlığı' : 'Socials heading'} (${editLang})`}>
          <input type="text" value={text(contact.findMeText, editLang)} onChange={(e) => update({ findMeText: updateMultiLangText(contact.findMeText, e.target.value, editLang) })} className={inputClass} />
        </Field>
      </div>
      <Field
        label={`${tr ? 'Gönderim sonrası mesaj' : 'Message after sending'} (${editLang})`}
        hint={tr ? 'İlk "!" işaretine kadar olan kısım başlık olarak gösterilir.' : 'Text up to the first "!" is shown as the heading.'}
      >
        <input type="text" value={text(contact.successMessage, editLang)} onChange={(e) => update({ successMessage: updateMultiLangText(contact.successMessage, e.target.value, editLang) })} className={inputClass} />
      </Field>
    </Card>
  );
};
