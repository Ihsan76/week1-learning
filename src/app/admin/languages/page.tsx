// scr/app/admin/languages/page.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/lib/store';
import { useLocaleContext } from '@/context/LocaleContext';

import type { LanguageConfig } from '@/locales/i18n';
import { allLanguages, defaultLanguage, getDictionary } from '@/locales/i18n';

type FlatDict = Record<string, string>;
type TranslationState = Record<string, FlatDict>;

const l1 = (k: string) => k.split('.')[0] || 'other';
const l2 = (k: string) => {
  const p = k.split('.');
  return p.length >= 2 ? `${p[0]}.${p[1]}` : (p[0] || 'other');
};

export default function LanguagesPage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { dict, isLoading } = useLocaleContext();

  const [mounted, setMounted] = useState(false);

  const [languages, setLanguages] = useState<LanguageConfig[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>(defaultLanguage.code);

  const [translations, setTranslations] = useState<TranslationState>({});
  const [originalTranslations, setOriginalTranslations] = useState<TranslationState>({});

  const [newLanguageCode, setNewLanguageCode] = useState('');

  // UI
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<'all' | string>('all');
  const [modifiedOnly, setModifiedOnly] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isLoggedIn) router.push('/academy/login');
  }, [isLoggedIn, router]);

  useEffect(() => {
    setLanguages(allLanguages);
    setSelectedLang(defaultLanguage.code);
  }, []);

  const flattenObject = (obj: any, prefix = ''): FlatDict => {
    const flattened: FlatDict = {};

    const walk = (value: any, keyPrefix: string) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          walk(item, keyPrefix ? `${keyPrefix}.${index}` : String(index));
        });
        return;
      }

      if (value && typeof value === 'object') {
        for (const k of Object.keys(value)) {
          walk(value[k], keyPrefix ? `${keyPrefix}.${k}` : k);
        }
        return;
      }

      if (typeof value === 'string') flattened[keyPrefix] = value;
    };

    walk(obj, prefix);
    return flattened;
  };

  const unflattenObject = (flat: FlatDict) => {
    const result: any = {};

    for (const fullKey of Object.keys(flat)) {
      const value = flat[fullKey];
      const parts = fullKey.split('.');

      let cur = result;
      for (let i = 0; i < parts.length; i++) {
        const k = parts[i];
        const isLast = i === parts.length - 1;
        if (isLast) cur[k] = value;
        else {
          if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {};
          cur = cur[k];
        }
      }
    }

    const toArraysDeep = (v: any): any => {
      if (Array.isArray(v)) return v.map(toArraysDeep);
      if (v && typeof v === 'object') {
        const keys = Object.keys(v);
        const allNumeric = keys.length > 0 && keys.every((x) => /^\d+$/.test(x));
        if (allNumeric) {
          const max = Math.max(...keys.map((k) => Number(k)));
          const arr = new Array(max + 1);
          for (const k of keys) arr[Number(k)] = toArraysDeep(v[k]);
          return arr;
        }
        const out: any = {};
        for (const k of keys) out[k] = toArraysDeep(v[k]);
        return out;
      }
      return v;
    };

    return toArraysDeep(result);
  };

  const sortObjectDeep = (value: any): any => {
    if (Array.isArray(value)) return value.map(sortObjectDeep);
    if (value && typeof value === 'object') {
      return Object.keys(value)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc: any, key) => {
          acc[key] = sortObjectDeep(value[key]);
          return acc;
        }, {});
    }
    return value;
  };

  useEffect(() => {
    if (!selectedLang) return;
    let cancelled = false;

    (async () => {
      const d = await getDictionary(selectedLang);
      if (cancelled) return;

      const flat = flattenObject(d);

      setTranslations((prev) => ({ ...prev, [selectedLang]: flat }));
      setOriginalTranslations((prev) => (prev[selectedLang] ? prev : { ...prev, [selectedLang]: flat }));
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedLang]);

  const isModified = (k: string) => {
    const cur = translations[selectedLang]?.[k] ?? '';
    const orig = originalTranslations[selectedLang]?.[k] ?? '';
    return cur !== orig;
  };

  const allKeys = useMemo(() => {
    const obj = translations[selectedLang] || {};
    return Object.keys(obj).sort((a, b) => a.localeCompare(b));
  }, [translations, selectedLang]);
  const l2ChildrenCount = useMemo(() => {
    // count children for each level2 key: admin.X
    const children = new Map<string, number>();

    for (const k of allKeys) {
      const parts = k.split('.');
      if (parts.length >= 2) {
        const parentL2 = `${parts[0]}.${parts[1]}`;
        if (!children.has(parentL2)) children.set(parentL2, 0);

        // إذا يوجد مستوى ثالث => هذا Child لـ level2
        if (parts.length >= 3) {
          children.set(parentL2, (children.get(parentL2) || 0) + 1);
        }
      }
    }

    return children; // Map<"admin.X", number_of_level3_descendants>
  }, [allKeys]);


  const groupModeByL1 = useMemo(() => {
    const map = new Map<string, Set<string>>();

    for (const k of allKeys) {
      const a = l1(k);
      const b = l2(k);
      if (!map.has(a)) map.set(a, new Set());
      map.get(a)!.add(b);
    }

    const mode: Record<string, 'l1' | 'l2'> = {};
    for (const [a, setB] of map.entries()) {
      mode[a] = setB.size > 1 ? 'l2' : 'l1';
    }

    return mode;
  }, [allKeys]);

  // تجميع ذكي:
  // - إذا level1 يحتوي أكثر من level2 => groups = level2
  // - غير ذلك => group = level1
  const groups = useMemo(() => {
    const set = new Set<string>();

    for (const k of allKeys) {
      const a = l1(k);        // admin
      const b = l2(k);        // admin.X

      const hasChildren = (l2ChildrenCount.get(b) || 0) > 0;
      set.add(hasChildren ? b : a);
    }

    return Array.from(set).sort((x, y) => x.localeCompare(y));
  }, [allKeys, l2ChildrenCount]);



  const filteredKeys = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cur = translations[selectedLang] || {};

    return allKeys.filter((k) => {
      const val = (cur[k] || '').toLowerCase();
      const matchQuery = !q || k.toLowerCase().includes(q) || val.includes(q);
      if (!matchQuery) return false;

      if (modifiedOnly && !isModified(k)) return false;

      if (groupFilter === 'all') return true;

      if (!groupFilter.includes('.')) return k.startsWith(groupFilter + '.');
      return k.startsWith(groupFilter + '.');
    });
  }, [allKeys, groupFilter, modifiedOnly, query, selectedLang, translations]);

  const groupedKeys = useMemo(() => {
    const map: Record<string, string[]> = {};

    for (const k of filteredKeys) {
      const a = l1(k);
      const b = l2(k);

      const hasChildren = (l2ChildrenCount.get(b) || 0) > 0;
      const groupKey = hasChildren ? b : a;

      if (!map[groupKey]) map[groupKey] = [];
      map[groupKey].push(k);
    }

    for (const g of Object.keys(map)) map[g].sort((x, y) => x.localeCompare(y));
    return map;
  }, [filteredKeys, l2ChildrenCount]);


  const modifiedCount = useMemo(() => {
    const cur = translations[selectedLang] || {};
    const orig = originalTranslations[selectedLang] || {};
    let count = 0;
    for (const k of Object.keys(cur)) if ((orig[k] ?? '') !== (cur[k] ?? '')) count++;
    return count;
  }, [originalTranslations, selectedLang, translations]);

  const handleAddLanguage = () => {
    const code = newLanguageCode.trim().toLowerCase();
    if (!code) return;

    if (languages.some((l) => l.code === code)) {
      setSelectedLang(code);
      setNewLanguageCode('');
      return;
    }

    const newLang: LanguageConfig = {
      code,
      name: code.toUpperCase(),
      nativeName: code.toUpperCase(),
      dir: 'ltr',
      flag: '🏳️',
      enabled: true,
      isDefault: false,
    };

    setLanguages((prev) => [...prev, newLang]);
    setTranslations((prev) => ({ ...prev, [code]: {} }));
    setSelectedLang(code);
    setNewLanguageCode('');
  };

  const handleSaveTranslation = (langCode: string, key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [langCode]: {
        ...(prev[langCode] || {}),
        [key]: value,
      },
    }));
  };

  const handleExportLanguage = (langCode: string) => {
    const flat = translations[langCode] || {};
    const nested = unflattenObject(flat);
    const sorted = sortObjectDeep(nested);

    const jsonString = JSON.stringify(sorted, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${langCode}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pickInput = (value: string) => (value.length > 90 || value.includes('\n') ? 'textarea' : 'input');

  if (isLoading || !dict) return <div className="p-8 text-slate-200">Loading translations...</div>;

  const content = dict.admin?.languagesContent;

  if (!mounted || !isLoggedIn) {
    return <div className="p-8 text-slate-200">{content?.loadingLanguages || 'Loading...'}</div>;
  }
  const stripGroupPrefix = (fullKey: string, groupKey: string) => {
    if (!groupKey || groupKey === "all") return fullKey;

    // groupKey ممكن يكون "admin" أو "admin.analytics" ... الخ
    // إذا fullKey يبدأ بـ groupKey + "." نحذف هذا الجزء
    const prefix = groupKey + ".";
    return fullKey.startsWith(prefix) ? fullKey.slice(prefix.length) : fullKey;
  };

  return (

    <div className="px-4 py-8 w-full text-start lang-i18n-page">

      <div className="w-full">
        <h1 className="text-3xl font-bold text-white mb-6">{content?.title || 'Languages'}</h1>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{content?.addLanguage || 'Add language'}</h2>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Language code (e.g., fr, tr)"
              value={newLanguageCode}
              onChange={(e) => setNewLanguageCode(e.target.value)}
              className="flex-1 px-4 py-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
            <button onClick={handleAddLanguage} className="px-6 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700">
              Add
            </button>
          </div>
        </div>

        <div className="features-grid text-start">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="feature-card"
              onClick={() => setSelectedLang(lang.code)}
            >
              <div className="flex items-center justify-between gap-3">

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang.flag} {lang.nativeName}
                  </h3>
                  <p className="text-sm text-slate-400">{lang.name}</p>
                </div>
                <p className="text-xs text-slate-400">Direction: {lang.dir.toUpperCase()}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => handleExportLanguage(lang.code)}
                  className="px-3 py-2 rounded bg-slate-900 border border-slate-600 text-white hover:bg-slate-700 text-xs"
                >
                  Export
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className="px-3 py-2 rounded bg-slate-900 border border-slate-600 text-white hover:bg-slate-700 text-xs"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedLang && (

          <div className="mt-10 bg-slate-800 border border-slate-700 rounded-lg p-5">
            <div className="sticky top-4 z-10 bg-slate-900/70 backdrop-blur border border-slate-700 rounded-lg p-4 mb-5">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {content?.editLanguageTitle || 'Edit'} — {selectedLang.toUpperCase()}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Showing {filteredKeys.length} / {allKeys.length} keys • Modified: {modifiedCount}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleExportLanguage(selectedLang)}
                    className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700 text-sm"
                  >
                    Export {selectedLang}.json
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search key or value..."
                  className="lg:col-span-2 px-4 py-2 rounded bg-slate-900 border border-slate-600 text-white"
                />

                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="px-4 py-2 rounded bg-slate-900 border border-slate-600 text-white"
                >
                  <option value="all">All groups</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-slate-200 lg:col-span-3">
                  <input
                    type="checkbox"
                    checked={modifiedOnly}
                    onChange={(e) => setModifiedOnly(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Modified only
                </label>
              </div>
            </div>

            {filteredKeys.length === 0 ? (
              <p className="text-slate-300 text-sm">{content?.noLanguagesFound || 'No results.'}</p>
            ) : (
              <div className="space-y-3">
                {groups
                  .filter((g) => groupedKeys[g]?.length)
                  .map((g) => {
                    const list = groupedKeys[g] || [];
                    const groupModified = list.reduce((acc, k) => acc + (isModified(k) ? 1 : 0), 0);

                    return (
                      <div key={g} className="feature-card text-start w-full flex flex-col items-stretch">

                        <details open className="w-full block">

                          <summary className="list-none cursor-pointer select-none">
                            <div className="lang-group-summary">
                              <div className="lang-group-titleRow">
                                <p className="lang-group-title">{g}</p>

                              </div>
                              <span className="lang-group-meta">
                                {list.length} keys • {groupModified} modified
                              </span>
                              <span className="text-slate-400 text-sm chev">▾</span>
                            </div>
                          </summary>

                          <div className="p-4 w-full keys-panel">
                            <div className="p-4 w-full">
                              <div className="overflow-x-auto">
                                <div className="cardsOnly  space-y-3">
                                  {list.map((k) => {
                                    const val = translations[selectedLang]?.[k] || '';
                                    const modified = isModified(k);
                                    const inputType = pickInput(val);

                                    return (
                                      <div key={k} className={`rounded-lg border border-slate-700/60 bg-slate-900/30 p-3 ${modified ? 'bg-cyan-500/5' : ''}`}>

                                        <div className="text-cyan-300 text-sm font-semibold break-all mt-1 px-4">{stripGroupPrefix(k, g)}</div>


                                        <div className="mt-1">
                                          {inputType === 'textarea' ? (
                                            <textarea
                                              value={val}
                                              onChange={(e) => handleSaveTranslation(selectedLang, k, e.target.value)}
                                              rows={2}
                                              className="block w-full min-w-0 px-2 py-2 rounded bg-slate-900 border border-slate-600 text-white text-start"
                                            />
                                          ) : (
                                            <input
                                              type="text"
                                              value={val}
                                              onChange={(e) => handleSaveTranslation(selectedLang, k, e.target.value)}
                                              className="block w-full min-w-0 px-2 py-2 rounded bg-slate-900 border border-slate-600 text-white text-start"
                                            />
                                          )}
                                        </div>

                                        {modified && <div className="text-[11px] text-cyan-200 mt-2">Modified</div>}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="tableOnly  overflow-x-auto">
                                  <table className="w-full border-collapse table-fixed lang-keys-table">
                                    <colgroup>
                                      <col className="w-[420px]" />
                                      <col />
                                    </colgroup>

                                    <thead className="bg-slate-900/60">
                                      <tr>
                                        <th className="text-start text-xs font-semibold text-slate-300 px-3 py-2 border-b border-slate-700/60">Key</th>
                                        <th className="text-start text-xs font-semibold text-slate-300 px-3 py-2 border-b border-slate-700/60">Value</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {list.map((k) => {
                                        const val = translations[selectedLang]?.[k] || '';
                                        const modified = isModified(k);
                                        const inputType = pickInput(val);

                                        return (
                                          <tr key={k} className={modified ? 'bg-cyan-500/5' : ''}>
                                            <td className="align-top px-3 py-2 border-b border-slate-700/60">
                                              <p className="text-cyan-300 text-sm font-semibold break-all">{stripGroupPrefix(k, g)}</p>
                                              {modified && <p className="text-[11px] text-cyan-200 mt-1">Modified</p>}
                                            </td>

                                            <td className="align-top px-3 py-2 border-b border-slate-700/60">
                                              {inputType === 'textarea' ? (
                                                <textarea
                                                  value={val}
                                                  onChange={(e) => handleSaveTranslation(selectedLang, k, e.target.value)}
                                                  rows={2}
                                                  className="block w-full min-w-0 px-2 py-2 rounded bg-slate-900 border border-slate-600 text-white text-start"
                                                />
                                              ) : (
                                                <input
                                                  type="text"
                                                  value={val}
                                                  onChange={(e) => handleSaveTranslation(selectedLang, k, e.target.value)}
                                                  className="block w-full min-w-0 px-2 py-2 rounded bg-slate-900 border border-slate-600 text-white text-start"
                                                />
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>


                              </div>
                            </div>

                          </div>
                        </details>
                      </div>

                    );

                  }
                  )
                }
              </div>
            )}
          </div>

        )}
      </div>
    </div>
  );
}
