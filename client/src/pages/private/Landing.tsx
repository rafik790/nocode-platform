import CreateAppPopup from "@/components/create-app/CreateAppPopup";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Link } from "react-router-dom";


const Landing = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const closePopup = (refreshParent: boolean) => {
        setPopupOpen(false);
        if (refreshParent) {
            fetchData();
        }
    };

    const openCreateApp = () => {
        setPopupOpen(true);
    }

    const fetchData = async () => {
        try {
            const response = await axiosPrivate({ url: '/apps/my-apps', method: 'get' });
            const resposeData: any = response?.data;
            setDataList(resposeData.data.dataList);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDataList([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="grid place-content-end py-2">
                <Button variant="outline" onClick={openCreateApp}>
                    <p>Create App</p>
                </Button>
                <CreateAppPopup onClose={closePopup} title="Create Application" isOpen={isPopupOpen}>
                    <p></p>
                </CreateAppPopup>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dataList.map((item: any, index) => (

                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={index}>
                        <img className="w-full h-48 object-cover" src="https://placekitten.com/300/200" alt="Card" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.appName}</div>
                            <p className="text-gray-700 text-base">
                                {item.appDesc}
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            <Link to="/">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    Browse
                                </span>
                            </Link>
                            <Link to={"/app/" + item.appID}>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    Settings
                                </span>
                            </Link>

                        </div>
                    </div>

                ))}
            </div>
        </>
    )
};
export default Landing;