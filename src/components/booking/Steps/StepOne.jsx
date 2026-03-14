'use client';

import { useContext, useMemo, useEffect } from 'react';
import InputLabel from '@/components/InputLabel';
import { bookingContext } from '../BookingClient';

export default function StepOne() {
  const { data, setData, categories } = useContext(bookingContext);

  const currentCategory = useMemo(
    () => categories.find((c) => c.name === data.category) ?? null,
    [data.category, categories]
  );

  const currentPackage = useMemo(() => {
    if (!currentCategory) return null;
    return currentCategory.packages.find((p) => p.name === data.package) ?? null;
  }, [data.package, currentCategory]);

  // Sync package/options/addons when category or package changes (side effects in useEffect, not useMemo)
  useEffect(() => {
    if (!currentCategory) return;
    const firstPackageName = currentCategory.packages[0]?.name ?? '';
    if (data.package !== firstPackageName) {
      setData('package', firstPackageName);
    }
  }, [currentCategory?.id, currentCategory?.name]);

  useEffect(() => {
    if (!currentPackage) return;
    if (currentCategory?.id === 5 && currentPackage.options) {
      setData('options', [currentPackage.options[0]]);
    } else {
      setData('addons', []);
    }
  }, [currentPackage?.name, currentCategory?.id]);

  if (!categories?.length) return null;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 h-fit">
      <div className="w-72 flex flex-col space-y-0.5 h-16">
        <InputLabel value="Package Category" className="text-white" />
        <select
          className="text-black focus:ring-primary-orange focus:border-none bg-transparent rounded-lg bg-white"
          value={data.category}
          onChange={(e) => setData('category', e.target.value)}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {currentCategory?.packages?.length > 1 && (
        <div className="w-72 flex flex-col space-y-0.5 h-16">
          <InputLabel value="Package Name" className="text-white" />
          <select
            disabled={!data.category}
            className="text-black focus:ring-primary-orange focus:border-none bg-transparent rounded-lg bg-white"
            value={data.package}
            onChange={(e) => setData('package', e.target.value)}
            required
          >
            {currentCategory.packages.map((pack) => (
              <option key={pack.name} value={pack.name}>
                {pack.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {currentPackage?.addons && (
        <div className="flex flex-col items-start justify-center space-y-2 w-72">
          <p className="text-base text-gray-200">Add-ons</p>
          {currentPackage.addons.map((addon) => (
            <div key={addon} className="flex flex-row space-x-2 justify-center items-center">
              <input
                type="checkbox"
                name="addons"
                checked={data.addons.includes(addon)}
                onChange={() => {
                  if (data.addons.includes(addon)) {
                    setData('addons', data.addons.filter((a) => a !== addon));
                  } else {
                    setData('addons', [...data.addons, addon]);
                  }
                }}
              />
              <p className="text-gray-200 text-sm">{addon}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
