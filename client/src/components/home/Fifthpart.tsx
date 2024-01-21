import img from '../../assets/images/no_code_thumbnail_2.png';

const Fifthpart = () => {
    return (
        <div className="m-auto max-w-12xl p-2 md:p-12 h-5/6" id='about'>
            <div className="flex flex-col-reverse lg:flex-row py-4 lg:py-10 justify-between" data-aos="fade-up">
                <div className="lg:w-2/3 w-full lg:mx-2 justify-center">
                    <img alt="card img" className="rounded-t float-left lg:w-3/5" src={img} />
                </div>
                <div className="flex-col my-4 lg:text-left lg:my-0 lg:justify-end w-full lg:w-2/3 px-8 lg:w-3/5" data-aos="zoom-in" data-aos-delay="500">
                    <h3 className="text-3xl text-blue-900 font-bold"> P&nbsp;L&nbsp;A&nbsp;C&nbsp;E&nbsp;H&nbsp;O&nbsp;L&nbsp;D&nbsp;E&nbsp;R&nbsp;</h3>
                    <br />
                    <h2 className="text-4xl text-black-900 font-bold">Pay with all popular Tool Apps</h2>
                    <div>
                        <p className='my-3 text-2xl text-gray-600 font-semibold'>Define legal entities in the deployment</p>
                    </div>
                    <div>
                        <p className='my-6 text-xl text-gray-600 font-semibold'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fifthpart;
