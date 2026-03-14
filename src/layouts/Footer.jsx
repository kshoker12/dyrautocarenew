import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="text-white text-sm" style={{ backgroundColor: '#121d24' }}>
      <div className="py-16 pb-8 border-b" style={{ backgroundColor: '#15222b', borderColor: '#1d303c' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {/* Footer Info */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="footer-info">
                <h3 className="text-[28px] mb-4 font-bold text-white">DYR Autocare</h3>
                <p className="text-white">
                  <strong>Phone:</strong> +1 604 906 5646
                  <br />
                  <strong>Email:</strong> dyrautocare@gmail.com
                </p>
                <div className="mt-4">
                  <div className="flex justify-start w-full mx-auto">
                    <strong className="text-white">Follow Us</strong>
                  </div>
                  <div className="social-links mt-3 flex justify-start w-full mx-auto space-x-3">
                    <a href="" target="_blank" rel="noreferrer" className="facebook">
                      <i className="bx bxl-facebook text-yellow-300 text-2xl p-1 rounded-md" style={{ backgroundColor: '#1e293b' }}></i>
                    </a>
                    <a href="https://instagram.com/dyr_autocare?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noreferrer" className="instagram">
                      <i className="bx bxl-instagram text-yellow-300 text-2xl p-1 rounded-md" style={{ backgroundColor: '#1e293b' }}></i>
                    </a>
                    <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=dyr+autocare" className="google-plus">
                      <i className="bx bxl-google text-yellow-300 text-2xl p-1 rounded-md" style={{ backgroundColor: '#1e293b' }}></i>
                    </a>
                    <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@dyrautocare" className="tiktok">
                      <i className="bx bxl-tiktok text-yellow-300 text-2xl p-1 rounded-md" style={{ backgroundColor: '#1e293b' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/6 px-2 mb-8">
              <h4 className="text-base font-semibold text-white relative pb-3">Packages</h4>
              <ul className="list-none p-0 m-0">
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/coating" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Ceramic Coating</Link>
                </li>
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/paint_correction" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Paint Correction</Link>
                </li>
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/enhance_and_seal" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Enhance & Seal</Link>
                </li>
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/exterior" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Exterior Packages</Link>
                </li>
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/interior" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Interior Packages</Link>
                </li>
                <li className="py-2 flex items-center">
                  <i className="bx bx-chevron-right pr-1 text-xl" style={{ color: '#ff4a17' }}></i>
                  <Link href="/full_packages" className="text-white transition-all duration-300 hover:text-[#ff4a17]">Full Packages</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <h4 className="text-base font-semibold text-white relative pb-3">Serving across the lower mainland</h4>
              <p className="text-white">
                If you&apos;re craving top-notch detailing for your vehicle but want to skip the hassle of driving, avoiding long trips or traffic, we&apos;ve got you covered. Our mobile services bring the car care right to your doorstep or workplace, ensuring your ride looks fantastic without the fuss.
              </p>
              <div className="review-button my-2 flex p-2 w-fit" style={{ backgroundColor: '#0070ba' }}>
                <a href="https://www.google.com/search?q=dyr+autocare" target="_blank" rel="noreferrer" className="text-white hover:text-yellow-300">
                  <button type="button" className="fa fa-pencil text-xl text-white bg-transparent border-0 cursor-pointer"></button>
                  Write a Review
                </a>
              </div>
              <div className="flex space-x-2">
                <i className="fa fa-star text-yellow-300 text-xl"></i>
                <i className="fa fa-star text-yellow-300 text-xl"></i>
                <i className="fa fa-star text-yellow-300 text-xl"></i>
                <i className="fa fa-star text-yellow-300 text-xl"></i>
                <i className="fa fa-star text-yellow-300 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center text-2xl mt-2">
            <p className="text-white">Detail Your Ride!</p>
          </div>
        </div>
      </div>
      <div className="h-1 w-full" style={{ backgroundColor: '#22c55e' }}></div>
    </footer>
  );
}
