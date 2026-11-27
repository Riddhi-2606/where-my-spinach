import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { Volume2, Download, Copy, CheckCircle2 } from 'lucide-react';
import './TranslationCardGenerator.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'th', name: 'Thai (ไทย)' }
];

const dietTypes = [
  { id: 'jain', name: 'Jain (No Root Veg)' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'vegetarian', name: 'Vegetarian' }
];

const translations = {
  jain: {
    en: "I follow a strict Jain diet. I cannot eat meat, fish, eggs, or any root vegetables (no onion, garlic, potatoes, carrots). Please ensure my food is prepared without these ingredients.",
    ko: "저는 엄격한 자인교 식단을 따릅니다. 고기, 생선, 계란, 또는 뿌리 채소(양파, 마늘, 감자, 당근 등)를 먹을 수 없습니다. 이 재료들 없이 음식을 준비해 주시기 바랍니다.",
    fr: "Je suis un régime jaïn strict. Je ne peux pas manger de viande, de poisson, d'œufs ou de légumes-racines (pas d'oignon, d'ail, de pommes de terre, de carottes). Veuillez vous assurer que mon repas est préparé sans ces ingrédients.",
    it: "Seguo una rigorosa dieta giainista. Non posso mangiare carne, pesce, uova o tuberi (niente cipolla, aglio, patate, carote). Vi prego di assicurarvi che il mio cibo sia preparato senza questi ingredienti.",
    ar: "أنا أتبع نظامًا غذائيًا جاينيًا صارمًا. لا أستطيع أكل اللحوم أو الأسماك أو البيض أو أي خضروات جذرية (لا بصل أو ثوم أو بطاطس أو جزر). يرجى التأكد من تحضير طعامي بدون هذه المكونات.",
    th: "ฉันทานอาหารเชนอย่างเคร่งครัด ฉันไม่สามารถทานเนื้อสัตว์ ปลา ไข่ หรือผักที่มีราก (ไม่ใส่หัวหอม กระเทียม มันฝรั่ง แครอท) โปรดแน่ใจว่าอาหารของฉันปรุงโดยไม่มีส่วนผสมเหล่านี้"
  },
  vegan: {
    en: "I am vegan. I do not eat meat, poultry, fish, dairy (milk, cheese, butter), eggs, or honey. Please ensure no animal products are used.",
    ko: "저는 비건(완전 채식주의자)입니다. 고기, 가금류, 생선, 유제품(우유, 치즈, 버터), 계란, 꿀을 먹지 않습니다. 동물성 제품이 사용되지 않도록 해주세요.",
    fr: "Je suis végétalien. Je ne mange pas de viande, de volaille, de poisson, de produits laitiers (lait, fromage, beurre), d'œufs ou de miel. Veuillez vous assurer qu'aucun produit d'origine animale n'est utilisé.",
    it: "Sono vegano. Non mangio carne, pollame, pesce, latticini (latte, formaggio, burro), uova o miele. Vi prego di assicurarvi che non vengano utilizzati prodotti di origine animale.",
    ar: "أنا نباتي صرف. لا أتناول اللحوم أو الدواجن أو الأسماك أو منتجات الألبان (الحليب والجبن والزبدة) أو البيض أو العسل. يرجى التأكد من عدم استخدام أي منتجات حيوانية.",
    th: "ฉันเป็นวีแกน ฉันไม่ทานเนื้อสัตว์ สัตว์ปีก ปลา ผลิตภัณฑ์จากนม (นม ชีส เนย) ไข่ หรือน้ำผึ้ง โปรดแน่ใจว่าไม่มีการใช้ผลิตภัณฑ์จากสัตว์"
  },
  vegetarian: {
    en: "I am vegetarian. I do not eat meat, poultry, fish, or seafood. Dairy and eggs are okay. Please ensure no meat broth or animal fat is used.",
    ko: "저는 채식주의자입니다. 고기, 가금류, 생선, 해산물을 먹지 않습니다. 유제품과 계란은 괜찮습니다. 고기 육수나 동물성 지방이 사용되지 않도록 해주세요.",
    fr: "Je suis végétarien. Je ne mange pas de viande, de volaille, de poisson ou de fruits de mer. Les produits laitiers et les œufs me conviennent. Veuillez vous assurer qu'aucun bouillon de viande ou graisse animale n'est utilisé.",
    it: "Sono vegetariano. Non mangio carne, pollame, pesce o frutti di mare. I latticini e le uova vanno bene. Vi prego di assicurarvi che non vengano usati brodo di carne o grassi animali.",
    ar: "أنا نباتي. لا أتناول اللحوم أو الدواجن أو الأسماك أو المأكولات البحرية. منتجات الألبان والبيض مسموح بها. يرجى التأكد من عدم استخدام مرق اللحم أو الدهون الحيوانية.",
    th: "ฉันทานมังสวิรัติ ฉันไม่ทานเนื้อสัตว์ สัตว์ปีก ปลา หรืออาหารทะเล ผลิตภัณฑ์จากนมและไข่สามารถทานได้ โปรดแน่ใจว่าไม่ได้ใช้น้ำซุปเนื้อหรือไขมันสัตว์"
  }
};

const TranslationCardGenerator = () => {
  const [targetLang, setTargetLang] = useState('ko');
  const [diet, setDiet] = useState('jain');
  const [copied, setCopied] = useState(false);

  const getPhrase = () => translations[diet][targetLang];
  const getEnglishPhrase = () => translations[diet]['en'];

  const handleCopy = () => {
    navigator.clipboard.writeText(getPhrase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="translation-generator">
      <div className="generator-header">
        <h2 className="mb-sm">Dietary Translation Card</h2>
        <p className="text-light">Generate restaurant-safe phrases to show waiters abroad.</p>
      </div>

      <div className="generator-controls">
        <div className="form-group">
          <label>Select Diet</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            {dietTypes.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Translate To</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            {languages.filter(l => l.code !== 'en').map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="translation-card-result">
        <div className="result-lang-label">English (Reference)</div>
        <p className="result-en text-light italic mb-md">"{getEnglishPhrase()}"</p>
        
        <div className="result-lang-label text-primary font-bold mt-md">
          {languages.find(l => l.code === targetLang)?.name} Translation:
        </div>
        <div className="result-translated">
          <p dir={targetLang === 'ar' ? 'rtl' : 'ltr'}>{getPhrase()}</p>
        </div>
        
        <div className="result-actions">
          <Button variant="outline" onClick={handleCopy} className="btn-sm">
            {copied ? <CheckCircle2 size={18} className="text-success" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>
          <Button variant="secondary" className="btn-sm">
            <Download size={18} />
            Save as Image
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TranslationCardGenerator;
