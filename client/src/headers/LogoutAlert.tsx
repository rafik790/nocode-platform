import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { useCookies } from 'react-cookie';

export default function LogoutAlert() {
    const [cookies, setCookie, removeCookie] = useCookies(['userDetails']);
    const navigate = useNavigate();
    const logoutHandler = () => {
        removeCookie('userDetails');
        navigate('/login', { replace: true });
    }

    return (
        <><AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                    logout
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to logout?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:space-x-4">
                    <AlertDialogAction onClick={logoutHandler}>
                        Yes
                    </AlertDialogAction>
                    <AlertDialogCancel>No</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}