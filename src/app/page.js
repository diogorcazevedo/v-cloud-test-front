'use client'


const products = [
    {
        id: 1,
        name: 'Macbook Pro 2023',
        color: 'CPU de 8 núcleos GPU de 7 núcleos Memória unificada de 8 GB SSD de 256 GB',
        price: 'R$ 8.000,00',
        href: '#',
        imageSrc: 'https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/17',
        imageAlt: 'Macbook Air com CPU de 8 núcleos GPU de 7 núcleos Memória unificada de 8 GB SSD de 256 GB',
    },
    {
        id: 2,
        name: 'Macbook Air 2021',
        color: 'CPU de 16 núcleos GPU de 7 núcleos Memória unificada de 8 GB SSD de 256 GB',
        price: 'R$ 4.500,00',
        href: '#',
        imageSrc: 'https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/18',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        id: 3,
        name: 'Macbook 2017',
        color: 'com CPU de 8 núcleos GPU de 7 núcleos Memória unificada de 8 GB SSD de 256 GB',
        price: 'R$ 2500,00',
        href: '#',
        imageSrc: 'https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/23',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        id: 4,
        name: 'Macbook Pro 2022',
        color: 'com CPU de 8 núcleos GPU de 7 núcleos Memória unificada de 8 GB SSD de 256 GB',
        price: 'R$ 6.000,00',
        href: '#',
        imageSrc: 'https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/20',
        imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    // More products...
]

export default function Home() {

  return (

      <div className="bg-white">
          <div className="relative isolate overflow-hidden bg-gray-900">
              <div className="px-6 py-6 sm:px-6 sm:py-6 lg:px-8">
                  <img src="/logo_vibbraneo.png" className="h-12 w-auto" alt="vibbraneo"/>
                  <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
                      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                          <h2 className="mx-auto max-w-2xl text-3xl  tracking-tight text-white sm:text-4xl">
                              Conquiste Novas Ferramentas
                          </h2>
                          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                              Vibbraneo oferece negócios que podem fazer sua produtividade alcançar outro nível
                          </p>
                          <div className="mt-10 flex items-center justify-center gap-x-6">
                              <a
                                  href="/login"
                                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                              >
                                  Acesso para membros
                              </a>
                              <a href="/login#plus" className="text-sm font-semibold leading-6 text-white">
                                  Sabia mais <span aria-hidden="true">→</span>
                              </a>
                          </div>
                          <svg
                              viewBox="0 0 1024 1024"
                              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                              aria-hidden="true"
                          >
                              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                              <defs>
                                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                      <stop stopColor="#7775D6" />
                                      <stop offset={1} stopColor="#E935C1" />
                                  </radialGradient>
                              </defs>
                          </svg>
                      </div>
                  </div>
              </div>
              <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                  <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                  <defs>
                      <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                          <stop stopColor="#7775D6" />
                          <stop offset={1} stopColor="#E935C1" />
                      </radialGradient>
                  </defs>
              </svg>
          </div>
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                  {products.map((product) => (
                      <div key={product.id} className="group relative">
                          <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                              <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                              />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700">
                              <a href={product.href}>
                                  <span className="absolute inset-0" />
                                  {product.name}
                              </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>
                  ))}
              </div>

              <div className="mt-8 text-sm md:hidden">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Shop the collection
                      <span aria-hidden="true"> &rarr;</span>
                  </a>
              </div>
          </div>

          <div className="relative z-10 mt-32 bg-gray-900 pb-20 sm:mt-56 sm:pb-24 xl:pb-0">
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                  <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
                      <div
                          className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                          style={{
                              clipPath:
                                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                          }}
                      />
                  </div>
              </div>
              <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
                  <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                      <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                          <img
                              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                              alt=""
                          />
                      </div>
                  </div>
                  <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                      <figure className="relative isolate pt-6 sm:pt-12">
                          <svg
                              viewBox="0 0 162 128"
                              fill="none"
                              aria-hidden="true"
                              className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                          >
                              <path
                                  id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                                  d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                              />
                              <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                          </svg>
                          <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                              <p>
                                  Ótimos negócios.
                                  Experiência muito bem aproveitada.
                                  Posso afirmar que essa parceria foi a melhor coisa que fiz, por isso recomendo, com muita satisfação, Vibbrane.
                              </p>
                          </blockquote>
                          <figcaption className="mt-8 text-base">
                              <div className="font-semibold text-white">Judith Black</div>
                              <div className="mt-1 text-gray-400">CEO of Tuple</div>
                          </figcaption>
                      </figure>
                  </div>
              </div>
          </div>
      </div>
  )
}
