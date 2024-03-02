import { useParams } from "react-router-dom";

const AppLanding = () => {
    const {appID} = useParams<{ appID: string }>();
    return (
        <div>
            I am in application landing - {appID}
        </div>
    )
};
export default AppLanding;