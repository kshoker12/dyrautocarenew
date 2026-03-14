'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import dataJson from '@/lib/constants/data.json';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import { extractCategories } from '@/lib/helpers';
import StepOne from './Steps/StepOne';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const bookingContext = createContext();

export default function BookingClient({ packageId }) {
  const categories = useMemo(() => extractCategories(), []);
  const defaultCategory = categories[0];
  const defaultPackage = dataJson.packagesNew?.[packageId >= 0 ? packageId : 0];
  const initialCategoryName = defaultPackage && defaultCategory
    ? (dataJson.categories?.find((c) => c.id === defaultPackage.categoryId)?.name ?? defaultCategory.name)
    : (defaultCategory?.name ?? '');
  const initialPackageName = defaultPackage?.name ?? '';

  const [data, setData] = useState({
    package: initialPackageName,
    category: initialCategoryName,
    name: '',
    options: [],
    email: '',
    phone: '',
    date: '',
    preferred: 'Morning',
    mobile: false,
    address: '',
    additional: '',
    vehicle: '',
    addons: [],
  });
  const [step, setStep] = useState(0);
  const [insideAboutUs, setInsideAboutUs] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const heroRef = useRef();
  const dataRef = useRef();
  const inputRef = useRef();
  const [selectionRanges, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      package: initialPackageName,
      category: initialCategoryName,
    }));
  }, [packageId, initialPackageName, initialCategoryName]);

  useEffect(() => {
    const handleScroll = () => {
      const target = heroRef.current;
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.innerHeight / 1.2;
        const viewportHeight = window.innerHeight - 200;
        setInsideAboutUs(targetPosition <= viewportHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDatePicker = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const calendarHeight = dataRef.current?.offsetHeight ?? 320;
      setPosition({
        top: rect.top + window.scrollY - calendarHeight,
        left: rect.left + window.scrollX,
      });
      setShowDate(true);
    }
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (!showDate) return;
      const inCalendar = dataRef.current?.contains(event.target);
      const inInput = inputRef.current?.contains(event.target);
      if (!inCalendar && !inInput) setShowDate(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [showDate]);

  const setDataField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const submit = async (e) => {
    e?.preventDefault();
    setProcessing(true);
    setErrors({});
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors || { error: json.error || 'Request failed' });
        setProcessing(false);
        return;
      }
      window.location.href = '/home?booking=success';
    } catch (_) {
      setErrors({ error: 'Request failed' });
      setProcessing(false);
    }
  };

  const stepOneValid = data.package && data.category;
  const stepTwoValid =
    /^\d{3}-\d{3}-\d{4}$/.test(data.phone) &&
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(data.email) &&
    data.email.length > 0 &&
    data.name.length > 0 &&
    data.vehicle.length > 0;

  return (
    <bookingContext.Provider value={{ heroRef, setData: setDataField, data, categories, addons: data.addons, setAddons: (v) => setDataField('addons', v) }}>
      <div ref={heroRef} className="hero min-h-screen z-0" style={{ backgroundImage: 'url(/images/bg2.jpg)' }}>
        <form onSubmit={submit}>
          <div className={`hero-overlay bg-opacity-40 bg-black min-h-screen flex flex-col items-center justify-center ${showDate ? 'overflow-hidden' : 'overflow-y-scroll'} w-screen`}>
            <div className={`booking-card xl:w-[1000px] lg:w-[920px] md:w-[680px] sm:w-[500px] w-[380px] flex flex-col bg-gray-800 shadow-lg shadow-black md:mt-20 ${step === 1 && 'mt-36'} mb-10 rounded-lg px-6 pt-4 pb-2`}>
              <ul className="booking-steps" role="list">
                {['Choose Package', 'Contact & Availability'].map((stepName, index) => (
                  <li
                    key={stepName}
                    data-content={index < step ? '✓' : index + 1}
                    className={`booking-step ${index <= step ? 'booking-step-active' : ''}`}
                    onClick={() => index < step && setStep(index)}
                  >
                    {stepName}
                  </li>
                ))}
              </ul>
              <div className="flex flex-grow items-center justify-center p-4 w-full">
                {step === 0 ? (
                  <StepOne />
                ) : (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 h-fit">
                    <div className="w-72 flex flex-col space-y-0.5 h-16">
                      <InputLabel value="Full Name" className="text-white" htmlFor="name" />
                      <TextInput
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setDataField('name', e.target.value)}
                        placeholder="Enter Name"
                        className="focus:border-none focus:ring-primary-orange text-black"
                        required
                      />
                      <InputError message={errors.name} />
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-16">
                      <InputLabel value="Email" className="text-white" htmlFor="email" />
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => {
                          const emailRegex = /^[\w.-]*@?[\w.-]*\.?[a-zA-Z]*$/;
                          if (emailRegex.test(e.target.value)) setDataField('email', e.target.value);
                        }}
                        placeholder="example@gmail.com"
                        className="focus:border-none focus:ring-primary-orange text-black"
                        required
                      />
                      <InputError message={errors.email} />
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-16">
                      <InputLabel value="Phone" className="text-white" htmlFor="phone" />
                      <TextInput
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        value={data.phone}
                        onChange={(e) => {
                          const regex = /^\d{3}-\d{3}-\d{4}$|^\d{0,3}$|^\d{3}-\d{0,3}$|^\d{3}-\d{3}-\d{0,4}$/;
                          if (regex.test(e.target.value)) setDataField('phone', e.target.value);
                        }}
                        placeholder="xxx-xxx-xxxx"
                        className="focus:border-none focus:ring-primary-orange text-black"
                        required
                      />
                      <InputError message={errors.phone} />
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-16">
                      <InputLabel value="Availability" className="text-white" />
                      {showDate && (
                        <div ref={dataRef} className="bg-white rounded-lg shadow-lg border border-gray-200 p-2" style={{ position: 'absolute', top: `${position.top}px`, left: `${position.left}px`, zIndex: 9999 }}>
                          <DateRange
                            ranges={[selectionRanges]}
                            onChange={(range) => {
                              const dateRange = { ...selectionRanges };
                              dateRange.startDate = range.selection.startDate;
                              dateRange.endDate = range.selection.endDate;
                              setSelectionRange(dateRange);
                              setDataField(
                                'date',
                                dateRange.startDate.toISOString().split('T')[0] + ' - ' + dateRange.endDate.toISOString().split('T')[0]
                              );
                            }}
                          />
                        </div>
                      )}
                      <TextInput
                        ref={inputRef}
                        id="date"
                        name="date"
                        value={data.date}
                        onClick={handleOpenDatePicker}
                        readOnly
                        placeholder="2024/04/05 - 2024/05/01"
                        className="focus:border-none focus:ring-primary-orange text-black"
                        required
                      />
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-[70px]">
                      <InputLabel value="Vehicle" className="text-white" htmlFor="vehicle" />
                      <p className="text-white text-xs">Please provide the make, model, and year.</p>
                      <TextInput
                        id="vehicle"
                        name="vehicle"
                        value={data.vehicle}
                        onChange={(e) => setDataField('vehicle', e.target.value)}
                        placeholder="e.g. BMW 330i 2024"
                        className="focus:border-none focus:ring-primary-orange text-black"
                        required
                      />
                      <InputError message={errors.vehicle} />
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-16">
                      <InputLabel value="Preferred Time" className="text-white" />
                      <select
                        className="text-black focus:ring-primary-orange focus:border-none bg-transparent rounded-lg bg-white"
                        value={data.preferred}
                        onChange={(e) => setDataField('preferred', e.target.value)}
                        required
                      >
                        {['Morning', 'Afternoon', 'Evening', 'No Preference'].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-fit">
                      <InputLabel className="text-white" htmlFor="mobile" value="Choose One" />
                      <p className="text-white text-xs"><strong>Note:</strong> A small travel fee of $15 will be applied for mobile detailing services.</p>
                      <div className="flex flex-row justify-between w-2/3 items-start" id="newVehicle">
                        <div className="flex flex-row justify-start items-center space-x-2">
                          <input
                            type="radio"
                            name="mobile"
                            checked={!data.mobile}
                            onChange={() => setDataField('mobile', false)}
                          />
                          <label className="text-white">Drop Off</label>
                        </div>
                        <div className="flex flex-row justify-start items-center space-x-2">
                          <input
                            type="radio"
                            name="mobile"
                            checked={data.mobile}
                            onChange={() => setDataField('mobile', true)}
                          />
                          <label className="text-white">Mobile</label>
                        </div>
                      </div>
                      {data.mobile && (
                        <div className="w-72 flex flex-col space-y-0.5 h-16">
                          <InputLabel value="Address" className="text-white" htmlFor="address" />
                          <TextInput
                            id="address"
                            name="address"
                            autoComplete="street-address"
                            value={data.address}
                            onChange={(e) => setDataField('address', e.target.value)}
                            placeholder="e.g. 12345st 67ave"
                            className="focus:border-none focus:ring-primary-orange text-black"
                            required
                          />
                          <InputError message={errors.address} />
                        </div>
                      )}
                    </div>
                    <div className="w-72 flex flex-col space-y-0.5 h-fit">
                      <InputLabel value="Additional Information" className="text-white" htmlFor="additional" />
                      <p className="text-white text-xs">Is there any additional information you would like to share about your vehicle?</p>
                      <textarea
                        id="additional"
                        name="additional"
                        value={data.additional}
                        onChange={(e) => setDataField('additional', e.target.value)}
                        placeholder="Enter Additional Information"
                        className="border-gray-300 focus:border-indigo-500 rounded-md shadow-sm focus:border-none focus:ring-primary-orange text-black bg-white h-28"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-center items-center m-4 md:space-x-6 space-x-2">
                <PrimaryButton className=" text-black bg-white w-44" disabled={step === 0} type="button" onClick={() => setStep(step - 1)}>
                  <p className="text-center w-full">Previous Step</p>
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  className="text-white bg-primary-orange w-44"
                  disabled={processing || (step === 0 ? !stepOneValid : !stepTwoValid)}
                  onClick={() => (step === 1 ? submit() : setStep(step + 1))}
                >
                  <p className="text-center w-full">{step === 1 ? 'Request Booking' : 'Next Step'}</p>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </bookingContext.Provider>
  );
}

export { bookingContext };
