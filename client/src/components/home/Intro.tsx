import img from '../../assets/images/no_code_thumbnail.png';

const Intro = () => {
    return (
        <div className="m-auto max-w-8xl p-2 md:p-12 h-5/6" id='about'>
            <div className="flex flex-col-reverse lg:flex-row py-12 justify-between lg:text-left" data-aos="fade-up">
                <div className="flex-col my-4 lg:text-left lg:my-0 lg:justify-end w-full lg:w-2/3 px-8" data-aos="zoom-in" data-aos-delay="500">
                    <h3 className="text-3xl text-blue-900 font-bold"> P&nbsp;o&nbsp;p&nbsp;u&nbsp;l&nbsp;a&nbsp;r&nbsp; &nbsp;P&nbsp;r&nbsp;o&nbsp;d&nbsp;u&nbsp;c&nbsp;t&nbsp;s</h3>
                    <br />
                    <h2 className="text-4xl text-black-900 font-bold">Customize everything</h2>
                    <div>
                        <p className='my-3 text-2xl text-gray-600 font-semibold'>Define legal entities in the deployment</p>
                    </div>
                    <div>
                        <p className='my-6 text-xl text-gray-600 font-semibold'>Define the legal entity as the contracting entity with whom the merchant signs up the contract.</p>
                    </div>
                    {/* New Section with Arrow Icon */}
                    <div className="flex items-center my-6 text-xl text-gray-600">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 8.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <p className="font-semibold">Define the legal entity as contracting entity wio Association of Contracting Entity with Acquiring Entity</p>
                    </div>
                    <ul className="list-disc pl-6">
                        <li className="text-xl text-gray-600 font-semibold">Channels for transaction capture for an association Products allowed per channel</li>
                        <li className="text-xl text-gray-600 font-semibold">Pricing and Fees Configuration in Product hierarchy</li>
                        <li className="text-xl text-gray-600 font-semibold">Define <span style={{ color: 'blue' }}>Fee and Commission</span> rules (aka Contract Templates) for the contracting entity that governs the fee and commission calculation applicable for the contracting entity.</li>
                    </ul>
                    {/* End of New Section */}
                    
                </div>
                <div className="lg:w-2/4 flex flex-col lg:mx-3 justify-center">
                   
                        <img alt="card img" className="rounded-t float-right" src={img} />
                    </div>
                </div>
            </div>
      
    )
}

export default Intro;