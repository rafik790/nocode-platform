import Hand from '../../assets/images/Hand.png'; 
import Hand2 from '../../assets/images/Hand_2.png';
import Hand3 from '../../assets/images/Hand_3.png';
import Hand4 from '../../assets/images/Hand_4.png';
import Hand5 from '../../assets/images/Hand_5.png';
import Hand6 from '../../assets/images/Hand_6.png';

const Services = () => {
    const containerStyle = {
        backgroundColor: '#ADD8E6', // Light blue color
        padding: '20px', // Adjust padding as needed
        marginTop: '10px', // Adjust margin top as needed
    };

    return (
        <div id="services" style={containerStyle}>
            <section data-aos="zoom-in-down">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-3">
                        {/* First Row */}
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand} alt="Icon" className="h-6 w-6   mr-2" />
                            Configurator
                        </div>
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand2} alt="Icon" className="h-6 w-6 mr-2" />
                            Entities
                        </div>
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand3} alt="Icon" className="h-6 w-6 mr-2" />
                            Assignment Rules
                        </div>

                        {/* Second Row */}
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand4} alt="Icon" className="h-6 w-6 mr-2" />
                            Global meta data Defination
                        </div>
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand5} alt="Icon" className="h-6 w-6 mr-2" />
                            On board Merchant
                        </div>
                        <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 text-black flex items-center">
                            <img src={Hand6} alt="Icon" className="h-6 w-6 mr-2" />
                            Merchant maintenance
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;